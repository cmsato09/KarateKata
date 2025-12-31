"use server";

import prisma from "./prisma";
import { TechniqueType } from "../app/generated/prisma/client";

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
    const name = formData.get("tech_name");
    if (!name || typeof name !== "string" || name.trim() === "") {
      throw new Error("Technique name is required")
    }

    const normalizedName = name.trim().toLocaleLowerCase()

    const existingTechnique = await prisma.technique.findUnique({
      where: {
        name: normalizedName,
      },
    })

    if (existingTechnique) {
      throw new Error(`Technique "${normalizedName}" already exists`);
    }

    const technique = await prisma.technique.create({
      data: {
        name: normalizedName,
        type: formData.get("tech_type") as TechniqueType,
        name_hiragana: formData.get("name_hiragana") as string || null,
        name_kanji: formData.get("name_kanji") as string || null,
        description: formData.get("tech_description") as string || null,
      },
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
