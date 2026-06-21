const { PermissionsBitField } = require('discord.js');
const { resolveOwnerContext } = require('../buttons/_context');
const tempChannelModel = require('../database/tempChannelModel');
const { t } = require('../locales');
const { safeReply } = require('../utils/helpers');

module.exports = {
    customId: 'tv_select_privacy',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang, voiceChannel } = ctx;

        const mode = interaction.values[0]; // public / locked / hidden
        const everyoneId = interaction.guild.roles.everyone.id;

        try {
            if (mode === 'public') {
                await voiceChannel.permissionOverwrites.edit(everyoneId, {
                    ViewChannel: null,
                    Connect: null,
                });
            } else if (mode === 'locked') {
                await voiceChannel.permissionOverwrites.edit(everyoneId, {
                    ViewChannel: null,
                    Connect: false,
                });
            } else if (mode === 'hidden') {
                await voiceChannel.permissionOverwrites.edit(everyoneId, {
                    ViewChannel: false,
                    Connect: false,
                });
            }

            await tempChannelModel.updateTempChannel(voiceChannel.id, { privacy_mode: mode });

            const modeLabel = t(lang, `privacy_${mode}`);
            await safeReply(interaction, t(lang, 'privacy_changed', { mode: modeLabel }));
        } catch (err) {
            console.error('فشل تغيير الخصوصية:', err);
            await safeReply(interaction, t(lang, 'error_generic'));
        }
    },
};
