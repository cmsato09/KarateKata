import { KataUploadForm } from "./upload-form";

export default function KataUploadPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Upload Kata CSV</h1>
      <KataUploadForm />
    </div>
  );
}
