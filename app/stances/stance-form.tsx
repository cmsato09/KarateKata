"use client";

import Form from "next/form";
import { Stance } from "../generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StanceFormProps {
  stance?: Stance | null;
  onCancel?: () => void;
}

export function StanceForm({ stance, onCancel }: StanceFormProps) {
  const isEditing = !!stance;

  return (
    <Form key={stance?.id ?? 'new'} action={() => {}} className="space-y-4">
      {/* Hidden ID field for updates */}
      {isEditing && stance && (
        <input type="hidden" name="id" value={stance.id} />
      )}

      {/* Stance Name */}
      <div className="space-y-2">
        <Label htmlFor="stance_name">Stance Name</Label>
        <Input
          type="text"
          id="stance_name"
          name="stance_name"
          placeholder="Add Stance Name"
          defaultValue={stance?.name || ""}
          required
        />
      </div>

      {/* Hiragana */}
      <div className="space-y-2">
        <Label htmlFor="name_hiragana">Name (Hiragana)</Label>
        <Input
          type="text"
          name="name_hiragana"
          id="name_hiragana"
          defaultValue={stance?.name_hiragana || ""}
        />
      </div>

      {/* Kanji */}
      <div className="space-y-2">
        <Label htmlFor="name_kanji">Name (Kanji)</Label>
        <Input
          type="text"
          name="name_kanji"
          id="name_kanji"
          defaultValue={stance?.name_kanji || ""}
        />
      </div>

      {/* Submit and Cancel buttons */}
      <div className="flex gap-2">
        <Button type="submit">
          {isEditing ? "Update Stance" : "Add Stance"}
        </Button>
        {isEditing && onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </Form>
  );
}