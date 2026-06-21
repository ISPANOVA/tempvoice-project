const { resolveOwnerContext } = require('../buttons/_context');
const { t } = require('../locales');
const { safeReply } = require('../utils/helpers');
const { MAX_USER_LIMIT } = require('../utils/constants');

module.exports = {
    customId: 'tv_modal_limit',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang, voiceChannel } = ctx;

        const raw = interaction.fields.getTextInputValue('new_limit').trim();
        const limit = parseInt(raw, 10);

        if (Number.isNaN(limit) || limit < 0 || limit > MAX_USER_LIMIT) {
            return safeReply(interaction, t(lang, 'limit_invalid'));
        }

        try {
            await voiceChannel.setUserLimit(limit);
            await safeReply(
                interaction,
                t(lang, 'limit_changed', { limit: limit === 0 ? t(lang, 'unlimited') : limit })
            );
        } catch (err) {
            console.error('فشل تغيير الحد الأقصى:', err);
            await safeReply(interaction, t(lang, 'error_generic'));
        }
    },
};
