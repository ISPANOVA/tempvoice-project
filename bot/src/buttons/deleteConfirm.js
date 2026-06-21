const { resolveOwnerContext } = require('./_context');
const tempChannelModel = require('../database/tempChannelModel');
const { t } = require('../locales');
const { safeReply } = require('../utils/helpers');

module.exports = {
    customId: 'tv_delete_confirm',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang, voiceChannel } = ctx;

        try {
            // لازم نرد على الـ interaction الأول قبل حذف القناة، لأن بعد الحذف
            // أي محاولة رد على تفاعل داخل نفس القناة المحذوفة ستفشل
            await interaction.update({ content: t(lang, 'channel_deleted'), components: [] });
            await tempChannelModel.deleteTempChannel(voiceChannel.id);
            await voiceChannel.delete('Owner requested deletion');
        } catch (err) {
            console.error('فشل حذف القناة:', err);
            try {
                await safeReply(interaction, t(lang, 'error_generic'));
            } catch (_) {}
        }
    },
};
