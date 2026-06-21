const { ChannelType, PermissionsBitField, OverwriteType } = require('discord.js');
const creatorChannelModel = require('../database/creatorChannelModel');
const tempChannelModel = require('../database/tempChannelModel');
const userSettingsModel = require('../database/userSettingsModel');
const guildModel = require('../database/guildModel');
const { applyTemplate, censorText } = require('./helpers');
const { buildInterfaceMessage } = require('./interfaceBuilder');
const { t } = require('../locales');

/**
 * تُستدعى عند انضمام عضو لقناة Creator Channel
 * تقوم بإنشاء قناة صوتية مؤقتة جديدة باسمه وتنقله إليها تلقائيًا
 */
async function handleCreatorJoin(member, creatorChannel, creatorConfig, guild) {
    const guildData = await guildModel.getOrCreateGuild(guild.id, guild.name, guild.iconURL());
    const lang = guildData.language || 'en';

    // استرجاع الإعدادات المحفوظة لليوزر (Recover Settings) لو مفعّلة
    const savedSettings = await userSettingsModel.getUserSettings(guild.id, member.id);
    const recoverFields = creatorConfig.recover_settings || [];

    let channelName = applyTemplate(creatorConfig.name_template, member);
    if (recoverFields.includes('name') && savedSettings?.channel_name) {
        channelName = savedSettings.channel_name;
    }

    // فلترة الكلمات الممنوعة
    if (guildData.censor_names && censorText(channelName)) {
        channelName = applyTemplate('{OWNER_NICKNAME}\'s Channel', member);
    }

    let userLimit = creatorConfig.user_limit || 0;
    if (recoverFields.includes('user_limit') && savedSettings?.user_limit != null) {
        userLimit = savedSettings.user_limit;
    }

    let privacyMode = creatorConfig.privacy_mode || 'public';
    if (recoverFields.includes('privacy_mode') && savedSettings?.privacy_mode) {
        privacyMode = savedSettings.privacy_mode;
    }

    // تحديد مكان القناة الجديدة (فوق أو تحت الـ Creator Channel)
    const categoryId = creatorConfig.category_id || creatorChannel.parentId;

    // بناء الصلاحيات الأساسية
    const permissionOverwrites = buildPermissionOverwrites({
        guild,
        ownerId: member.id,
        privacyMode,
        accessRoles: creatorConfig.access_roles || [],
        trustedUsers: recoverFields.includes('trusted_blocked') ? savedSettings?.trusted_users || [] : [],
        blockedUsers: recoverFields.includes('trusted_blocked') ? savedSettings?.blocked_users || [] : [],
        ownerPermissions: creatorConfig.owner_permissions || [],
    });

    const newChannel = await guild.channels.create({
        name: channelName || `${member.displayName}'s Channel`,
        type: ChannelType.GuildVoice,
        parent: categoryId || undefined,
        userLimit: userLimit,
        bitrate: creatorConfig.bitrate || 64000,
        permissionOverwrites,
        rtcRegion:
            recoverFields.includes('region') && savedSettings?.region && savedSettings.region !== 'automatic'
                ? savedSettings.region
                : null,
    });

    // نقل اليوزر للقناة الجديدة
    if (member.voice?.channelId === creatorChannel.id) {
        await member.voice.setChannel(newChannel).catch(() => {});
    }

    // تسجيل القناة في الداتابيز
    await tempChannelModel.createTempChannel({
        channelId: newChannel.id,
        guildId: guild.id,
        creatorChannelId: creatorChannel.id,
        ownerId: member.id,
        privacyMode,
    });

    // إرسال رسالة الترحيب + الواجهة التفاعلية داخل in-voice chat
    try {
        const greeting = applyTemplate(
            creatorConfig.greeting_message || t(lang, 'voice_greeting_default'),
            member
        );
        await newChannel.send({ content: greeting });

        if (creatorConfig.send_interface_in_chat) {
            await newChannel.send(buildInterfaceMessage(lang));
        }
    } catch (err) {
        console.error('فشل إرسال رسالة الترحيب:', err.message);
    }

    return newChannel;
}

/**
 * بناء صلاحيات القناة الصوتية حسب نمط الخصوصية والترست/البلوك
 */
function buildPermissionOverwrites({
    guild,
    ownerId,
    privacyMode,
    accessRoles,
    trustedUsers,
    blockedUsers,
    ownerPermissions,
}) {
    const overwrites = [];

    // @everyone
    const everyoneDeny = [];
    const everyoneAllow = [];
    if (privacyMode === 'locked') {
        everyoneDeny.push(PermissionsBitField.Flags.Connect);
    } else if (privacyMode === 'hidden') {
        everyoneDeny.push(PermissionsBitField.Flags.ViewChannel);
    }
    overwrites.push({
        id: guild.roles.everyone.id,
        deny: everyoneDeny,
        allow: everyoneAllow,
    });

    // رولز مسموحة بالدخول (access roles) - متاحة دايمًا برغم البرايفسي
    for (const roleId of accessRoles) {
        overwrites.push({
            id: roleId,
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect],
        });
    }

    // المالك - صلاحيات كاملة + أي صلاحيات إضافية مفعّلة من السيرفر
    const ownerExtra = mapOwnerPermissionFlags(ownerPermissions);
    overwrites.push({
        id: ownerId,
        allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.Connect,
            PermissionsBitField.Flags.Speak,
            PermissionsBitField.Flags.PrioritySpeaker,
            ...ownerExtra,
        ],
    });

    // الموثوقين
    for (const userId of trustedUsers) {
        if (userId === ownerId) continue;
        overwrites.push({
            id: userId,
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect],
        });
    }

    // المحظورين
    for (const userId of blockedUsers) {
        if (userId === ownerId) continue;
        overwrites.push({
            id: userId,
            deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect],
        });
    }

    return overwrites;
}

function mapOwnerPermissionFlags(ownerPermissions) {
    const map = {
        manage_channel: PermissionsBitField.Flags.ManageChannels,
        move_members: PermissionsBitField.Flags.MoveMembers,
        mute_members: PermissionsBitField.Flags.MuteMembers,
        deafen_members: PermissionsBitField.Flags.DeafenMembers,
        manage_messages: PermissionsBitField.Flags.ManageMessages,
    };
    return ownerPermissions.map((p) => map[p]).filter(Boolean);
}

/**
 * تُستدعى عندما تصبح القناة المؤقتة فاضية تمامًا - تحذفها وتحفظ الإعدادات للمالك
 */
async function handleChannelEmpty(channel, tempChannelData, guild) {
    try {
        const ownerMember = await guild.members.fetch(tempChannelData.owner_id).catch(() => null);

        // حفظ إعدادات المالك قبل الحذف (recover settings)
        const creatorConfig = await creatorChannelModel.getCreatorChannelByChannelId(
            tempChannelData.creator_channel_id
        );
        const recoverFields = creatorConfig?.recover_settings || [];

        if (recoverFields.length > 0) {
            const fieldsToSave = {};
            if (recoverFields.includes('name')) fieldsToSave.channel_name = channel.name;
            if (recoverFields.includes('user_limit')) fieldsToSave.user_limit = channel.userLimit;
            if (recoverFields.includes('privacy_mode')) fieldsToSave.privacy_mode = tempChannelData.privacy_mode;
            if (recoverFields.includes('region')) fieldsToSave.region = channel.rtcRegion || 'automatic';

            if (Object.keys(fieldsToSave).length > 0) {
                await userSettingsModel.upsertUserSettings(guild.id, tempChannelData.owner_id, fieldsToSave);
            }
        }

        await channel.delete('Temporary channel is empty');
    } catch (err) {
        console.error('فشل حذف القناة المؤقتة:', err.message);
    } finally {
        await tempChannelModel.deleteTempChannel(channel.id);
    }
}

module.exports = {
    handleCreatorJoin,
    handleChannelEmpty,
    buildPermissionOverwrites,
    mapOwnerPermissionFlags,
};
