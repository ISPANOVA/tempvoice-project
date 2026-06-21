"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { useGuild } from "@/lib/guildContext";
import { Eye, ShieldCheck, Gavel, Sliders, ChevronLeft, ChevronRight } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function GuildTabsNav() {
  const { t, dir } = useI18n();
  const { guildId, data } = useGuild();
  const pathname = usePathname();

  const tabs = [
    { href: `/dashboard/${guildId}`, label: t.navOverview, icon: Eye },
    { href: `/dashboard/${guildId}/permissions`, label: t.navPermissions, icon: ShieldCheck },
    { href: `/dashboard/${guildId}/moderation`, label: t.navModeration, icon: Gavel },
    { href: `/dashboard/${guildId}/others`, label: t.navOthers, icon: Sliders },
  ];

  const BackIcon = dir === "rtl" ? ChevronRight : ChevronLeft;

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border-soft)] bg-[var(--color-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-text-tertiary)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
          >
            <BackIcon size={17} />
          </Link>
          {data?.icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.icon} alt={data.name} className="h-7 w-7 rounded-full" />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-surface-raised)] text-[10px] font-semibold text-[var(--color-text-secondary)]">
              {data?.name?.slice(0, 2).toUpperCase()}
            </div>
          )}
          <span className="hidden font-[family-name:var(--font-display)] text-sm font-medium text-[var(--color-text-primary)] sm:inline">
            {data?.name}
          </span>
        </div>
        <LanguageSwitcher />
      </div>

      <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6 sm:px-8">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "text-[var(--color-text-primary)]"
                  : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
              }`}
            >
              <Icon size={15} />
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-[var(--color-accent)]" />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
