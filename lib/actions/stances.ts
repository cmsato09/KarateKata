"use server";

import { revalidatePath } from "next/cache";
import type { Stance } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import { validateStanceData } from "@/lib/validation/stances";

export async function getStances() {
  try {
    return await prisma.stance.findMany({
      orderBy: { id: "asc" },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to load stance data");
  }
}

export async function createStance(formData: FormData) {
  try {
    const validatedStanceData = validateStanceData(formData);

    const existingStance = await prisma.stance.findUnique({
      where: {
        name: validatedStanceData.name,
      },
    });

    if (existingStance) {
      throw new Error(`Stance "${validatedStanceData.name}" already exists`);
    }

    const stance = await prisma.stance.create({
      data: validatedStanceData,
    });

    return stance;
  } catch (error) {
    console.error("Database error", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Could not create new stance. Check inputs and try again.");
  }
}

export async function createStanceAction(
  prevState: {
    success: boolean;
    error: string | null;
    stance: Stance | null;
    operation?: string;
  } | null,
  formData: FormData
) {
  try {
    const stance = await createStance(formData);
    revalidatePath("/stances");
    return {
      success: true,
      error: null,
      stance,
      operation: "create",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create stance",
      stance: null,
      operation: "create",
    };
  }
}
