"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import ProgressBar from "./ProgressBar";
import ActionButtons from "./ActionButtons";
import { ActionEntry } from "./types";

export default function CharacterPanel({ characterIndex, tierLimit }: { characterIndex: number; tierLimit: number }) {
	const { t } = useLang();
	const [value, setValue] = useState(0);
	const [removalCount, setRemovalCount] = useState(0);
	const [copyCount, setCopyCount] = useState(0);
	const [history, setHistory] = useState<ActionEntry[]>([]);
	const addAction = (entry: ActionEntry) => {
		setValue((prev) => prev + entry.value);
		setHistory((prev) => [...prev, entry]);
	};
	const undo = () => {
		const last = history[history.length - 1];
		
		if (!last) return;

		setValue((prev) => prev - last.value);
		setHistory((prev) => prev.slice(0, -1));

		if (last.type === "removal") setRemovalCount((prev) => Math.max(0, prev - 1));
		if (last.type === "copy") setCopyCount((prev) => Math.max(0, prev - 1));
	};

	const resetAll = () => {
		setValue(0);
		setRemovalCount(0);
		setCopyCount(0);
		setHistory([]);
	};

	return (
		<div className="rounded-3xl p-6 flex flex-col" style={{	background: "var(--card-bg)", border: "1px solid var(--card-border)",boxShadow: "var(--card-shadow)", backdropFilter: "blur(18px)",	}}>
			<h2 className="text-lg font-semibold mb-2">
				{t("character")} {characterIndex}
			</h2>

			<p className="text-sm text-zinc-400 mb-2">
				{t("dataValue")}: {value} / {tierLimit}
			</p>

			<ProgressBar value={value} max={tierLimit} />

			<div className="mt-6">
				<ActionButtons
					onAction={addAction}
					removalCount={removalCount}
					setRemovalCount={setRemovalCount}
					copyCount={copyCount}
					setCopyCount={setCopyCount}
				/>
			</div>

			<div className="flex gap-4 mt-5">
				<button	onClick={undo} className="px-4 py-2 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/40 border border-yellow-500/30 backdrop-blur">
					{t("undo")}
				</button>

				<button	onClick={resetAll} className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 backdrop-blur">
					{t("reset")}
				</button>
			</div>

			<div className="mt-6 p-4 rounded-2xl max-h-40 overflow-y-auto text-xs space-y-2" style={{background: "rgba(255,255,255,0.03)",border: "1px solid rgba(255,255,255,0.05)",backdropFilter: "blur(12px)",}}>
				{history.map((entry, i) => (
					<div key={i} className="text-zinc-300">
						• {entry.label} <span className="opacity-60">({entry.value} pts)</span>
					</div>
				))}
			</div>
		</div>
	);
}
