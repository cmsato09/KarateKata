"use server"

import { revalidatePath } from "next/cache";
import type { Kata } from "@/app/generated/prisma/browser";
import prisma from "@/lib/prisma";
import { validateKataData } from "@/lib/validation/katas";

export async function getKatas() {
  try {
    return await prisma.kata.findMany({
      orderBy: { id: "asc" },
    })
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to load kata data");
  }
}

export async function createKata(formData: FormData) {
  try {
    const validatedKataData = validateKataData(formData);

    const existingKata = await prisma.kata.findUnique({
      where: {
        style_name: {
          style: validatedKataData.style,
          name: validatedKataData.name,
        },
      },
    });
    if (existingKata) {
      throw new Error(`Kata "${validatedKataData.name}" already exists`);
    }

    const kata = await prisma.kata.create({
      data: validatedKataData,
    });

    return kata;
  } catch (error) {
    console.error("Database error", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Could not create new kata. Check inputs and try again.");
  }
}

export async function createKataAction(
  prevState: {
    success: boolean;
    error: string | null;
    kata: Kata | null;
    operation?: string;
  } | null,
  formData: FormData,
) {
  try {
    const kata = await createKata(formData);
    revalidatePath("/katas");
    return {
      success: true,
      error: null,
      kata,
      operation: "create",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message: "Failed to create kata",
      kata: null,
      operation: "create",
    };
  }

}
