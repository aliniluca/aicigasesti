/*
  Warnings:

  - The values [SELLING,SEEKING,RENT] on the enum `AdType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `categoryId` on the `Subcategory` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AdType_new" AS ENUM ('VAND', 'CAUT', 'INCHIRIEZ');
ALTER TABLE "Ad" ALTER COLUMN "type" TYPE "AdType_new" USING ("type"::text::"AdType_new");
ALTER TYPE "AdType" RENAME TO "AdType_old";
ALTER TYPE "AdType_new" RENAME TO "AdType";
DROP TYPE "AdType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Ad" DROP CONSTRAINT "Ad_subcategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Subcategory" DROP CONSTRAINT "Subcategory_categoryId_fkey";

-- AlterTable
ALTER TABLE "Ad" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "minimumPrice" DROP NOT NULL,
ALTER COLUMN "subcategoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "categoryId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tokens" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
