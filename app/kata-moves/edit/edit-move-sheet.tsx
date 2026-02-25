"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Stance, Technique } from "@/app/generated/prisma/browser";
import type { MoveWithRelations } from "../columns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteMove, updateMove } from "@/lib/actions/kata-moves";
import {
  validateMoveForm,
  type MoveFormState,
} from "@/lib/validation/kata-moves";

interface EditMoveSheetProps {
  move: MoveWithRelations | null;
  stances: Stance[];
  techniques: Technique[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function EditMoveSheet({
  move,
  stances,
  techniques,
  open,
  onOpenChange,
  onSuccess,
}: EditMoveSheetProps) {
  const [formState, setFormState] = useState<MoveFormState>({
    move_number: "",
    sequence: 1,
    timing: "",
    stance_id: "",
    technique_id: "",
    direction: "",
    lead_foot: "",
    hip: "",
    active_side: "",
    speed: "",
    snap_thrust: "",
    level: "",
    breath: "",
    interm_move: "",
    kiai: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (move) {
      setFormState({
        move_number: move.move_number,
        sequence: move.sequence,
        timing: move.timing ?? "",
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
        interm_move: String(move.interm_move),
        kiai: String(move.kiai),
      });
      setErrors([]);
    }
  }, [move]);

  async function handleSubmit() {
    if (!move) return;

    const { data, errors } = validateMoveForm(formState);
    if (!data) {
      setErrors(errors);
      return;
    }

    setIsSubmitting(true);
    const result = await updateMove(move.id, data);
    setIsSubmitting(false);

    if (result.success) {
      toast.success("Move updated successfully");
      setErrors([]);
      onSuccess();
      onOpenChange(false);
    } else {
      toast.error(result.error ?? "Failed to update move");
    }
  }

  async function confirmDelete() {
    if (!move) return;

    const result = await deleteMove(move.id);
    if (result.success) {
      toast.success("Move deleted successfully");
      setShowDeleteDialog(false);
      onSuccess();
      onOpenChange(false);
    } else {
      toast.error(result.error ?? "Failed to delete move");
      setShowDeleteDialog(false);
    }
  }

  return (
    <div>
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Move</SheetTitle>
          <SheetDescription>
            {move
              ? `Editing Move #${move.move_number} (Seq ${move.sequence}) - ${move.kata.name}`
              : "Select a move to edit"}
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-4 px-4 py-4">
          {errors.length > 0 && (
            <div className="text-sm text-destructive space-y-1">
              {errors.map((e, i) => (
                <p key={i}>{e}</p>
              ))}
            </div>
          )}

          {/* Move Number and Sequence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label>Move Number</Label>
              <Input
                type="number"
                min={1}
                value={formState.move_number}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    move_number:
                      e.target.value === "" ? "" : Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Sequence</Label>
              <Input
                type="number"
                min={1}
                value={formState.sequence}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    sequence: e.target.value === "" ? "" : Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
          {/* Stance and Technique */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label>Stance</Label>
              <Select
                value={formState.stance_id}
                onValueChange={(v) => setFormState({ ...formState, stance_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stance..." />
                </SelectTrigger>
                <SelectContent>
                  {stances.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <Label>Technique</Label>
              <Select
                value={formState.technique_id}
                onValueChange={(v) => setFormState({ ...formState, technique_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select technique..." />
                </SelectTrigger>
                <SelectContent>
                  {techniques.map((t) => (
                    <SelectItem key={t.id} value={String(t.id)}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Timing and Direction */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label>
                Timing{" "}
                <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Select
                value={formState.timing}
                onValueChange={(v) => setFormState({ ...formState, timing: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NONE">None</SelectItem>
                  <SelectItem value="SIMULTANEOUS">Simultaneous</SelectItem>
                  <SelectItem value="SEQUENTIAL">Sequential</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <Label>Direction</Label>
              <Select
                value={formState.direction}
                onValueChange={(v) => setFormState({ ...formState, direction: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {[
                    ["N", "North"],
                    ["S", "South"],
                    ["E", "East"],
                    ["W", "West"],
                    ["NE", "Northeast"],
                    ["NW", "Northwest"],
                    ["SE", "Southeast"],
                    ["SW", "Southwest"],
                  ].map(([v, l]) => (
                    <SelectItem key={v} value={v}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Lead Foot and Hip Position */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label>Lead Foot</Label>
              <Select
                value={formState.lead_foot}
                onValueChange={(v) => setFormState({ ...formState, lead_foot: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LEFT">Left</SelectItem>
                  <SelectItem value="RIGHT">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <Label>Hip Position</Label>
              <Select
                value={formState.hip}
                onValueChange={(v) => setFormState({ ...formState, hip: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HANMI">Hanmi</SelectItem>
                  <SelectItem value="SHOMEN">Shomen</SelectItem>
                  <SelectItem value="GYAKUHANMI">Gyaku Hanmi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Side and Speed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label>Active Side</Label>
              <Select
                value={formState.active_side}
                onValueChange={(v) => setFormState({ ...formState, active_side: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LEFT">Left</SelectItem>
                  <SelectItem value="RIGHT">Right</SelectItem>
                  <SelectItem value="BOTH">Both</SelectItem>
                  <SelectItem value="NEITHER">Neither</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <Label>Speed</Label>
              <Select
                value={formState.speed}
                onValueChange={(v) => setFormState({ ...formState, speed: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FAST">Fast</SelectItem>
                  <SelectItem value="SLOW">Slow</SelectItem>
                  <SelectItem value="FAST_SLOW">Fast → Slow</SelectItem>
                  <SelectItem value="SLOW_FAST">Slow → Fast</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Snap/Thrust and Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label>Snap / Thrust</Label>
              <Select
                value={formState.snap_thrust}
                onValueChange={(v) => setFormState({ ...formState, snap_thrust: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SNAP">Snap</SelectItem>
                  <SelectItem value="THRUST">Thrust</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <Label>Level</Label>
              <Select
                value={formState.level}
                onValueChange={(v) => setFormState({ ...formState, level: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GEDAN">Gedan (Lower)</SelectItem>
                  <SelectItem value="CHUDAN">Chudan (Middle)</SelectItem>
                  <SelectItem value="JODAN">Jodan (Upper)</SelectItem>
                  <SelectItem value="GEDAN_JODAN">Gedan & Jodan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Breath, Interm Move */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label>Breath</Label>
              <Select
                value={formState.breath}
                onValueChange={(v) => setFormState({ ...formState, breath: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IN">Inhale</SelectItem>
                  <SelectItem value="OUT">Exhale</SelectItem>
                  <SelectItem value="IN_OUT">Inhale & Exhale</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <Label>Interm. Move</Label>
              <Select
                value={formState.interm_move}
                onValueChange={(v) => setFormState({ ...formState, interm_move: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
                <Label>Kiai</Label>
                <Select
                  value={formState.kiai}
                  onValueChange={(v) => setFormState({ ...formState, kiai: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
          </div>
        </div>

        <SheetFooter>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
            disabled={isSubmitting}
          >
            Delete Move
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>

    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete Move #{move?.move_number} from{" "}
            {move?.kata.name}? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete} className="bg-red-600 text-white hover:bg-red-700">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    </div>
  );
}
