/*
  Warnings:

  - You are about to drop the column `diaryId` on the `MachineUnit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[machineUnitId,scheduleId]` on the table `MachineUnitOnSchedule` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "MachineUnit" DROP CONSTRAINT "MachineUnit_diaryId_fkey";

-- AlterTable
ALTER TABLE "MachineUnit" DROP COLUMN "diaryId";

-- CreateTable
CREATE TABLE "_DiaryToMachineUnit" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DiaryToMachineUnit_AB_unique" ON "_DiaryToMachineUnit"("A", "B");

-- CreateIndex
CREATE INDEX "_DiaryToMachineUnit_B_index" ON "_DiaryToMachineUnit"("B");

-- CreateIndex
CREATE UNIQUE INDEX "MachineUnitOnSchedule_machineUnitId_scheduleId_key" ON "MachineUnitOnSchedule"("machineUnitId", "scheduleId");

-- AddForeignKey
ALTER TABLE "_DiaryToMachineUnit" ADD CONSTRAINT "_DiaryToMachineUnit_A_fkey" FOREIGN KEY ("A") REFERENCES "Diary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiaryToMachineUnit" ADD CONSTRAINT "_DiaryToMachineUnit_B_fkey" FOREIGN KEY ("B") REFERENCES "MachineUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
