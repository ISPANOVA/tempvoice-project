const { ChannelType } = require('discord.js');
const { getBotClient } = require('./botRegistry');
const creatorChannelModel = require('./database/creatorChannelModel');

/**
 * هذه الدوال تطابق وظيفيًا ما كان internalApi.js يقدمه سابقًا عبر HTTP،
 * لكنها الآن استدعاءات مباشرة في الذاكرة (لأن البوت والداشبورد يعملان
 * في نفس عملية Node.js عبر server.js بالمجلد الرئيسي).
 */

function requireClient() {
    const client = getBotClient();
    if (!client) {
        throw new Error('البوت لم يكتمل تسجيل دخوله بعد إلى Discord. حاول مرة أخرى بعد قليل.');
    }
    return client;
}

/** السيرفرات المشتركة بين قائمة آيدي معينة (سيرفرات اليوزر) والبوت */
function getMutualGuilds(userGuildIds) {
    const client = requireClient();
    return client.guilds.cache
        .filter((g) => userGuildIds.includes(g.id))
        .map((g) => ({
            id: g.id,
            name: g.name,
            icon: g.iconURL(),
            memberCount: g.memberCount,
        }));
}

/** تفاصيل سيرفر معين: قنواته ورتبه */
function getGuildDetails(guildId) {
    const client = requireClient();
    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
        const err = new Error('Guild not found or bot not in guild');
        err.status = 404;
        throw err;
    }

    const channels = guild.channels.cache
        .filter(
            (c) =>
                c.type === ChannelType.GuildVoice ||
                c.type === ChannelType.GuildCategory ||
                c.type === ChannelType.GuildText
        )
        .map((c) => ({ id: c.id, name: c.name, type: c.type, parentId: c.parentId }));

    const roles = guild.roles.cache
        .filter((r) => r.id !== guild.id)
        .sort((a, b) => b.position - a.position)
        .map((r) => ({ id: r.id, name: r.name, color: r.hexColor }));

    return {
        id: guild.id,
        name: guild.name,
        icon: guild.iconURL(),
        channels,
        roles,
    };
}

/** حالة إعداد البوت في سيرفر معين (هل تم /setup أم لا) */
async function getGuildSetupStatus(guildId) {
    const creatorChannels = await creatorChannelModel.getCreatorChannelsByGuild(guildId);
    return { isSetup: creatorChannels.length > 0, creatorChannels };
}

function isBotReady() {
    return getBotClient() !== null;
}

module.exports = { getMutualGuilds, getGuildDetails, getGuildSetupStatus, isBotReady };
