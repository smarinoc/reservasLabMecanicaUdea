/*
  Warnings:

  - You are about to drop the column `diaryId` on the `Schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_diaryId_fkey";

-- AlterTable
ALTER TABLE "MachineUnit" ADD COLUMN     "diaryId" TEXT;

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "diaryId";

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
