const { ActionRowBuilder, UserSelectMenuBuilder } = require('discord.js');
const { resolveOwnerContext } = require('./_context');
const { t } = require('../locales');

module.exports = {
    customId: 'tv_block',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang } = ctx;

        const menu = new UserSelectMenuBuilder()
            .setCustomId('tv_select_block')
            .setPlaceholder(t(lang, 'select_user_block'))
            .setMinValues(1)
            .setMaxValues(1);

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(menu)],
            ephemeral: true,
        });
    },
};
