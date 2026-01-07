"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Technique } from "../generated/prisma/client";
import { Button } from "@/components/ui/button";

export const createColumns = (
  onEdit: (technique: Technique) => void
): ColumnDef<Technique>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "name_hiragana",
    header: "Hiragana",
  },
  {
    accessorKey: "name_kanji",
    header: "Kanji",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const technique = row.original;
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(technique)}
        >
          Edit
        </Button>
      );
    },
  },
];