"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Stance, Technique } from "@/app/generated/prisma/browser";
import type { MoveWithRelations } from "../columns";
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
import { updateMove } from "@/lib/actions/kata-moves";
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

  return (
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

        <div className="py-6">
          <p className="text-sm text-muted-foreground">
            Form fields will go here...
          </p>

          {/* Placeholder to show current move data */}
          {move && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <p><strong>Technique:</strong> {move.technique.name}</p>
              <p><strong>Stance:</strong> {move.stance.name}</p>
              <p><strong>Direction:</strong> {move.direction}</p>
            </div>
          )}
        </div>

        <SheetFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
