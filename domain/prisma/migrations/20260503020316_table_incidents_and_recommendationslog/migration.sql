-- CreateEnum
CREATE TYPE "IncidentTypes" AS ENUM ('SENSOR_FAILURE', 'LOW_BATTERY', 'OBSTRUCTION', 'OCCUPIED_TOO_LONG', 'FREE_TO_LONG');

-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'CLOSE', 'PENDING');

-- CreateTable
CREATE TABLE "Incidents" (
    "incident_id" SERIAL NOT NULL,
    "timestamp_open" TIMESTAMP(3) NOT NULL,
    "timestamp_close" TIMESTAMP(3),
    "type" "IncidentTypes" NOT NULL,
    "severity" "Severity" NOT NULL,
    "sector_id" INTEGER NOT NULL,
    "sensor_id" INTEGER NOT NULL,
    "evidence" TEXT,
    "status" "Status" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Incidents_pkey" PRIMARY KEY ("incident_id")
);

-- CreateTable
CREATE TABLE "RecommendationsLog" (
    "log_id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "recommended_sector" INTEGER NOT NULL,
    "reason" TEXT,

    CONSTRAINT "RecommendationsLog_pkey" PRIMARY KEY ("log_id")
);

-- AddForeignKey
ALTER TABLE "Incidents" ADD CONSTRAINT "Incidents_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sectors"("sector_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incidents" ADD CONSTRAINT "Incidents_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "Sensors"("sensor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendationsLog" ADD CONSTRAINT "RecommendationsLog_recommended_sector_fkey" FOREIGN KEY ("recommended_sector") REFERENCES "Sectors"("sector_id") ON DELETE RESTRICT ON UPDATE CASCADE;
