/*
  Warnings:

  - You are about to drop the column `unitMachineId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the `_ScheduleToUnitMachine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ScheduleToUnitMachine" DROP CONSTRAINT "_ScheduleToUnitMachine_A_fkey";

-- DropForeignKey
ALTER TABLE "_ScheduleToUnitMachine" DROP CONSTRAINT "_ScheduleToUnitMachine_B_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "unitMachineId";

-- DropTable
DROP TABLE "_ScheduleToUnitMachine";

-- CreateTable
CREATE TABLE "_SchedulesOnUnitMachine" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SchedulesOnUnitMachine_AB_unique" ON "_SchedulesOnUnitMachine"("A", "B");

-- CreateIndex
CREATE INDEX "_SchedulesOnUnitMachine_B_index" ON "_SchedulesOnUnitMachine"("B");

-- AddForeignKey
ALTER TABLE "_SchedulesOnUnitMachine" ADD CONSTRAINT "_SchedulesOnUnitMachine_A_fkey" FOREIGN KEY ("A") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchedulesOnUnitMachine" ADD CONSTRAINT "_SchedulesOnUnitMachine_B_fkey" FOREIGN KEY ("B") REFERENCES "UnitMachine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
