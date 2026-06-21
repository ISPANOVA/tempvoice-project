const { query } = require('./db');

/**
 * جلب بيانات سيرفر، ولو غير موجود يتم إنشاؤه بإعدادات افتراضية
 */
async function getOrCreateGuild(guildId, guildName = null, guildIcon = null) {
    const existing = await query('SELECT * FROM guilds WHERE guild_id = $1', [guildId]);
    if (existing.rows.length > 0) {
        return existing.rows[0];
    }
    const result = await query(
        `INSERT INTO guilds (guild_id, guild_name, guild_icon)
         VALUES ($1, $2, $3) RETURNING *`,
        [guildId, guildName, guildIcon]
    );
    return result.rows[0];
}

async function getGuild(guildId) {
    const result = await query('SELECT * FROM guilds WHERE guild_id = $1', [guildId]);
    return result.rows[0] || null;
}

async function updateGuild(guildId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return null;
    const setClause = keys.map((k, i) => `${k} = $${i + 2}`).join(', ');
    const values = keys.map((k) => fields[k]);
    const result = await query(
        `UPDATE guilds SET ${setClause}, updated_at = NOW() WHERE guild_id = $1 RETURNING *`,
        [guildId, ...values]
    );
    return result.rows[0];
}

async function setGuildLanguage(guildId, language) {
    return updateGuild(guildId, { language });
}

module.exports = {
    getOrCreateGuild,
    getGuild,
    updateGuild,
    setGuildLanguage,
};
