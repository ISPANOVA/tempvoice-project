"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { GuildDetailsResponse, CreatorChannel } from "@/types";

interface GuildContextValue {
  guildId: string;
  data: GuildDetailsResponse | null;
  loading: boolean;
  error: string | null;
  activeCreatorChannel: CreatorChannel | null;
  setActiveCreatorChannelId: (channelId: string) => void;
  reload: () => Promise<void>;
  updateLocalCreatorChannel: (channelId: string, fields: Partial<CreatorChannel>) => void;
}

const GuildContext = createContext<GuildContextValue | null>(null);

export function GuildProvider({ guildId, children }: { guildId: string; children: ReactNode }) {
  const [data, setData] = useState<GuildDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/guilds/${guildId}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to load guild data");
      }
      const json: GuildDetailsResponse = await res.json();
      setData(json);
      if (json.creatorChannels.length > 0 && !activeChannelId) {
        setActiveChannelId(json.creatorChannels[0].channel_id);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guildId]);

  useEffect(() => {
    load();
  }, [load]);

  function updateLocalCreatorChannel(channelId: string, fields: Partial<CreatorChannel>) {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        creatorChannels: prev.creatorChannels.map((cc) =>
          cc.channel_id === channelId ? { ...cc, ...fields } : cc
        ),
      };
    });
  }

  const activeCreatorChannel = data?.creatorChannels.find((cc) => cc.channel_id === activeChannelId) ?? data?.creatorChannels[0] ?? null;

  return (
    <GuildContext.Provider
      value={{
        guildId,
        data,
        loading,
        error,
        activeCreatorChannel,
        setActiveCreatorChannelId: setActiveChannelId,
        reload: load,
        updateLocalCreatorChannel,
      }}
    >
      {children}
    </GuildContext.Provider>
  );
}

export function useGuild() {
  const ctx = useContext(GuildContext);
  if (!ctx) throw new Error("useGuild must be used within GuildProvider");
  return ctx;
}
