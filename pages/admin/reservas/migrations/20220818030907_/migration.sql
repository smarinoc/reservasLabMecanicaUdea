/*
  Warnings:

  - You are about to drop the `SchedulesOnUnitMachine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SchedulesOnUnitMachine" DROP CONSTRAINT "SchedulesOnUnitMachine_machineUnitId_fkey";

-- DropForeignKey
ALTER TABLE "SchedulesOnUnitMachine" DROP CONSTRAINT "SchedulesOnUnitMachine_scheduleId_fkey";

-- AlterTable
ALTER TABLE "MachineUnit" ADD COLUMN     "diaryId" TEXT;

-- DropTable
DROP TABLE "SchedulesOnUnitMachine";

-- CreateTable
CREATE TABLE "Diary" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Diary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DiaryToSchedule" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DiaryToSchedule_AB_unique" ON "_DiaryToSchedule"("A", "B");

-- CreateIndex
CREATE INDEX "_DiaryToSchedule_B_index" ON "_DiaryToSchedule"("B");

-- AddForeignKey
ALTER TABLE "MachineUnit" ADD CONSTRAINT "MachineUnit_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiaryToSchedule" ADD CONSTRAINT "_DiaryToSchedule_A_fkey" FOREIGN KEY ("A") REFERENCES "Diary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiaryToSchedule" ADD CONSTRAINT "_DiaryToSchedule_B_fkey" FOREIGN KEY ("B") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
