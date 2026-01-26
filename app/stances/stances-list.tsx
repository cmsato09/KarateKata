"use client";

import { useState } from "react";
import { Stance } from "@/app/generated/prisma/client";
import { DataTable } from "@/components/data-table";
import { createColumns } from "./columns";
import { StanceForm } from "./stance-form";

interface StancesListProps {
  stances: Stance[];
}

export function StancesList({ stances }: StancesListProps) {
  const [selectedStance, setSelectedStance] = useState<Stance | null>(null);

  const handleEdit = (stance: Stance) => {
    setSelectedStance(stance);
  };

  const handleCancel = () => {
    setSelectedStance(null);
  };

  const columns = createColumns(handleEdit, () => {});

  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8">Stances</h1>
      <div className="w-full max-w-4xl px-4">
        <StanceForm stance={selectedStance} onCancel={handleCancel} />
      </div>
      <div className="w-full max-w-4xl px-4">
        <DataTable columns={columns} data={stances} />
      </div>
    </div>
  );
}
