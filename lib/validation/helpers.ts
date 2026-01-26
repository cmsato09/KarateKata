/**
 * Validation helpers for FormData inputs.
 */

export function getRequiredStringField(
  formData: FormData,
  fieldName: string,
  errorMessage?: string
): string {
  const value = formData.get(fieldName);
  if (!value || typeof value !== "string" || value.trim() === "") {
    throw new Error(errorMessage || `${fieldName} is required`);
  }
  return value.trim();
}

export function getOptionalStringField(
  formData: FormData,
  fieldName: string
): string | null {
  const value = formData.get(fieldName);
  if (!value || typeof value !== "string" || value.trim() === "") {
    return null;
  }
  return value.trim();
}
