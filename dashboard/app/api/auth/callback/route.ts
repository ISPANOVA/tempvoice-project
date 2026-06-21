import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken, fetchDiscordUser } from "@/lib/discord";
import { createSession } from "@/lib/session";
import { query } from "@/lib/db";
import { getAppBaseUrl } from "@/lib/url";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const storedState = req.cookies.get("tv_oauth_state")?.value;

  const baseUrl = getAppBaseUrl();

  // تحقق من الـ state لحماية من هجمات CSRF
  if (!code || !state || !storedState || state !== storedState) {
    return NextResponse.redirect(`${baseUrl}/login?error=invalid_state`);
  }

  try {
    const tokenData = await exchangeCodeForToken(code);
    const user = await fetchDiscordUser(tokenData.access_token);

    await createSession({
      userId: user.id,
      username: user.global_name || user.username,
      discriminator: user.discriminator,
      avatar: user.avatar,
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
    });

    // حفظ/تحديث بيانات اليوزر في قاعدة البيانات
    await query(
      `INSERT INTO dashboard_users (user_id, username, discriminator, avatar, access_token, refresh_token, token_expires)
       VALUES ($1, $2, $3, $4, $5, $6, NOW() + interval '${tokenData.expires_in} seconds')
       ON CONFLICT (user_id) DO UPDATE SET
         username = EXCLUDED.username,
         discriminator = EXCLUDED.discriminator,
         avatar = EXCLUDED.avatar,
         access_token = EXCLUDED.access_token,
         refresh_token = EXCLUDED.refresh_token,
         token_expires = EXCLUDED.token_expires,
         updated_at = NOW()`,
      [
        user.id,
        user.global_name || user.username,
        user.discriminator,
        user.avatar,
        tokenData.access_token,
        tokenData.refresh_token,
      ]
    );

    const res = NextResponse.redirect(`${baseUrl}/dashboard`);
    res.cookies.delete("tv_oauth_state");
    return res;
  } catch (error) {
    console.error("فشل تسجيل الدخول بديسكورد:", error);
    return NextResponse.redirect(`${baseUrl}/login?error=auth_failed`);
  }
}
