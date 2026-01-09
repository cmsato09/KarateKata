"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { validateTechniqueData } from "./validation";
import type { Technique } from "../app/generated/prisma/client";

export async function getTechniques() {
  try {
    return await prisma.technique.findMany({
      orderBy: { id: 'asc' }
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to load technique data");
  }
}

export async function createTechnique(formData: FormData) {
  try {
    const validatedData = validateTechniqueData(formData);

    const existingTechnique = await prisma.technique.findUnique({
      where: {
        name: validatedData.name,
      },
    })

    if (existingTechnique) {
      throw new Error(`Technique "${validatedData.name}" already exists`);
    }

    const technique = await prisma.technique.create({
      data: validatedData,
    });

    return technique;
  } catch (error) {
    console.error("Database error", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      "Could not create new technique. Check inputs and try again."
    );
  }
}

// Form-specific wrapper action for useActionState
export async function createTechniqueAction(
  prevState: {
    success: boolean;
    error: string | null;
    technique: Technique | null;
    operation?: string;
  } | null,
  formData: FormData
) {
  try {
    const technique = await createTechnique(formData);
    revalidatePath("/techniques");
    return {
      success: true,
      error: null,
      technique,
      operation: 'create',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create technique",
      technique: null,
      operation: 'create',
    };
  }
}

export async function updateTechnique(id: number, formData: FormData) {
  try {
    const validatedData = validateTechniqueData(formData);

    // Check if the technique exists
    const existingTechnique = await prisma.technique.findUnique({
      where: { id },
    });

    if (!existingTechnique) {
      throw new Error(`Technique with ID "${id}" not found`);
    }

    // Check if updating the name would create a conflict with another technique
    if (validatedData.name !== existingTechnique.name) {
      const nameConflict = await prisma.technique.findUnique({
        where: { name: validatedData.name },
      });

      if (nameConflict) {
        throw new Error(`Technique "${validatedData.name}" already exists`);
      }
    }

    const updatedTechnique = await prisma.technique.update({
      where: { id },
      data: validatedData,
    });

    return updatedTechnique;
  } catch (error) {
    console.error("Database error", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(
      "Could not update technique. Check inputs and try again."
    );
  }
}

// Form-specific wrapper action for useActionState
export async function updateTechniqueAction(
  prevState: {
    success: boolean;
    error: string | null;
    technique: Technique | null;
    operation?: string;
  } | null,
  formData: FormData
) {
  try {
    const idValue = formData.get("id");

    if (!idValue || typeof idValue !== "string") {
      throw new Error("Technique ID is required");
    }

    const id = parseInt(idValue, 10);

    if (isNaN(id)) {
      throw new Error("Invalid technique ID");
    }

    const technique = await updateTechnique(id, formData);
    revalidatePath("/techniques");
    return {
      success: true,
      error: null,
      technique,
      operation: 'update',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update technique",
      technique: null,
      operation: 'update',
    };
  }
}