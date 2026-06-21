const { query } = require('./db');

async function createTempChannel(data) {
    const { channelId, guildId, creatorChannelId, ownerId, textChatId, privacyMode } = data;
    const result = await query(
        `INSERT INTO temp_channels (channel_id, guild_id, creator_channel_id, owner_id, text_chat_id, privacy_mode)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [channelId, guildId, creatorChannelId, ownerId, textChatId || null, privacyMode || 'public']
    );
    return result.rows[0];
}

async function getTempChannel(channelId) {
    const result = await query('SELECT * FROM temp_channels WHERE channel_id = $1', [channelId]);
    return result.rows[0] || null;
}

async function getTempChannelsByOwner(guildId, ownerId) {
    const result = await query(
        'SELECT * FROM temp_channels WHERE guild_id = $1 AND owner_id = $2',
        [guildId, ownerId]
    );
    return result.rows;
}

async function updateTempChannelOwner(channelId, newOwnerId) {
    const result = await query(
        'UPDATE temp_channels SET owner_id = $2 WHERE channel_id = $1 RETURNING *',
        [channelId, newOwnerId]
    );
    return result.rows[0];
}

async function updateTempChannel(channelId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return null;
    const setClause = keys.map((k, i) => `${k} = $${i + 2}`).join(', ');
    const values = keys.map((k) => fields[k]);
    const result = await query(
        `UPDATE temp_channels SET ${setClause} WHERE channel_id = $1 RETURNING *`,
        [channelId, ...values]
    );
    return result.rows[0];
}

async function deleteTempChannel(channelId) {
    await query('DELETE FROM temp_channels WHERE channel_id = $1', [channelId]);
}

async function getAllTempChannelsByGuild(guildId) {
    const result = await query('SELECT * FROM temp_channels WHERE guild_id = $1', [guildId]);
    return result.rows;
}

module.exports = {
    createTempChannel,
    getTempChannel,
    getTempChannelsByOwner,
    updateTempChannelOwner,
    updateTempChannel,
    deleteTempChannel,
    getAllTempChannelsByGuild,
};
