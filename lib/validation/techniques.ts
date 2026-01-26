import { TechniqueType } from "../../app/generated/prisma/client";

export interface ValidatedTechniqueData {
  name: string;
  type: TechniqueType;
  name_hiragana: string | null;
  name_kanji: string | null;
  description: string | null;
}

export function validateTechniqueData(formData: FormData): ValidatedTechniqueData {
  const nameValue = formData.get("tech_name");
  if (!nameValue || typeof nameValue !== "string" || nameValue.trim() === "") {
    throw new Error("Technique name is required");
  }
  const name = nameValue.trim().toLowerCase();

  const typeValue = formData.get("tech_type");
  if (!typeValue || typeof typeValue !== "string" || typeValue.trim() === "") {
    throw new Error("Technique type is required");
  }
  if (!Object.values(TechniqueType).includes(typeValue as TechniqueType)) {
    throw new Error(
      `Invalid technique type. Must be one of: ${Object.values(TechniqueType).join(", ")}`
    );
  }
  const type = typeValue as TechniqueType;

  // Validate optional fields - ensure they're strings, not File objects
  const hiraganaValue = formData.get("name_hiragana");
  const name_hiragana =
    hiraganaValue && typeof hiraganaValue === "string" && hiraganaValue.trim()
      ? hiraganaValue.trim()
      : null;

  const kanjiValue = formData.get("name_kanji");
  const name_kanji =
    kanjiValue && typeof kanjiValue === "string" && kanjiValue.trim()
      ? kanjiValue.trim()
      : null;

  const descriptionValue = formData.get("tech_description");
  const description =
    descriptionValue && typeof descriptionValue === "string" && descriptionValue.trim()
      ? descriptionValue.trim()
      : null;

  return {
    name,
    type,
    name_hiragana,
    name_kanji,
    description,
  };
}