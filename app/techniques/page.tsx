import { getTechniques } from "../../lib/actions/techniques";
import { TechniquesList } from "./techniques-list";

export default async function TechniqueList() {
  const techniques = await getTechniques();
  return <TechniquesList techniques={techniques} />;
}
