import { PrismaClient, Prisma } from "../src/generated/prisma";

const prisma = new PrismaClient();

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

async function main() {
  try {
    console.log('Start seeding...')
    for (const technique of techniqueData) {
      const result = await prisma.technique.create({
        data: technique 
      })
      console.log(`Created technique: ${result.name}`)
    }
  } catch (error) {
    console.error('Error during seeding:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect();
  }

}

main();
