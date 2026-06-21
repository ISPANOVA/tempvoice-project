const { resolveOwnerContext } = require('../buttons/_context');
const userSettingsModel = require('../database/userSettingsModel');
const { t } = require('../locales');
const { safeReply } = require('../utils/helpers');

module.exports = {
    customId: 'tv_select_unblock',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang, voiceChannel, tempChannel } = ctx;

        const targetId = interaction.values[0];

        try {
            if (tempChannel.privacy_mode === 'public') {
                await voiceChannel.permissionOverwrites.delete(targetId).catch(() => {});
            } else {
                await voiceChannel.permissionOverwrites.edit(targetId, {
                    ViewChannel: null,
                    Connect: null,
                });
            }

            await userSettingsModel.removeBlockedUser(interaction.guild.id, interaction.user.id, targetId);

            await safeReply(interaction, t(lang, 'user_unblocked', { user: `<@${targetId}>` }));
        } catch (err) {
            console.error('فشل فك حظر العضو:', err);
            await safeReply(interaction, t(lang, 'error_generic'));
        }
    },
};
