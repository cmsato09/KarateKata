"use client";

import Form from "next/form";
import { useActionState, useEffect } from "react";
import { createTechniqueAction, updateTechniqueAction } from "@/lib/techniques";
import { Technique } from "../generated/prisma/client";
import { Button } from "@/components/ui/button";

const TECHNIQUE_TYPES = ["BLOCK", "PUNCH", "KICK", "STRIKE", "PREP"] as const;

interface NewTechniqueFormProps {
  technique?: Technique | null;
  onCancel?: () => void;
}

export function NewTechniqueForm({ technique, onCancel }: NewTechniqueFormProps) {
  const isEditing = !!technique;
  const [state, formAction, isPending] = useActionState(
    isEditing ? updateTechniqueAction : createTechniqueAction,
    null
  );

  // Reset form and call onCancel when submission is successful
  useEffect(() => {
    if (state?.success && onCancel) {
      onCancel();
    }
  }, [state?.success, onCancel]);
  return (
    <Form action={formAction}>
      {/* Hidden ID field for updates */}
      {isEditing && technique && (
        <input type="hidden" name="id" value={technique.id} />
      )}

      {/* Technique Name */}
      <div>
        <label htmlFor="tech_name">Technique</label>
          <input
            type="text"
            id="tech_name"
            name="tech_name"
            placeholder="Add Technique Name"
            defaultValue={technique?.name || ""}
            required
            disabled={isPending}
          />
      </div>

      {/* Type */}
      <div>
        <label htmlFor="tech_type">Type</label>
        <select
          id="tech_type"
          name="tech_type"
          defaultValue={technique?.type || ""}
          required
          disabled={isPending}
        >
          <option value="">Select type</option>
          {Object.values(TECHNIQUE_TYPES).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Hiragana */}
      <div>
        <label htmlFor="name_hiragana">Name (Hiragana)</label>
        <input
          type="text"
          name="name_hiragana"
          id="name_hiragana"
          defaultValue={technique?.name_hiragana || ""}
          disabled={isPending}
        />
      </div>

      {/* Kanji */}
      <div>
        <label htmlFor="name_kanji">Name (Kanji)</label>
        <input
          type="text"
          name="name_kanji"
          id="name_kanji"
          defaultValue={technique?.name_kanji || ""}
          disabled={isPending}
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="tech_description">Description</label>
        <textarea
          name="tech_description"
          id="tech_description"
          rows={3}
          defaultValue={technique?.description || ""}
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
          Technique {isEditing ? "updated" : "created"} successfully!
        </div>
      )}

      {/* Submit and Cancel buttons */}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
        >
          {isEditing ? "Update Technique" : "Add Technique"}
        </button>
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
  )
}