const { query } = require('./db');

async function createCreatorChannel(guildId, channelId, categoryId) {
    const result = await query(
        `INSERT INTO creator_channels (guild_id, channel_id, category_id)
         VALUES ($1, $2, $3) RETURNING *`,
        [guildId, channelId, categoryId]
    );
    return result.rows[0];
}

async function getCreatorChannelByChannelId(channelId) {
    const result = await query('SELECT * FROM creator_channels WHERE channel_id = $1', [channelId]);
    return result.rows[0] || null;
}

async function getCreatorChannelsByGuild(guildId) {
    const result = await query(
        'SELECT * FROM creator_channels WHERE guild_id = $1 ORDER BY id ASC',
        [guildId]
    );
    return result.rows;
}

async function getCreatorChannelById(id) {
    const result = await query('SELECT * FROM creator_channels WHERE id = $1', [id]);
    return result.rows[0] || null;
}

async function updateCreatorChannel(channelId, fields) {
    const keys = Object.keys(fields);
    if (keys.length === 0) return null;

    // الحقول من نوع Array (TEXT[]) محتاجة معاملة خاصة في الإدراج
    const setClause = keys.map((k, i) => `${k} = $${i + 2}`).join(', ');
    const values = keys.map((k) => fields[k]);

    const result = await query(
        `UPDATE creator_channels SET ${setClause}, updated_at = NOW() WHERE channel_id = $1 RETURNING *`,
        [channelId, ...values]
    );
    return result.rows[0];
}

async function deleteCreatorChannel(channelId) {
    await query('DELETE FROM creator_channels WHERE channel_id = $1', [channelId]);
}

module.exports = {
    createCreatorChannel,
    getCreatorChannelByChannelId,
    getCreatorChannelsByGuild,
    getCreatorChannelById,
    updateCreatorChannel,
    deleteCreatorChannel,
};
