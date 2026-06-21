const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { resolveOwnerContext } = require('./_context');
const { t } = require('../locales');

module.exports = {
    customId: 'tv_privacy',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang } = ctx;

        const menu = new StringSelectMenuBuilder()
            .setCustomId('tv_select_privacy')
            .setPlaceholder(t(lang, 'privacy_select_title'))
            .addOptions([
                {
                    label: t(lang, 'privacy_public'),
                    description: t(lang, 'privacy_public_desc'),
                    value: 'public',
                    emoji: '🌐',
                },
                {
                    label: t(lang, 'privacy_locked'),
                    description: t(lang, 'privacy_locked_desc'),
                    value: 'locked',
                    emoji: '🔒',
                },
                {
                    label: t(lang, 'privacy_hidden'),
                    description: t(lang, 'privacy_hidden_desc'),
                    value: 'hidden',
                    emoji: '👁️',
                },
            ]);

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(menu)],
            ephemeral: true,
        });
    },
};
