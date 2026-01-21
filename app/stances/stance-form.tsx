"use client";

import Form from "next/form";
import { Stance } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { STANCE_FORM_FIELDS } from "@/lib/validation/stances";

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
        <Label htmlFor={STANCE_FORM_FIELDS.NAME}>Stance Name</Label>
        <Input
          type="text"
          id={STANCE_FORM_FIELDS.NAME}
          name={STANCE_FORM_FIELDS.NAME}
          placeholder="Add Stance Name"
          defaultValue={stance?.name || ""}
          required
        />
      </div>

      {/* Hiragana */}
      <div className="space-y-2">
        <Label htmlFor={STANCE_FORM_FIELDS.HIRAGANA}>Name (Hiragana)</Label>
        <Input
          type="text"
          name={STANCE_FORM_FIELDS.HIRAGANA}
          id={STANCE_FORM_FIELDS.HIRAGANA}
          defaultValue={stance?.name_hiragana || ""}
        />
      </div>

      {/* Kanji */}
      <div className="space-y-2">
        <Label htmlFor={STANCE_FORM_FIELDS.KANJI}>Name (Kanji)</Label>
        <Input
          type="text"
          name={STANCE_FORM_FIELDS.KANJI}
          id={STANCE_FORM_FIELDS.KANJI}
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