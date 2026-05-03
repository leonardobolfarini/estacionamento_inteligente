/*
  Warnings:

  - The values [SENSOR_FAILURE,LOW_BATTERY,OBSTRUCTION,OCCUPIED_TOO_LONG,FREE_TO_LONG] on the enum `IncidentTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "IncidentTypes_new" AS ENUM ('STUCK_OCCUPIED', 'STUCK_FREE', 'FLAPPING');
ALTER TABLE "Incidents" ALTER COLUMN "type" TYPE "IncidentTypes_new" USING ("type"::text::"IncidentTypes_new");
ALTER TYPE "IncidentTypes" RENAME TO "IncidentTypes_old";
ALTER TYPE "IncidentTypes_new" RENAME TO "IncidentTypes";
DROP TYPE "public"."IncidentTypes_old";
COMMIT;
