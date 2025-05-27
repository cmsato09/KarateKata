import Form from "next/form";

import { createTechnique } from "@/lib/technique";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function NewTechnique() {
  async function handleSubmit(formData: FormData) {
    "use server";
    await createTechnique(formData);
    revalidatePath("/techniques");
    redirect("/techniques");
  }

  return (
    <div>
      <h1>Add New Technique</h1>
      <Form action={handleSubmit}>
        <div>
          <label htmlFor="tech_name">Technique</label>
          <input
            type="text"
            id="tech_name"
            name="tech_name"
            placeholder="Add Technique Name"
          />
        </div>

        <div>
         <label htmlFor="tech_type">Type</label>
          <select name="tech_type" id="tech_type" required>
            <option value="BLOCK">Block</option>
            <option value="PUNCH">Punch</option>
            <option value="KICK">Kick</option>
            <option value="STRIKE">Strike</option>
          </select>
        </div>

        <div>
          <label htmlFor="name_hiragana">Name (Hiragana)</label>
          <input type="text" name="name_hiragana" id="name_hiragana" />
        </div>

        <div>
          <label htmlFor="name_kanji">Name (Kanji)</label>
          <input type="text" name="name_kanji" id="name_kanji" />
        </div>

        <div>
         <label htmlFor="tech_description">Description</label>
          <input type="text" name="tech_description" id="tech_description" />
        </div>

        <div>
          <button type="submit">Add Technique</button>
        </div>
      </Form>
    </div>
  );
}
