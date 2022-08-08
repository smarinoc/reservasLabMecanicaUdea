/*
  Warnings:

  - You are about to drop the column `rol` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "rol",
ADD COLUMN     "userType" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rol" TEXT;
