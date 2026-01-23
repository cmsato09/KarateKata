"use client";

import { DataTable } from "@/components/data-table";
import { Stance } from "../generated/prisma/client";
import { createColumns } from "./columns";
import { StanceForm } from "./stance-form";

interface StancesListProps {
  stances: Stance[];
}

export function StancesList({ stances }: StancesListProps) {

  const columns = createColumns(() => {}, () => {});
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8">Stances</h1>
      <div className="w-full max-w-4xl px-4">
        <StanceForm />
      </div>
      <div className="w-full max-w-4xl px-4">
        <DataTable columns={columns} data={stances} />
      </div>
    </div>
  );
}