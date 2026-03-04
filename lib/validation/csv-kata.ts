import type { ValidatedKataData } from "./katas";

export interface KataCsvRow {
  "kata name": string;
  style: string;
  series: string;
  hiragana?: string;
  kanji?: string;
}

export type ValidatedKataRow =
  | {
      rowNumber: number;
      data: ValidatedKataData;
      isValid: true;
      errors: [];
    }
  | {
      rowNumber: number;
      data: null;
      isValid: false;
      errors: string[];
    };

const MAX_KATA_LENGTH = 20;

export function validateKataCSVRow(
  rowData: KataCsvRow,
  rowNumber: number,
): ValidatedKataRow {
  const errors: string[] = [];

  const name = rowData["kata name"]?.trim();
  if (!name) {
    errors.push("Kata name is required");
  } else if (name.length > MAX_KATA_LENGTH) {
    errors.push(`Kata name must be ${MAX_KATA_LENGTH} characters or less`);
  }
  const style = rowData.style?.trim();
  if (!style) {
    errors.push("Karate style name is required");
  }
  const series = rowData.series?.trim();
  if (!series) {
    errors.push("Kata series name is required");
  } else if (series.length > MAX_KATA_LENGTH) {
    errors.push(
      `Kata series name must be ${MAX_KATA_LENGTH} characters or less`,
    );
  }

  const name_hiragana = rowData.hiragana?.trim() || null;
  if (name_hiragana && name_hiragana.length > MAX_KATA_LENGTH) {
    errors.push(`Hiragana name must be ${MAX_KATA_LENGTH} characters or less`);
  }
  const name_kanji = rowData.kanji?.trim() || null;
  if (name_kanji && name_kanji.length > MAX_KATA_LENGTH) {
    errors.push(`Kanji name must be ${MAX_KATA_LENGTH} characters or less`);
  }

  if (errors.length > 0) {
    return {
      rowNumber,
      isValid: false,
      data: null,
      errors,
    };
  }

  const data: ValidatedKataData = {
    name: name!,
    style: style!,
    series: series!,
    name_hiragana,
    name_kanji,
  };

  return {
    rowNumber,
    data,
    isValid: true,
    errors: [],
  };
}

export function validateKataCSV(rows: KataCsvRow[]) {
  const results = rows.map((row, index) => validateKataCSVRow(row, index + 1));

  const validRows: (ValidatedKataRow & { isValid: true })[] = [];
  const invalidRows: (ValidatedKataRow & { isValid: false })[] = [];

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
