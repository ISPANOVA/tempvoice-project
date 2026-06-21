const en = require('./en');
const ar = require('./ar');
const fr = require('./fr');
const es = require('./es');

const locales = { en, ar, fr, es };
const DEFAULT_LANG = 'en';

const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
];

/**
 * ترجمة مفتاح معين بلغة معينة مع دعم استبدال المتغيرات
 * مثال: t('ar', 'user_kicked', { user: '<@123>' })
 */
function t(lang, key, replacements = {}) {
    const langData = locales[lang] || locales[DEFAULT_LANG];
    let text = langData[key] ?? locales[DEFAULT_LANG][key] ?? key;

    for (const [placeholder, value] of Object.entries(replacements)) {
        text = text.replaceAll(`{${placeholder}}`, value);
    }
    return text;
}

function isRTL(lang) {
    return lang === 'ar';
}

module.exports = { t, locales, SUPPORTED_LANGUAGES, isRTL, DEFAULT_LANG };
