/*
  Warnings:

  - You are about to drop the column `units` on the `Machine` table. All the data in the column will be lost.
  - You are about to drop the `UnitMachine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SchedulesOnUnitMachine" DROP CONSTRAINT "SchedulesOnUnitMachine_unitMachineId_fkey";

-- DropForeignKey
ALTER TABLE "UnitMachine" DROP CONSTRAINT "UnitMachine_machineId_fkey";

-- AlterTable
ALTER TABLE "Machine" DROP COLUMN "units";

-- DropTable
DROP TABLE "UnitMachine";

-- CreateTable
CREATE TABLE "MachineUnit" (
    "id" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "MachineUnit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MachineUnit" ADD CONSTRAINT "MachineUnit_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchedulesOnUnitMachine" ADD CONSTRAINT "SchedulesOnUnitMachine_unitMachineId_fkey" FOREIGN KEY ("unitMachineId") REFERENCES "MachineUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
