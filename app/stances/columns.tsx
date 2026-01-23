"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Stance } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";

export const createColumns = (
  onEdit: (stance: Stance) => void,
  onDelete: (stance: Stance) => void,
): ColumnDef<Stance>[] => [
  {
    accessorKey: "name",
    header: "Name",
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
      const stance = row.original;
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(stance)}>
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(stance)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
