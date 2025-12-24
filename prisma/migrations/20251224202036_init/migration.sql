-- CreateEnum
CREATE TYPE "TechniqueType" AS ENUM ('BLOCK', 'PUNCH', 'KICK', 'STRIKE', 'PREP');

-- CreateTable
CREATE TABLE "Technique" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TechniqueType" NOT NULL,
    "name_hiragana" TEXT,
    "name_kanji" TEXT,
    "description" TEXT,

    CONSTRAINT "Technique_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Technique_name_key" ON "Technique"("name");
