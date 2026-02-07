import type { ValidatedStanceData } from "./stances";

export interface StanceCsvRow {
  "stance name": string;
  hiragana: string;
  kanji: string;
}

export interface ValidatedRow {
  data: ValidatedStanceData;
  rowNumber: number;
  isValid: boolean;
  errors: string[];
}

export function validateStanceCSVRow(
  row: StanceCsvRow,
  rowNumber: number,
): ValidatedRow {
  const errors: string[] = [];
  const name = row["stance name"]?.trim() || "";
  if (!name) {
    errors.push("Name is required");
  }
  const name_hiragana = row.hiragana?.trim() || null;
  const name_kanji = row.kanji?.trim() || null;

  return {
    data: { name, name_hiragana, name_kanji },
    rowNumber,
    isValid: errors.length === 0,
    errors,
  };
}
