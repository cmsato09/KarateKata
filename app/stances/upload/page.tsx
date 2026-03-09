import { StanceUploadForm } from "./csv-upload-form";

export default function StanceUploadPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Upload Stance CSV File</h1>
      <div className="text-sm text-muted-foreground">
        <p>Expected CSV format (hiragana and kanji are optional):</p>
        <pre className="text-xs bg-muted p-2 rounded mt-1">
          {`stance name,hiragana,kanji\nFront stance,ぜんくつだち,前屈立ち`}
        </pre>
      </div>
      <StanceUploadForm />
    </div>
  );
}
