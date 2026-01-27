"use client";

import Form from "next/form";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createTechniqueAction, updateTechniqueAction } from "@/lib/actions/techniques";
import { Technique } from "../generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
    if (state?.success) {
      toast.success(
        `Technique ${state.operation === "update" ? "updated" : "created"} successfully!`
      );
    
      if (state.operation === "update" && onCancel) {
        onCancel();
      } else if (state?.error) {
        toast.error(state.error);
      }
    }
  }, [state?.success, state?.error, state?.operation, onCancel]);
  
  return (
    <Form key={technique?.id ?? 'new'} action={formAction} className="space-y-4">
      {/* Hidden ID field for updates */}
      {isEditing && technique && (
        <input type="hidden" name="id" value={technique.id} />
      )}

      {/* Technique Name */}
      <div className="space-y-2">
        <Label htmlFor="tech_name">Technique</Label>
          <Input
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
      <div className="space-y-2">
        <Label htmlFor="tech_type">Type</Label>
        <Select
          name="tech_type"
          defaultValue={technique?.type || ""}
          required
          disabled={isPending}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(TECHNIQUE_TYPES).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Hiragana */}
      <div className="space-y-2">
        <Label htmlFor="name_hiragana">Name (Hiragana)</Label>
        <Input
          type="text"
          name="name_hiragana"
          id="name_hiragana"
          defaultValue={technique?.name_hiragana || ""}
          disabled={isPending}
        />
      </div>

      {/* Kanji */}
      <div className="space-y-2">
        <Label htmlFor="name_kanji">Name (Kanji)</Label>
        <Input
          type="text"
          name="name_kanji"
          id="name_kanji"
          defaultValue={technique?.name_kanji || ""}
          disabled={isPending}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="tech_description">Description</Label>
        <Textarea
          name="tech_description"
          id="tech_description"
          rows={3}
          defaultValue={technique?.description || ""}
          disabled={isPending}
        />
      </div>

      {/* Submit and Cancel buttons */}
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={isPending}
        >
          {isEditing ? "Update Technique" : "Add Technique"}
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
  )
}