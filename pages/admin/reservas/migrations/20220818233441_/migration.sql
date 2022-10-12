/*
  Warnings:

  - A unique constraint covering the columns `[day,hour]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Schedule_day_hour_key" ON "Schedule"("day", "hour");
