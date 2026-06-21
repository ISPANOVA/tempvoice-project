const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { resolveOwnerContext } = require('./_context');
const { t } = require('../locales');
const { safeReply } = require('../utils/helpers');

module.exports = {
    customId: 'tv_delete',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang } = ctx;

        const confirmRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('tv_delete_confirm')
                .setLabel(t(lang, 'delete_confirm_yes'))
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('tv_delete_cancel')
                .setLabel(t(lang, 'delete_confirm_no'))
                .setStyle(ButtonStyle.Secondary)
        );

        await safeReply(interaction, {
            content: t(lang, 'delete_confirm'),
            components: [confirmRow],
        });
    },
};
