const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { resolveOwnerContext } = require('./_context');
const { t } = require('../locales');
const { VOICE_REGIONS } = require('../utils/constants');

module.exports = {
    customId: 'tv_region',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang } = ctx;

        const menu = new StringSelectMenuBuilder()
            .setCustomId('tv_select_region')
            .setPlaceholder(t(lang, 'region_select_title'))
            .addOptions(
                VOICE_REGIONS.map((r) => ({
                    label: r.id === 'automatic' ? t(lang, 'region_automatic') : r.name,
                    value: r.id,
                }))
            );

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(menu)],
            ephemeral: true,
        });
    },
};
