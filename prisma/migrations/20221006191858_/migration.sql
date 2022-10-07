/*
  Warnings:

  - Added the required column `diaryId` to the `MachineUnitOnSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MachineUnitOnSchedule" ADD COLUMN     "diaryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "MachineUnitOnSchedule" ADD CONSTRAINT "MachineUnitOnSchedule_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
