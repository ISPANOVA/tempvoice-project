import { NextRequest, NextResponse } from "next/server";
import { requireGuildAccess, AuthError } from "@/lib/auth";
import { getGuildDetails } from "@/lib/botApi";
import { query, queryOne } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ guildId: string }> }) {
  const { guildId } = await params;

  try {
    await requireGuildAccess(guildId);

    const details = await getGuildDetails(guildId);

    const guildRow = await queryOne<{ language: string; category_id: string | null; log_channel_id: string | null; censor_names: boolean; age_restriction: boolean }>(
      "SELECT language, category_id, log_channel_id, censor_names, age_restriction FROM guilds WHERE guild_id = $1",
      [guildId]
    );

    const creatorChannels = await query(
      "SELECT * FROM creator_channels WHERE guild_id = $1 ORDER BY id ASC",
      [guildId]
    );

    return NextResponse.json({
      ...details,
      settings: guildRow || { language: "en", category_id: null, log_channel_id: null, censor_names: false, age_restriction: false },
      creatorChannels,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("فشل جلب تفاصيل السيرفر:", error);
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
