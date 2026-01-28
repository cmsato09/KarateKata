"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import type { Technique } from "@/app/generated/prisma/client";
import { DataTable } from "@/components/data-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { deleteTechnique } from "@/lib/actions/techniques";
import { createColumns } from "./columns";
import { NewTechniqueForm } from "./new-technique-form";

interface TechniquesListProps {
  techniques: Technique[];
}

export function TechniquesList({ techniques }: TechniquesListProps) {
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [techniqueToDelete, setTechniqueToDelete] = useState<Technique | null>(null);
  const collapsibleRef = useRef<HTMLDivElement>(null);

  const handleEdit = (technique: Technique) => {
    setSelectedTechnique(technique);
    setIsOpen(true);
  };

  const handleDelete = (technique: Technique) => {
    setTechniqueToDelete(technique);
  };

  const confirmDelete = async () => {
    if (!techniqueToDelete) return;

    try {
      await deleteTechnique(techniqueToDelete.id);
      setTechniqueToDelete(null);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleCancel = useCallback(() => {
    setSelectedTechnique(null);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        collapsibleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [isOpen]);

  const columns = createColumns(handleEdit, handleDelete);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8">Techniques</h1>
      <div className="w-full max-w-4xl px-4">
        <div ref={collapsibleRef}>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
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
            <CollapsibleContent className="px-4">
              <NewTechniqueForm technique={selectedTechnique} onCancel={handleCancel} />
            </CollapsibleContent>
          </Collapsible>
        </div>
        <DataTable columns={columns} data={techniques} />
      </div>

      <AlertDialog open={!!techniqueToDelete} onOpenChange={(open) => !open && setTechniqueToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the technique &quot;{techniqueToDelete?.name}&quot;. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
