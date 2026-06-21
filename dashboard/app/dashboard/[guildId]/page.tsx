"use client";

import { useGuild } from "@/lib/guildContext";
import { usePendingChannelSettings } from "@/lib/usePendingChannelSettings";
import { useI18n } from "@/lib/i18n";
import GuildStateGate from "@/components/dashboard/GuildStateGate";
import SettingCard from "@/components/ui/SettingCard";
import TextInput from "@/components/ui/TextInput";
import Select from "@/components/ui/Select";
import SaveBar from "@/components/ui/SaveBar";
import { Volume2, FolderOpen, Users, Gauge, ArrowUpDown, Braces } from "lucide-react";
import { BITRATE_OPTIONS } from "@/types";

export default function OverviewPage() {
  return (
    <GuildStateGate>
      <OverviewContent />
    </GuildStateGate>
  );
}

function OverviewContent() {
  const { t } = useI18n();
  const { data } = useGuild();
  const { current, hasChanges, saving, setField, save, discard } = usePendingChannelSettings();

  if (!current) return null;

  const categories = data!.channels.filter((c) => c.type === 4); // GuildCategory

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-2">
        <SettingCard
          icon={<Volume2 size={16} />}
          title={t.creatorChannelName}
          description={t.creatorChannelNameDesc}
        >
          <div className="flex items-center gap-2">
            <TextInput
              value={current.name_template}
              onChange={(v) => setField("name_template", v)}
              placeholder="{OWNER_NICKNAME}'s Channel"
            />
            <button
              title="{OWNER_NICKNAME} {OWNER_MENTION} {USER_COUNT}"
              className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-accent)]"
            >
              <Braces size={15} />
            </button>
          </div>
        </SettingCard>

        <SettingCard
          icon={<FolderOpen size={16} />}
          title={t.creatorChannelCategory}
          description={t.creatorChannelCategoryDesc}
        >
          <Select value={current.category_id || ""} onChange={(v) => setField("category_id", v)}>
            <option value="">—</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </SettingCard>

        <SettingCard
          icon={<Users size={16} />}
          title={t.creatorChannelUserLimit}
          description={t.creatorChannelUserLimitDesc}
        >
          <div className="space-y-3">
            <input
              type="range"
              min={0}
              max={99}
              value={current.user_limit}
              onChange={(e) => setField("user_limit", Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[var(--color-border)] accent-[var(--color-accent)]"
            />
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--color-text-tertiary)]">0</span>
              <span className="rounded-md bg-[var(--color-accent-soft)] px-2 py-1 font-[family-name:var(--font-mono)] text-[var(--color-accent)]">
                {current.user_limit === 0 ? t.unlimited : current.user_limit}
              </span>
              <span className="text-[var(--color-text-tertiary)]">99</span>
            </div>
          </div>
        </SettingCard>

        <SettingCard
          icon={<Gauge size={16} />}
          title={t.creatorChannelBitrate}
          description={t.creatorChannelBitrateDesc}
        >
          <Select value={String(current.bitrate / 1000)} onChange={(v) => setField("bitrate", Number(v) * 1000)}>
            {BITRATE_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}kbps
              </option>
            ))}
          </Select>
        </SettingCard>

        <SettingCard
          icon={<ArrowUpDown size={16} />}
          title={t.creatorChannelPosition}
          description={t.creatorChannelPositionDesc}
        >
          <Select value={current.position} onChange={(v) => setField("position", v as "top" | "bottom")}>
            <option value="top">{t.positionTop}</option>
            <option value="bottom">{t.positionBottom}</option>
          </Select>
        </SettingCard>
      </div>

      <SaveBar visible={hasChanges} saving={saving} onSave={save} onDiscard={discard} />
    </>
  );
}
