const { resolveOwnerContext } = require('../buttons/_context');
const userSettingsModel = require('../database/userSettingsModel');
const { t } = require('../locales');
const { safeReply } = require('../utils/helpers');

module.exports = {
    customId: 'tv_select_untrust',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang, voiceChannel, tempChannel } = ctx;

        const targetId = interaction.values[0];

        try {
            // نرجع الصلاحية لوضع القناة الحالي (لو القناة عامة يفضل بدون أوفرايت، غير ذلك يتم الحظر الافتراضي)
            if (tempChannel.privacy_mode === 'public') {
                await voiceChannel.permissionOverwrites.delete(targetId).catch(() => {});
            } else {
                await voiceChannel.permissionOverwrites.edit(targetId, {
                    ViewChannel: null,
                    Connect: null,
                });
            }

            await userSettingsModel.removeTrustedUser(interaction.guild.id, interaction.user.id, targetId);

            await safeReply(interaction, t(lang, 'user_untrusted', { user: `<@${targetId}>` }));
        } catch (err) {
            console.error('فشل إزالة الثقة:', err);
            await safeReply(interaction, t(lang, 'error_generic'));
        }
    },
};
