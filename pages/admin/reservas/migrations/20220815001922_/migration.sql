/*
  Warnings:

  - The primary key for the `SchedulesOnUnitMachine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `unitMachineId` on the `SchedulesOnUnitMachine` table. All the data in the column will be lost.
  - Added the required column `count` to the `MachineUnit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `machineUnitId` to the `SchedulesOnUnitMachine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SchedulesOnUnitMachine" DROP CONSTRAINT "SchedulesOnUnitMachine_unitMachineId_fkey";

-- AlterTable
ALTER TABLE "MachineUnit" ADD COLUMN     "count" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SchedulesOnUnitMachine" DROP CONSTRAINT "SchedulesOnUnitMachine_pkey",
DROP COLUMN "unitMachineId",
ADD COLUMN     "machineUnitId" TEXT NOT NULL,
ADD CONSTRAINT "SchedulesOnUnitMachine_pkey" PRIMARY KEY ("machineUnitId", "scheduleId");

-- AddForeignKey
ALTER TABLE "SchedulesOnUnitMachine" ADD CONSTRAINT "SchedulesOnUnitMachine_machineUnitId_fkey" FOREIGN KEY ("machineUnitId") REFERENCES "MachineUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
