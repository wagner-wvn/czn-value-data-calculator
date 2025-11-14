"use client";

import { useLang } from "./LanguageProvider";

export default function Footer() {
	const { t } = useLang();

	return (
		<footer className="bg-black text-gray-400 py-10 px-4 flex flex-col items-center text-center border-t border-white/10">
	
			<p className="text-sm">
					© {new Date().getFullYear()}{" "} Tsukhiro
				{" — "}
				{t("mitLicense")}
			</p>

			<p className="text-xs text-gray-500 mt-2 max-w-md leading-relaxed">
				{t("footerDisclaimer")}
			</p>
		</footer>
	);
}
