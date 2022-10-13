/*
  Warnings:

  - Added the required column `amount` to the `Machine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Machine" ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MachineUnit" ALTER COLUMN "state" SET DEFAULT 'available';
