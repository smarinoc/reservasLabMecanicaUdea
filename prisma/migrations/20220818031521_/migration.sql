/*
  Warnings:

  - You are about to drop the `_DiaryToSchedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DiaryToSchedule" DROP CONSTRAINT "_DiaryToSchedule_A_fkey";

-- DropForeignKey
ALTER TABLE "_DiaryToSchedule" DROP CONSTRAINT "_DiaryToSchedule_B_fkey";

-- DropTable
DROP TABLE "_DiaryToSchedule";

-- CreateTable
CREATE TABLE "SchedulesOnDiary" (
    "diaryId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,

    CONSTRAINT "SchedulesOnDiary_pkey" PRIMARY KEY ("diaryId","scheduleId")
);

-- AddForeignKey
ALTER TABLE "SchedulesOnDiary" ADD CONSTRAINT "SchedulesOnDiary_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchedulesOnDiary" ADD CONSTRAINT "SchedulesOnDiary_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
