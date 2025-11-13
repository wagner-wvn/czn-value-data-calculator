"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import en from "../i18n/en.json";
import pt from "../i18n/pt.json";

type Lang = "en" | "pt";

const dictionaries = { en, pt };

interface LanguageContextProps {
  lang: Lang;
  t: (key: string) => string;
  switchLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextProps | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  const t = (key: string) => dictionaries[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, t, switchLang: setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
};
