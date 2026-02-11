"use client";

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
        <p className="text-muted-foreground">
          View all moves across all katas
        </p>
      </div>

      <KataMovesDataTable
        columns={columns}
        data={movesets}
      />
    </div>
  )
}
