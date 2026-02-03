"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import type { Kata } from "@/app/generated/prisma/client";
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
import { deleteKata } from "@/lib/actions/katas";
import { createColumns } from "./columns";
import { KataForm } from "./kata-form";

interface KataListProps {
  katas: Kata[];
}

export function KataList({ katas }: KataListProps) {
  const [selectedKata, setSelectedKata] = useState<Kata | null>(null);
  const [kataToDelete, setKataToDelete] = useState<Kata | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const collapsibleRef = useRef<HTMLDivElement>(null);

  const handleEdit = (kata: Kata) => {
    setSelectedKata(kata);
    setIsOpen(true);
  };

  const handleDelete = (kata: Kata) => {
    setKataToDelete(kata);
  };

  const confirmDelete = async () => {
    if (!kataToDelete) return;

    try {
      await deleteKata(kataToDelete.id);
      setKataToDelete(null);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleCancel = useCallback(() => {
    setSelectedKata(null);
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
      <h1 className="text-4xl font-bold mb-8">Katas</h1>
      <div className="w-full max-w-4xl px-4">
        <div ref={collapsibleRef}>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between gap-4 px-4">
                <div className="text-sm font-semibold">
                  {selectedKata ? "Edit Kata" : "Kata Creation Form"}
                </div>
                <Button variant="ghost" size="icon" className="size-8">
                  <ChevronDown />
                  <span className="sr-only">Toggle</span>
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4">
              <KataForm kata={selectedKata} onCancel={handleCancel} />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      <div className="w-full max-w-4xl px-4">
        <DataTable columns={columns} data={katas} />
      </div>

      <AlertDialog
        open={!!kataToDelete}
        onOpenChange={(open) => !open && setKataToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the kata &quot;
              {kataToDelete?.name}&quot;{" "}
              <span className="font-semibold text-red-600 dark:text-red-400">
                and all associated movesets
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}