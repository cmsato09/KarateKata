import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getTechniques } from "../../lib/techniques";
import { NewTechniqueForm } from "./new-technique-form";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export default async function TechniqueList() {
  const techniques = await getTechniques();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8">Techniques</h1>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between gap-4 px-4">
            <div className="text-sm font-semibold">
              Technique Creation Form
            </div>
            <Button variant="ghost" size="icon" className="size-8">
              <ChevronDown />
              <span className="sr-only">Toggle</span>
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <NewTechniqueForm />
        </CollapsibleContent>
      </Collapsible>
      <DataTable columns={columns} data={techniques}/>

    </div>
  );
}
