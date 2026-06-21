const { resolveOwnerContext } = require('../buttons/_context');
const userSettingsModel = require('../database/userSettingsModel');
const { t } = require('../locales');
const { safeReply } = require('../utils/helpers');

module.exports = {
    customId: 'tv_select_block',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang, voiceChannel, tempChannel } = ctx;

        const targetId = interaction.values[0];

        if (targetId === interaction.user.id) {
            return safeReply(interaction, t(lang, 'cannot_block_self'));
        }
        if (targetId === tempChannel.owner_id) {
            return safeReply(interaction, t(lang, 'cannot_block_owner'));
        }

        try {
            await voiceChannel.permissionOverwrites.edit(targetId, {
                ViewChannel: false,
                Connect: false,
            });

            // طرد العضو لو موجود حاليًا داخل القناة
            const memberInChannel = voiceChannel.members.get(targetId);
            if (memberInChannel) {
                await memberInChannel.voice.disconnect().catch(() => {});
            }

            await userSettingsModel.addBlockedUser(interaction.guild.id, interaction.user.id, targetId);

            await safeReply(interaction, t(lang, 'user_blocked', { user: `<@${targetId}>` }));
        } catch (err) {
            console.error('فشل حظر العضو:', err);
            await safeReply(interaction, t(lang, 'error_generic'));
        }
    },
};
