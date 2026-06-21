const tempChannelModel = require('../database/tempChannelModel');
const guildModel = require('../database/guildModel');
const { t } = require('../locales');
const { safeReply } = require('../utils/helpers');

/**
 * دالة موحدة تستخدم في بداية كل button handler:
 * 1. تجيب لغة السيرفر
 * 2. تتأكد إن اليوزر داخل قناة صوتية مؤقتة
 * 3. ترجع كل البيانات اللازمة أو null لو فشل (مع إرسال رسالة الخطأ تلقائيًا)
 */
async function resolveOwnerContext(interaction, { requireOwner = true } = {}) {
    const guildData = await guildModel.getOrCreateGuild(interaction.guild.id, interaction.guild.name);
    const lang = guildData.language || 'en';

    const voiceChannel = interaction.member.voice?.channel;
    if (!voiceChannel) {
        await safeReply(interaction, t(lang, 'not_in_temp_channel'));
        return null;
    }

    const tempChannel = await tempChannelModel.getTempChannel(voiceChannel.id);
    if (!tempChannel) {
        await safeReply(interaction, t(lang, 'not_in_temp_channel'));
        return null;
    }

    if (requireOwner && tempChannel.owner_id !== interaction.user.id) {
        await safeReply(interaction, t(lang, 'not_channel_owner'));
        return null;
    }

    return { lang, voiceChannel, tempChannel, guildData };
}

module.exports = { resolveOwnerContext };
