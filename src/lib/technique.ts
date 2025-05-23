"use server"

import prisma from "./prisma";

export async function getTechniques() {
  return await prisma.technique.findMany()
}