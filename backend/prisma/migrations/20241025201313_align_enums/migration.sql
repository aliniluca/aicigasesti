/*
  Warnings:

  - The values [ACTIVE,INACTIVE,SOLD,DEACTIVATED] on the enum `AdStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AdStatus_new" AS ENUM ('ACTIV', 'INACTIV', 'VANDUT', 'EXPIRED', 'DEACTIVAT');
ALTER TABLE "Ad" ALTER COLUMN "adStatus" DROP DEFAULT;
ALTER TABLE "Ad" ALTER COLUMN "adStatus" TYPE "AdStatus_new" USING ("adStatus"::text::"AdStatus_new");
ALTER TYPE "AdStatus" RENAME TO "AdStatus_old";
ALTER TYPE "AdStatus_new" RENAME TO "AdStatus";
DROP TYPE "AdStatus_old";
ALTER TABLE "Ad" ALTER COLUMN "adStatus" SET DEFAULT 'ACTIV';
COMMIT;

-- AlterTable
ALTER TABLE "Ad" ALTER COLUMN "adStatus" SET DEFAULT 'ACTIV';
