const { PermissionsBitField } = require('discord.js');
const { resolveOwnerContext } = require('./_context');
const { t } = require('../locales');
const { safeReply } = require('../utils/helpers');

module.exports = {
    customId: 'tv_chat',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang, voiceChannel } = ctx;

        const everyoneId = interaction.guild.roles.everyone.id;
        const currentOverwrite = voiceChannel.permissionOverwrites.cache.get(everyoneId);
        const isCurrentlyLocked = currentOverwrite?.deny.has(PermissionsBitField.Flags.SendMessages);

        try {
            await voiceChannel.permissionOverwrites.edit(everyoneId, {
                SendMessages: isCurrentlyLocked ? null : false,
            });

            await safeReply(interaction, t(lang, isCurrentlyLocked ? 'chat_unlocked' : 'chat_locked'));
        } catch (err) {
            console.error('فشل تغيير حالة المحادثة:', err);
            await safeReply(interaction, t(lang, 'error_generic'));
        }
    },
};
