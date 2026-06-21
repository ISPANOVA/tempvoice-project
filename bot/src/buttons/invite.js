const { resolveOwnerContext } = require('./_context');
const { t } = require('../locales');
const { safeReply } = require('../utils/helpers');

module.exports = {
    customId: 'tv_invite',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction, { requireOwner: false });
        if (!ctx) return;
        const { lang, voiceChannel } = ctx;

        try {
            const invite = await voiceChannel.createInvite({
                maxAge: 21600, // 6 ساعات
                maxUses: 0,
                unique: true,
            });

            await safeReply(interaction, t(lang, 'invite_link_created', { link: invite.url }));
        } catch (err) {
            console.error('فشل إنشاء رابط الدعوة:', err);
            await safeReply(interaction, t(lang, 'error_generic'));
        }
    },
};
