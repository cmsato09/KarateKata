"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { validateTechniqueData } from "./validation";

export async function getTechniques() {
  try {
    return await prisma.technique.findMany();
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
    technique: any;
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
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create technique",
      technique: null,
    };
  }
}
