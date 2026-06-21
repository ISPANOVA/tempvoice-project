const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Railway بيوفر متغير DATABASE_URL تلقائيًا لما تضيف PostgreSQL للمشروع
// لو مش موجود، البوت هيستخدم متغيرات منفصلة (DB_HOST, DB_USER, ...)
const pool = new Pool(
    process.env.DATABASE_URL
        ? {
              connectionString: process.env.DATABASE_URL,
              ssl: { rejectUnauthorized: false }, // مطلوب على Railway
          }
        : {
              host: process.env.DB_HOST,
              port: process.env.DB_PORT || 5432,
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME,
              ssl: { rejectUnauthorized: false },
          }
);

pool.on('error', (err) => {
    console.error('❌ خطأ غير متوقع في قاعدة البيانات:', err);
});

/**
 * تشغيل ملف schema.sql لإنشاء كل الجداول لو لسه غير موجودة
 * يتم استدعاؤها مرة واحدة عند بدء تشغيل البوت
 */
async function initDatabase() {
    try {
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        await pool.query(schema);
        console.log('✅ تم تجهيز قاعدة البيانات بنجاح (كل الجداول موجودة)');
    } catch (error) {
        console.error('❌ فشل تجهيز قاعدة البيانات:', error);
        throw error;
    }
}

/**
 * دالة موحدة لتنفيذ أي استعلام SQL
 */
async function query(text, params) {
    const client = await pool.connect();
    try {
        const result = await client.query(text, params);
        return result;
    } finally {
        client.release();
    }
}

module.exports = { pool, query, initDatabase };
