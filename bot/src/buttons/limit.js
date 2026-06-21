const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { resolveOwnerContext } = require('./_context');
const { t } = require('../locales');

module.exports = {
    customId: 'tv_limit',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang, voiceChannel } = ctx;

        const modal = new ModalBuilder()
            .setCustomId('tv_modal_limit')
            .setTitle(t(lang, 'modal_limit_title'));

        const input = new TextInputBuilder()
            .setCustomId('new_limit')
            .setLabel(t(lang, 'modal_limit_label'))
            .setStyle(TextInputStyle.Short)
            .setMaxLength(2)
            .setValue(String(voiceChannel.userLimit || 0))
            .setRequired(true);

        modal.addComponents(new ActionRowBuilder().addComponents(input));
        await interaction.showModal(modal);
    },
};
