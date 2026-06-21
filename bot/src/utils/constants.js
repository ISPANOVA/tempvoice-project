// قائمة مناطق الصوت المتاحة في Discord
const VOICE_REGIONS = [
    { id: 'automatic', name: 'Automatic 🌍' },
    { id: 'brazil', name: 'Brazil 🇧🇷' },
    { id: 'hongkong', name: 'Hong Kong 🇭🇰' },
    { id: 'india', name: 'India 🇮🇳' },
    { id: 'japan', name: 'Japan 🇯🇵' },
    { id: 'rotterdam', name: 'Rotterdam 🇳🇱' },
    { id: 'russia', name: 'Russia 🇷🇺' },
    { id: 'singapore', name: 'Singapore 🇸🇬' },
    { id: 'southafrica', name: 'South Africa 🇿🇦' },
    { id: 'sydney', name: 'Sydney 🇦🇺' },
    { id: 'us-central', name: 'US Central 🇺🇸' },
    { id: 'us-east', name: 'US East 🇺🇸' },
    { id: 'us-south', name: 'US South 🇺🇸' },
    { id: 'us-west', name: 'US West 🇺🇸' },
];

// كلمات محظورة أساسية (تستخدم في الـ Censor Channel Names) - عينة بسيطة، يمكن توسيعها من الداشبورد
const DEFAULT_CENSORED_WORDS = [
    'nigger', 'nigga', 'faggot', 'retard', 'cunt', 'whore', 'slut',
    'kill yourself', 'kys',
];

// الحد الأقصى لعدد المستخدمين في القناة
const MAX_USER_LIMIT = 99;

// الحد الأقصى لطول اسم القناة
const MAX_CHANNEL_NAME_LENGTH = 100;

// كل الأكشنز المتاحة للأونر (تستخدم لتحديد allowed_owner_actions من الداشبورد)
const OWNER_ACTIONS = [
    'name', 'limit', 'privacy', 'waiting_room', 'voice_chat',
    'trust', 'untrust', 'invite', 'kick', 'region',
    'block', 'unblock', 'claim', 'transfer', 'delete',
    'public_invite', 'creating_invite',
];

// بادجات الـ Bitrate المتاحة
const BITRATE_OPTIONS = [8, 16, 32, 64, 96, 128, 256, 384];

module.exports = {
    VOICE_REGIONS,
    DEFAULT_CENSORED_WORDS,
    MAX_USER_LIMIT,
    MAX_CHANNEL_NAME_LENGTH,
    OWNER_ACTIONS,
    BITRATE_OPTIONS,
};
