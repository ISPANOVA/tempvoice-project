/**
 * نقطة التشغيل الموحّدة للمشروع بالكامل (بوت + داشبورد) في عملية Node.js واحدة.
 *
 * السبب: لتشغيل المشروع على خدمة Railway واحدة فقط بدل خدمتين منفصلتين،
 * مما يوفر تكلفة الاستضافة. هذا الملف:
 *   1. يشغّل بوت ديسكورد (من مجلد bot/) ويسجّله في الذاكرة المشتركة.
 *   2. يشغّل تطبيق Next.js (من مجلد dashboard/) كـ custom HTTP server
 *      على نفس البورت الذي توفره Railway (process.env.PORT).
 *
 * البوت والداشبورد يتشاركان نفس عملية Node.js، فالداشبورد يصل لبيانات
 * ديسكورد الحيّة (قنوات، رتب...) عبر استدعاء دوال مباشرة من bot/src/botService.js
 * بدل عمل طلب HTTP لخدمة منفصلة.
 */

require('dotenv').config();

const path = require('path');
const next = require('next');
const { createServer } = require('http');
const { parse } = require('url');

const { startBot } = require('./bot/src/index');
const botService = require('./bot/src/botService');

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

const dashboardDir = path.join(__dirname, 'dashboard');
const nextApp = next({ dev, dir: dashboardDir });
const nextHandler = nextApp.getRequestHandler();

async function main() {
    console.log('🔄 جاري تشغيل بوت ديسكورد...');
    await startBot();
    console.log('✅ البوت متصل وجاهز.');

    // تسجيل دوال خدمة البوت على global ليصل إليها الداشبورد مباشرة
    // (انظر dashboard/lib/botApi.ts لشرح السبب التقني الكامل)
    global.__tempvoiceBotService = botService;

    console.log('🔄 جاري تجهيز الداشبورد (Next.js)...');
    await nextApp.prepare();
    console.log('✅ الداشبورد جاهز.');

    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        nextHandler(req, res, parsedUrl);
    }).listen(PORT, () => {
        console.log(`🚀 الخدمة الموحّدة (بوت + داشبورد) تعمل على المنفذ ${PORT}`);
    });
}

process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled promise rejection:', error);
});

main().catch((error) => {
    console.error('❌ فشل تشغيل الخدمة الموحّدة:', error);
    process.exit(1);
});
