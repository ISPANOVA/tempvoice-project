const { ActionRowBuilder, UserSelectMenuBuilder } = require('discord.js');
const { resolveOwnerContext } = require('./_context');
const { t } = require('../locales');

module.exports = {
    customId: 'tv_transfer',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang } = ctx;

        const menu = new UserSelectMenuBuilder()
            .setCustomId('tv_select_transfer')
            .setPlaceholder(t(lang, 'select_user_transfer'))
            .setMinValues(1)
            .setMaxValues(1);

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(menu)],
            ephemeral: true,
        });
    },
};
