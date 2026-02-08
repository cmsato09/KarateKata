import { StanceUploadForm } from "./upload-form";

export default function StanceUploadPage() {
  return (
    <div className="container mx-auto space-y-6 py-8">
      <div>
        <h1 className="text-3xl font-bold">Import Stances</h1>
        <p className="text-muted-foreground">
          Upload a CSV file to bulk import stances
        </p>
      </div>
      <StanceUploadForm />
    </div>
  );
}
