/*
  Warnings:

  - You are about to drop the column `machineUnitOnScheduleId` on the `Reserve` table. All the data in the column will be lost.
  - Added the required column `machineUnitId` to the `Reserve` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduleId` to the `Reserve` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reserve" DROP CONSTRAINT "Reserve_machineUnitOnScheduleId_fkey";

-- AlterTable
ALTER TABLE "Reserve" DROP COLUMN "machineUnitOnScheduleId",
ADD COLUMN     "machineUnitId" TEXT NOT NULL,
ADD COLUMN     "scheduleId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Reserve" ADD CONSTRAINT "Reserve_machineUnitId_fkey" FOREIGN KEY ("machineUnitId") REFERENCES "MachineUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserve" ADD CONSTRAINT "Reserve_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
