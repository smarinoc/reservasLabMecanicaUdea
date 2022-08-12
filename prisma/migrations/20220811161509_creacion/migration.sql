/*
  Warnings:

  - Made the column `rol` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "rol" SET NOT NULL,
ALTER COLUMN "rol" SET DEFAULT 'user';

-- CreateTable
CREATE TABLE "Machine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "recommendations" TEXT[],
    "units" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitMachine" (
    "id" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "UnitMachine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "unitMachineId" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchedulesOnUnitMachine" (
    "unitMachineId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "SchedulesOnUnitMachine_pkey" PRIMARY KEY ("unitMachineId","scheduleId")
);

-- CreateTable
CREATE TABLE "_ScheduleToUnitMachine" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ScheduleToUnitMachine_AB_unique" ON "_ScheduleToUnitMachine"("A", "B");

-- CreateIndex
CREATE INDEX "_ScheduleToUnitMachine_B_index" ON "_ScheduleToUnitMachine"("B");

-- AddForeignKey
ALTER TABLE "UnitMachine" ADD CONSTRAINT "UnitMachine_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchedulesOnUnitMachine" ADD CONSTRAINT "SchedulesOnUnitMachine_unitMachineId_fkey" FOREIGN KEY ("unitMachineId") REFERENCES "UnitMachine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchedulesOnUnitMachine" ADD CONSTRAINT "SchedulesOnUnitMachine_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleToUnitMachine" ADD CONSTRAINT "_ScheduleToUnitMachine_A_fkey" FOREIGN KEY ("A") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleToUnitMachine" ADD CONSTRAINT "_ScheduleToUnitMachine_B_fkey" FOREIGN KEY ("B") REFERENCES "UnitMachine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
