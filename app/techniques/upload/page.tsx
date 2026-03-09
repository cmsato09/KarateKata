import { TechniqueUploadForm } from "./csv-upload-form";

export default function TechniqueUploadCSVPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Upload Technique CSV File</h1>
      <div className="text-sm text-muted-foreground">
        <p>Expected CSV format (hiragana, kanji, and description are optional):</p>
        <pre className="text-xs bg-muted p-2 rounded mt-1">
          {`technique name,type,hiragana,kanji,description\nGedanbarai,BLOCK,げだんばらい,下段払い,A downward sweeping block`}
        </pre>
      </div>
      <TechniqueUploadForm />
    </div>
  );
}
