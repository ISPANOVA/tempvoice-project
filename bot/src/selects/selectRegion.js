const { resolveOwnerContext } = require('../buttons/_context');
const userSettingsModel = require('../database/userSettingsModel');
const { t } = require('../locales');
const { safeReply } = require('../utils/helpers');
const { VOICE_REGIONS } = require('../utils/constants');

module.exports = {
    customId: 'tv_select_region',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang, voiceChannel } = ctx;

        const regionId = interaction.values[0];

        try {
            await voiceChannel.setRTCRegion(regionId === 'automatic' ? null : regionId);
            await userSettingsModel.upsertUserSettings(interaction.guild.id, interaction.user.id, {
                region: regionId,
            });

            const regionLabel =
                regionId === 'automatic'
                    ? t(lang, 'region_automatic')
                    : VOICE_REGIONS.find((r) => r.id === regionId)?.name || regionId;

            await safeReply(interaction, t(lang, 'region_changed', { region: regionLabel }));
        } catch (err) {
            console.error('فشل تغيير منطقة الصوت:', err);
            await safeReply(interaction, t(lang, 'error_generic'));
        }
    },
};
