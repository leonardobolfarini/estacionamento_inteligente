import mqtt from "mqtt";
import { prisma } from "../domain/adapters/prisma_adapter";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("Worker MQTT: Online e escutando setores");
  client.subscribe("campus/parking/sectors/+/spots/+/events");
});

client.on("message", async (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());

    await prisma.$transaction(async (tx) => {
      await tx.sensorsEvents.create({
        data: {
          sensor_id: payload.spotId,
          state: payload.state,
          timestamp: new Date(payload.ts),
        },
      });

      await tx.sensors.update({
        where: { sensor_id: payload.spotId },
        data: {
          current_state: payload.state,
          last_state_change: new Date(payload.ts),
        },
      });
    });

    console.log(`Vaga ${payload.spotId} atualizada para ${payload.state}`);

    if (payload.state === "OCCUPIED") {
      await handleRecommendation(payload.sectorId);
    }
  } catch (error) {
    console.error("Erro no processamento:", error);
  }
});

async function handleRecommendation(sectorId: string) {
  const totalSpots = 30;
  const occupied = await prisma.sensors.count({
    where: { sector_id: sectorId, current_state: "OCCUPIED" },
  });

  const rate = occupied / totalSpots;

  if (rate >= 0.9) {
    const sectors = await prisma.sectors.findMany({
      where: { NOT: { sector_id: sectorId } },
      include: {
        _count: {
          select: { sensors: { where: { current_state: "FREE" } } },
        },
      },
    });

    const best = sectors.sort((a, b) => b._count.sensors - a._count.sensors)[0];

    if (best) {
      const msg = `Setor ${sectorId} lotado (${(rate * 100).toFixed(0)}%). Sugestão: Setor ${best.sector_id}`;

      await prisma.recommendationsLog.create({
        data: {
          timestamp: new Date(),
          recommended_sector: best.sector_id,
          reason: msg,
        },
      });

      client.publish(
        "campus/parking/recommendations",
        JSON.stringify({
          from: sectorId,
          to: best.sector_id,
          msg,
        }),
      );

      console.log(`[RECOMENDAÇÃO] ${msg}`);
    }
  }
}
