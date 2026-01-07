"use client";

import { useState } from "react";
import { Technique } from "../generated/prisma/client";
import { createColumns } from "./columns";
import { DataTable } from "./data-table";
import { NewTechniqueForm } from "./new-technique-form";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface TechniquesListProps {
  techniques: Technique[];
}

export function TechniquesList({ techniques }: TechniquesListProps) {
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);

  const handleEdit = (technique: Technique) => {
    setSelectedTechnique(technique);
  };

  const handleCancel = () => {
    setSelectedTechnique(null);
  };

  const columns = createColumns(handleEdit);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8">Techniques</h1>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between gap-4 px-4">
            <div className="text-sm font-semibold">
              {selectedTechnique ? "Edit Technique" : "Technique Creation Form"}
            </div>
            <Button variant="ghost" size="icon" className="size-8">
              <ChevronDown />
              <span className="sr-only">Toggle</span>
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <NewTechniqueForm technique={selectedTechnique} onCancel={handleCancel} />
        </CollapsibleContent>
      </Collapsible>
      <DataTable columns={columns} data={techniques} />
    </div>
  );
}
