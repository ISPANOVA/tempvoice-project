"use client";

import { useI18n } from "@/lib/i18n";
import { Mic, RefreshCcw } from "lucide-react";

const BUTTON_ROWS = [
  ["btnName", "btnLimit", "btnPrivacy", "btnWaitingRoom", "btnChat"],
  ["btnTrust", "btnUntrust", "btnInvite", "btnKick", "btnRegion"],
  ["btnBlock", "btnUnblock", "btnClaim", "btnTransfer", "btnDelete"],
] as const;

export default function InterfacePreview() {
  const { t } = useI18n();

  return (
    <div className="fade-in-up flex flex-col rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-[family-name:var(--font-display)] text-[15px] font-semibold">
          {t.interfacePreviewTitle}
        </h3>
        <span className="rounded-full bg-[var(--color-live-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-live)]">
          {t.free}
        </span>
      </div>

      {/* محاكاة Embed ديسكورد */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[#0d1117] p-4">
        <div className="mb-3 flex items-center gap-2.5 border-b border-[var(--color-border-soft)] pb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-accent)]">
            <Mic size={13} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-[var(--color-text-primary)]">TempVoice</span>
          <span className="rounded bg-[var(--color-accent)]/20 px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-accent)]">
            APP
          </span>
        </div>

        <h4 className="mb-1.5 font-[family-name:var(--font-display)] text-base font-semibold text-[var(--color-text-primary)]">
          TempVoice Interface
        </h4>
        <p className="mb-4 text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
          This interface can be used to manage temporary voice channels.
          <br />
          Press the buttons below to use the interface.
        </p>

        <div className="flex flex-col gap-1.5">
          {BUTTON_ROWS.map((row, i) => (
            <div key={i} className="grid grid-cols-5 gap-1.5">
              {row.map((key) => (
                <button
                  key={key}
                  className="truncate rounded-md border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-1.5 py-2 text-[10px] font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-text-tertiary)]"
                >
                  {t[key]}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-xs text-[var(--color-text-tertiary)]">
        <RefreshCcw size={12} />
        {t.interfacePreviewDesc}
      </p>
    </div>
  );
}
