const DISCORD_API = "https://discord.com/api/v10";

export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  global_name: string | null;
}

export interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

function getOAuthConfig() {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error(
      "متغيرات DISCORD_CLIENT_ID / DISCORD_CLIENT_SECRET / DISCORD_REDIRECT_URI غير معرّفة في .env"
    );
  }
  return { clientId, clientSecret, redirectUri };
}

/** بناء رابط تسجيل الدخول بديسكورد */
export function buildDiscordAuthUrl(state: string) {
  const { clientId, redirectUri } = getOAuthConfig();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "identify guilds",
    state,
  });
  return `https://discord.com/oauth2/authorize?${params.toString()}`;
}

/** تبديل كود الـ OAuth2 بتوكنات الوصول */
export async function exchangeCodeForToken(code: string): Promise<TokenResponse> {
  const { clientId, clientSecret, redirectUri } = getOAuthConfig();

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });

  const res = await fetch(`${DISCORD_API}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    throw new Error(`فشل تبديل كود OAuth2: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

/** تجديد توكن الوصول باستخدام refresh token */
export async function refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
  const { clientId, clientSecret } = getOAuthConfig();

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const res = await fetch(`${DISCORD_API}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    throw new Error(`فشل تجديد التوكن: ${res.status}`);
  }
  return res.json();
}

/** جلب بيانات اليوزر الحالي */
export async function fetchDiscordUser(accessToken: string): Promise<DiscordUser> {
  const res = await fetch(`${DISCORD_API}/users/@me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`فشل جلب بيانات المستخدم: ${res.status}`);
  return res.json();
}

/** جلب قائمة السيرفرات التي اليوزر عضو فيها */
export async function fetchUserGuilds(accessToken: string): Promise<DiscordGuild[]> {
  const res = await fetch(`${DISCORD_API}/users/@me/guilds`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`فشل جلب سيرفرات المستخدم: ${res.status}`);
  return res.json();
}

/** تحقق هل اليوزر معه صلاحية Manage Server (المطلوبة للتحكم في الداشبورد) */
export function hasManageGuildPermission(permissions: string): boolean {
  const MANAGE_GUILD = BigInt(0x20);
  const ADMINISTRATOR = BigInt(0x8);
  const perms = BigInt(permissions);
  return (perms & MANAGE_GUILD) === MANAGE_GUILD || (perms & ADMINISTRATOR) === ADMINISTRATOR;
}

export function avatarUrl(userId: string, avatar: string | null, size = 128) {
  if (!avatar) {
    // أفاتار افتراضي من ديسكورد
    return `https://cdn.discordapp.com/embed/avatars/${Number(BigInt(userId) % BigInt(5))}.png`;
  }
  const ext = avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.${ext}?size=${size}`;
}

export function guildIconUrl(guildId: string, icon: string | null, size = 128) {
  if (!icon) return null;
  const ext = icon.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/icons/${guildId}/${icon}.${ext}?size=${size}`;
}
