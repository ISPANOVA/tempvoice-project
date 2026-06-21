const { PermissionsBitField } = require('discord.js');
const { resolveOwnerContext } = require('./_context');
const tempChannelModel = require('../database/tempChannelModel');
const { t } = require('../locales');
const { safeReply } = require('../utils/helpers');

module.exports = {
    customId: 'tv_waiting_room',

    async execute(interaction) {
        const ctx = await resolveOwnerContext(interaction);
        if (!ctx) return;
        const { lang, voiceChannel, tempChannel } = ctx;

        const enabling = !tempChannel.is_waiting_room;

        // عند التفعيل: تمنع الانضمام المباشر لأي شخص غير موثوق (يبقى لازم يطلب دخول)
        // نطبقها عمليًا بمنع Connect للجميع ما عدا المالك والموثوقين، ويتم التعامل مع الطلبات في voiceStateUpdate
        const everyoneOverwrite = enabling
            ? { id: interaction.guild.roles.everyone.id, deny: [PermissionsBitField.Flags.Connect] }
            : { id: interaction.guild.roles.everyone.id, allow: [PermissionsBitField.Flags.Connect] };

        try {
            await voiceChannel.permissionOverwrites.edit(everyoneOverwrite.id, {
                Connect: enabling ? false : tempChannel.privacy_mode === 'public' ? null : false,
            });

            await tempChannelModel.updateTempChannel(voiceChannel.id, { is_waiting_room: enabling });

            await safeReply(
                interaction,
                t(lang, enabling ? 'waiting_room_enabled' : 'waiting_room_disabled')
            );
        } catch (err) {
            console.error('فشل تفعيل/تعطيل غرفة الانتظار:', err);
            await safeReply(interaction, t(lang, 'error_generic'));
        }
    },
};
