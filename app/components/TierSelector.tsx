"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";

export default function TierSelector({tier,setTier,}: {	tier: number;	setTier: (v: number) => void;}) {
	const { t } = useLang();
	const [open, setOpen] = useState(false);

	const tiers = Array.from({ length: 15 }, (_, i) => i + 1);

	return (
		<div className="relative w-full max-w-xs">
			{/* BOTÃO PRINCIPAL */}
			<button	onClick={() => setOpen((prev) => !prev)} className="w-full p-4 rounded-xl bg-[var(--btn-bg)] hover:bg-[var(--btn-hover)] border border-[var(--btn-border)] backdrop-blur text-left flex justify-between items-center">
				<span className="font-medium">
					{t("tier")} {tier}
				</span>

				<span className="opacity-70 text-sm">{open ? "▲" : "▼"}</span>
			</button>

			{/* LISTA ABERTA */}
			{open && (
				<div className="absolute mt-2 w-full rounded-xl overflow-hidden z-50"
					style={{
					background: "var(--card-bg)",
					border: "1px solid var(--card-border)",
					backdropFilter: "blur(10px)",
					boxShadow: "0px 20px 40px rgba(0,0,0,0.6)",
					}}
				>
					{tiers.map((tNum) => (
						<button	key={tNum} onClick={() => {	setTier(tNum); setOpen(false);}} className={`w-full text-left px-4 py-3 text-sm hover:bg-white/10 transition ${tNum === tier ? "bg-white/10 font-semibold" : ""}`}>
							{t("tier")} {tNum}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
