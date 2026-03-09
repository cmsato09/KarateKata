import { KataUploadForm } from "./csv-upload-form";

export default function KataUploadPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Upload Kata CSV File</h1>
      <div className="text-sm text-muted-foreground">
        <p>Expected CSV format (hiragana and kanji are optional):</p>
        <pre className="text-xs bg-muted p-2 rounded mt-1">
          {`kata name,style,series,hiragana,kanji\nHeian Shodan,Shotokan,Heian,へいあんしょだん,平安初段`}
        </pre>
      </div>
      <KataUploadForm />
    </div>
  );
}
