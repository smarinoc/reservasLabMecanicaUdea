-- CreateTable
CREATE TABLE "Reserve" (
    "id" TEXT NOT NULL,
    "machineUnitOnScheduleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Reserve_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reserve" ADD CONSTRAINT "Reserve_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserve" ADD CONSTRAINT "Reserve_machineUnitOnScheduleId_fkey" FOREIGN KEY ("machineUnitOnScheduleId") REFERENCES "MachineUnitOnSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
