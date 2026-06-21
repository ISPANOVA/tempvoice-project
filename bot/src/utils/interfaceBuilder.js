const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require('discord.js');
const { t } = require('../locales');

const BRAND_COLOR = 0x5865f2; // لون أساسي أنيق (نفس روح ديسكورد) - قابل للتخصيص لاحقًا

/**
 * بناء Embed واجهة التحكم
 */
function buildInterfaceEmbed(lang) {
    return new EmbedBuilder()
        .setColor(BRAND_COLOR)
        .setTitle(t(lang, 'interface_title'))
        .setDescription(t(lang, 'interface_desc'))
        .setFooter({ text: 'TempVoice Clone • Free & Open Source' });
}

/**
 * بناء كل صفوف الأزرار (3 صفوف × 5 أزرار = نفس شكل الصورة الأصلية)
 * customId format: tv_<action>
 */
function buildInterfaceButtons(lang) {
    const row1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('tv_name').setLabel(t(lang, 'btn_name')).setEmoji('✏️').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('tv_limit').setLabel(t(lang, 'btn_limit')).setEmoji('👥').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('tv_privacy').setLabel(t(lang, 'btn_privacy')).setEmoji('🛡️').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('tv_waiting_room').setLabel(t(lang, 'btn_waiting_room')).setEmoji('⏳').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('tv_chat').setLabel(t(lang, 'btn_chat')).setEmoji('💬').setStyle(ButtonStyle.Secondary)
    );

    const row2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('tv_trust').setLabel(t(lang, 'btn_trust')).setEmoji('🤝').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('tv_untrust').setLabel(t(lang, 'btn_untrust')).setEmoji('🚫').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('tv_invite').setLabel(t(lang, 'btn_invite')).setEmoji('📩').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('tv_kick').setLabel(t(lang, 'btn_kick')).setEmoji('👋').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('tv_region').setLabel(t(lang, 'btn_region')).setEmoji('🌍').setStyle(ButtonStyle.Secondary)
    );

    const row3 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('tv_block').setLabel(t(lang, 'btn_block')).setEmoji('⛔').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('tv_unblock').setLabel(t(lang, 'btn_unblock')).setEmoji('✅').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('tv_claim').setLabel(t(lang, 'btn_claim')).setEmoji('👑').setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId('tv_transfer').setLabel(t(lang, 'btn_transfer')).setEmoji('🔁').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId('tv_delete').setLabel(t(lang, 'btn_delete')).setEmoji('🗑️').setStyle(ButtonStyle.Danger)
    );

    return [row1, row2, row3];
}

function buildInterfaceMessage(lang) {
    return {
        embeds: [buildInterfaceEmbed(lang)],
        components: buildInterfaceButtons(lang),
    };
}

module.exports = { buildInterfaceEmbed, buildInterfaceButtons, buildInterfaceMessage, BRAND_COLOR };
