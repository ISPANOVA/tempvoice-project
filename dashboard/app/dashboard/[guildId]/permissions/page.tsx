"use client";

import { useGuild } from "@/lib/guildContext";
import { usePendingChannelSettings } from "@/lib/usePendingChannelSettings";
import { useI18n } from "@/lib/i18n";
import GuildStateGate from "@/components/dashboard/GuildStateGate";
import SettingCard from "@/components/ui/SettingCard";
import Select from "@/components/ui/Select";
import SaveBar from "@/components/ui/SaveBar";
import RoleMultiSelect from "@/components/dashboard/RoleMultiSelect";
import CheckboxList from "@/components/dashboard/CheckboxList";
import { Users2, Shield, KeyRound, Crown } from "lucide-react";
import { OWNER_PERMISSIONS_LIST } from "@/types";

export default function PermissionsPage() {
  return (
    <GuildStateGate>
      <PermissionsContent />
    </GuildStateGate>
  );
}

function PermissionsContent() {
  const { t } = useI18n();
  const { data } = useGuild();
  const { current, hasChanges, saving, setField, save, discard } = usePendingChannelSettings();

  if (!current) return null;

  const ownerPermLabels: Record<string, string> = {
    manage_channel: "Manage Channel",
    move_members: "Move Members",
    mute_members: "Mute Members",
    deafen_members: "Deafen Members",
    manage_messages: "Manage Messages",
  };

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-2">
        <SettingCard icon={<Users2 size={16} />} title={t.accessRoles} description={t.accessRolesDesc}>
          <RoleMultiSelect
            roles={data!.roles}
            selected={current.access_roles}
            onChange={(ids) => setField("access_roles", ids)}
            placeholder="@everyone"
          />
        </SettingCard>

        <SettingCard icon={<Shield size={16} />} title={t.privacyModeTitle} description={t.privacyModeDesc}>
          <Select
            value={current.privacy_mode}
            onChange={(v) => setField("privacy_mode", v as "public" | "locked" | "hidden")}
          >
            <option value="public">🌐 {t.privacyPublic}</option>
            <option value="locked">🔒 {t.privacyLocked}</option>
            <option value="hidden">👁️ {t.privacyHidden}</option>
          </Select>
        </SettingCard>

        <SettingCard icon={<KeyRound size={16} />} title={t.syncPermissions} description={t.syncPermissionsDesc}>
          <Select value={current.sync_permissions} onChange={(v) => setField("sync_permissions", v as "none" | "category")}>
            <option value="none">{t.syncNone}</option>
            <option value="category">{t.syncCategory}</option>
          </Select>
        </SettingCard>

        <SettingCard icon={<Crown size={16} />} title={t.ownerPermissions} description={t.ownerPermissionsDesc}>
          <CheckboxList
            options={OWNER_PERMISSIONS_LIST}
            selected={current.owner_permissions}
            onChange={(values) => setField("owner_permissions", values)}
            labels={ownerPermLabels}
          />
        </SettingCard>
      </div>

      <SaveBar visible={hasChanges} saving={saving} onSave={save} onDiscard={discard} />
    </>
  );
}
