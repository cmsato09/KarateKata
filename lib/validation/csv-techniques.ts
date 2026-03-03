import { TechniqueType } from "@/app/generated/prisma/enums";
import type { ValidatedTechniqueData } from "./techniques";

export interface TechniqueCsvRow {
  name: string;
  type: string;
  name_hiragana?: string;
  name_kanji?: string;
  description?: string;
}

export type ValidatedTechniqueRow =
  | {
      rowNumber: number;
      data: ValidatedTechniqueData;
      isValid: true;
      errors: [];
    }
  | {
      rowNumber: number;
      data: null;
      isValid: false;
      errors: string[];
    };

const MAX_TECHNIQUE_NAME_LENGTH = 30;

export function validateTechniqueCSVRow(
  rowData: TechniqueCsvRow,
  rowNumber: number,
): ValidatedTechniqueRow {
  const errors: string[] = [];

  const name = rowData.name?.trim();
  if (!name) {
    errors.push("Technique name is required");
  } else if (name.length > MAX_TECHNIQUE_NAME_LENGTH) {
    errors.push(
      `Technique name must be ${MAX_TECHNIQUE_NAME_LENGTH} characters or less`,
    );
  }
  const type = rowData.type?.trim();
  if (!type) {
    errors.push("Technique type is required");
  } else if (!Object.values(TechniqueType).includes(type as TechniqueType)) {
    errors.push(
      `Technique type must be one of: ${Object.values(TechniqueType).join(", ")}`,
    );
  }

  const name_hiragana = rowData.name_hiragana?.trim() || null;
  if (name_hiragana && name_hiragana.length > MAX_TECHNIQUE_NAME_LENGTH) {
    errors.push(
      `Hiragana name must be ${MAX_TECHNIQUE_NAME_LENGTH} characters or less`,
    );
  }
  const name_kanji = rowData.name_kanji?.trim() || null;
  if (name_kanji && name_kanji.length > MAX_TECHNIQUE_NAME_LENGTH) {
    errors.push(
      `Kanji name must be ${MAX_TECHNIQUE_NAME_LENGTH} characters or less`,
    );
  }
  const description = rowData.description?.trim() || null;

  if (errors.length > 0) {
    return {
      rowNumber,
      data: null,
      isValid: false,
      errors,
    };
  }

  const data: ValidatedTechniqueData = {
    name: name!,
    type: type!.toUpperCase() as TechniqueType,
    name_hiragana,
    name_kanji,
    description,
  };

  return {
    rowNumber,
    data,
    isValid: true,
    errors: [],
  };
}

export function validateTechniqueCSV(rows: TechniqueCsvRow[]) {
  const results = rows.map((row, index) =>
    validateTechniqueCSVRow(row, index + 1),
  );

  const validRows: (ValidatedTechniqueRow & { isValid: true })[] = [];
  const invalidRows: (ValidatedTechniqueRow & { isValid: false })[] = [];

  results.forEach((result) => {
    if (result.isValid) {
      validRows.push(result);
    } else {
      invalidRows.push(result);
    }
  });

  return {
    results,
    validRows,
    invalidRows,
    summary: {
      total: rows.length,
      valid: validRows.length,
      invalid: invalidRows.length,
    },
  };
}
