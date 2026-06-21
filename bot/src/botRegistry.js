/**
 * هذا الملف هو "نقطة وصل" في الذاكرة بين البوت والداشبورد عندما يعملان
 * في نفس عملية Node.js الواحدة (التشغيل الموحّد عبر server.js بالمجلد الرئيسي).
 *
 * بدلاً من أن يتصل الداشبورد بالبوت عبر HTTP (Express + fetch)، يحتفظ هذا
 * الملف بمرجع مباشر لـ Discord Client بعد جاهزيته، ويستخدمه الداشبورد
 * مباشرة كموديول Node.js عادي. هذا أسرع، وأبسط، ولا يحتاج بورت إضافي
 * أو مفتاح سري للتحقق (INTERNAL_API_SECRET) لأنه لا يوجد اتصال شبكة بينهما أصلًا.
 */
let botClient = null;

function setBotClient(client) {
    botClient = client;
}

function getBotClient() {
    return botClient;
}

module.exports = { setBotClient, getBotClient };
