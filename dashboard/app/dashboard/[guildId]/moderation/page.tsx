"use client";

import { useState, useEffect } from "react";
import { useGuild } from "@/lib/guildContext";
import { usePendingChannelSettings } from "@/lib/usePendingChannelSettings";
import { useI18n } from "@/lib/i18n";
import GuildStateGate from "@/components/dashboard/GuildStateGate";
import SettingCard from "@/components/ui/SettingCard";
import TextInput from "@/components/ui/TextInput";
import Toggle from "@/components/ui/Toggle";
import SaveBar from "@/components/ui/SaveBar";
import CheckboxList from "@/components/dashboard/CheckboxList";
import { Settings2, RotateCcw, FileText, Ban, ShieldAlert } from "lucide-react";
import { OWNER_ACTIONS_LIST } from "@/types";

const RECOVER_FIELDS = ["name", "user_limit", "trusted_blocked", "privacy_mode", "region"];

export default function ModerationPage() {
  return (
    <GuildStateGate>
      <ModerationContent />
    </GuildStateGate>
  );
}

function ModerationContent() {
  const { t } = useI18n();
  const { guildId, data, reload } = useGuild();
  const { current, hasChanges, saving, setField, save, discard } = usePendingChannelSettings();

  const [guildSettings, setGuildSettings] = useState(data?.settings);
  const [guildSaving, setGuildSaving] = useState(false);

  useEffect(() => {
    setGuildSettings(data?.settings);
  }, [data?.settings]);

  if (!current || !guildSettings) return null;

  const actionLabels: Record<string, string> = {
    name: t.btnName,
    limit: t.btnLimit,
    privacy: t.btnPrivacy,
    waiting_room: t.btnWaitingRoom,
    voice_chat: t.btnChat,
    trust: t.btnTrust,
    untrust: t.btnUntrust,
    invite: t.btnInvite,
    kick: t.btnKick,
    region: t.btnRegion,
    block: t.btnBlock,
    unblock: t.btnUnblock,
    claim: t.btnClaim,
    transfer: t.btnTransfer,
    delete: t.btnDelete,
  };

  const recoverLabels: Record<string, string> = {
    name: t.btnName,
    user_limit: t.btnLimit,
    trusted_blocked: "Trusted & Blocked",
    privacy_mode: t.btnPrivacy,
    region: t.btnRegion,
  };

  async function saveGuildField(field: "censor_names" | "age_restriction" | "log_channel_id", value: boolean | string) {
    setGuildSettings((prev) => (prev ? { ...prev, [field]: value } : prev));
    setGuildSaving(true);
    try {
      await fetch(`/api/guilds/${guildId}/settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
    } finally {
      setGuildSaving(false);
    }
  }

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-2">
        <SettingCard icon={<Settings2 size={16} />} title={t.toggleFeatures} description={t.toggleFeaturesDesc}>
          <CheckboxList
            options={OWNER_ACTIONS_LIST}
            selected={current.allowed_owner_actions}
            onChange={(values) => setField("allowed_owner_actions", values)}
            labels={actionLabels}
          />
        </SettingCard>

        <div className="flex flex-col gap-5">
          <SettingCard icon={<RotateCcw size={16} />} title={t.recoverSettings} description={t.recoverSettingsDesc}>
            <CheckboxList
              options={RECOVER_FIELDS}
              selected={current.recover_settings}
              onChange={(values) => setField("recover_settings", values)}
              labels={recoverLabels}
            />
          </SettingCard>

          <SettingCard icon={<FileText size={16} />} title={t.moderationLog} description={t.moderationLogDesc}>
            <TextInput
              value={guildSettings.log_channel_id || ""}
              onChange={(v) => setGuildSettings((prev) => (prev ? { ...prev, log_channel_id: v } : prev))}
              onBlurCommit={() => saveGuildField("log_channel_id", guildSettings.log_channel_id || "")}
              placeholder="https://discord.com/api/webhooks/..."
            />
          </SettingCard>

          <SettingCard icon={<Ban size={16} />} title={t.censorNames} description={t.censorNamesDesc}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-secondary)]">{t.viewSettings}</span>
              <Toggle
                checked={guildSettings.censor_names}
                onChange={(v) => saveGuildField("censor_names", v)}
                disabled={guildSaving}
              />
            </div>
          </SettingCard>

          <SettingCard icon={<ShieldAlert size={16} />} title={t.ageRestriction} description={t.ageRestrictionDesc}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-secondary)]">{t.ageRestriction}</span>
              <Toggle
                checked={guildSettings.age_restriction}
                onChange={(v) => saveGuildField("age_restriction", v)}
                disabled={guildSaving}
              />
            </div>
          </SettingCard>
        </div>
      </div>

      <SaveBar visible={hasChanges} saving={saving} onSave={save} onDiscard={discard} />
    </>
  );
}
