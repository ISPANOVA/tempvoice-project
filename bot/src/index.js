const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const { initDatabase } = require('./database/db');
const { setBotClient } = require('./botRegistry');

/**
 * تشغيل البوت بالكامل وإرجاع الـ client الجاهز.
 * هذه الدالة تُستدعى من server.js الرئيسي (تشغيل موحّد) أو يمكن استدعاؤها
 * مباشرة عبر `node src/index.js` إذا رغبت بتشغيل البوت وحده محليًا (انظر نهاية الملف).
 */
async function startBot() {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ],
        partials: [Partials.Channel, Partials.GuildMember],
    });

    client.commands = new Collection();

    // تحميل كل السلاش كوماندز من مجلد commands
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));
        if (command.data) {
            client.commands.set(command.data.name, command);
        }
    }

    // تحميل كل الإيفنتات من مجلد events
    const eventsPath = path.join(__dirname, 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(path.join(eventsPath, file));
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }

    console.log('🔄 جاري تجهيز قاعدة البيانات...');
    await initDatabase();

    console.log('🔄 جاري تسجيل الدخول إلى Discord...');
    await client.login(process.env.DISCORD_TOKEN);

    // تسجيل الـ client في الذاكرة ليستخدمه الداشبورد مباشرة (تشغيل موحّد)
    setBotClient(client);

    return client;
}

process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled promise rejection:', error);
});

module.exports = { startBot };

// يسمح بتشغيل البوت وحده مباشرة (مفيد محليًا أو لو احتجت تفصل الخدمتين مستقبلًا):
// node src/index.js
if (require.main === module) {
    require('dotenv').config();
    startBot().catch((error) => {
        console.error('❌ فشل تشغيل البوت:', error);
        process.exit(1);
    });
}
