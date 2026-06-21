const { resolveOwnerContext } = require('../buttons/_context');
const { t } = require('../locales');
const { safeReply } = require('../utils/helpers');

module.exports = {
    customId: 'tv_select_kick',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang, voiceChannel } = ctx;

        const targetId = interaction.values[0];
        const memberInChannel = voiceChannel.members.get(targetId);

        if (!memberInChannel) {
            return safeReply(interaction, t(lang, 'user_not_in_channel'));
        }

        try {
            await memberInChannel.voice.disconnect();
            await safeReply(interaction, t(lang, 'user_kicked', { user: `<@${targetId}>` }));
        } catch (err) {
            console.error('فشل طرد العضو:', err);
            await safeReply(interaction, t(lang, 'error_generic'));
        }
    },
};
