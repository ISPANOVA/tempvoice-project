"use client";

import { useGuild } from "@/lib/guildContext";
import { usePendingChannelSettings } from "@/lib/usePendingChannelSettings";
import { useI18n } from "@/lib/i18n";
import GuildStateGate from "@/components/dashboard/GuildStateGate";
import SettingCard from "@/components/ui/SettingCard";
import Select from "@/components/ui/Select";
import Toggle from "@/components/ui/Toggle";
import SaveBar from "@/components/ui/SaveBar";
import InterfacePreview from "@/components/dashboard/InterfacePreview";
import { MessageSquare, Crown, MonitorSmartphone, Braces } from "lucide-react";

export default function OthersPage() {
  return (
    <GuildStateGate>
      <OthersContent />
    </GuildStateGate>
  );
}

function OthersContent() {
  const { t } = useI18n();
  const { data } = useGuild();
  const { current, hasChanges, saving, setField, save, discard } = usePendingChannelSettings();

  if (!current) return null;

  const roles = data!.roles;

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <SettingCard icon={<MessageSquare size={16} />} title={t.greetingMessage} description={t.greetingMessageDesc}>
            <div className="flex items-start gap-2">
              <textarea
                value={current.greeting_message}
                onChange={(e) => setField("greeting_message", e.target.value)}
                rows={4}
                className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] transition-colors focus:border-[var(--color-accent)]"
              />
              <button
                title="{OWNER_MENTION} {OWNER_NICKNAME} {USER_COUNT}"
                className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-accent)]"
              >
                <Braces size={15} />
              </button>
            </div>
          </SettingCard>

          <SettingCard icon={<Crown size={16} />} title={t.voiceRole} description={t.voiceRoleDesc}>
            <Select value={current.voice_role_id || ""} onChange={(v) => setField("voice_role_id", v || null)}>
              <option value="">{t.selectRole}</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </Select>
          </SettingCard>

          <SettingCard
            icon={<MonitorSmartphone size={16} />}
            title={t.interfaceInChat}
            description={t.interfaceInChatDesc}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-secondary)]">{t.interfaceInChat}</span>
              <Toggle
                checked={current.send_interface_in_chat}
                onChange={(v) => setField("send_interface_in_chat", v)}
              />
            </div>
          </SettingCard>
        </div>

        <InterfacePreview />
      </div>

      <SaveBar visible={hasChanges} saving={saving} onSave={save} onDiscard={discard} />
    </>
  );
}
