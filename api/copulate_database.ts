import { prisma } from "./adapters/prisma_adapter";

async function clearDatabase() {
  await prisma.sensorsEvents.deleteMany();
  await prisma.sectorsSnapshots.deleteMany();

  await prisma.sensors.deleteMany();
  await prisma.sectors.deleteMany();
}

async function copulateDatabaseBase() {
  await prisma.sectors.createMany({
    data: Array.from({ length: 4 }, () => ({})),
  });

  const allSectors = await prisma.sectors.findMany();

  const creationPromises = allSectors.map((sector) => {
    return prisma.sensors.createMany({
      data: Array.from({ length: 30 }, () => ({
        sector_id: sector.sector_id,
        current_state: "FREE",
      })),
    });
  });

  await Promise.all(creationPromises);
}

async function addSnapshots() {
  await prisma.sectorsSnapshots.createMany({
    data: [
      {
        sector_id: 1,
        free_count: 20,
        occupied_count: 10,
        occupancy_rate: 33,
        timestamp: new Date(),
      },
      {
        sector_id: 2,
        free_count: 10,
        occupied_count: 20,
        occupancy_rate: 67,
        timestamp: new Date(),
      },
      {
        sector_id: 3,
        free_count: 0,
        occupied_count: 30,
        occupancy_rate: 100,
        timestamp: new Date(),
      },
    ],
  });
}

async function addEvents() {
  await prisma.sensorsEvents.createMany({
    data: [
      {
        sensor_id: 1,
        state: "OCCUPIED",
        timestamp: new Date(),
      },
      {
        sensor_id: 2,
        state: "FREE",
        timestamp: new Date(),
      },
      {
        sensor_id: 3,
        state: "OCCUPIED",
        timestamp: new Date(),
      },
    ],
  });
}
