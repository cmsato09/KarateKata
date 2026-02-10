import { getKataMoves } from "@/lib/actions/kata-moves";
import { KataMovesList } from "./kata-moves-list";

export default async function KataMovesPage() {
	const movesets = await getKataMoves();

	return <KataMovesList movesets={movesets} />;
}
