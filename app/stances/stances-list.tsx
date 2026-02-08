"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { Stance } from "@/app/generated/prisma/client";
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
import { deleteStance } from "@/lib/actions/stances";
import { createColumns } from "./columns";
import { StanceForm } from "./stance-form";

interface StancesListProps {
  stances: Stance[];
}

export function StancesList({ stances }: StancesListProps) {
  const [selectedStance, setSelectedStance] = useState<Stance | null>(null);
  const [stanceToDelete, setStanceToDelete] = useState<Stance | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const collapsibleRef = useRef<HTMLDivElement>(null);

  const handleEdit = (stance: Stance) => {
    setSelectedStance(stance);
    setIsOpen(true);
  };

  const handleDelete = (stance: Stance) => {
    setStanceToDelete(stance);
  };

  const confirmDelete = async () => {
    if (!stanceToDelete) return;

    try {
      await deleteStance(stanceToDelete.id);
      setStanceToDelete(null);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleCancel = useCallback(() => {
    setSelectedStance(null);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        collapsibleRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [isOpen]);

  const columns = createColumns(handleEdit, handleDelete);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Stances</h1>
      <div className="w-full max-w-4xl px-4">
        <div ref={collapsibleRef}>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between gap-4 px-4">
                <div className="text-sm font-semibold">
                  {selectedStance ? "Edit Stance" : "Stance Creation Form"}
                </div>
                <Button variant="ghost" size="icon" className="size-8">
                  <ChevronDown />
                  <span className="sr-only">Toggle</span>
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4">
              <div className="space-y-4">
                {!selectedStance && (
                  <div className="flex justify-end">
                    <Button asChild variant="link" size="sm">
                      <Link href="/stances/upload">
                        Batch upload multiple stances with CSV file
                      </Link>
                    </Button>
                  </div>
                )}
                <StanceForm stance={selectedStance} onCancel={handleCancel} />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      <div className="w-full max-w-4xl px-4">
        <DataTable columns={columns} data={stances} />
      </div>

      <AlertDialog
        open={!!stanceToDelete}
        onOpenChange={(open) => !open && setStanceToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the stance &quot;
              {stanceToDelete?.name}&quot;. This action cannot be undone.
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
