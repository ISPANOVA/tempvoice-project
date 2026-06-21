"use client";

import { useGuild } from "@/lib/guildContext";
import { useI18n } from "@/lib/i18n";
import { Loader2, AlertTriangle } from "lucide-react";

export default function GuildStateGate({ children }: { children: React.ReactNode }) {
  const { loading, error, data } = useGuild();
  const { t } = useI18n();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-32 text-[var(--color-text-tertiary)]">
        <Loader2 size={22} className="animate-spin" />
        <span className="text-sm">{t.loading}</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-32 text-center">
        <AlertTriangle size={22} className="text-[var(--color-danger)]" />
        <span className="max-w-sm text-sm text-[var(--color-text-secondary)]">{error || t.errorGeneric}</span>
      </div>
    );
  }

  return <>{children}</>;
}
