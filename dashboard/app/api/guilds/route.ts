import { NextResponse } from "next/server";
import { requireSession, AuthError } from "@/lib/auth";
import { fetchUserGuilds, hasManageGuildPermission, guildIconUrl, refreshAccessToken } from "@/lib/discord";
import { getMutualGuilds } from "@/lib/botApi";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const session = await requireSession();

    let accessToken = session.accessToken;
    let userGuilds;
    try {
      userGuilds = await fetchUserGuilds(accessToken);
    } catch {
      const refreshed = await refreshAccessToken(session.refreshToken);
      accessToken = refreshed.access_token;
      userGuilds = await fetchUserGuilds(accessToken);
      await query(
        `UPDATE dashboard_users SET access_token = $2, refresh_token = $3 WHERE user_id = $1`,
        [session.userId, refreshed.access_token, refreshed.refresh_token]
      );
    }

    // فلترة على السيرفرات اللي اليوزر معاه صلاحية Manage Server فيها فقط
    const manageableGuilds = userGuilds.filter((g) => hasManageGuildPermission(g.permissions));

    // تقاطعها مع السيرفرات اللي البوت فعليًا موجود فيها
    const mutualGuilds = await getMutualGuilds(manageableGuilds.map((g) => g.id));
    const mutualIds = new Set(mutualGuilds.map((g) => g.id));

    const result = manageableGuilds
      .filter((g) => mutualIds.has(g.id))
      .map((g) => ({
        id: g.id,
        name: g.name,
        icon: guildIconUrl(g.id, g.icon),
      }));

    return NextResponse.json({ guilds: result });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("فشل جلب السيرفرات:", error);
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
