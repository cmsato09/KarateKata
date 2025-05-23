import Form from "next/form";

export default function NewTechnique() {
  return (
    <div>
      <h1>Add New Technique</h1>
      <Form action={createTechnique}>
        <div>
          <label>Technique</label>
          <input
            type="text"
            id="tech_name"
            name="tech_name"
            placeholder="Add Technique Name"
          />
        </div>

        <div>
          <label>Type</label>
          <select name="tech_type" id="tech_type" required>
            <option value="BLOCK">Block</option>
            <option value="PUNCH">Punch</option>
            <option value="KICK">Kick</option>
            <option value="STRIKE">Strike</option>
          </select>
        </div>

        <div>
          <label>Name (Hiragana)</label>
          <input type="text" name="name_hiragana" id="name_hiragana" />
        </div>

        <div>
          <label>Name (Kanji)</label>
          <input type="text" name="name_kanji" id="name_kanji" />
        </div>

        <div>
          <label>Description</label>
          <input type="text" name="tech_description" id="tech_description" />
        </div>

        <div>
          <button type="submit">Add Technique</button>
        </div>
      </Form>
    </div>
  );
}
