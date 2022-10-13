-- CreateEnum
CREATE TYPE "State" AS ENUM ('authorized', 'registered', 'disabled');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
