import express from "express";
import { Response, Request } from "express";
import { prisma } from "./adapters/prisma_adapter";

const app = express();

app.get("/map", async (req: Request, res: Response) => {
  const sectors = await prisma.sectors.findMany({
    include: {
      sensors: {
        select: {
          sensor_id: true,
          current_state: true,
        },
      },
    },
  });

  await prisma.$disconnect();

  res.json({
    sectors,
  });
});

app.get("/sectors", async (req: Request, res: Response) => {
  const snapshots = await prisma.sectorsSnapshots.findMany();

  res.json({
    snapshots,
  });
});

app.get("/sectors/:sectorId/spots", async (req: Request, res: Response) => {
  const { sectorId } = req.params;

  const id = String(sectorId);

  const spots = await prisma.sensors.findMany({
    where: {
      sector_id: id,
    },
  });

  res.json(spots);
});

app.get(
  "/sectors/:sectorId/free-spots",
  async (req: Request, res: Response) => {
    const { sectorId } = req.params;

    const { limit } = req.query;

    const id = String(sectorId);
    const quantity = Number(limit);

    const spots = await prisma.sensors.findMany({
      where: {
        sector_id: id,
        current_state: "FREE",
      },
      take: quantity,
    });

    res.json(spots);
  },
);

app.get("/reports/turnover", async (req: Request, res: Response) => {
  const { sectorId, from, to } = req.query;

  const sector_id = String(sectorId);
  const fromString = String(from);
  const toString = String(to);

  const count = await prisma.sensorsEvents.count({
    where: {
      state: "OCCUPIED",
      sensor: {
        sector_id: sector_id,
      },
      timestamp: {
        gte: new Date(fromString),
        lte: new Date(toString),
      },
    },
  });

  res.status(200).json({
    sectorId,
    period: {
      from,
      to,
    },
    turnover: count,
  });
});

app.get("/incidents", async (req: Request, res: Response) => {
  const { status } = req.query;

  type statustypes = "OPEN" | "CLOSE" | "PENDING";

  const incidents = await prisma.incidents.findMany({
    where: {
      status: status as statustypes,
    },
  });

  res.json(incidents);
});

app.listen(5000, () => {
  console.log("App running");
});
