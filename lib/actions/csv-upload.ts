"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import type { ValidatedStanceData } from "@/lib/validation/stances";

interface ImportResult {
  success: boolean;
  error: string | null;
  createdCount: number;
  skippedCount: number;
}

export async function importStancesAction(
  validStances: ValidatedStanceData[],
): Promise<ImportResult> {
  try {
    const names = validStances.map((s) => s.name);
    const existingStances = await prisma.stance.findMany({
      where: { name: { in: names } },
      select: { name: true },
    });

    if (existingStances.length > 0) {
      const duplicateNames = existingStances.map((s) => s.name).join(", ");
      return {
        success: false,
        error: `Stances with the following names already exist: ${duplicateNames}`,
        createdCount: 0,
        skippedCount: existingStances.length,
      };
    }

    const createdStances = await prisma.$transaction(
      validStances.map((stance) =>
        prisma.stance.create({
          data: {
            name: stance.name,
            name_hiragana: stance.name_hiragana,
            name_kanji: stance.name_kanji,
          },
        }),
      ),
    );

    revalidatePath("/stances");

    return {
      success: true,
      error: null,
      createdCount: createdStances.length,
      skippedCount: 0,
    };
  } catch (error) {
    console.error("Error importing stances:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to import stances",
      createdCount: 0,
      skippedCount: 0,
    };
  }
}
