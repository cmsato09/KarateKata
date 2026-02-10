"use server";

import prisma from "@/lib/prisma";

export async function getMovesets() {
  try {
    return await prisma.move.findMany({
      include: {
        kata: true,
        stance: true,
        technique: true,
      },
      orderBy: [
        { kata_id: "asc" },
        { move_number: "asc" },
        { sequence: "asc" },
      ],
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to load moveset data");
  }
}
