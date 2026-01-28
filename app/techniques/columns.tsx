"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Technique } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";

export const createColumns = (
  onEdit: (technique: Technique) => void,
  onDelete: (technique: Technique) => void
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
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(technique)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(technique)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];