-- CreateEnum
CREATE TYPE "MoveTiming" AS ENUM ('SIMULTANEOUS', 'SEQUENTIAL');

-- CreateEnum
CREATE TYPE "Direction" AS ENUM ('N', 'S', 'E', 'W', 'NE', 'NW', 'SE', 'SW');

-- CreateEnum
CREATE TYPE "LeadFoot" AS ENUM ('LEFT', 'RIGHT');

-- CreateEnum
CREATE TYPE "HipPosition" AS ENUM ('HANMI', 'SHOMEN', 'GYAKUHANMI');

-- CreateEnum
CREATE TYPE "ActiveSide" AS ENUM ('LEFT', 'RIGHT', 'BOTH', 'NEITHER');

-- CreateEnum
CREATE TYPE "Speed" AS ENUM ('FAST', 'SLOW', 'FAST_SLOW', 'SLOW_FAST');

-- CreateEnum
CREATE TYPE "SnapThrust" AS ENUM ('SNAP', 'THRUST');

-- CreateEnum
CREATE TYPE "TechniqueLevel" AS ENUM ('GEDAN', 'CHUDAN', 'JODAN', 'GEDAN_JODAN');

-- CreateEnum
CREATE TYPE "Breadth" AS ENUM ('IN', 'OUT', 'IN_OUT');

-- CreateTable
CREATE TABLE "Kata" (
    "id" SERIAL NOT NULL,
    "style" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "name_hiragana" TEXT,
    "name_kanji" TEXT,

    CONSTRAINT "Kata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Move" (
    "id" SERIAL NOT NULL,
    "kata_id" INTEGER NOT NULL,
    "move_number" INTEGER NOT NULL,
    "sequence" INTEGER NOT NULL,
    "timing" "MoveTiming" NOT NULL,
    "stance_id" INTEGER NOT NULL,
    "technique_id" INTEGER NOT NULL,
    "direction" "Direction" NOT NULL,
    "lead_foot" "LeadFoot" NOT NULL,
    "hip" "HipPosition" NOT NULL,
    "active_side" "ActiveSide" NOT NULL,
    "speed" "Speed" NOT NULL,
    "snap_thrust" "SnapThrust" NOT NULL,
    "level" "TechniqueLevel" NOT NULL,
    "interm_move" BOOLEAN NOT NULL,
    "kiai" BOOLEAN NOT NULL,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stance" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "name_hiragana" TEXT,
    "name_kanji" TEXT,

    CONSTRAINT "Stance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kata_style_name_key" ON "Kata"("style", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Move_kata_id_move_number_sequence_key" ON "Move"("kata_id", "move_number", "sequence");

-- CreateIndex
CREATE UNIQUE INDEX "Stance_name_key" ON "Stance"("name");

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_kata_id_fkey" FOREIGN KEY ("kata_id") REFERENCES "Kata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_stance_id_fkey" FOREIGN KEY ("stance_id") REFERENCES "Stance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_technique_id_fkey" FOREIGN KEY ("technique_id") REFERENCES "Technique"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
