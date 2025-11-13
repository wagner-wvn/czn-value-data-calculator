"use client";

import { useLang } from "./LanguageProvider";

export default function LanguageToggle() {
	const { lang, switchLang } = useLang();

	return (
		<button	onClick={() => switchLang(lang === "en" ? "pt" : "en")}	className="px-4 py-2 rounded-xl bg-[var(--btn-bg)] hover:bg-[var(--btn-hover)] border border-[var(--btn-border)] backdrop-blur text-sm"	>
			{lang === "en" ? "PT-BR" : "EN"}
		</button>
	);
}
