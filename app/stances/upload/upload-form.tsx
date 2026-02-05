"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function StanceUploadForm() {
  const [file, setFile] = useState<File | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  }

  return (
    <div className="space-y-4">
      <h2>Upload Stance CSV file</h2>
      <Input type="file" accept=".csv" onChange={handleFileChange} />
      <Button disabled={!file}>
        Parse CSV file
      </Button>
    </div>
  );
}