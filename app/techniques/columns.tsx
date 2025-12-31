"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Technique } from "../generated/prisma/client";

export const columns: ColumnDef<Technique>[] = [
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
];