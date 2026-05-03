import { prisma } from "./adapters/prisma_adapter";

async function clearDatabase() {
  await prisma.incidents.deleteMany();
  await prisma.recommendationsLog.deleteMany();
  await prisma.sensorsEvents.deleteMany();
  await prisma.sectorsSnapshots.deleteMany();

  await prisma.sensors.deleteMany();
  await prisma.sectors.deleteMany();
}

async function populateDatabaseBase() {
  await prisma.sectors.createMany({
    data: [{ sector_id: "A" }, { sector_id: "B" }, { sector_id: "C" }],
  });

  const allSectors = await prisma.sectors.findMany();

  const creationPromises = allSectors.map((sector) => {
    return prisma.sensors.createMany({
      data: Array.from({ length: 30 }, (_, index) => {
        const spotNumber = String(index + 1).padStart(2, "0");

        return {
          sensor_id: `${sector.sector_id}-${spotNumber}`,
          sector_id: sector.sector_id,
          current_state: "FREE",
        };
      }),
    });
  });

  await Promise.all(creationPromises);
}

async function addSnapshots() {
  await prisma.sectorsSnapshots.createMany({
    data: [
      {
        sector_id: "A",
        free_count: 20,
        occupied_count: 10,
        occupancy_rate: 33,
        timestamp: new Date(),
      },
      {
        sector_id: "B",
        free_count: 10,
        occupied_count: 20,
        occupancy_rate: 67,
        timestamp: new Date(),
      },
      {
        sector_id: "C",
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
        sensor_id: "A-01",
        state: "OCCUPIED",
        timestamp: new Date(),
      },
      {
        sensor_id: "A-02",
        state: "FREE",
        timestamp: new Date(),
      },
      {
        sensor_id: "A-03",
        state: "OCCUPIED",
        timestamp: new Date(),
      },
    ],
  });
}

async function addRecommendationsLog() {
  await prisma.recommendationsLog.createMany({
    data: [
      {
        recommended_sector: "A",
        timestamp: new Date(),
      },
      {
        recommended_sector: "B",
        timestamp: new Date(),
      },
      {
        recommended_sector: "C",
        timestamp: new Date(),
      },
    ],
  });
}

async function addIncidents() {
  await prisma.incidents.createMany({
    data: [
      {
        sector_id: "A",
        sensor_id: "A-01",
        severity: "LOW",
        status: "PENDING",
        timestamp_open: new Date(),
        type: "FLAPPING",
      },
      {
        sector_id: "A",
        sensor_id: "A-02",
        severity: "MEDIUM",
        status: "OPEN",
        timestamp_open: new Date(),
        type: "STUCK_FREE",
      },
      {
        sector_id: "A",
        sensor_id: "A-03",
        severity: "HIGH",
        status: "CLOSE",
        timestamp_open: new Date(),
        type: "STUCK_OCCUPIED",
      },
      {
        sector_id: "B",
        sensor_id: "B-01",
        severity: "LOW",
        status: "PENDING",
        timestamp_open: new Date(),
        type: "FLAPPING",
      },
      {
        sector_id: "B",
        sensor_id: "B-02",
        severity: "MEDIUM",
        status: "OPEN",
        timestamp_open: new Date(),
        type: "STUCK_FREE",
      },
      {
        sector_id: "B",
        sensor_id: "B-03",
        severity: "HIGH",
        status: "CLOSE",
        timestamp_open: new Date(),
        type: "STUCK_OCCUPIED",
      },
      {
        sector_id: "C",
        sensor_id: "C-01",
        severity: "LOW",
        status: "PENDING",
        timestamp_open: new Date(),
        type: "FLAPPING",
      },
      {
        sector_id: "C",
        sensor_id: "C-02",
        severity: "MEDIUM",
        status: "OPEN",
        timestamp_open: new Date(),
        type: "STUCK_FREE",
      },
      {
        sector_id: "C",
        sensor_id: "C-03",
        severity: "HIGH",
        status: "CLOSE",
        timestamp_open: new Date(),
        type: "STUCK_OCCUPIED",
      },
    ],
  });
}

// clearDatabase();
// populateDatabaseBase();
addSnapshots();
addEvents();
addRecommendationsLog();
addIncidents();
