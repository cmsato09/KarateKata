"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import type { ValidatedMoveData } from "../validation/kata-moves";

export async function getKataMoves() {
  try {
    return await prisma.move.findMany({
      include: {
        kata: true,
        stance: true,
        technique: true,
      },
      orderBy: [
        { kata_id: "asc" },
        { move_number: "asc" },
        { sequence: "asc" },
      ],
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to load moveset data");
  }
}

interface ImportResult {
  success: boolean;
  error: string | null;
  createdCount: number;
  skippedCount: number;
}

export async function createMultipleMoves(
  kataId: number,
  moves: ValidatedMoveData[],
): Promise<ImportResult> {
  try {
    const existingMoves = await prisma.move.findMany({
      where: {
        kata_id: kataId,
        OR: moves.map((m) => ({
          move_number: m.move_number,
          sequence: m.sequence,
        })),
      },
      select: { move_number: true, sequence: true },
    });

    if (existingMoves.length > 0) {
      const duplicates = existingMoves
        .map((m) => `move ${m.move_number} seq ${m.sequence}`)
        .join(", ");
      return {
        success: false,
        error: `The following moves already exist for this kata: ${duplicates}`,
        createdCount: 0,
        skippedCount: existingMoves.length,
      };
    }

    const createdMoves = await prisma.$transaction(
      moves.map((move) =>
        prisma.move.create({
          data: {
            kata_id: kataId,
            move_number: move.move_number,
            sequence: move.sequence,
            timing: move.timing ?? undefined,
            stance_id: move.stance_id,
            technique_id: move.technique_id,
            direction: move.direction,
            lead_foot: move.lead_foot,
            hip: move.hip,
            active_side: move.active_side,
            speed: move.speed,
            snap_thrust: move.snap_thrust,
            level: move.level,
            breath: move.breath,
            interm_move: move.interm_move,
            kiai: move.kiai,
          },
        }),
      ),
    );

    revalidatePath("/kata-moves");

    return {
      success: true,
      error: null,
      createdCount: createdMoves.length,
      skippedCount: 0,
    };
  } catch (error) {
    console.error("Error importing moves:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to import moves",
      createdCount: 0,
      skippedCount: 0,
    };
  }
}
