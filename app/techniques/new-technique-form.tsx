"use client";

import Form from "next/form";
import { useActionState } from "react";
import { createTechniqueAction } from "@/lib/techniques";

const TECHNIQUE_TYPES = ["BLOCK", "PUNCH", "KICK", "STRIKE", "PREP"] as const;

export function NewTechniqueForm() {
  const [state, formAction, isPending] = useActionState(createTechniqueAction, null)
  return (
    <Form action={formAction}>
      {/* Technique Name */}
      <div>
        <label htmlFor="tech_name">Technique</label>
          <input
            type="text"
            id="tech_name"
            name="tech_name"
            placeholder="Add Technique Name"
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
          Technique &quot;{state.success}&quot; created successfully!
        </div>
      )}

      {/* Submit button */}
      <div>
        <button 
          type="submit"
          disabled={isPending}
        >
          Add Technique
        </button>
      </div>
    </Form>
  )
}