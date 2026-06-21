const { resolveOwnerContext } = require('../buttons/_context');
const userSettingsModel = require('../database/userSettingsModel');
const { t } = require('../locales');
const { safeReply } = require('../utils/helpers');

module.exports = {
    customId: 'tv_select_trust',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang, voiceChannel } = ctx;

        const targetId = interaction.values[0];

        try {
            await voiceChannel.permissionOverwrites.edit(targetId, {
                ViewChannel: true,
                Connect: true,
            });

            await userSettingsModel.addTrustedUser(interaction.guild.id, interaction.user.id, targetId);

            await safeReply(interaction, t(lang, 'user_trusted', { user: `<@${targetId}>` }));
        } catch (err) {
            console.error('فشل منح الثقة:', err);
            await safeReply(interaction, t(lang, 'error_generic'));
        }
    },
};
