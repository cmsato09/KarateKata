import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const techniqueData: Prisma.TechniqueCreateInput[] = [
  {
    name: "Ageuke",
    type: "BLOCK",
    name_hiragana: "あげうけ",
    name_kanji: "上げ受け",
  },
  {
    name: "Gedanbarai",
    type: "BLOCK",
    name_hiragana: "げだんばらい",
    name_kanji: "下段払い",
    description: "Lower level sweep"
  },
  {
    name: "Uchiuke",
    type: "BLOCK",
    name_hiragana: "うちうけ",
    name_kanji: "内受け",
    description: "Inside block"
  },
  {
    name: "Sotouke",
    type: "BLOCK",
    name_hiragana: "そとうけ",
    name_kanji: "外受け",
  }
]


export async function main() {
  for (const technique of techniqueData) {
    await prisma.technique.create({ data: technique });
  }
}

main();
