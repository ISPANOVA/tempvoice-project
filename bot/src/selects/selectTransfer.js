const { resolveOwnerContext } = require('../buttons/_context');
const tempChannelModel = require('../database/tempChannelModel');
const { t } = require('../locales');
const { safeReply } = require('../utils/helpers');

module.exports = {
    customId: 'tv_select_transfer',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang, voiceChannel } = ctx;

        const targetId = interaction.values[0];

        if (targetId === interaction.user.id) {
            return safeReply(interaction, t(lang, 'cannot_transfer_self'));
        }

        const memberInChannel = voiceChannel.members.get(targetId);
        if (!memberInChannel) {
            return safeReply(interaction, t(lang, 'target_must_be_in_channel'));
        }

        try {
            await voiceChannel.permissionOverwrites.delete(interaction.user.id).catch(() => {});
            await voiceChannel.permissionOverwrites.edit(targetId, {
                ViewChannel: true,
                Connect: true,
                Speak: true,
                ManageChannels: true,
                MoveMembers: true,
            });

            await tempChannelModel.updateTempChannelOwner(voiceChannel.id, targetId);

            await safeReply(interaction, t(lang, 'ownership_transferred', { user: `<@${targetId}>` }));
        } catch (err) {
            console.error('فشل نقل الملكية:', err);
            await safeReply(interaction, t(lang, 'error_generic'));
        }
    },
};
