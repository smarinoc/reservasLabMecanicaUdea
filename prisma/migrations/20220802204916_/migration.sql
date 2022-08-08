/*
  Warnings:

  - The `rol` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('admin', 'user');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "rol",
ADD COLUMN     "rol" "Rol";
