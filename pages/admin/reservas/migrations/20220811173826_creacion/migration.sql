/*
  Warnings:

  - You are about to drop the `_SchedulesOnUnitMachine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SchedulesOnUnitMachine" DROP CONSTRAINT "_SchedulesOnUnitMachine_A_fkey";

-- DropForeignKey
ALTER TABLE "_SchedulesOnUnitMachine" DROP CONSTRAINT "_SchedulesOnUnitMachine_B_fkey";

-- DropTable
DROP TABLE "_SchedulesOnUnitMachine";
