"use client";

import { useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  validateStanceCSVRow,
  type StanceCsvRow,
  type ValidatedRow,
} from "@/lib/validation/csv-stances";

export function StanceUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [validatedParsedRows, setValidatedParsedRows] = useState<ValidatedRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  }

  function handleParseFile() {
    if (!file) return;

    Papa.parse<StanceCsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase(),
      transform: (value) => value.trim(),
      complete: (results) => {
        console.log("Parsed CSV data:", results.data);
        const expectedHeaders = ["stance name", "hiragana", "kanji"];
        const actualHeaders =
          results.meta.fields?.map((h) => h.trim().toLowerCase()) || [];
        if (JSON.stringify(actualHeaders) !== JSON.stringify(expectedHeaders)) {
          setError(
            `Invalid CSV headers. Expected: ${expectedHeaders.join(", ")}`,
          );
          return;
        }

        const validatedData = results.data.map((row, index) =>
          validateStanceCSVRow(row, index + 1),
        );
        setValidatedParsedRows(validatedData);
        setError(null);
      },
      error: (error) => {
        setError(`Failed to parse: ${error.message}`);
      },
    });
  }

  return (
    <div className="space-y-4">
      <h2>Upload Stance CSV file</h2>
      <Input type="file" accept=".csv" onChange={handleFileChange} />
      <Button onClick={handleParseFile} disabled={!file}>
        Parse CSV file
      </Button>

      {error && <div className="text-sm text-destructive">{error}</div>}

      {validatedParsedRows.length > 0 && (
        <div className="mt-4 space-y-4">
          <p>
            Parsed {validatedParsedRows.length} rows:{" "}
            {validatedParsedRows.filter((r) => r.isValid).length} valid,{" "}
            {validatedParsedRows.filter((r) => !r.isValid).length} invalid
          </p>
          <pre className="text-xs bg-muted p-2 rounded overflow-auto">
            {JSON.stringify(validatedParsedRows, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
