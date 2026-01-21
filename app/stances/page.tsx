import { getStances } from "@/lib/actions/stances";
import { StancesList } from "./stances-list";

export default async function StanceList() {
  const stances = await getStances();
  return <StancesList stances={stances} />;
}
