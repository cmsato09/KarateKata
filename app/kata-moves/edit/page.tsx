import { getKatas } from "@/lib/actions/katas";
import { getStances } from "@/lib/actions/stances";
import { getTechniques } from "@/lib/actions/techniques";
import { EditKataMovesClient } from "./edit-kata-moves-client";

export default async function EditKataMovesPage() {
  const [katas, stances, techniques] = await Promise.all([
    getKatas(),
    getStances(),
    getTechniques(),
  ]);

  return (
    <div className="container mx-auto py-10">
    <h1 className="text-3xl font-bold mb-6">Edit Kata Moves</h1>
    <EditKataMovesClient
        katas={katas}
        stances={stances}
        techniques={techniques}
    />
    </div>
  );
}
