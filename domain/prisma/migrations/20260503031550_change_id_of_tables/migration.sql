/*
  Warnings:

  - The primary key for the `Sectors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Sensors` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Incidents" DROP CONSTRAINT "Incidents_sector_id_fkey";

-- DropForeignKey
ALTER TABLE "Incidents" DROP CONSTRAINT "Incidents_sensor_id_fkey";

-- DropForeignKey
ALTER TABLE "RecommendationsLog" DROP CONSTRAINT "RecommendationsLog_recommended_sector_fkey";

-- DropForeignKey
ALTER TABLE "SectorsSnapshots" DROP CONSTRAINT "SectorsSnapshots_sector_id_fkey";

-- DropForeignKey
ALTER TABLE "Sensors" DROP CONSTRAINT "Sensors_sector_id_fkey";

-- DropForeignKey
ALTER TABLE "SensorsEvents" DROP CONSTRAINT "SensorsEvents_sensor_id_fkey";

-- AlterTable
ALTER TABLE "Incidents" ALTER COLUMN "sector_id" SET DATA TYPE TEXT,
ALTER COLUMN "sensor_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "RecommendationsLog" ALTER COLUMN "recommended_sector" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Sectors" DROP CONSTRAINT "Sectors_pkey",
ALTER COLUMN "sector_id" DROP DEFAULT,
ALTER COLUMN "sector_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sectors_pkey" PRIMARY KEY ("sector_id");
DROP SEQUENCE "Sectors_sector_id_seq";

-- AlterTable
ALTER TABLE "SectorsSnapshots" ALTER COLUMN "sector_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Sensors" DROP CONSTRAINT "Sensors_pkey",
ALTER COLUMN "sensor_id" DROP DEFAULT,
ALTER COLUMN "sensor_id" SET DATA TYPE TEXT,
ALTER COLUMN "sector_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sensors_pkey" PRIMARY KEY ("sensor_id");
DROP SEQUENCE "Sensors_sensor_id_seq";

-- AlterTable
ALTER TABLE "SensorsEvents" ALTER COLUMN "sensor_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "SectorsSnapshots" ADD CONSTRAINT "SectorsSnapshots_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sectors"("sector_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensors" ADD CONSTRAINT "Sensors_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sectors"("sector_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorsEvents" ADD CONSTRAINT "SensorsEvents_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "Sensors"("sensor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incidents" ADD CONSTRAINT "Incidents_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sectors"("sector_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incidents" ADD CONSTRAINT "Incidents_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "Sensors"("sensor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendationsLog" ADD CONSTRAINT "RecommendationsLog_recommended_sector_fkey" FOREIGN KEY ("recommended_sector") REFERENCES "Sectors"("sector_id") ON DELETE RESTRICT ON UPDATE CASCADE;
