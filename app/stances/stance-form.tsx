"use client";

import { useActionState, useEffect } from "react";
import Form from "next/form";
import { Stance } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createStanceAction, updateStanceAction } from "@/lib/actions/stances";
import { STANCE_FORM_FIELDS } from "@/lib/validation/stances";

interface StanceFormProps {
  stance?: Stance | null;
  onCancel?: () => void;
}

export function StanceForm({ stance, onCancel }: StanceFormProps) {
  const isEditing = !!stance;

  const [state, formAction, isPending] = useActionState(
    isEditing ? updateStanceAction : createStanceAction,
    null,
  );

  // Reset form and call onCancel when submission is successful
  useEffect(() => {
    if (state?.success && onCancel) {
      onCancel();
    }
  }, [state?.success, onCancel]);

  return (
    <Form key={stance?.id ?? "new"} action={formAction} className="space-y-4">
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
          disabled={isPending}
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
          disabled={isPending}
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
          disabled={isPending}
        />
      </div>

      {/* Feedback Messages */}
      {state?.error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Stance {state.operation === 'update' ? "updated" : "created"} successfully!
        </div>
      )}

      {/* Submit and Cancel buttons */}
      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isEditing ? "Update Stance" : "Add Stance"}
        </Button>
        {isEditing && onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
        )}
      </div>
    </Form>
  );
}
