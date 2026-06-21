import { NextRequest, NextResponse } from "next/server";
import { requireGuildAccess, AuthError } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";

const ALLOWED_FIELDS = [
  "name_template",
  "category_id",
  "user_limit",
  "bitrate",
  "position",
  "privacy_mode",
  "access_roles",
  "sync_permissions",
  "owner_permissions",
  "allowed_owner_actions",
  "greeting_message",
  "send_interface_in_chat",
  "recover_settings",
  "voice_role_id",
];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ guildId: string; channelId: string }> }
) {
  const { guildId, channelId } = await params;

  try {
    await requireGuildAccess(guildId);

    // تأكد إن القناة دي فعلاً تابعة لهذا السيرفر (حماية من تعديل قنوات سيرفرات أخرى)
    const existing = await queryOne(
      "SELECT id FROM creator_channels WHERE channel_id = $1 AND guild_id = $2",
      [channelId, guildId]
    );
    if (!existing) {
      return NextResponse.json({ error: "القناة غير موجودة" }, { status: 404 });
    }

    const body = await req.json();
    const fields = Object.keys(body).filter((k) => ALLOWED_FIELDS.includes(k));
    if (fields.length === 0) {
      return NextResponse.json({ error: "لا توجد حقول صالحة للتحديث" }, { status: 400 });
    }

    const setClause = fields.map((k, i) => `${k} = $${i + 2}`).join(", ");
    const values = fields.map((k) => body[k]);

    const updated = await query(
      `UPDATE creator_channels SET ${setClause}, updated_at = NOW() WHERE channel_id = $1 RETURNING *`,
      [channelId, ...values]
    );

    return NextResponse.json({ success: true, creatorChannel: updated[0] });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("فشل تحديث إعدادات القناة:", error);
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ guildId: string; channelId: string }> }
) {
  const { guildId, channelId } = await params;

  try {
    await requireGuildAccess(guildId);
    await query("DELETE FROM creator_channels WHERE channel_id = $1 AND guild_id = $2", [channelId, guildId]);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("فشل حذف القناة:", error);
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
