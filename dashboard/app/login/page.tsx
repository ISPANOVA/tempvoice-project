"use client";

import { useI18n } from "@/lib/i18n";
import DiscordIcon from "@/components/icons/DiscordIcon";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Waveform from "@/components/Waveform";
import { Mic, ShieldCheck, Sparkles } from "lucide-react";

export default function LoginPage() {
  const { t } = useI18n();

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[var(--color-bg)]">
      {/* خلفية شبكية خفيفة + توهج */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-text-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-tertiary) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[780px] -translate-x-1/2 rounded-full bg-[var(--color-accent)] opacity-[0.14] blur-[120px]" />

      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent)]">
            <Mic size={16} className="text-white" />
          </div>
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
            {t.appName}
          </span>
        </div>
        <LanguageSwitcher />
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="fade-in-up w-full max-w-md text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-live)]/30 bg-[var(--color-live-soft)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-live)]">
            <Waveform />
            <span>{t.allFeaturesFree}</span>
          </div>

          <h1 className="mb-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.15] tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
            {t.loginTitle}
          </h1>

          <p className="mx-auto mb-10 max-w-sm text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
            {t.loginSubtitle}
          </p>

          <a
            href="/api/auth/login"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#5865F2] px-6 py-3.5 font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_24px_-8px_rgba(88,101,242,0.55)] transition-all hover:bg-[#4752c4] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_12px_32px_-8px_rgba(88,101,242,0.7)] sm:w-auto sm:px-8"
          >
            <DiscordIcon className="h-5 w-5" />
            {t.loginButton}
          </a>

          <div className="mt-12 grid grid-cols-1 gap-3 text-left sm:grid-cols-3 sm:gap-4">
            <FeaturePill icon={<Sparkles size={15} />} text="4 languages built-in" />
            <FeaturePill icon={<ShieldCheck size={15} />} text="No premium paywalls" />
            <FeaturePill icon={<Mic size={15} />} text="One command setup" />
          </div>
        </div>
      </div>

      <footer className="relative z-10 px-6 py-6 text-center text-xs text-[var(--color-text-tertiary)]">
        Open source &amp; free forever — built for the community
      </footer>
    </main>
  );
}

function FeaturePill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3.5 py-3 text-xs text-[var(--color-text-secondary)]">
      <span className="text-[var(--color-accent)]">{icon}</span>
      {text}
    </div>
  );
}
