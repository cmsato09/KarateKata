import { TechniqueUploadForm } from "./csv-upload-form";

export default function TechniqueUploadCSVPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Upload Technique CSV File</h1>
      <TechniqueUploadForm />
    </div>
  );
}
