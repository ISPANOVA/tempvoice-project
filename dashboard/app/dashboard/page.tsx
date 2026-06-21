"use client";

import { useEffect, useState } from "react";
import { useI18n, formatMessage } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Mic, RefreshCw, Plus, LogOut } from "lucide-react";
import Link from "next/link";

interface UserData {
  id: string;
  username: string;
  avatar: string;
}

interface GuildData {
  id: string;
  name: string;
  icon: string | null;
}

const BOT_INVITE_URL = process.env.NEXT_PUBLIC_BOT_INVITE_URL || "#";

export default function ServerSelectionPage() {
  const { t } = useI18n();
  const [user, setUser] = useState<UserData | null>(null);
  const [guilds, setGuilds] = useState<GuildData[] | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    try {
      const [userRes, guildsRes] = await Promise.all([
        fetch("/api/auth/me").then((r) => r.json()),
        fetch("/api/guilds").then((r) => r.json()),
      ]);
      setUser(userRes);
      setGuilds(guildsRes.guilds || []);
    } catch (err) {
      console.error(err);
      setGuilds([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      <header className="flex items-center justify-between border-b border-[var(--color-border-soft)] px-6 py-5 sm:px-10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent)]">
            <Mic size={16} className="text-white" />
          </div>
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
            {t.appName}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {user && (
            <div className="flex items-center gap-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-1.5 pl-1.5 pr-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={user.avatar} alt={user.username} className="h-6 w-6 rounded-full" />
              <span className="text-sm text-[var(--color-text-secondary)]">{user.username}</span>
            </div>
          )}
          <a
            href="/api/auth/logout"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-[var(--color-text-tertiary)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-danger)]"
            title={t.logout}
          >
            <LogOut size={15} />
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-10">
        <div className="fade-in-up mb-9 flex items-end justify-between gap-4">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">
              {user ? formatMessage(t.selectServerTitle, { name: user.username }) : t.loading}
            </h1>
            <p className="mt-1.5 text-[var(--color-text-secondary)]">{t.selectServerSubtitle}</p>
          </div>
          <button
            onClick={loadData}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
          >
            <RefreshCw size={14} />
            {t.refresh}
          </button>
        </div>

        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)]"
              />
            ))}
          </div>
        )}

        {!loading && guilds && guilds.length === 0 && (
          <div className="fade-in-up flex flex-col items-center rounded-2xl border border-dashed border-[var(--color-border)] px-6 py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-surface)]">
              <Mic size={22} className="text-[var(--color-text-tertiary)]" />
            </div>
            <h3 className="mb-1.5 font-[family-name:var(--font-display)] text-lg font-medium">
              {t.noMutualServers}
            </h3>
            <p className="mb-6 max-w-sm text-sm text-[var(--color-text-secondary)]">{t.noMutualServersDesc}</p>
            <a
              href={BOT_INVITE_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              <Plus size={15} />
              {t.inviteBot}
            </a>
          </div>
        )}

        {!loading && guilds && guilds.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {guilds.map((guild, i) => (
              <Link
                key={guild.id}
                href={`/dashboard/${guild.id}`}
                className="fade-in-up group flex flex-col items-center gap-3 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-5 text-center transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-surface-raised)]"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-full bg-[var(--color-surface-raised)] ring-1 ring-[var(--color-border)] transition-transform group-hover:scale-105">
                  {guild.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={guild.icon} alt={guild.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-text-secondary)]">
                      {guild.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <span className="line-clamp-2 text-sm font-medium leading-tight text-[var(--color-text-primary)]">
                  {guild.name}
                </span>
              </Link>
            ))}

            <a
              href={BOT_INVITE_URL}
              target="_blank"
              rel="noreferrer"
              className="fade-in-up flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-center text-[var(--color-text-tertiary)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-[var(--color-border)]">
                <Plus size={20} />
              </div>
              <span className="text-sm font-medium">{t.inviteBot}</span>
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
