/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Ad` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Subcategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Ad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Subcategory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FilterType" AS ENUM ('STATIC', 'DYNAMIC');

-- AlterEnum
ALTER TYPE "AdStatus" ADD VALUE 'DEACTIVATED';

-- AlterTable
ALTER TABLE "Ad" ADD COLUMN     "deactivatedAt" TIMESTAMP(3),
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "adStatus" SET DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subcategory" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "banReason" TEXT,
ADD COLUMN     "isBanned" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "CategoryFilter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "filterType" "FilterType" NOT NULL,
    "options" TEXT[],
    "categoryId" TEXT,
    "subcategoryId" TEXT,

    CONSTRAINT "CategoryFilter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ad_slug_key" ON "Ad"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory_slug_key" ON "Subcategory"("slug");

-- AddForeignKey
ALTER TABLE "CategoryFilter" ADD CONSTRAINT "CategoryFilter_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryFilter" ADD CONSTRAINT "CategoryFilter_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
