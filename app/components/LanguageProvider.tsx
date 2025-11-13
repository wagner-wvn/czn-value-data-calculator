"use client";

import React, { createContext, useContext, useState } from "react";
import en from "../i18n/en.json";
import pt from "../i18n/pt.json";

type Lang = "en" | "pt";

// Tornamos o dicionário indexável por string:
const dictionaries: Record<Lang, Record<string, string>> = {
  en,
  pt,
};

const LanguageContext = createContext<{
  lang: Lang;
  t: (key: string) => string;
  switchLang: (lang: Lang) => void;
}>({
  lang: "en",
  t: (key: string) => key,
  switchLang: () => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  // Agora o TS aceita indexação dinâmica
  const t = (key: string) => dictionaries[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, t, switchLang: setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
