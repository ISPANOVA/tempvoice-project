module.exports = {
    // عام
    error_generic: '❌ حدث خطأ غير متوقع. حاول مرة أخرى.',
    no_permission: '❌ لا تملك الصلاحية للقيام بهذا.',
    not_in_temp_channel: '❌ يجب أن تكون داخل قناة صوتية مؤقتة لاستخدام هذا.',
    not_channel_owner: '❌ فقط مالك القناة يمكنه القيام بهذا.',
    setup_already_done: '⚠️ تم إعداد TempVoice مسبقًا. استخدم الأزرار بالأسفل للتحكم، أو احذف Creator Channel للبدء من جديد.',

    // إعداد البوت (/setup)
    setup_start: '🎙️ **جاري إعداد TempVoice...**\nسيستغرق هذا ثوانٍ معدودة.',
    setup_no_permission: '❌ تحتاج صلاحية **إدارة السيرفر** لإعداد TempVoice.',
    setup_category_created: 'تم إنشاء الفئة',
    setup_creator_created: 'تم إنشاء قناة الإنشاء',
    setup_interface_created: 'تم إنشاء قناة الواجهة',
    setup_complete_title: '✅ TempVoice جاهز للاستخدام!',
    setup_complete_desc:
        'انضم إلى **{creatorChannel}** لإنشاء قناتك الصوتية المؤقتة الخاصة بك.\nاستخدم الأزرار في {interfaceChannel} للتحكم في قناتك بعد إنشائها.\n\nكل المميزات مفتوحة ومجانية بالكامل. استمتع! 🎉',

    // إنشاء قناة مؤقتة
    channel_created_log: 'تم إنشاء قناة مؤقتة لـ {user}',
    channel_deleted_log: 'تم حذف قناة مؤقتة فارغة',
    voice_greeting_default: '{ownerMention} مرحبًا بك في قناتك المؤقتة!',

    // الواجهة (Interface) - عناوين الأزرار
    interface_title: '🎙️ واجهة TempVoice',
    interface_desc:
        'تستخدم هذه الواجهة للتحكم في قناتك الصوتية المؤقتة.\nاضغط على الأزرار بالأسفل لاستخدامها.',
    btn_name: 'الاسم',
    btn_limit: 'الحد',
    btn_privacy: 'الخصوصية',
    btn_waiting_room: 'غرفة الانتظار',
    btn_chat: 'المحادثة',
    btn_trust: 'ثقة',
    btn_untrust: 'إزالة الثقة',
    btn_invite: 'دعوة',
    btn_kick: 'طرد',
    btn_region: 'المنطقة',
    btn_block: 'حظر',
    btn_unblock: 'فك الحظر',
    btn_claim: 'استلام',
    btn_transfer: 'نقل الملكية',
    btn_delete: 'حذف',

    // مودال تغيير الاسم
    modal_name_title: 'تغيير اسم القناة',
    modal_name_label: 'الاسم الجديد للقناة',
    name_changed: '✅ تم تغيير اسم القناة إلى **{name}**.',
    name_too_long: '❌ يجب ألا يتجاوز الاسم 100 حرف.',
    name_censored: '❌ يحتوي هذا الاسم على كلمات غير مناسبة وتم حظره.',

    // الليميت
    modal_limit_title: 'تغيير الحد الأقصى للأعضاء',
    modal_limit_label: 'الحد الأقصى (0 = غير محدود، الأقصى 99)',
    limit_changed: '✅ تم تغيير الحد الأقصى إلى **{limit}**.',
    limit_invalid: '❌ من فضلك أدخل رقم بين 0 و 99.',

    // البرايفسي
    privacy_select_title: 'اختر نمط الخصوصية',
    privacy_public: '🌐 عام',
    privacy_public_desc: 'يمكن لأي شخص رؤية والانضمام إلى قناتك.',
    privacy_locked: '🔒 مقفل',
    privacy_locked_desc: 'يمكن لأي شخص رؤية القناة، لكن فقط الموثوقون يمكنهم الانضمام.',
    privacy_hidden: '👁️ مخفي',
    privacy_hidden_desc: 'فقط الموثوقون يمكنهم رؤية والانضمام إلى القناة.',
    privacy_changed: '✅ تم تغيير نمط الخصوصية إلى **{mode}**.',

    // الويتنج روم
    waiting_room_enabled: '✅ تم تفعيل غرفة الانتظار. سينتظر الأعضاء الجدد موافقتك قبل الدخول.',
    waiting_room_disabled: '✅ تم تعطيل غرفة الانتظار.',
    waiting_room_request: '🔔 {user} يريد الانضمام إلى قناتك.',
    waiting_room_approve: 'قبول',
    waiting_room_deny: 'رفض',
    waiting_room_approved: '✅ تم السماح لـ {user} بالدخول.',
    waiting_room_denied: '❌ تم رفض دخول {user}.',

    // الشات (in-voice chat)
    chat_locked: '✅ تم قفل المحادثة النصية داخل القناة الصوتية.',
    chat_unlocked: '✅ تم فتح المحادثة النصية داخل القناة الصوتية.',

    // ترست / أنترست
    select_user_trust: 'اختر عضوًا لتمنحه الثقة',
    select_user_untrust: 'اختر عضوًا لإزالة الثقة عنه',
    user_trusted: '✅ {user} موثوق الآن ويمكنه الانضمام إلى قناتك حتى لو كانت مقفلة أو مخفية.',
    user_untrusted: '✅ {user} لم يعد موثوقًا.',

    // إنفايت
    invite_link_created: '✅ هذا رابط الدعوة الخاص بك: {link}',

    // كيك
    select_user_kick: 'اختر عضوًا لطرده من قناتك',
    user_kicked: '✅ تم إزالة {user} من قناتك.',
    user_not_in_channel: '❌ هذا العضو ليس داخل قناتك.',

    // ريجن
    region_select_title: 'اختر منطقة الصوت',
    region_changed: '✅ تم تغيير منطقة الصوت إلى **{region}**.',
    region_automatic: '🌍 تلقائي',

    // بلوك / أنبلوك
    select_user_block: 'اختر عضوًا لحظره',
    select_user_unblock: 'اختر عضوًا لفك حظره',
    user_blocked: '✅ تم حظر {user} وإزالته من قناتك.',
    user_unblocked: '✅ تم فك حظر {user}.',
    cannot_block_self: '❌ لا يمكنك حظر نفسك.',
    cannot_block_owner: '❌ لا يمكنك حظر مالك القناة.',

    // كليم
    claim_no_owner: '✅ لقد غادر المالك السابق. أنت الآن مالك هذه القناة!',
    claim_owner_present: '❌ المالك الأصلي لا يزال موجودًا في القناة. لا يمكنك استلامها.',
    claim_not_in_channel: '❌ يجب أن تكون داخل القناة لاستلامها.',

    // ترانسفر
    select_user_transfer: 'اختر عضوًا لنقل الملكية إليه',
    ownership_transferred: '✅ تم نقل ملكية القناة إلى {user}.',
    cannot_transfer_self: '❌ لا يمكنك نقل الملكية إلى نفسك.',
    target_must_be_in_channel: '❌ يجب أن يكون العضو المختار داخل قناتك.',

    // ديليت
    channel_deleted: '✅ تم حذف قناتك.',
    delete_confirm: 'هل أنت متأكد من حذف قناتك؟',
    delete_confirm_yes: 'نعم، احذفها',
    delete_confirm_no: 'إلغاء',

    // عام - وحدات
    unlimited: 'غير محدود',
    yes: 'نعم',
    no: 'لا',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    back: 'رجوع',

    // اللغة
    language_changed: '✅ تم تغيير اللغة إلى **العربية**.',
    select_language: 'اختر لغة البوت',
};
