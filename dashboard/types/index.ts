export interface Channel {
  id: string;
  name: string;
  type: number; // 0 = text, 2 = voice, 4 = category (Discord ChannelType)
  parentId: string | null;
}

export interface Role {
  id: string;
  name: string;
  color: string;
}

export interface GuildSettings {
  language: string;
  category_id: string | null;
  log_channel_id: string | null;
  censor_names: boolean;
  age_restriction: boolean;
}

export interface CreatorChannel {
  id: number;
  guild_id: string;
  channel_id: string;
  name_template: string;
  category_id: string | null;
  user_limit: number;
  bitrate: number;
  position: "top" | "bottom";
  privacy_mode: "public" | "locked" | "hidden";
  access_roles: string[];
  sync_permissions: "none" | "category";
  owner_permissions: string[];
  allowed_owner_actions: string[];
  greeting_message: string;
  send_interface_in_chat: boolean;
  recover_settings: string[];
  voice_role_id: string | null;
}

export interface GuildDetailsResponse {
  id: string;
  name: string;
  icon: string | null;
  channels: Channel[];
  roles: Role[];
  settings: GuildSettings;
  creatorChannels: CreatorChannel[];
}

export const OWNER_ACTIONS_LIST = [
  "name",
  "limit",
  "privacy",
  "waiting_room",
  "voice_chat",
  "trust",
  "untrust",
  "invite",
  "kick",
  "region",
  "block",
  "unblock",
  "claim",
  "transfer",
  "delete",
] as const;

export const OWNER_PERMISSIONS_LIST = [
  "manage_channel",
  "move_members",
  "mute_members",
  "deafen_members",
  "manage_messages",
] as const;

export const BITRATE_OPTIONS = [8, 16, 32, 64, 96, 128, 256, 384];
