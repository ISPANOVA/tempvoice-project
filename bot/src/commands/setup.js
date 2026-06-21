const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChannelType,
    EmbedBuilder,
} = require('discord.js');
const guildModel = require('../database/guildModel');
const creatorChannelModel = require('../database/creatorChannelModel');
const { t } = require('../locales');
const { buildInterfaceMessage, BRAND_COLOR } = require('../utils/interfaceBuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Setup TempVoice easily with an assistant within seconds / إعداد TempVoice بسهولة في ثوانٍ')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

    async execute(interaction) {
        const guild = interaction.guild;
        const member = interaction.member;

        if (!member.permissions.has(PermissionFlagsBits.ManageGuild)) {
            const guildData = await guildModel.getOrCreateGuild(guild.id, guild.name, guild.iconURL());
            return interaction.reply({
                content: t(guildData.language, 'setup_no_permission'),
                ephemeral: true,
            });
        }

        await interaction.deferReply({ ephemeral: true });

        const guildData = await guildModel.getOrCreateGuild(guild.id, guild.name, guild.iconURL());
        const lang = guildData.language || 'en';

        // تشييك: لو فيه Creator Channel موجودة فعلاً
        const existing = await creatorChannelModel.getCreatorChannelsByGuild(guild.id);
        if (existing.length > 0) {
            return interaction.editReply({ content: t(lang, 'setup_already_done') });
        }

        try {
            // الخطوة 1: إنشاء الكاتيجوري
            const category = await guild.channels.create({
                name: 'TEMPVOICE CATEGORY',
                type: ChannelType.GuildCategory,
            });

            // الخطوة 2: إنشاء قناة الإنترفيس (نصية)
            const interfaceChannel = await guild.channels.create({
                name: '✨┃interface',
                type: ChannelType.GuildText,
                parent: category.id,
            });

            // الخطوة 3: إنشاء Creator Channel (صوتية)
            const creatorVoice = await guild.channels.create({
                name: '🔊┃Creator Channel',
                type: ChannelType.GuildVoice,
                parent: category.id,
            });

            // حفظ في الداتابيز
            await guildModel.updateGuild(guild.id, { category_id: category.id });
            await creatorChannelModel.createCreatorChannel(guild.id, creatorVoice.id, category.id);

            // إرسال واجهة التحكم في قناة الإنترفيس
            await interfaceChannel.send(buildInterfaceMessage(lang));

            const successEmbed = new EmbedBuilder()
                .setColor(BRAND_COLOR)
                .setTitle(t(lang, 'setup_complete_title'))
                .setDescription(
                    t(lang, 'setup_complete_desc', {
                        creatorChannel: `<#${creatorVoice.id}>`,
                        interfaceChannel: `<#${interfaceChannel.id}>`,
                    })
                );

            await interaction.editReply({ embeds: [successEmbed] });
        } catch (error) {
            console.error('خطأ في /setup:', error);
            await interaction.editReply({
                content: t(lang, 'error_generic') + `\n\`${error.message}\``,
            });
        }
    },
};
