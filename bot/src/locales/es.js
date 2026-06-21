module.exports = {
    error_generic: '❌ Ocurrió un error inesperado. Por favor, inténtalo de nuevo.',
    no_permission: '❌ No tienes permiso para hacer esto.',
    not_in_temp_channel: '❌ Debes estar en un canal de voz temporal para usar esto.',
    not_channel_owner: '❌ Solo el propietario del canal puede hacer esto.',
    setup_already_done:
        '⚠️ TempVoice ya está configurado. Usa los botones de abajo para gestionarlo, o elimina el Creator Channel para empezar de nuevo.',

    setup_start: '🎙️ **Configurando TempVoice...**\nEsto solo tomará unos segundos.',
    setup_no_permission: '❌ Necesitas el permiso **Gestionar servidor** para configurar TempVoice.',
    setup_category_created: 'Categoría creada',
    setup_creator_created: 'Creator Channel creado',
    setup_interface_created: 'Canal de interfaz creado',
    setup_complete_title: '✅ ¡TempVoice está listo!',
    setup_complete_desc:
        'Únete a **{creatorChannel}** para crear tu propio canal de voz temporal.\nUsa los botones en {interfaceChannel} para gestionar tu canal una vez creado.\n\nTodas las funciones están desbloqueadas y son completamente gratis. ¡Disfruta! 🎉',

    channel_created_log: 'Canal temporal creado para {user}',
    channel_deleted_log: 'Canal temporal vacío eliminado',
    voice_greeting_default: '{ownerMention} ¡Bienvenido a tu canal temporal!',

    interface_title: '🎙️ Interfaz de TempVoice',
    interface_desc:
        'Esta interfaz se usa para gestionar tu canal de voz temporal.\nPresiona los botones de abajo para usarla.',
    btn_name: 'NOMBRE',
    btn_limit: 'LÍMITE',
    btn_privacy: 'PRIVACIDAD',
    btn_waiting_room: 'SALA DE ESPERA',
    btn_chat: 'CHAT',
    btn_trust: 'CONFIAR',
    btn_untrust: 'QUITAR CONFIANZA',
    btn_invite: 'INVITAR',
    btn_kick: 'EXPULSAR',
    btn_region: 'REGIÓN',
    btn_block: 'BLOQUEAR',
    btn_unblock: 'DESBLOQUEAR',
    btn_claim: 'RECLAMAR',
    btn_transfer: 'TRANSFERIR',
    btn_delete: 'ELIMINAR',

    modal_name_title: 'Cambiar nombre del canal',
    modal_name_label: 'Nuevo nombre del canal',
    name_changed: '✅ El nombre del canal se cambió a **{name}**.',
    name_too_long: '❌ El nombre debe tener 100 caracteres o menos.',
    name_censored: '❌ Este nombre contiene palabras inapropiadas y fue bloqueado.',

    modal_limit_title: 'Cambiar límite de usuarios',
    modal_limit_label: 'Límite de usuarios (0 = ilimitado, máx 99)',
    limit_changed: '✅ Límite cambiado a **{limit}**.',
    limit_invalid: '❌ Por favor ingresa un número entre 0 y 99.',

    privacy_select_title: 'Elegir modo de privacidad',
    privacy_public: '🌐 Público',
    privacy_public_desc: 'Cualquiera puede ver y unirse a tu canal.',
    privacy_locked: '🔒 Bloqueado',
    privacy_locked_desc: 'Cualquiera puede ver el canal, pero solo los usuarios de confianza pueden unirse.',
    privacy_hidden: '👁️ Oculto',
    privacy_hidden_desc: 'Solo los usuarios de confianza pueden ver y unirse al canal.',
    privacy_changed: '✅ Modo de privacidad cambiado a **{mode}**.',

    waiting_room_enabled:
        '✅ Sala de espera activada. Los nuevos usuarios esperarán tu aprobación antes de unirse.',
    waiting_room_disabled: '✅ Sala de espera desactivada.',
    waiting_room_request: '🔔 {user} quiere unirse a tu canal.',
    waiting_room_approve: 'Aprobar',
    waiting_room_deny: 'Rechazar',
    waiting_room_approved: '✅ Se permitió la entrada de {user}.',
    waiting_room_denied: '❌ Se rechazó la entrada de {user}.',

    chat_locked: '✅ El chat de texto del canal de voz ha sido bloqueado.',
    chat_unlocked: '✅ El chat de texto del canal de voz ha sido desbloqueado.',

    select_user_trust: 'Selecciona un usuario para confiar',
    select_user_untrust: 'Selecciona un usuario para quitarle la confianza',
    user_trusted:
        '✅ Ahora se confía en {user} y puede unirse a tu canal incluso si está bloqueado u oculto.',
    user_untrusted: '✅ Ya no se confía en {user}.',

    invite_link_created: '✅ Aquí está tu enlace de invitación: {link}',

    select_user_kick: 'Selecciona un usuario para expulsar de tu canal',
    user_kicked: '✅ {user} fue eliminado de tu canal.',
    user_not_in_channel: '❌ Este usuario no está en tu canal.',

    region_select_title: 'Elegir región de voz',
    region_changed: '✅ Región de voz cambiada a **{region}**.',
    region_automatic: '🌍 Automática',

    select_user_block: 'Selecciona un usuario para bloquear',
    select_user_unblock: 'Selecciona un usuario para desbloquear',
    user_blocked: '✅ {user} ha sido bloqueado y eliminado de tu canal.',
    user_unblocked: '✅ {user} ha sido desbloqueado.',
    cannot_block_self: '❌ No puedes bloquearte a ti mismo.',
    cannot_block_owner: '❌ No puedes bloquear al propietario del canal.',

    claim_no_owner: '✅ El propietario anterior se fue. ¡Ahora eres el propietario de este canal!',
    claim_owner_present: '❌ El propietario original todavía está en el canal. No puedes reclamarlo.',
    claim_not_in_channel: '❌ Debes estar en el canal para reclamarlo.',

    select_user_transfer: 'Selecciona un usuario para transferir la propiedad',
    ownership_transferred: '✅ La propiedad del canal se transfirió a {user}.',
    cannot_transfer_self: '❌ No puedes transferirte la propiedad a ti mismo.',
    target_must_be_in_channel: '❌ El usuario seleccionado debe estar en tu canal.',

    channel_deleted: '✅ Tu canal ha sido eliminado.',
    delete_confirm: '¿Estás seguro de que quieres eliminar tu canal?',
    delete_confirm_yes: 'Sí, eliminar',
    delete_confirm_no: 'Cancelar',

    unlimited: 'Ilimitado',
    yes: 'Sí',
    no: 'No',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    back: 'Atrás',

    language_changed: '✅ Idioma cambiado a **Español**.',
    select_language: 'Selecciona el idioma del bot',
};
