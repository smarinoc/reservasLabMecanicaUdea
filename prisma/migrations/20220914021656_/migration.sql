/*
  Warnings:

  - You are about to drop the column `count` on the `MachineUnit` table. All the data in the column will be lost.
  - You are about to drop the column `countAvailable` on the `MachineUnitOnSchedule` table. All the data in the column will be lost.
  - Added the required column `serial` to the `MachineUnit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `MachineUnit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `MachineUnit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `MachineUnitOnSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Reserve` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MachineUnit" DROP COLUMN "count",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "serial" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "MachineUnitOnSchedule" DROP COLUMN "countAvailable",
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Reserve" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
