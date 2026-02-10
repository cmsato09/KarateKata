"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Prisma } from '@/app/generated/prisma/client';

export type MoveWithRelations = Prisma.MoveGetPayload<{
  include: {
    kata: true;
    stance: true;
    technique: true;
  };
}>;

export const columns: ColumnDef<MoveWithRelations>[] = [
  {
    accessorKey: "kata.name",
    header: "Kata",
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
    accessorKey: "kiai",
    header: "Kiai",
    cell: ({ row }) => (row.original.kiai ? "Yes" : "No"),
  },
];
