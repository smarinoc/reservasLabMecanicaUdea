/*
  Warnings:

  - Added the required column `firstDate` to the `Diary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastDate` to the `Diary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Diary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diary" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lastDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
