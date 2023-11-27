/*
  Warnings:

  - You are about to drop the column `date` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `licenseLevel` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `serialNumber` on the `Batch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Batch" DROP COLUMN "date",
DROP COLUMN "licenseLevel",
DROP COLUMN "model",
DROP COLUMN "serialNumber";

-- CreateTable
CREATE TABLE "Machine" (
    "id" SERIAL NOT NULL,
    "batchId" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "licenseLevel" TEXT NOT NULL,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Machine" ADD CONSTRAINT "Machine_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
