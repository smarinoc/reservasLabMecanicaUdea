/*
  Warnings:

  - You are about to drop the column `diaryId` on the `MachineUnit` table. All the data in the column will be lost.
  - You are about to drop the `SchedulesOnDiary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MachineUnit" DROP CONSTRAINT "MachineUnit_diaryId_fkey";

-- DropForeignKey
ALTER TABLE "SchedulesOnDiary" DROP CONSTRAINT "SchedulesOnDiary_diaryId_fkey";

-- DropForeignKey
ALTER TABLE "SchedulesOnDiary" DROP CONSTRAINT "SchedulesOnDiary_scheduleId_fkey";

-- DropIndex
DROP INDEX "Schedule_day_hour_key";

-- AlterTable
ALTER TABLE "MachineUnit" DROP COLUMN "diaryId";

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "diaryId" TEXT;

-- DropTable
DROP TABLE "SchedulesOnDiary";

-- CreateTable
CREATE TABLE "MachineUnitOnSchedule" (
    "id" TEXT NOT NULL,
    "machineUnitId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "countAvailable" INTEGER NOT NULL,

    CONSTRAINT "MachineUnitOnSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineUnitOnSchedule" ADD CONSTRAINT "MachineUnitOnSchedule_machineUnitId_fkey" FOREIGN KEY ("machineUnitId") REFERENCES "MachineUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MachineUnitOnSchedule" ADD CONSTRAINT "MachineUnitOnSchedule_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
