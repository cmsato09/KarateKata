"use server";

import prisma from "./prisma";

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
    const technique = await prisma.technique.create({
      data: {
        name: formData.get("tech_name") as string,
        type: formData.get("tech_type") as string,
        name_hiragana: formData.get("name_hiragana") as string,
        name_kanji: formData.get("name_kanji") as string,
        description: formData.get("tech_description") as string,
      },
    });

    return technique;
  } catch (error) {
    console.error("Database error", error);
    throw new Error(
      "Could not create new technique. Check inputs and try again."
    );
  }
}
