const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { resolveOwnerContext } = require('./_context');
const { t } = require('../locales');

module.exports = {
    customId: 'tv_name',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang, voiceChannel } = ctx;

        const modal = new ModalBuilder()
            .setCustomId('tv_modal_name')
            .setTitle(t(lang, 'modal_name_title'));

        const input = new TextInputBuilder()
            .setCustomId('new_name')
            .setLabel(t(lang, 'modal_name_label'))
            .setStyle(TextInputStyle.Short)
            .setMaxLength(100)
            .setValue(voiceChannel.name)
            .setRequired(true);

        modal.addComponents(new ActionRowBuilder().addComponents(input));
        await interaction.showModal(modal);
    },
};
