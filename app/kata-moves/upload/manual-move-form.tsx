"use client";

import { useEffect, useState } from "react";
import type { Stance, Technique } from "@/app/generated/prisma/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  validateMoveForm,
  type MoveFormState,
  type ValidatedMoveData,
} from "@/lib/validation/kata-moves";

const EMPTY_FORM: MoveFormState = {
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
};

interface Props {
  stances: Stance[];
  techniques: Technique[];
  initialValues?: Partial<MoveFormState>;
  onAdd: (move: ValidatedMoveData) => boolean;
}

export function MoveForm({ stances, techniques, initialValues, onAdd }: Props) {
  const [form, setForm] = useState<MoveFormState>({
    ...EMPTY_FORM,
    ...initialValues,
  });
  const [errors, setErrors] = useState<string[]>([]);

  // Re-populate form when initialValues changes (e.g. CSV row review)
  useEffect(() => {
    setForm({ ...EMPTY_FORM, ...initialValues });
  }, [initialValues]);

  function handleAdd() {
    const { data, errors } = validateMoveForm(form);
    if (!data) {
      setErrors(errors);
      return;
    }
    const added = onAdd(data);
    if (added) {
      setForm(EMPTY_FORM);
      setErrors([]);
    }
  }

  return (
    <div className="space-y-4 py-4">
      {errors.length > 0 && (
        <div className="text-sm text-destructive space-y-1">
          {errors.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label>Move Number</Label>
          <Input
            type="number"
            min={1}
            value={form.move_number}
            onChange={(e) =>
              setForm({
                ...form,
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
            value={form.sequence}
            onChange={(e) =>
              setForm({
                ...form,
                sequence: e.target.value === "" ? "" : Number(e.target.value),
              })
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label>Stance</Label>
          <Select
            value={form.stance_id}
            onValueChange={(v) => setForm({ ...form, stance_id: v })}
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
            value={form.technique_id}
            onValueChange={(v) => setForm({ ...form, technique_id: v })}
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

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label>
            Timing{" "}
            <span className="text-muted-foreground text-xs">(optional)</span>
          </Label>
          <Select
            value={form.timing}
            onValueChange={(v) => setForm({ ...form, timing: v })}
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
            value={form.direction}
            onValueChange={(v) => setForm({ ...form, direction: v })}
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

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label>Lead Foot</Label>
          <Select
            value={form.lead_foot}
            onValueChange={(v) => setForm({ ...form, lead_foot: v })}
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
            value={form.hip}
            onValueChange={(v) => setForm({ ...form, hip: v })}
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

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label>Active Side</Label>
          <Select
            value={form.active_side}
            onValueChange={(v) => setForm({ ...form, active_side: v })}
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
            value={form.speed}
            onValueChange={(v) => setForm({ ...form, speed: v })}
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

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label>Snap / Thrust</Label>
          <Select
            value={form.snap_thrust}
            onValueChange={(v) => setForm({ ...form, snap_thrust: v })}
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
            value={form.level}
            onValueChange={(v) => setForm({ ...form, level: v })}
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

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <Label>Breath</Label>
          <Select
            value={form.breath}
            onValueChange={(v) => setForm({ ...form, breath: v })}
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
            value={form.interm_move}
            onValueChange={(v) => setForm({ ...form, interm_move: v })}
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
        <div className="flex flex-col gap-1">
          <Label>Kiai</Label>
          <Select
            value={form.kiai}
            onValueChange={(v) => setForm({ ...form, kiai: v })}
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

      <Button onClick={handleAdd}>Add to Queue</Button>
    </div>
  );
}
