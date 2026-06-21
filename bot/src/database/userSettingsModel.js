const { query } = require('./db');

async function getUserSettings(guildId, userId) {
    const result = await query(
        'SELECT * FROM user_channel_settings WHERE guild_id = $1 AND user_id = $2',
        [guildId, userId]
    );
    return result.rows[0] || null;
}

async function upsertUserSettings(guildId, userId, fields) {
    const existing = await getUserSettings(guildId, userId);
    if (existing) {
        const keys = Object.keys(fields);
        if (keys.length === 0) return existing;
        const setClause = keys.map((k, i) => `${k} = $${i + 3}`).join(', ');
        const values = keys.map((k) => fields[k]);
        const result = await query(
            `UPDATE user_channel_settings SET ${setClause}, updated_at = NOW()
             WHERE guild_id = $1 AND user_id = $2 RETURNING *`,
            [guildId, userId, ...values]
        );
        return result.rows[0];
    } else {
        const result = await query(
            `INSERT INTO user_channel_settings (guild_id, user_id, channel_name, user_limit, privacy_mode, trusted_users, blocked_users, is_locked, is_hidden, region)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [
                guildId,
                userId,
                fields.channel_name || null,
                fields.user_limit ?? null,
                fields.privacy_mode || null,
                fields.trusted_users || [],
                fields.blocked_users || [],
                fields.is_locked ?? false,
                fields.is_hidden ?? false,
                fields.region || null,
            ]
        );
        return result.rows[0];
    }
}

async function addTrustedUser(guildId, userId, targetId) {
    const settings = await getUserSettings(guildId, userId);
    const trusted = new Set(settings?.trusted_users || []);
    trusted.add(targetId);
    const blocked = new Set(settings?.blocked_users || []);
    blocked.delete(targetId); // لو كان مبلوك، نشيله من البلوك
    return upsertUserSettings(guildId, userId, {
        trusted_users: Array.from(trusted),
        blocked_users: Array.from(blocked),
    });
}

async function removeTrustedUser(guildId, userId, targetId) {
    const settings = await getUserSettings(guildId, userId);
    const trusted = new Set(settings?.trusted_users || []);
    trusted.delete(targetId);
    return upsertUserSettings(guildId, userId, { trusted_users: Array.from(trusted) });
}

async function addBlockedUser(guildId, userId, targetId) {
    const settings = await getUserSettings(guildId, userId);
    const blocked = new Set(settings?.blocked_users || []);
    blocked.add(targetId);
    const trusted = new Set(settings?.trusted_users || []);
    trusted.delete(targetId);
    return upsertUserSettings(guildId, userId, {
        blocked_users: Array.from(blocked),
        trusted_users: Array.from(trusted),
    });
}

async function removeBlockedUser(guildId, userId, targetId) {
    const settings = await getUserSettings(guildId, userId);
    const blocked = new Set(settings?.blocked_users || []);
    blocked.delete(targetId);
    return upsertUserSettings(guildId, userId, { blocked_users: Array.from(blocked) });
}

module.exports = {
    getUserSettings,
    upsertUserSettings,
    addTrustedUser,
    removeTrustedUser,
    addBlockedUser,
    removeBlockedUser,
};
