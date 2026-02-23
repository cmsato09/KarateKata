"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoveWithRelations } from "../columns";

interface EditColumnsProps {
  onEdit: (move: MoveWithRelations) => void;
  onDelete: (move: MoveWithRelations) => void;
}

export function createEditColumns({
  onEdit,
  onDelete,
}: EditColumnsProps): ColumnDef<MoveWithRelations>[] {
  return [
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(row.original)}
          >
            Edit
          </Button>
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(row.original)}
            >
              Delete
            </Button>
          )}
        </div>
      ),
    },
    {
      accessorKey: "kata.name",
      header: "Kata Name",
    },
    {
      accessorKey: "move_number",
      header: "Move #",
    },
    {
      accessorKey: "sequence",
      header: "Seq",
    },
    {
      accessorKey: "timing",
      header: "Timing",
      cell: ({ row }) => row.original.timing ?? "-",
    },
    {
      accessorKey: "direction",
      header: "Direction",
    },
    {
      accessorKey: "stance.name",
      header: "Stance",
    },
    {
      accessorKey: "lead_foot",
      header: "Lead Foot",
    },
    {
      accessorKey: "hip",
      header: "Hip Position",
    },
    {
      accessorKey: "technique.type",
      header: "Tech Type",
    },
    {
      accessorKey: "technique.name",
      header: "Technique",
    },
    {
      accessorKey: "active_side",
      header: "Active Side",
    },
    {
      accessorKey: "speed",
      header: "Speed",
    },
    {
      accessorKey: "snap_thrust",
      header: "Snap/Thrust",
    },
    {
      accessorKey: "level",
      header: "Level",
    },
    {
      accessorKey: "breath",
      header: "Breath",
    },
    {
      accessorKey: "interm_move",
      header: "Interm Move",
      cell: ({ row }) => (row.original.interm_move ? "Yes" : "No"),
    },
    {
      accessorKey: "kiai",
      header: "Kiai",
      cell: ({ row }) => (row.original.kiai ? "Yes" : "No"),
    },
  ]
}