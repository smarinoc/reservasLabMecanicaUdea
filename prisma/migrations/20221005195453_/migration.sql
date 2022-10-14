-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "diaryId" TEXT;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary"("id") ON DELETE SET NULL ON UPDATE CASCADE;
