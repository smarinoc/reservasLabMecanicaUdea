-- CreateEnum
CREATE TYPE "DiaryState" AS ENUM ('habilitado', 'finalizado', 'inhabilitado');

-- AlterTable
ALTER TABLE "Diary" ADD COLUMN     "state" "DiaryState" NOT NULL DEFAULT 'habilitado';
