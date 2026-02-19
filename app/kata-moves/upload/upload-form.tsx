"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { Kata, Stance, Technique } from "@/app/generated/prisma/browser";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createMultipleMoves } from "@/lib/actions/kata-moves";
import type { MoveFormState, ValidatedMoveData } from "@/lib/validation/kata-moves";
import { CsvUploadForm } from "./csv-upload-form";
import { MoveForm } from "./manual-move-form";

interface KataMovesProps {
  katas: Kata[];
  stances: Stance[];
  techniques: Technique[];
}
export function KataMovesUploadForm({
  katas,
  stances,
  techniques,
}: KataMovesProps) {
  const [selectedKataId, setSelectedKataId] = useState<number | null>(null);
  const [queuedMoves, setQueuedMoves] = useState<ValidatedMoveData[]>([]);
  const [activeTab, setActiveTab] = useState("manual");
  const [formInitialValues, setFormInitialValues] = useState<Partial<MoveFormState> | undefined>(undefined)

  const selectedKata = katas.find((kata) => kata.id === selectedKataId);

  function addToQueue(move: ValidatedMoveData): boolean {
    const conflict = queuedMoves.find(
      (m) => m.move_number === move.move_number && m.sequence === move.sequence
    );
    if (conflict) {
      toast.error(`Move ${move.move_number}, sequence ${move.sequence} is already in the queue`);
      return false;
    }
    setQueuedMoves((prev) => [...prev, move]);
    return true;
  }

  async function handleImport() {
    if (!selectedKataId || queuedMoves.length === 0) return;
    const result = await createMultipleMoves(selectedKataId, queuedMoves);
    if (result.success) {
      toast.success(`${result.createdCount} move(s) imported successfully`);
      setQueuedMoves([]);
    } else {
      toast.error(result.error ?? "Failed to import moves");
    }
  }

  function handleReview(values: Partial<MoveFormState>) {
    setFormInitialValues(values);
    setActiveTab("manual");
  }

  function handleAddAll(moves: ValidatedMoveData[]) {
    moves.forEach((move) => addToQueue(move));
  }

  return (
    <div className="space-y-6">
      {/* Kata selector */}
      <div className="flex flex-col gap-2 max-w-sm">
        <Label>Select a Kata</Label>
        <Select onValueChange={(value) => setSelectedKataId(Number(value))}>
          <SelectTrigger>
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

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="manual" disabled={!selectedKataId}>
            Manual Entry
          </TabsTrigger>
          <TabsTrigger value="csv" disabled={!selectedKataId}>
            CSV Upload
          </TabsTrigger>
        </TabsList>
        <TabsContent value="manual">
          <MoveForm
            stances={stances}
            techniques={techniques}
            initialValues={formInitialValues}
            onAdd={addToQueue}
          />
        </TabsContent>
        <TabsContent value="csv">
          <CsvUploadForm
            stances={stances}
            techniques={techniques}
            onReview={handleReview}
            onAddAll={handleAddAll}
          />
        </TabsContent>
      </Tabs>

      {/* Move queue */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">
            Move Queue{selectedKata ? ` for: ${selectedKata.name}` : ""}
          </h3>
          <Button variant="ghost" size="sm" onClick={() => setQueuedMoves([])}>
            Clear Queue
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Move #</TableHead>
                <TableHead>Seq</TableHead>
                <TableHead>Timing</TableHead>
                <TableHead>Stance</TableHead>
                <TableHead>Technique</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead>Lead Foot</TableHead>
                <TableHead>Hip</TableHead>
                <TableHead>Active Side</TableHead>
                <TableHead>Speed</TableHead>
                <TableHead>Snap/Thrust</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Breath</TableHead>
                <TableHead>Interm Move</TableHead>
                <TableHead>Kiai</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
              <TableBody>
                {queuedMoves.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={16} className="text-muted-foreground italic">
                      No moves queued yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  queuedMoves.map((move, i) => (
                    <TableRow key={i}>
                      <TableCell>{move.move_number}</TableCell>
                      <TableCell>{move.sequence}</TableCell>
                      <TableCell>{move.timing ?? "—"}</TableCell>
                      <TableCell>{stances.find((s) => s.id === move.stance_id)?.name}</TableCell>
                      <TableCell>{techniques.find((t) => t.id === move.technique_id)?.name}</TableCell>
                      <TableCell>{move.direction}</TableCell>
                      <TableCell>{move.lead_foot}</TableCell>
                      <TableCell>{move.hip}</TableCell>
                      <TableCell>{move.active_side}</TableCell>
                      <TableCell>{move.speed}</TableCell>
                      <TableCell>{move.snap_thrust}</TableCell>
                      <TableCell>{move.level}</TableCell>
                      <TableCell>{move.breath}</TableCell>
                      <TableCell>{move.interm_move ? "Yes" : "No"}</TableCell>
                      <TableCell>{move.kiai ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setQueuedMoves((prev) => prev.filter((_, idx) => idx !== i))}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
          </Table>
        </div>
        <Button
          disabled={queuedMoves.length === 0 || !selectedKataId}
          onClick={handleImport}
        >
          Import {queuedMoves.length} Move{queuedMoves.length !== 1 ? "s" : ""}
        </Button>
      </div>
    </div>
  );
}
