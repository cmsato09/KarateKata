/*
  Warnings:

  - Changed the type of `type` on the `Technique` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TechniqueType" AS ENUM ('BLOCK', 'PUNCH', 'KICK', 'STRIKE');

-- AlterTable
ALTER TABLE "Technique" DROP COLUMN "type",
ADD COLUMN     "type" "TechniqueType" NOT NULL;
