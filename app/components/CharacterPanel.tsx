"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import ProgressBar from "./ProgressBar";
import ActionButtons from "./ActionButtons";
import CharacterSelectModal from "./CharacterSelectModal";
import { ActionEntry } from "./types";

export default function CharacterPanel({
  characterIndex,
  tierLimit,
}: {
  characterIndex: number;
  tierLimit: number;
}) {
  const { t } = useLang();

  // Estados com tipagem explícita (evita erro no build da Vercel)
  const [value, setValue] = useState<number>(0);
  const [removalCount, setRemovalCount] = useState<number>(0);
  const [copyCount, setCopyCount] = useState<number>(0);
  const [history, setHistory] = useState<ActionEntry[]>([]);

  // Seleção de personagem
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Quando o usuário clica em um botão no ActionButtons
  const addAction = (entry: ActionEntry) => {
    setValue((prev) => prev + entry.value);
    setHistory((prev) => [...prev, entry]);
  };

  // Desfazer última ação
  const undo = () => {
    const last = history[history.length - 1];
    if (!last) return;

    setValue((prev) => prev - last.value);
    setHistory((prev) => prev.slice(0, -1));

    if (last.type === "removal") {
      setRemovalCount((prev) => Math.max(0, prev - 1));
    }
    if (last.type === "copy") {
      setCopyCount((prev) => Math.max(0, prev - 1));
    }
  };

  // Reset total
  const resetAll = () => {
    setValue(0);
    setRemovalCount(0);
    setCopyCount(0);
    setHistory([]);
    setSelectedCharacter(null);
  };

  return (
    <div
      className="rounded-3xl p-6 flex flex-col"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        boxShadow: "var(--card-shadow)",
        backdropFilter: "blur(18px)",
      }}
    >

      {/* SELETOR DE PERSONAGEM */}
      <div className="mb-4">
        <p className="text-sm text-zinc-400">{t("characterLabel")}:</p>

        <button
          onClick={() => setModalOpen(true)}
          className="mt-1 w-full text-left px-4 py-3 rounded-xl bg-[var(--btn-bg)] border border-[var(--btn-border)] hover:bg-[var(--btn-hover)]"
        >
          {selectedCharacter ?? "—"}
        </button>
      </div>

      {/* DATA VALUE */}
      <p className="text-sm text-zinc-400 mb-2">
        {t("dataValue")}: {value} / {tierLimit}
      </p>

      <ProgressBar value={value} max={tierLimit} />

      {/* AÇÕES */}
      <div className="mt-6">
        <ActionButtons
          onAction={addAction}
          removalCount={removalCount}
          setRemovalCount={setRemovalCount}
          copyCount={copyCount}
          setCopyCount={setCopyCount}
        />
      </div>

      {/* BOTÕES DE CONTROLE */}
      <div className="flex gap-4 mt-5">
        <button
          onClick={undo}
          className="px-4 py-2 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/40 border border-yellow-500/30 backdrop-blur"
        >
          {t("undo")}
        </button>

        <button
          onClick={resetAll}
          className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 backdrop-blur"
        >
          {t("reset")}
        </button>
      </div>

      {/* HISTÓRICO */}
      <div
        className="mt-6 p-4 rounded-2xl max-h-40 overflow-y-auto text-xs space-y-2"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
        }}
      >
        {history.map((entry, i) => (
          <div key={i} className="text-zinc-300">
            • {entry.label} <span className="opacity-60">({entry.value} pts)</span>
          </div>
        ))}
      </div>

      {/* MODAL DE SELEÇÃO */}
      <CharacterSelectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={setSelectedCharacter}
      />
    </div>
  );
}
