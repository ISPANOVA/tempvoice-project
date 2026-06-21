"use client";

import { useState, useCallback } from "react";
import { useGuild } from "./guildContext";
import { CreatorChannel } from "@/types";

/**
 * Hook يدير "تغييرات معلقة" على إعدادات Creator Channel الحالية.
 * يسمح بالتعديل المحلي الفوري (تجربة استخدام سريعة) مع حفظ فعلي عند الضغط على "حفظ".
 */
export function usePendingChannelSettings() {
  const { activeCreatorChannel, guildId, updateLocalCreatorChannel, reload } = useGuild();
  const [pending, setPending] = useState<Partial<CreatorChannel>>({});
  const [saving, setSaving] = useState(false);

  const current: CreatorChannel | null = activeCreatorChannel
    ? { ...activeCreatorChannel, ...pending }
    : null;

  const hasChanges = Object.keys(pending).length > 0;

  const setField = useCallback(<K extends keyof CreatorChannel>(key: K, value: CreatorChannel[K]) => {
    setPending((prev) => ({ ...prev, [key]: value }));
  }, []);

  async function save() {
    if (!activeCreatorChannel || !hasChanges) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/guilds/${guildId}/creator-channels/${activeCreatorChannel.channel_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pending),
      });
      if (!res.ok) throw new Error("Failed to save");

      updateLocalCreatorChannel(activeCreatorChannel.channel_id, pending);
      setPending({});
    } finally {
      setSaving(false);
    }
  }

  function discard() {
    setPending({});
  }

  return { current, hasChanges, saving, setField, save, discard };
}
