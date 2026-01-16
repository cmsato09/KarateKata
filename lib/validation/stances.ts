/**
 * Validation functions for stance-related form data.
 *
 * Expected FormData fields:
 * - stance_name: string (required)
 * - name_hiragana: string (optional)
 * - name_kanji: string (optional)
 */

import { getRequiredStringField, getOptionalStringField } from "./helpers";

export interface ValidatedStanceData {
  name: string;
  name_hiragana: string | null;
  name_kanji: string | null;
}

export const STANCE_FORM_FIELDS = {
  NAME: "stance_name",
  HIRAGANA: "name_hiragana",
  KANJI: "name_kanji",
} as const;

export function validateStanceData(formData: FormData): ValidatedStanceData {
  const name = getRequiredStringField(
    formData,
    STANCE_FORM_FIELDS.NAME,
    "Stance name is required"
  );

  const name_hiragana = getOptionalStringField(
    formData,
    STANCE_FORM_FIELDS.HIRAGANA
  );
  const name_kanji = getOptionalStringField(formData, STANCE_FORM_FIELDS.KANJI);

  return {
    name,
    name_hiragana,
    name_kanji,
  };
}
