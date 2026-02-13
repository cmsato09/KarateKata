/*
  Warnings:

  - Added the required column `breath` to the `Move` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Breath" AS ENUM ('IN', 'OUT', 'IN_OUT');

-- AlterTable
ALTER TABLE "Move" ADD COLUMN     "breath" "Breath" NOT NULL;

-- DropEnum
DROP TYPE "Breadth";
