"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Kata } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";

export const createColumns = (
  onEdit: (kata: Kata) => void,
  onDelete: (kata: Kata) => void,
): ColumnDef<Kata>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "series",
    header: "Series",
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const kata = row.original;
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(kata)}>
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(kata)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
