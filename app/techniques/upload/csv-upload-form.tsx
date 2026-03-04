"use client";

import { useState } from "react";
import Papa from "papaparse";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { importTechniquesAction } from "@/lib/actions/csv-upload";
import {
  validateTechniqueCSV,
  type TechniqueCsvRow,
  type ValidatedTechniqueRow,
} from "@/lib/validation/csv-techniques";

export function TechniqueUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [validatedParsedRows, setValidatedParsedRows] = useState<
    ValidatedTechniqueRow[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  }

  function handleParseFile() {
    if (!file) return;

    Papa.parse<TechniqueCsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase(),
      transform: (value) => value.trim(),
      complete: (results) => {
        console.log("Parsed CSV data:", results.data);
        const expectedHeaders = [
          "technique name",
          "type",
          "hiragana",
          "kanji",
          "description",
        ];
        const actualHeaders =
          results.meta.fields?.map((h) => h.trim().toLowerCase()) || [];

        if (JSON.stringify(actualHeaders) !== JSON.stringify(expectedHeaders)) {
          setError(
            `Invalid CSV headers. Expected: ${expectedHeaders.join(", ")}`,
          );
          return;
        }

        const { results: validatedData } = validateTechniqueCSV(results.data);

        setValidatedParsedRows(validatedData);
        setError(null);
      },
      error: (error) => {
        setError(`Failed to parse: ${error.message}`);
      },
    });
  }

  async function handleImport() {
    const validRows = validatedParsedRows.filter((row) => row.isValid);

    if (validRows.length === 0) {
      toast.error("No valid rows to import");
      return;
    }

    setIsImporting(true);

    const validKatas = validRows.map((row) => row.data);
    const result = await importTechniquesAction(validKatas);

    setIsImporting(false);
    if (result.success) {
      toast.success(`Successfully imported ${result.createdCount} katas`);
      setValidatedParsedRows([]);
      setFile(null);
    } else {
      toast.error(`Import failed: ${result.error}`);
    }
  }

  const validCount = validatedParsedRows.filter((row) => row.isValid).length;
  const invalidCount = validatedParsedRows.length - validCount;

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        <p>Expected CSV format (hiragana, kanji, and description are optional):</p>
        <pre className="text-xs bg-muted p-2 rounded mt-1">
          {`technique name,type,hiragana,kanji,description\nGedanbarai,Block,げだんばらい,下段払い,A downward sweeping block`}
        </pre>
      </div>
      <Input
        type="file"
        name="technique_csv"
        accept=".csv"
        onChange={handleFileChange}
        className="mt-4"
      />
      <Button onClick={handleParseFile} disabled={!file} className="mt-2">
        Parse CSV
      </Button>
      {error && <div className="text-sm text-destructive">{error}</div>}

      {validatedParsedRows.length > 0 && validCount > 0 && (
        <Button onClick={handleImport} disabled={isImporting}>
          {isImporting ? "Importing..." : `Import ${validCount} Techniques`}
        </Button>
      )}

      {validatedParsedRows.length > 0 && (
        <div className="mt-4 space-y-4">
          <p>
            Parsed {validatedParsedRows.length} rows: {validCount} valid,{" "}
            {invalidCount} invalid
          </p>
          <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-96">
            {JSON.stringify(validatedParsedRows, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
