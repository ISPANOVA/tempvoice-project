import { getSession, SessionPayload } from "./session";
import { fetchUserGuilds, hasManageGuildPermission, refreshAccessToken } from "./discord";
import { query } from "./db";

/** يجلب جلسة المستخدم الحالية أو يرمي خطأ 401 */
export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    throw new AuthError("لم يتم تسجيل الدخول", 401);
  }
  return session;
}

export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/**
 * تتأكد إن اليوزر صاحب صلاحية Manage Server على السيرفر المطلوب،
 * عن طريق سحب قائمة سيرفراته من Discord API مباشرة (مصدر الحقيقة الوحيد)
 */
export async function requireGuildAccess(guildId: string): Promise<SessionPayload> {
  const session = await requireSession();

  let accessToken = session.accessToken;
  let guilds;

  try {
    guilds = await fetchUserGuilds(accessToken);
  } catch {
    // التوكن منتهي، نحاول نجدده
    const refreshed = await refreshAccessToken(session.refreshToken);
    accessToken = refreshed.access_token;
    guilds = await fetchUserGuilds(accessToken);

    // تحديث التوكنات في قاعدة البيانات
    await query(
      `UPDATE dashboard_users SET access_token = $2, refresh_token = $3, token_expires = NOW() + interval '${refreshed.expires_in} seconds'
       WHERE user_id = $1`,
      [session.userId, refreshed.access_token, refreshed.refresh_token]
    );
  }

  const targetGuild = guilds.find((g) => g.id === guildId);
  if (!targetGuild || !hasManageGuildPermission(targetGuild.permissions)) {
    throw new AuthError("لا تملك صلاحية إدارة هذا السيرفر", 403);
  }

  return session;
}
