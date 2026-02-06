"use client";

import { useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StanceCsvRow {
  name: string;
  hiragana: string;
  kanji: string;
}

export function StanceUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<StanceCsvRow[] | null>(null);
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
        setParsedData(results.data);
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

      {parsedData && parsedData.length > 0 && (
        <div className="mt-4">
          <p>Parsed {parsedData.length} rows!</p>
          <pre className="text-xs bg-muted p-2 rounded overflow-auto">
            {JSON.stringify(parsedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
