"use client";

import Link from "next/link";
import { Show } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import type { MoveWithRelations } from "./columns";
import { KataMovesDataTable } from "./kata-moves-data-table";

interface KataMovesListProps {
  movesets: MoveWithRelations[];
}

export function KataMovesList({ movesets }: KataMovesListProps) {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Kata Moves</h1>
        <p className="text-muted-foreground">View all moves across all katas</p>
        <Show when="signed-in">
          <div className="flex gap-2 mt-4">
            <Link href="/kata-moves/edit">
              <Button>Edit Kata Moves</Button>
            </Link>
            <Link href="/kata-moves/upload">
              <Button>Upload Kata Moves</Button>
            </Link>
          </div>
        </Show>
      </div>

      <KataMovesDataTable columns={columns} data={movesets} />
    </div>
  );
}
