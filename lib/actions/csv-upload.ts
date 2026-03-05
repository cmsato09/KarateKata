"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import type { ValidatedKataData } from "@/lib/validation/katas";
import type { ValidatedStanceData } from "@/lib/validation/stances";
import type { ValidatedTechniqueData } from "@/lib/validation/techniques";

interface ImportResult {
  success: boolean;
  error: string | null;
  createdCount: number;
  skippedCount: number;
}

export async function importKatasAction(
  validKatas: ValidatedKataData[],
): Promise<ImportResult> {
  try {
    const existingKatas = await prisma.kata.findMany({
      where: {
        OR: validKatas.map((k) => ({
          style: k.style,
          name: k.name,
        })),
      },
      select: { style: true, name: true },
    });

    if (existingKatas.length > 0) {
      const duplicateNames = existingKatas
        .map((k) => `${k.style} - ${k.name}`)
        .join(", ");
      return {
        success: false,
        error: `Katas with the following names already exist: ${duplicateNames}`,
        createdCount: 0,
        skippedCount: existingKatas.length,
      };
    }

    const createdKatas = await prisma.$transaction(
      validKatas.map((kata) =>
        prisma.kata.create({
          data: {
            style: kata.style,
            name: kata.name,
            series: kata.series,
            name_hiragana: kata.name_hiragana,
            name_kanji: kata.name_kanji,
          },
        }),
      ),
    );

    revalidatePath("/katas");
    revalidatePath("/kata-moves/upload");

    return {
      success: true,
      error: null,
      createdCount: createdKatas.length,
      skippedCount: 0,
    };
  } catch (error) {
    console.error("Error importing katas:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to import katas",
      createdCount: 0,
      skippedCount: 0,
    };
  }
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
    revalidatePath("/kata-moves/upload");

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

export async function importTechniquesAction(
  validTechniques: ValidatedTechniqueData[],
): Promise<ImportResult> {
  try {
    const names = validTechniques.map((t) => t.name);
    const existingTechniques = await prisma.technique.findMany({
      where: { name: { in: names } },
      select: { name: true },
    });

    if (existingTechniques.length > 0) {
      const duplicateNames = existingTechniques.map((s) => s.name).join(", ");
      return {
        success: false,
        error: `Techniques with the following names already exist: ${duplicateNames}`,
        createdCount: 0,
        skippedCount: existingTechniques.length,
      };
    }

    const createdTechniques = await prisma.$transaction(
      validTechniques.map((technique) =>
        prisma.technique.create({
          data: {
            name: technique.name,
            type: technique.type,
            name_hiragana: technique.name_hiragana,
            name_kanji: technique.name_kanji,
            description: technique.description,
          },
        }),
      ),
    );

    revalidatePath("/techniques");
    revalidatePath("/kata-moves/upload");
    
    return {
      success: true,
      error: null,
      createdCount: createdTechniques.length,
      skippedCount: 0,
    };
  } catch (error) {
    console.error("Error importing techniques:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to import techniques",
      createdCount: 0,
      skippedCount: 0,
    };
  }
}
