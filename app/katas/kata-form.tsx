"use client";

import { useActionState, useEffect } from "react";
import Form from "next/form";
import { toast } from "sonner";
import type { Kata } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createKataAction, updateKataAction } from "@/lib/actions/katas";
import { KATA_FORM_FIELDS } from "@/lib/validation/katas";

interface KataFormProps {
  kata?: Kata | null;
  onCancel?: () => void;
}

export function KataForm({ kata, onCancel }: KataFormProps) {
  const isEditing = !!kata;

  const [state, formAction, isPending] = useActionState(
    isEditing ? updateKataAction : createKataAction,
    null,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(
        `Kata ${state.operation === "update" ? "updated" : "created"} successfully!`,
      );

      if (state.operation === "update" && onCancel) {
        onCancel();
      }
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state?.success, state?.error, state?.operation, onCancel]);

  return (
    <Form key={kata?.id ?? "new"} action={formAction} className="space-y-4">
      {/* Hidden ID field for updates */}
      {isEditing && kata && (
        <input type="hidden" name="id" value={kata.id} />
      )}

      {/* Style Name */}
      <div className="space-y-2">
        <Label htmlFor={KATA_FORM_FIELDS.STYLE}>Style Name</Label>
        <Select
          name={KATA_FORM_FIELDS.STYLE}
          defaultValue={kata?.style || undefined}
          required
          disabled={isPending}
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Select a style" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Styles</SelectLabel>
              <SelectItem value="Shotokan">SHOTOKAN</SelectItem>
              <SelectItem value="Shito-ryu">SHITO-RYU</SelectItem>
              <SelectItem value="Goju-ryu">GOJU-RYU</SelectItem>
              <SelectItem value="Wado-ryu">WADO-RYU</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Kata Name */}
      <div className="space-y-2">
        <Label htmlFor={KATA_FORM_FIELDS.NAME}>Kata Name</Label>
        <Input
          type="text"
          id={KATA_FORM_FIELDS.NAME}
          name={KATA_FORM_FIELDS.NAME}
          placeholder="Add Kata Name"
          defaultValue={kata?.name || undefined}
          required
          disabled={isPending}
        />
      </div>

      {/* Series Name */}
      <div className="space-y-2">
        <Label htmlFor={KATA_FORM_FIELDS.SERIES}>Series Name</Label>
        <Input
          type="text"
          id={KATA_FORM_FIELDS.SERIES}
          name={KATA_FORM_FIELDS.SERIES}
          placeholder="Add Series Name"
          defaultValue={kata?.series || ""}
          required
          disabled={isPending}
        />
      </div>

      {/* Hiragana */}
      <div className="space-y-2">
        <Label htmlFor={KATA_FORM_FIELDS.HIRAGANA}>Name (Hiragana)</Label>
        <Input
          type="text"
          name={KATA_FORM_FIELDS.HIRAGANA}
          id={KATA_FORM_FIELDS.HIRAGANA}
          defaultValue={kata?.name_hiragana || ""}
          disabled={isPending}
        />
      </div>

      {/* Kanji */}
      <div className="space-y-2">
        <Label htmlFor={KATA_FORM_FIELDS.KANJI}>Name (Kanji)</Label>
        <Input
          type="text"
          name={KATA_FORM_FIELDS.KANJI}
          id={KATA_FORM_FIELDS.KANJI}
          defaultValue={kata?.name_kanji || ""}
          disabled={isPending}
        />
      </div>

      {/* Submit and Cancel buttons */}
      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isEditing ? "Update Kata" : "Add Kata"}
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

