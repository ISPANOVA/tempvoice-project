const creatorChannelModel = require('../database/creatorChannelModel');
const tempChannelModel = require('../database/tempChannelModel');

module.exports = {
    name: 'channelDelete',

    async execute(channel) {
        try {
            const creatorConfig = await creatorChannelModel.getCreatorChannelByChannelId(channel.id);
            if (creatorConfig) {
                await creatorChannelModel.deleteCreatorChannel(channel.id);
                console.log(`🗑️ تم حذف Creator Channel من الداتابيز: ${channel.id}`);
                return;
            }

            const tempChannel = await tempChannelModel.getTempChannel(channel.id);
            if (tempChannel) {
                await tempChannelModel.deleteTempChannel(channel.id);
            }
        } catch (error) {
            console.error('❌ خطأ في معالجة channelDelete:', error);
        }
    },
};
