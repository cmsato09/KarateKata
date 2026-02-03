import { getKatas } from "@/lib/actions/katas";
import { KataList } from "./kata-list";

export default async function KataPageList() {
  const katas = await getKatas();
  return <KataList katas={katas} />
}
