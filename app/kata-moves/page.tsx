import { getMovesets } from "@/lib/actions/movesets";
import { KataMovesList } from "./kata-moves-list";

export default async function KataMovesPage() {
	const movesets = await getMovesets();

	return <KataMovesList movesets={movesets} />;
}
