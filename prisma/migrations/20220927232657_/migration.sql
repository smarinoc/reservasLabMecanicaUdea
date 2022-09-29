/*
  Warnings:

  - The `state` column on the `MachineUnit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `state` column on the `MachineUnitOnSchedule` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `state` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `state` column on the `Reservation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProfileState" AS ENUM ('habilitado', 'registrado', 'inhabilitado');

-- CreateEnum
CREATE TYPE "MachineUnitState" AS ENUM ('habilitada', 'mantenimiento', 'inhabilitada');

-- CreateEnum
CREATE TYPE "MachineUnitOnScheduleState" AS ENUM ('available', 'busy', 'disabled');

-- CreateEnum
CREATE TYPE "ReservationState" AS ENUM ('reservada', 'cancelada', 'completada');

-- AlterTable
ALTER TABLE "MachineUnit" DROP COLUMN "state",
ADD COLUMN     "state" "MachineUnitState" NOT NULL DEFAULT 'habilitada';

-- AlterTable
ALTER TABLE "MachineUnitOnSchedule" DROP COLUMN "state",
ADD COLUMN     "state" "MachineUnitOnScheduleState" NOT NULL DEFAULT 'available';

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "state",
ADD COLUMN     "state" "ProfileState" NOT NULL DEFAULT 'habilitado';

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "state",
ADD COLUMN     "state" "ReservationState" NOT NULL DEFAULT 'reservada';

-- DropEnum
DROP TYPE "State";
