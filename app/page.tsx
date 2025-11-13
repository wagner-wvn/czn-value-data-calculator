"use client";

import { useState } from "react";
import { LanguageProvider, useLang } from "./components/LanguageProvider";
import LanguageToggle from "./components/LanguageToggle";
import TierSelector from "./components/TierSelector";
import CharacterPanel from "./components/CharacterPanel";
import Footer from "./components/Footer";

export default function Home(){
    return (
        <LanguageProvider>
            <PageContent />
        </LanguageProvider>
    );
}

function PageContent() {
    const { t } = useLang();
    const [tier, setTier] = useState(8);

    const tierLimits: Record<number, number> = {
        1: 30, 2: 40, 3: 50, 4: 60, 5: 70,
        6: 80, 7: 90, 8: 100, 9: 110, 10: 120,
        11: 130, 12: 140, 13: 150, 14: 160, 15: 170
    };

    return (
        <main className="min-h-screen w-full px-4 py-10 max-w-7xl mx-auto">
            <header className="relative mb-10 flex items-center justify-center">

                <div className="absolute right-0 top-0">
                    <LanguageToggle />
                </div>

                <div className="flex flex-col items-center text-center">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Data Value Calculator
                    </h1>

                    <p className="text-zinc-400 mt-2 text-sm md:text-base max-w-xl">
                        {t("subtitle")}
                    </p>
                </div>
            </header>

            <div className="flex justify-center mb-10">
                <TierSelector tier={tier} setTier={setTier} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <CharacterPanel characterIndex={1} tierLimit={tierLimits[tier]} />
                <CharacterPanel characterIndex={2} tierLimit={tierLimits[tier]} />
                <CharacterPanel characterIndex={3} tierLimit={tierLimits[tier]} />
            </div>

            <Footer></Footer>
        </main>
    );
}
