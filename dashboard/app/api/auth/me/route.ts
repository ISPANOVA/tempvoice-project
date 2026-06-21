import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { avatarUrl } from "@/lib/discord";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({
    id: session.userId,
    username: session.username,
    avatar: avatarUrl(session.userId, session.avatar),
  });
}
