"use server";

import prisma from "../prisma";

export async function getStances() {
  try {
    return await prisma.stance.findMany({
      orderBy: { id: 'asc' }
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to load stance data");
  }
}
