"use client";

import { useState } from "react";
import { Stance } from "@/app/generated/prisma/client";
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
import { deleteStance } from "@/lib/actions/stances";
import { createColumns } from "./columns";
import { StanceForm } from "./stance-form";

interface StancesListProps {
  stances: Stance[];
}

export function StancesList({ stances }: StancesListProps) {
  const [selectedStance, setSelectedStance] = useState<Stance | null>(null);
  const [stanceToDelete, setStanceToDelete] = useState<Stance | null>(null);

  const handleEdit = (stance: Stance) => {
    setSelectedStance(stance);
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

  const handleCancel = () => {
    setSelectedStance(null);
  };

  const columns = createColumns(handleEdit, handleDelete);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8">Stances</h1>
      <div className="w-full max-w-4xl px-4">
        <StanceForm stance={selectedStance} onCancel={handleCancel} />
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
