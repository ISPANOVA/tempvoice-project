const tempChannelModel = require('../database/tempChannelModel');
const guildModel = require('../database/guildModel');
const { t } = require('../locales');
const { safeReply } = require('../utils/helpers');

module.exports = {
    customId: 'tv_claim',

    async execute(interaction) {
        const guildData = await guildModel.getOrCreateGuild(interaction.guild.id, interaction.guild.name);
        const lang = guildData.language || 'en';

        const voiceChannel = interaction.member.voice?.channel;
        if (!voiceChannel) {
            return safeReply(interaction, t(lang, 'claim_not_in_channel'));
        }

        const tempChannel = await tempChannelModel.getTempChannel(voiceChannel.id);
        if (!tempChannel) {
            return safeReply(interaction, t(lang, 'not_in_temp_channel'));
        }

        // تحقق هل المالك الحالي لا يزال داخل القناة
        const ownerStillPresent = voiceChannel.members.has(tempChannel.owner_id);
        if (ownerStillPresent) {
            return safeReply(interaction, t(lang, 'claim_owner_present'));
        }

        try {
            // إزالة صلاحيات المالك القديم وإعطاء الصلاحيات للمالك الجديد
            await voiceChannel.permissionOverwrites.delete(tempChannel.owner_id).catch(() => {});
            await voiceChannel.permissionOverwrites.edit(interaction.user.id, {
                ViewChannel: true,
                Connect: true,
                Speak: true,
                ManageChannels: true,
                MoveMembers: true,
            });

            await tempChannelModel.updateTempChannelOwner(voiceChannel.id, interaction.user.id);

            await safeReply(interaction, t(lang, 'claim_no_owner'));
        } catch (err) {
            console.error('فشل استلام القناة:', err);
            await safeReply(interaction, t(lang, 'error_generic'));
        }
    },
};
