"user server"

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
    throw new Error("Failed to load stance data");
  }
}
