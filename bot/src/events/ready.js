module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        console.log(`✅ البوت جاهز ويعمل الآن باسم: ${client.user.tag}`);
        console.log(`📊 متصل بـ ${client.guilds.cache.size} سيرفر`);

        client.user.setPresence({
            activities: [{ name: '/setup | TempVoice Clone', type: 2 }], // type 2 = Listening
            status: 'online',
        });
    },
};
