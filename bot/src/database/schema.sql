-- =========================================================
-- TempVoice Clone - Database Schema (PostgreSQL)
-- شغل هذا الملف مرة واحدة فقط عند أول إعداد لقاعدة البيانات
-- =========================================================

-- جدول السيرفرات (كل سيرفر فيه إعداداته الخاصة)
CREATE TABLE IF NOT EXISTS guilds (
    guild_id            VARCHAR(32) PRIMARY KEY,
    guild_name          VARCHAR(255),
    guild_icon          TEXT,
    language            VARCHAR(5)  DEFAULT 'en',          -- en, ar, fr, es
    category_id         VARCHAR(32),                       -- التيمبفويس كاتيجوري
    log_channel_id      VARCHAR(32),                       -- موديريشن لوج
    censor_names        BOOLEAN     DEFAULT false,          -- سينسور أسماء القنوات
    age_restriction      BOOLEAN     DEFAULT false,          -- تحديد عمري على in-voice chat
    created_at          TIMESTAMP   DEFAULT NOW(),
    updated_at          TIMESTAMP   DEFAULT NOW()
);

-- جدول الـ Creator Channels (يمكن أكثر من واحدة في السيرفر)
CREATE TABLE IF NOT EXISTS creator_channels (
    id                      SERIAL PRIMARY KEY,
    guild_id                VARCHAR(32) REFERENCES guilds(guild_id) ON DELETE CASCADE,
    channel_id              VARCHAR(32) UNIQUE NOT NULL,        -- آيدي القناة الديسكورد
    name_template           VARCHAR(100)  DEFAULT '{OWNER_NICKNAME}''s Channel',
    category_id             VARCHAR(32),                        -- كاتيجوري إنشاء القنوات المؤقتة
    user_limit              INT           DEFAULT 0,
    bitrate                 INT           DEFAULT 64000,
    position                VARCHAR(10)   DEFAULT 'bottom',      -- top / bottom
    privacy_mode             VARCHAR(10)   DEFAULT 'public',      -- public / locked / hidden
    access_roles            TEXT[]        DEFAULT '{}',          -- رولز مسموح ليها ترى/تدخل
    sync_permissions        VARCHAR(10)   DEFAULT 'none',        -- none / category / channel
    owner_permissions        TEXT[]        DEFAULT '{}',          -- صلاحيات إضافية لأونر القناة المؤقتة
    allowed_owner_actions    TEXT[]        DEFAULT '{"voice_chat","public_invite","creating_invite","name","limit","privacy","trust","untrust","invite","kick","region","block","unblock","claim","transfer","delete","waiting_room"}',
    greeting_message         TEXT          DEFAULT '{OWNER_MENTION} Welcome to your Temporary Channel!',
    send_interface_in_chat   BOOLEAN       DEFAULT false,
    recover_settings         TEXT[]        DEFAULT '{"name","user_limit","trusted_blocked","privacy_mode"}',
    voice_role_id            VARCHAR(32),                        -- رول يتعطى لمن بداخل أي قناة مؤقتة
    created_at              TIMESTAMP     DEFAULT NOW(),
    updated_at              TIMESTAMP     DEFAULT NOW()
);

-- جدول القنوات المؤقتة الفعلية (الموجودة حاليًا في الديسكورد)
CREATE TABLE IF NOT EXISTS temp_channels (
    channel_id          VARCHAR(32) PRIMARY KEY,
    guild_id             VARCHAR(32) REFERENCES guilds(guild_id) ON DELETE CASCADE,
    creator_channel_id  VARCHAR(32),                 -- القناة الأصل (Creator Channel) اللي خلقتها
    owner_id            VARCHAR(32) NOT NULL,
    text_chat_id        VARCHAR(32),                 -- آيدي تشات القناة الصوتية (in-voice chat)
    privacy_mode         VARCHAR(10) DEFAULT 'public',
    is_waiting_room      BOOLEAN     DEFAULT false,
    created_at           TIMESTAMP   DEFAULT NOW()
);

-- جدول الإعدادات المحفوظة لكل يوزر (تتسترجع تلقائي لما يعمل قناة جديدة)
CREATE TABLE IF NOT EXISTS user_channel_settings (
    id                  SERIAL PRIMARY KEY,
    guild_id            VARCHAR(32) REFERENCES guilds(guild_id) ON DELETE CASCADE,
    user_id             VARCHAR(32) NOT NULL,
    channel_name        VARCHAR(100),
    user_limit          INT,
    privacy_mode         VARCHAR(10),
    trusted_users       TEXT[]      DEFAULT '{}',
    blocked_users       TEXT[]      DEFAULT '{}',
    is_locked           BOOLEAN     DEFAULT false,
    is_hidden           BOOLEAN     DEFAULT false,
    region              VARCHAR(20),
    updated_at          TIMESTAMP   DEFAULT NOW(),
    UNIQUE(guild_id, user_id)
);

-- جدول البلوك/الترست العام (يستخدم وقت تكرار الحظر بين قنوات مختلفة لو احتجنا)
CREATE TABLE IF NOT EXISTS channel_relations (
    id              SERIAL PRIMARY KEY,
    channel_id      VARCHAR(32) NOT NULL,
    target_user_id  VARCHAR(32) NOT NULL,
    relation_type   VARCHAR(10) NOT NULL,   -- trust / block
    created_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(channel_id, target_user_id, relation_type)
);

-- جدول الـ Dashboard Sessions (Discord OAuth2)
CREATE TABLE IF NOT EXISTS dashboard_users (
    user_id         VARCHAR(32) PRIMARY KEY,
    username        VARCHAR(255),
    discriminator   VARCHAR(10),
    avatar          TEXT,
    access_token    TEXT,
    refresh_token   TEXT,
    token_expires   TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- جدول لوج العمليات (للموديريشن لوج وتتبع الأحداث)
CREATE TABLE IF NOT EXISTS action_logs (
    id           SERIAL PRIMARY KEY,
    guild_id     VARCHAR(32),
    channel_id   VARCHAR(32),
    user_id      VARCHAR(32),
    action_type  VARCHAR(30),     -- create, delete, rename, limit_change, etc...
    details      JSONB,
    created_at   TIMESTAMP DEFAULT NOW()
);

-- Index لتحسين سرعة الاستعلامات
CREATE INDEX IF NOT EXISTS idx_temp_channels_guild  ON temp_channels(guild_id);
CREATE INDEX IF NOT EXISTS idx_temp_channels_owner   ON temp_channels(owner_id);
CREATE INDEX IF NOT EXISTS idx_creator_channels_guild ON creator_channels(guild_id);
CREATE INDEX IF NOT EXISTS idx_user_settings_lookup  ON user_channel_settings(guild_id, user_id);
CREATE INDEX IF NOT EXISTS idx_action_logs_guild     ON action_logs(guild_id);
