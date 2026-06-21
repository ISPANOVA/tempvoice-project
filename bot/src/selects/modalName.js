const { resolveOwnerContext } = require('../buttons/_context');
const { t } = require('../locales');
const { censorText } = require('../utils/helpers');
const guildModel = require('../database/guildModel');
const { safeReply } = require('../utils/helpers');

module.exports = {
    customId: 'tv_modal_name',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang, voiceChannel, guildData } = ctx;

        const newName = interaction.fields.getTextInputValue('new_name').trim();

        if (newName.length === 0 || newName.length > 100) {
            return safeReply(interaction, t(lang, 'name_too_long'));
        }

        if (guildData.censor_names && censorText(newName)) {
            return safeReply(interaction, t(lang, 'name_censored'));
        }

        try {
            await voiceChannel.setName(newName);
            await safeReply(interaction, t(lang, 'name_changed', { name: newName }));
        } catch (err) {
            console.error('فشل تغيير اسم القناة:', err);
            await safeReply(interaction, t(lang, 'error_generic'));
        }
    },
};
