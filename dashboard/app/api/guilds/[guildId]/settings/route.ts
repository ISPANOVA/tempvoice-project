import { NextRequest, NextResponse } from "next/server";
import { requireGuildAccess, AuthError } from "@/lib/auth";
import { query } from "@/lib/db";

const ALLOWED_FIELDS = ["language", "log_channel_id", "censor_names", "age_restriction"];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ guildId: string }> }) {
  const { guildId } = await params;

  try {
    await requireGuildAccess(guildId);
    const body = await req.json();

    const fields = Object.keys(body).filter((k) => ALLOWED_FIELDS.includes(k));
    if (fields.length === 0) {
      return NextResponse.json({ error: "لا توجد حقول صالحة للتحديث" }, { status: 400 });
    }

    const setClause = fields.map((k, i) => `${k} = $${i + 2}`).join(", ");
    const values = fields.map((k) => body[k]);

    await query(
      `INSERT INTO guilds (guild_id) VALUES ($1)
       ON CONFLICT (guild_id) DO NOTHING`,
      [guildId]
    );

    await query(
      `UPDATE guilds SET ${setClause}, updated_at = NOW() WHERE guild_id = $1`,
      [guildId, ...values]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("فشل تحديث إعدادات السيرفر:", error);
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
