"use server"

import prisma from "./prisma";

export async function getTechniques() {
  try {
    return await prisma.technique.findMany()
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to load technique data");
  }
}
