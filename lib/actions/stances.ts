"use server";

import prisma from "../prisma";
import { validateStanceData } from "../validation/stances";

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
