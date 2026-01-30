import { getRequiredStringField, getOptionalStringField } from "./helpers";

export interface ValidatedKataData {
  style: string;
  name: string;
  series: string;
  name_hiragana: string | null;
  name_kanji: string | null;
}

export const KATA_FORM_FIELDS = {
  STYLE: "kata_style",
  NAME: "kata_name",
  SERIES: "kata_series",
  HIRAGANA: "kata_name_hiragana",
  KANJI: "kata_name_kanji",
} as const;

export function validateKataData(formData: FormData): ValidatedKataData {
  const style = getRequiredStringField(
    formData,
    KATA_FORM_FIELDS.STYLE,
    "Karate style name is required"
  );

  const name = getRequiredStringField(
    formData,
    KATA_FORM_FIELDS.NAME,
    "Kata name is required"
  );

  const series = getRequiredStringField(
    formData,
    KATA_FORM_FIELDS.SERIES,
    "Kata series name is required"
  );

  const name_hiragana = getOptionalStringField(
    formData,
    KATA_FORM_FIELDS.HIRAGANA
  );

  const name_kanji = getOptionalStringField(
    formData,
    KATA_FORM_FIELDS.KANJI
  );

  return {
    style,
    name,
    series,
    name_hiragana,
    name_kanji,
  }
}