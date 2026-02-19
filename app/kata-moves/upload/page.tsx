import { getKatas } from "@/lib/actions/katas";
import { getStances } from "@/lib/actions/stances";
import { getTechniques } from "@/lib/actions/techniques";
import { KataMovesUploadForm } from "./upload-form";

export default async function UploadKataMovePage() {
  const [katas, stances, techniques] = await Promise.all([
    getKatas(),
    getStances(),
    getTechniques(),
  ]);

  return (
    <KataMovesUploadForm katas={katas} stances={stances} techniques={techniques} />
  )
}
