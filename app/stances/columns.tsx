"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Stance } from "../generated/prisma/client";

export const columns: ColumnDef<Stance>[] = [
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
];
