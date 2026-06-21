const { DEFAULT_CENSORED_WORDS, MAX_CHANNEL_NAME_LENGTH } = require('./constants');

/**
 * استبدال المتغيرات الديناميكية في اسم القناة أو رسالة الترحيب
 * المتغيرات المتاحة: {OWNER_NICKNAME} {OWNER_USERNAME} {OWNER_MENTION} {USER_COUNT}
 */
function applyTemplate(template, member, extra = {}) {
    if (!template) return '';
    let result = template;
    result = result.replaceAll('{OWNER_NICKNAME}', member?.displayName || member?.user?.username || 'User');
    result = result.replaceAll('{OWNER_USERNAME}', member?.user?.username || 'User');
    result = result.replaceAll('{OWNER_MENTION}', member ? `<@${member.id}>` : '');
    result = result.replaceAll('{USER_COUNT}', extra.userCount ?? '0');
    return result.slice(0, MAX_CHANNEL_NAME_LENGTH);
}

/**
 * فلترة الكلمات الممنوعة من اسم القناة (لو الميزة مفعّلة في السيرفر)
 */
function censorText(text, customBannedWords = []) {
    const banned = [...DEFAULT_CENSORED_WORDS, ...customBannedWords];
    const lower = text.toLowerCase();
    return banned.some((word) => lower.includes(word.toLowerCase()));
}

/**
 * تحقق هل اليوزر هو مالك القناة المؤقتة المخزنة في الداتابيز
 */
function isChannelOwner(tempChannel, userId) {
    return tempChannel && tempChannel.owner_id === userId;
}

/**
 * تحويل ثواني لشكل قابل للقراءة (يستخدم في بعض الرسائل لو احتجنا)
 */
function formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
}

/**
 * بناء Embed بسيط بلون موحد بدلاً من تكرار الكود
 */
function safeReply(interaction, content, ephemeral = true) {
    const payload = typeof content === 'string' ? { content, ephemeral } : { ...content, ephemeral };
    if (interaction.replied || interaction.deferred) {
        return interaction.followUp(payload);
    }
    return interaction.reply(payload);
}

module.exports = {
    applyTemplate,
    censorText,
    isChannelOwner,
    formatDuration,
    safeReply,
};
