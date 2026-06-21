import { GuildProvider } from "@/lib/guildContext";
import GuildTabsNav from "@/components/dashboard/GuildTabsNav";

export default async function GuildLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ guildId: string }>;
}) {
  const { guildId } = await params;

  return (
    <GuildProvider guildId={guildId}>
      <div className="min-h-screen bg-[var(--color-bg)]">
        <GuildTabsNav />
        <main className="mx-auto max-w-6xl px-6 py-8 pb-32 sm:px-8">{children}</main>
      </div>
    </GuildProvider>
  );
}
