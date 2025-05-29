import { getTechniques } from "@/lib/technique";
import { DataTable } from "@/components/DataTable";
import { columns } from "./TechniqueTableColumns";

export default async function TechniqueList() {
  const techniques = await getTechniques();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8">Techniques</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Japanese</th>
          </tr>
        </thead>
        <tbody>
          {techniques.map((technique) => (
            <tr key={technique.id}>
              <td>{technique.name}</td>
              <td>{technique.type}</td>
              <td>{technique.name_kanji} -- {technique.name_hiragana}</td>
            </tr>
          ))}
          
        </tbody>
      </table>
      <DataTable columns={columns} data={techniques}/>

    </div>
  );
}
