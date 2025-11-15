"use client";

import { characters } from "../data/characters";
import { useLang } from "./LanguageProvider";

export default function CharacterSelectModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (name: string) => void;
}) {
  const { t } = useLang();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1b1b1b] p-3 rounded-2xl w-full max-w-2xl shadow-lg relative">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-6">{t("selectCharacter")}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
          {characters.map((name) => (
            <button
              key={name}
              onClick={() => {
                onSelect(name);
                onClose();
              }}
              className="px-4 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-white/10 rounded-xl text-center"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
