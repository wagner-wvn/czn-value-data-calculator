"use client";

import { useLang } from "./LanguageProvider";
import { ActionEntry } from "./types";

const removalCosts = [0, 10, 30, 50, 70];
const copyCosts = [0, 10, 30, 50, 70];

function getRemovalCost(removalCount: number, isBasic: boolean) {
  const base = removalCosts[Math.min(removalCount, 4)];
  return base + (isBasic ? 20 : 0);
}

function getCopyCost(copyCount: number) {
  return copyCosts[Math.min(copyCount, 4)];
}

export default function ActionButtons({
  onAction,
  removalCount,
  setRemovalCount,
  copyCount,
  setCopyCount,
}: {
  onAction: (entry: ActionEntry) => void;
  removalCount: number;
  setRemovalCount: (n: number) => void;
  copyCount: number;
  setCopyCount: (n: number) => void;
}) {
  const { t } = useLang();

  const handleRemove = (isBasic: boolean) => {
    const value = getRemovalCost(removalCount, isBasic);

    setRemovalCount((prev) => prev + 1);

    onAction({
      label: isBasic ? t("removeBasic") : t("removeNormal"),
      value,
      type: "removal",
    });
  };

  const handleCopy = () => {
    const value = getCopyCost(copyCount);

    setCopyCount((prev) => prev + 1);

    onAction({
      label: t("copyCardDynamic"),
      value,
      type: "copy",
    });
  };

  const buttons = [
    { key: "neutralCard", value: 20 },
    { key: "divine", value: 20 },
    { key: "epiphany", value: 10 },
    { key: "convertCard", value: 10 },
    { key: "eliteCard", value: 80 },
  ];

  return (
    <div className="flex flex-col gap-6">

    {/* AÇÕES NORMAIS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {buttons.map((btn) => (
        <button
          key={btn.key}
          onClick={() =>
            onAction({
              label: t(btn.key),
              value: btn.value,
              type: "normal",
            })
          }
          className="p-3 rounded-xl bg-[var(--btn-bg)] hover:bg-[var(--btn-hover)] border border-[var(--btn-border)] backdrop-blur text-left text-sm font-medium flex flex-col"
        >
          <div>{t(btn.key)}</div>
          <div className="text-xs opacity-70">+{btn.value} pts</div>
        </button>
      ))}

      {/* BOTÃO DE CÓPIA */}
      <button
        onClick={handleCopy}
        className="p-3 rounded-xl bg-gradient-to-r from-purple-500/40 to-indigo-500/40 hover:from-purple-500/60 hover:to-indigo-500/60 border border-purple-500/20 text-left text-sm font-medium flex flex-col"
      >
        <div>{t("copyCardDynamic")}</div>
        <div className="text-xs opacity-70">+{getCopyCost(copyCount)} pts</div>
      </button>
    </div>

      {/* REMOÇÕES */}
      <div>
        <p className="text-sm text-zinc-400 mb-2">{t("removal")}: {removalCount}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Remoção comum */}
          <button
            onClick={() => handleRemove(false)}
            className="p-3 rounded-xl bg-red-900/40 hover:bg-red-900/60 border border-red-500/20 backdrop-blur text-left text-sm font-medium"
          >
            {t("removeNormal")}
            <div className="text-xs opacity-70">+{getRemovalCost(removalCount, false)} pts</div>
          </button>

          {/* Remoção básica */}
          <button
            onClick={() => handleRemove(true)}
            className="p-3 rounded-xl bg-red-900/40 hover:bg-red-900/60 border border-red-500/20 backdrop-blur text-left text-sm font-medium"
          >
            {t("removeBasic")}
            <div className="text-xs opacity-70">+{getRemovalCost(removalCount, true)} pts</div>
          </button>
        </div>
      </div>
    </div>
  );
}
