module.exports = {
    // عام
    error_generic: '❌ An unexpected error occurred. Please try again.',
    no_permission: '❌ You do not have permission to do this.',
    not_in_temp_channel: '❌ You must be in a temporary voice channel to use this.',
    not_channel_owner: '❌ Only the channel owner can do this.',
    setup_already_done: '⚠️ TempVoice is already set up. Use the buttons below to manage it, or delete the Creator Channel to start over.',

    // إعداد البوت (/setup)
    setup_start: '🎙️ **Setting up TempVoice...**\nThis will only take a few seconds.',
    setup_no_permission: '❌ You need **Manage Server** permission to set up TempVoice.',
    setup_category_created: 'Created category',
    setup_creator_created: 'Created Creator Channel',
    setup_interface_created: 'Created Interface Channel',
    setup_complete_title: '✅ TempVoice is ready!',
    setup_complete_desc:
        'Join **{creatorChannel}** to create your own temporary voice channel.\nUse the buttons in {interfaceChannel} to manage your channel once you have one.\n\nAll features are unlocked and completely free. Enjoy! 🎉',

    // إنشاء قناة مؤقتة
    channel_created_log: 'Created temporary channel for {user}',
    channel_deleted_log: 'Deleted empty temporary channel',
    voice_greeting_default: '{ownerMention} Welcome to your Temporary Channel!',

    // الواجهة (Interface) - عناوين الأزرار
    interface_title: '🎙️ TempVoice Interface',
    interface_desc:
        'This interface can be used to manage your temporary voice channel.\nPress the buttons below to use it.',
    btn_name: 'NAME',
    btn_limit: 'LIMIT',
    btn_privacy: 'PRIVACY',
    btn_waiting_room: 'WAITING ROOM',
    btn_chat: 'CHAT',
    btn_trust: 'TRUST',
    btn_untrust: 'UNTRUST',
    btn_invite: 'INVITE',
    btn_kick: 'KICK',
    btn_region: 'REGION',
    btn_block: 'BLOCK',
    btn_unblock: 'UNBLOCK',
    btn_claim: 'CLAIM',
    btn_transfer: 'TRANSFER',
    btn_delete: 'DELETE',

    // مودال تغيير الاسم
    modal_name_title: 'Change Channel Name',
    modal_name_label: 'New channel name',
    name_changed: '✅ Channel name changed to **{name}**.',
    name_too_long: '❌ The name must be 100 characters or fewer.',
    name_censored: '❌ This name contains inappropriate words and was blocked.',

    // الليميت
    modal_limit_title: 'Change User Limit',
    modal_limit_label: 'User limit (0 = unlimited, max 99)',
    limit_changed: '✅ User limit changed to **{limit}**.',
    limit_invalid: '❌ Please enter a number between 0 and 99.',

    // البرايفسي
    privacy_select_title: 'Choose Privacy Mode',
    privacy_public: '🌐 Public',
    privacy_public_desc: 'Anyone can see and join your channel.',
    privacy_locked: '🔒 Locked',
    privacy_locked_desc: 'Anyone can see the channel, but only trusted users can join.',
    privacy_hidden: '👁️ Hidden',
    privacy_hidden_desc: 'Only trusted users can see and join the channel.',
    privacy_changed: '✅ Privacy mode changed to **{mode}**.',

    // الويتنج روم
    waiting_room_enabled: '✅ Waiting Room enabled. New users will wait for your approval before joining.',
    waiting_room_disabled: '✅ Waiting Room disabled.',
    waiting_room_request: '🔔 {user} wants to join your channel.',
    waiting_room_approve: 'Approve',
    waiting_room_deny: 'Deny',
    waiting_room_approved: '✅ {user} has been let in.',
    waiting_room_denied: '❌ {user} was denied entry.',

    // الشات (in-voice chat)
    chat_locked: '✅ In-voice text chat has been locked.',
    chat_unlocked: '✅ In-voice text chat has been unlocked.',

    // ترست / أنترست
    select_user_trust: 'Select a user to trust',
    select_user_untrust: 'Select a user to remove trust from',
    user_trusted: '✅ {user} is now trusted and can join your channel even when locked or hidden.',
    user_untrusted: '✅ {user} is no longer trusted.',

    // إنفايت
    invite_link_created: '✅ Here is your invite link: {link}',

    // كيك
    select_user_kick: 'Select a user to kick from your channel',
    user_kicked: '✅ {user} was removed from your channel.',
    user_not_in_channel: '❌ This user is not in your channel.',

    // ريجن
    region_select_title: 'Choose Voice Region',
    region_changed: '✅ Voice region changed to **{region}**.',
    region_automatic: '🌍 Automatic',

    // بلوك / أنبلوك
    select_user_block: 'Select a user to block',
    select_user_unblock: 'Select a user to unblock',
    user_blocked: '✅ {user} has been blocked and removed from your channel.',
    user_unblocked: '✅ {user} has been unblocked.',
    cannot_block_self: '❌ You cannot block yourself.',
    cannot_block_owner: '❌ You cannot block the channel owner.',

    // كليم
    claim_no_owner: '✅ The previous owner left. You are now the owner of this channel!',
    claim_owner_present: '❌ The original owner is still in the channel. You cannot claim it.',
    claim_not_in_channel: '❌ You must be in the channel to claim it.',

    // ترانسفر
    select_user_transfer: 'Select a user to transfer ownership to',
    ownership_transferred: '✅ Channel ownership has been transferred to {user}.',
    cannot_transfer_self: '❌ You cannot transfer ownership to yourself.',
    target_must_be_in_channel: '❌ The selected user must be in your channel.',

    // ديليت
    channel_deleted: '✅ Your channel has been deleted.',
    delete_confirm: 'Are you sure you want to delete your channel?',
    delete_confirm_yes: 'Yes, delete it',
    delete_confirm_no: 'Cancel',

    // عام - وحدات
    unlimited: 'Unlimited',
    yes: 'Yes',
    no: 'No',
    cancel: 'Cancel',
    confirm: 'Confirm',
    back: 'Back',

    // اللغة
    language_changed: '✅ Language changed to **English**.',
    select_language: 'Select Bot Language',
};
