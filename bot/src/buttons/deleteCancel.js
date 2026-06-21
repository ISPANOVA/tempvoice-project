module.exports = {
    customId: 'tv_delete_cancel',

    async execute(interaction) {
        await interaction.update({ content: '✅', components: [] });
        // نحذف الرسالة بعد ثانية لإخفاء أثر التأكيد (تجربة مستخدم أنعم)
        setTimeout(() => {
            interaction.deleteReply().catch(() => {});
        }, 800);
    },
};
