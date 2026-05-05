-- CreateEnum
CREATE TYPE "States" AS ENUM ('OCCUPIED', 'FREE');

-- CreateTable
CREATE TABLE "Sectors" (
    "sector_id" SERIAL NOT NULL,

    CONSTRAINT "Sectors_pkey" PRIMARY KEY ("sector_id")
);

-- CreateTable
CREATE TABLE "SectorsSnapshots" (
    "snapshot_id" SERIAL NOT NULL,
    "occupied_count" INTEGER NOT NULL,
    "free_count" INTEGER NOT NULL,
    "occupancy_rate" INTEGER NOT NULL,
    "sector_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SectorsSnapshots_pkey" PRIMARY KEY ("snapshot_id")
);

-- CreateTable
CREATE TABLE "Sensors" (
    "sensor_id" SERIAL NOT NULL,
    "sector_id" INTEGER NOT NULL,
    "current_state" "States" NOT NULL DEFAULT 'FREE',
    "last_state_change" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sensors_pkey" PRIMARY KEY ("sensor_id")
);

-- CreateTable
CREATE TABLE "SensorsEvents" (
    "event_id" SERIAL NOT NULL,
    "sensor_id" INTEGER NOT NULL,
    "state" "States" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SensorsEvents_pkey" PRIMARY KEY ("event_id")
);

-- AddForeignKey
ALTER TABLE "SectorsSnapshots" ADD CONSTRAINT "SectorsSnapshots_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sectors"("sector_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensors" ADD CONSTRAINT "Sensors_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sectors"("sector_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorsEvents" ADD CONSTRAINT "SensorsEvents_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "Sensors"("sensor_id") ON DELETE RESTRICT ON UPDATE CASCADE;
