"use client";

import {
  ColumnDef,
} from "@tanstack/react-table"


export type Technique = {
  id: number
  name: string
  type: string
  name_hiragana: string | null
  name_kanji: string | null
  description: string | null
}

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

