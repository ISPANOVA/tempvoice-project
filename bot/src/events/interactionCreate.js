const fs = require('fs');
const path = require('path');
const guildModel = require('../database/guildModel');
const tempChannelModel = require('../database/tempChannelModel');
const { t } = require('../locales');

// تحميل كل الـ handlers في خريطة (customId -> handler)
function loadHandlers(dirName) {
    const map = new Map();
    const dirPath = path.join(__dirname, '..', dirName);
    if (!fs.existsSync(dirPath)) return map;

    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.js') && !f.startsWith('_'));
    for (const file of files) {
        const handler = require(path.join(dirPath, file));
        if (handler.customId) {
            map.set(handler.customId, handler);
        }
    }
    return map;
}

const buttonHandlers = loadHandlers('buttons');
const selectHandlers = loadHandlers('selects');
// المودالز موجودة في مجلد selects برضو (modalName, modalLimit) عشان كلها "تأكيد بعد تفاعل"
const modalHandlers = selectHandlers;

/**
 * معالجة قبول/رفض طلب دخول من Waiting Room
 * customId شكله: tv_wr_approve_<channelId>_<userId> أو tv_wr_deny_<channelId>_<userId>
 */
async function handleWaitingRoomDecision(interaction) {
    const isApprove = interaction.customId.startsWith('tv_wr_approve_');
    const prefix = isApprove ? 'tv_wr_approve_' : 'tv_wr_deny_';
    const rest = interaction.customId.slice(prefix.length);
    const [channelId, userId] = rest.split('_');

    const guild =
        interaction.guild || interaction.client.guilds.cache.find((g) => g.channels.cache.has(channelId));
    if (!guild) return interaction.reply({ content: '❌', ephemeral: true });

    const guildData = await guildModel.getOrCreateGuild(guild.id, guild.name);
    const lang = guildData.language || 'en';

    const tempChannel = await tempChannelModel.getTempChannel(channelId);
    if (!tempChannel || tempChannel.owner_id !== interaction.user.id) {
        return interaction.reply({ content: t(lang, 'no_permission'), ephemeral: true });
    }

    const channel = guild.channels.cache.get(channelId);
    const targetMember = await guild.members.fetch(userId).catch(() => null);

    if (isApprove && channel && targetMember) {
        await channel.permissionOverwrites.edit(userId, { ViewChannel: true, Connect: true }).catch(() => {});
        await interaction.update({
            content: t(lang, 'waiting_room_approved', { user: `<@${userId}>` }),
            embeds: [],
            components: [],
        });
    } else {
        await interaction.update({
            content: t(lang, 'waiting_room_denied', { user: `<@${userId}>` }),
            embeds: [],
            components: [],
        });
    }
}

module.exports = {
    name: 'interactionCreate',

    async execute(interaction) {
        try {
            // ----- Slash Commands -----
            if (interaction.isChatInputCommand()) {
                const command = interaction.client.commands.get(interaction.commandName);
                if (!command) return;
                return await command.execute(interaction);
            }

            // ----- Buttons -----
            if (interaction.isButton()) {
                // الأزرار الديناميكية (Waiting Room approve/deny) لها بريفكس ثابت وباقي الآيدي متغير
                if (
                    interaction.customId.startsWith('tv_wr_approve_') ||
                    interaction.customId.startsWith('tv_wr_deny_')
                ) {
                    return await handleWaitingRoomDecision(interaction);
                }

                const handler = buttonHandlers.get(interaction.customId);
                if (handler) return await handler.execute(interaction);
                return;
            }

            // ----- Select Menus (String & User) -----
            if (interaction.isStringSelectMenu() || interaction.isUserSelectMenu()) {
                const handler = selectHandlers.get(interaction.customId);
                if (handler) return await handler.execute(interaction);
                return;
            }

            // ----- Modals -----
            if (interaction.isModalSubmit()) {
                const handler = modalHandlers.get(interaction.customId);
                if (handler) return await handler.execute(interaction);
                return;
            }
        } catch (error) {
            console.error('❌ خطأ أثناء معالجة التفاعل:', error);
            try {
                const guildData = interaction.guild
                    ? await guildModel.getOrCreateGuild(interaction.guild.id, interaction.guild.name)
                    : { language: 'en' };
                const lang = guildData.language || 'en';

                const payload = { content: t(lang, 'error_generic'), ephemeral: true };
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp(payload);
                } else {
                    await interaction.reply(payload);
                }
            } catch (_) {
                // تجاهل أي خطأ ثانوي في إرسال رسالة الخطأ نفسها
            }
        }
    },
};
