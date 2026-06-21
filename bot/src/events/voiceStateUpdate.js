const creatorChannelModel = require('../database/creatorChannelModel');
const tempChannelModel = require('../database/tempChannelModel');
const userSettingsModel = require('../database/userSettingsModel');
const guildModel = require('../database/guildModel');
const { handleCreatorJoin, handleChannelEmpty } = require('../utils/channelManager');
const { t } = require('../locales');
const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    PermissionsBitField,
} = require('discord.js');
const { BRAND_COLOR } = require('../utils/interfaceBuilder');

module.exports = {
    name: 'voiceStateUpdate',

    async execute(oldState, newState) {
        const guild = newState.guild || oldState.guild;

        try {
            // ===== الحالة 1: عضو دخل قناة (channel join) =====
            if (newState.channelId && newState.channelId !== oldState.channelId) {
                const creatorConfig = await creatorChannelModel.getCreatorChannelByChannelId(newState.channelId);

                if (creatorConfig) {
                    // العضو دخل Creator Channel -> اعمل له قناة جديدة
                    await handleCreatorJoin(newState.member, newState.channel, creatorConfig, guild);
                } else {
                    // تحقق هل العضو دخل قناة مؤقتة فيها Waiting Room مفعّل
                    const tempChannel = await tempChannelModel.getTempChannel(newState.channelId);
                    if (tempChannel && tempChannel.is_waiting_room && tempChannel.owner_id !== newState.member.id) {
                        await handleWaitingRoomRequest(newState, tempChannel, guild);
                    }
                }
            }

            // ===== الحالة 2: عضو غادر قناة (channel leave) =====
            if (oldState.channelId && oldState.channelId !== newState.channelId) {
                const tempChannel = await tempChannelModel.getTempChannel(oldState.channelId);
                if (tempChannel) {
                    const channel = oldState.channel;
                    // لو القناة فاضية تمامًا (لا يوجد أعضاء بشريين)
                    if (channel && channel.members.filter((m) => !m.user.bot).size === 0) {
                        await handleChannelEmpty(channel, tempChannel, guild);
                    }
                }
            }
        } catch (error) {
            console.error('❌ خطأ في voiceStateUpdate:', error);
        }
    },
};

/**
 * يدير طلب الدخول لقناة بها Waiting Room مفعّل
 * يرسل رسالة للمالك بها زرارين قبول/رفض
 */
async function handleWaitingRoomRequest(newState, tempChannel, guild) {
    const guildData = await guildModel.getOrCreateGuild(guild.id, guild.name);
    const lang = guildData.language || 'en';

    const requester = newState.member;

    // افصل العضو فورًا لحد ما المالك يوافق
    await requester.voice.disconnect().catch(() => {});

    const owner = await guild.members.fetch(tempChannel.owner_id).catch(() => null);
    if (!owner) return;

    const embed = new EmbedBuilder()
        .setColor(BRAND_COLOR)
        .setDescription(t(lang, 'waiting_room_request', { user: `<@${requester.id}>` }));

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`tv_wr_approve_${tempChannel.channel_id}_${requester.id}`)
            .setLabel(t(lang, 'waiting_room_approve'))
            .setStyle(ButtonStyle.Success)
            .setEmoji('✅'),
        new ButtonBuilder()
            .setCustomId(`tv_wr_deny_${tempChannel.channel_id}_${requester.id}`)
            .setLabel(t(lang, 'waiting_room_deny'))
            .setStyle(ButtonStyle.Danger)
            .setEmoji('❌')
    );

    try {
        await owner.send({ embeds: [embed], components: [row] });
    } catch (_) {
        // لو الخاص مقفول، حاول ترسل في تشات القناة الصوتية نفسها
        const channel = guild.channels.cache.get(tempChannel.channel_id);
        if (channel) {
            await channel.send({ embeds: [embed], components: [row] }).catch(() => {});
        }
    }
}
