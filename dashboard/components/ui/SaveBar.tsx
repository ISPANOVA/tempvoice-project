"use client";

import { useI18n } from "@/lib/i18n";
import { Check, Loader2 } from "lucide-react";

export default function SaveBar({
  visible,
  saving,
  onSave,
  onDiscard,
}: {
  visible: boolean;
  saving: boolean;
  onSave: () => void;
  onDiscard: () => void;
}) {
  const { t } = useI18n();

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-5">
      <div className="fade-in-up flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        <span className="text-sm text-[var(--color-text-secondary)]">{t.unsavedChanges}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={onDiscard}
            disabled={saving}
            className="rounded-lg px-3.5 py-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface)] disabled:opacity-50"
          >
            {t.cancel}
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)] disabled:opacity-60"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            {saving ? t.saving : t.save}
          </button>
        </div>
      </div>
    </div>
  );
}
