"use client";

import { useState } from "react";
import { Kata, Stance, Technique } from "@/app/generated/prisma/browser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getKataMovesByKataId } from "@/lib/actions/kata-moves";
import { EditMoveSheet } from "./edit-move-sheet";
import { createEditColumns } from "./edit-columns";
import { KataMovesDataTable } from "../kata-moves-data-table";
import { MoveWithRelations } from "../columns";

interface EditKataMovesClientProps {
  katas: Kata[];
  stances: Stance[];
  techniques: Technique[];
}

export function EditKataMovesClient({
  katas,
  stances,
  techniques,
}: EditKataMovesClientProps) {
  const [selectedKataId, setSelectedKataId] = useState<string>("");
  const [moves, setMoves] = useState<MoveWithRelations[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [editingMove, setEditingMove] = useState<MoveWithRelations | null>(null);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  async function handleKataChange(kataId: string) {
    setSelectedKataId(kataId);
    if (!kataId) {
      setMoves([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const fetchedMoves = await getKataMovesByKataId(Number(kataId));
      setMoves(fetchedMoves);
    } catch (error) {
      console.error("Error fetching moves:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleEdit(move: MoveWithRelations) {
    setEditingMove(move);
    setIsEditSheetOpen(true);
  }

  async function handleRefreshMoves() {
    if (selectedKataId) {
      const fetchedMoves = await getKataMovesByKataId(Number(selectedKataId));
      setMoves(fetchedMoves);
    }
  }

  function handleDelete(move: MoveWithRelations) {
  
  }

  const selectedKata = katas.find((k) => String(k.id) === selectedKataId);

  const columns = createEditColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <div className="space-y-6">
      {/* Kata Selector */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Select Kata to Edit</label>
        <Select value={selectedKataId} onValueChange={handleKataChange}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Choose a kata..." />
          </SelectTrigger>
          <SelectContent>
            {katas.map((kata) => (
              <SelectItem key={kata.id} value={String(kata.id)}>
                {kata.name} ({kata.style})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Moves Table */}
      {selectedKata && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Moves for {selectedKata.name}
          </h2>

          {isLoading ? (
            <p className="text-muted-foreground">Loading moves...</p>
          ) : moves.length === 0 ? (
            <p className="text-muted-foreground">
              No moves found for this kata.
            </p>
          ) : (
            <KataMovesDataTable columns={columns} data={moves} />
          )}
        </div>
      )}

      <EditMoveSheet
        move={editingMove}
        stances={stances}
        techniques={techniques}
        open={isEditSheetOpen}
        onOpenChange={setIsEditSheetOpen}
        onSuccess={handleRefreshMoves}
      />

    </div>
  );
}
