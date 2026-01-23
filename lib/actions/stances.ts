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
  formData: FormData,
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

export async function updateStance(id: number, formData: FormData) {
  try {
    const validatedStanceData = validateStanceData(formData);

    const existingStance = await prisma.stance.findUnique({
      where: { id },
    });

    if (!existingStance) {
      throw new Error(`Stance with ID ${id} does not exist`);
    }

    if (validatedStanceData.name !== existingStance.name) {
      const duplicateStance = await prisma.stance.findUnique({
        where: { name: validatedStanceData.name },
      });
      if (duplicateStance) {
        throw new Error(`Stance "${validatedStanceData.name}" already exists`);
      }
    }

    const updatedStance = await prisma.stance.update({
      where: { id },
      data: validatedStanceData,
    });

    return updatedStance;
  } catch (error) {
    console.error("Database error", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Could not update stance. Check inputs and try again.");
  }
}

export async function updateStanceAction(
  prevState: {
    success: boolean;
    error: string | null;
    stance: Stance | null;
    operation?: string;
  } | null,
  formData: FormData,
) {
  try {
    const idValue = formData.get("id");

    if (!idValue || typeof idValue !== "string") {
      throw new Error("Invalid or missing stance ID");
    }

    const id = parseInt(idValue, 10);

    if (isNaN(id)) {
      throw new Error("Invalid stance ID");
    }

    const stance = await updateStance(id, formData);
    revalidatePath("/stances");
    return {
      success: true,
      error: null,
      stance,
      operation: "update",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update stance",
      stance: null,
      operation: "update",
    };
  }
}
