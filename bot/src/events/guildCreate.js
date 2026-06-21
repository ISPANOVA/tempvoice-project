const guildModel = require('../database/guildModel');

module.exports = {
    name: 'guildCreate',

    async execute(guild) {
        try {
            await guildModel.getOrCreateGuild(guild.id, guild.name, guild.iconURL());
            console.log(`✅ تم الانضمام لسيرفر جديد: ${guild.name} (${guild.id})`);
        } catch (error) {
            console.error('❌ خطأ في معالجة guildCreate:', error);
        }
    },
};
