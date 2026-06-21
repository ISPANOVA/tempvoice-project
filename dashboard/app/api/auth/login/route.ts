import { NextRequest, NextResponse } from "next/server";
import { buildDiscordAuthUrl } from "@/lib/discord";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  // state عشوائي لحماية من CSRF أثناء عملية OAuth2
  const state = crypto.randomBytes(16).toString("hex");
  const authUrl = buildDiscordAuthUrl(state);

  const res = NextResponse.redirect(authUrl);
  res.cookies.set("tv_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10, // 10 دقائق كفاية لإكمال عملية الدخول
    path: "/",
  });
  return res;
}
