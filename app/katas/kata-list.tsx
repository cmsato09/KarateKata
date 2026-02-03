"use client";

import type { Kata } from "@/app/generated/prisma/client";
import { DataTable } from "@/components/data-table";
import { createColumns } from "./columns";
import { KataForm } from "./kata-form";

interface KataListProps {
	katas: Kata[];
}

export function KataList({ katas }: KataListProps) {

const columns = createColumns(() => {}, () => {});

	return (
		<div className="min-h-screen flex flex-col items-center justify-center -mt-16">
			<h1 className="text-4xl font-bold mb-8">Katas</h1>
				<KataForm />
				<div className="w-full max-w-4xl px-4">
					<DataTable columns={columns} data={katas} />
				</div>
		</div>
	);
}