"use client";

import { useRef, useState } from "react";
import Papa from "papaparse";
import type { Stance, Technique } from "@/app/generated/prisma/browser";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  MoveFormState,
  ValidatedMoveData,
} from "@/lib/validation/kata-moves";
import {
  validateMoveCsvRow,
  type MoveRow,
  type ValidatedMoveRow,
} from "@/lib/validation/csv-kata-moves";

const EXPECTED_HEADERS = [
  "move_number",
  "sequence",
  "timing",
  "stance",
  "technique",
  "direction",
  "lead_foot",
  "hip",
  "active_side",
  "speed",
  "snap_thrust",
  "level",
  "breath",
  "interm_move",
  "kiai",
];

function toFormState(move: ValidatedMoveData): Partial<MoveFormState> {
  return {
    move_number: move.move_number,
    sequence: move.sequence,
    timing: move.timing ?? "NONE",
    stance_id: String(move.stance_id),
    technique_id: String(move.technique_id),
    direction: move.direction,
    lead_foot: move.lead_foot,
    hip: move.hip,
    active_side: move.active_side,
    speed: move.speed,
    snap_thrust: move.snap_thrust,
    level: move.level,
    breath: move.breath,
    interm_move: move.interm_move ? "true" : "false",
    kiai: move.kiai ? "true" : "false",
  };
}

interface Props {
  stances: Stance[];
  techniques: Technique[];
  onReview: (values: Partial<MoveFormState>) => void;
  onAddAll: (moves: ValidatedMoveData[]) => void;
}

export function CsvUploadForm({
  stances,
  techniques,
  onReview,
  onAddAll,
}: Props) {
  const [parsedRows, setParsedRows] = useState<ValidatedMoveRow[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleParse() {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    Papa.parse<MoveRow>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim().toLowerCase(),
      transform: (v) => v.trim(),
      complete: (results) => {
        const headers = results.meta.fields ?? [];
        const missingHeaders = EXPECTED_HEADERS.filter(
          (h) => !headers.includes(h),
        );
        if (missingHeaders.length > 0) {
          setParseError(`Missing columns: ${missingHeaders.join(", ")}`);
          setParsedRows([]);
          return;
        }
        setParseError(null);
        const rows = results.data.map((row, i) =>
          validateMoveCsvRow(row, i + 1, stances, techniques),
        );
        setParsedRows(rows);
      },
    });
  }

  const validRows = parsedRows.filter((r) => r.isValid && r.data);
  const invalidCount = parsedRows.filter((r) => !r.isValid).length;

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="text-sm"
        />
        <Button variant="outline" onClick={handleParse}>
          Parse
        </Button>
      </div>

      {parseError && <p className="text-sm text-destructive">{parseError}</p>}

      {parsedRows.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground">
            {validRows.length} valid, {invalidCount} invalid
          </p>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Row</TableHead>
                  <TableHead>Move #</TableHead>
                  <TableHead>Stance</TableHead>
                  <TableHead>Technique</TableHead>
                  <TableHead>Direction</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parsedRows.map((row) => (
                  <TableRow key={row.rowNumber}>
                    <TableCell>{row.rowNumber}</TableCell>
                    <TableCell>{row.data?.move_number ?? "—"}</TableCell>
                    <TableCell>
                      {row.data
                        ? stances.find((s) => s.id === row.data!.stance_id)
                            ?.name
                        : "—"}
                    </TableCell>
                    <TableCell>
                      {row.data
                        ? techniques.find(
                            (t) => t.id === row.data!.technique_id,
                          )?.name
                        : "—"}
                    </TableCell>
                    <TableCell>{row.data?.direction ?? "—"}</TableCell>
                    <TableCell>
                      {row.isValid ? (
                        <span className="text-green-600 text-sm">✓</span>
                      ) : (
                        <span
                          className="text-destructive text-sm"
                          title={row.errors.join(", ")}
                        >
                          ✗ {row.errors[0]}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {row.isValid && row.data && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onReview(toFormState(row.data!))}
                        >
                          Review
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {validRows.length > 0 && (
            <Button onClick={() => onAddAll(validRows.map((r) => r.data!))}>
              Add all valid rows to Queue ({validRows.length})
            </Button>
          )}
        </>
      )}
    </div>
  );
}
