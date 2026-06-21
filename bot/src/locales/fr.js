module.exports = {
    error_generic: "❌ Une erreur inattendue s'est produite. Veuillez réessayer.",
    no_permission: "❌ Vous n'avez pas la permission de faire ceci.",
    not_in_temp_channel: '❌ Vous devez être dans un salon vocal temporaire pour utiliser ceci.',
    not_channel_owner: '❌ Seul le propriétaire du salon peut faire ceci.',
    setup_already_done:
        '⚠️ TempVoice est déjà configuré. Utilisez les boutons ci-dessous pour le gérer, ou supprimez le Creator Channel pour recommencer.',

    setup_start: '🎙️ **Configuration de TempVoice...**\nCela ne prendra que quelques secondes.',
    setup_no_permission: "❌ Vous avez besoin de la permission **Gérer le serveur** pour configurer TempVoice.",
    setup_category_created: 'Catégorie créée',
    setup_creator_created: 'Creator Channel créé',
    setup_interface_created: "Salon d'interface créé",
    setup_complete_title: '✅ TempVoice est prêt !',
    setup_complete_desc:
        'Rejoignez **{creatorChannel}** pour créer votre propre salon vocal temporaire.\nUtilisez les boutons dans {interfaceChannel} pour gérer votre salon une fois créé.\n\nToutes les fonctionnalités sont débloquées et entièrement gratuites. Profitez-en ! 🎉',

    channel_created_log: 'Salon temporaire créé pour {user}',
    channel_deleted_log: 'Salon temporaire vide supprimé',
    voice_greeting_default: '{ownerMention} Bienvenue dans votre salon temporaire !',

    interface_title: "🎙️ Interface TempVoice",
    interface_desc:
        'Cette interface permet de gérer votre salon vocal temporaire.\nAppuyez sur les boutons ci-dessous pour l\'utiliser.',
    btn_name: 'NOM',
    btn_limit: 'LIMITE',
    btn_privacy: 'CONFIDENTIALITÉ',
    btn_waiting_room: "SALLE D'ATTENTE",
    btn_chat: 'CHAT',
    btn_trust: 'CONFIANCE',
    btn_untrust: 'RETIRER CONFIANCE',
    btn_invite: 'INVITER',
    btn_kick: 'EXPULSER',
    btn_region: 'RÉGION',
    btn_block: 'BLOQUER',
    btn_unblock: 'DÉBLOQUER',
    btn_claim: 'RÉCLAMER',
    btn_transfer: 'TRANSFÉRER',
    btn_delete: 'SUPPRIMER',

    modal_name_title: 'Changer le nom du salon',
    modal_name_label: 'Nouveau nom du salon',
    name_changed: '✅ Le nom du salon a été changé en **{name}**.',
    name_too_long: '❌ Le nom doit comporter 100 caractères maximum.',
    name_censored: '❌ Ce nom contient des mots inappropriés et a été bloqué.',

    modal_limit_title: "Changer la limite d'utilisateurs",
    modal_limit_label: "Limite d'utilisateurs (0 = illimité, max 99)",
    limit_changed: '✅ Limite changée à **{limit}**.',
    limit_invalid: '❌ Veuillez entrer un nombre entre 0 et 99.',

    privacy_select_title: 'Choisir le mode de confidentialité',
    privacy_public: '🌐 Public',
    privacy_public_desc: 'Tout le monde peut voir et rejoindre votre salon.',
    privacy_locked: '🔒 Verrouillé',
    privacy_locked_desc: 'Tout le monde peut voir le salon, mais seuls les membres de confiance peuvent rejoindre.',
    privacy_hidden: '👁️ Caché',
    privacy_hidden_desc: 'Seuls les membres de confiance peuvent voir et rejoindre le salon.',
    privacy_changed: '✅ Mode de confidentialité changé à **{mode}**.',

    waiting_room_enabled:
        "✅ Salle d'attente activée. Les nouveaux utilisateurs attendront votre approbation avant de rejoindre.",
    waiting_room_disabled: "✅ Salle d'attente désactivée.",
    waiting_room_request: '🔔 {user} veut rejoindre votre salon.',
    waiting_room_approve: 'Approuver',
    waiting_room_deny: 'Refuser',
    waiting_room_approved: '✅ {user} a été autorisé à entrer.',
    waiting_room_denied: "❌ L'entrée de {user} a été refusée.",

    chat_locked: '✅ Le chat textuel du salon vocal a été verrouillé.',
    chat_unlocked: '✅ Le chat textuel du salon vocal a été déverrouillé.',

    select_user_trust: 'Sélectionnez un utilisateur à qui faire confiance',
    select_user_untrust: 'Sélectionnez un utilisateur à qui retirer la confiance',
    user_trusted:
        '✅ {user} est maintenant de confiance et peut rejoindre votre salon même verrouillé ou caché.',
    user_untrusted: "✅ {user} n'est plus de confiance.",

    invite_link_created: "✅ Voici votre lien d'invitation : {link}",

    select_user_kick: 'Sélectionnez un utilisateur à expulser de votre salon',
    user_kicked: '✅ {user} a été retiré de votre salon.',
    user_not_in_channel: "❌ Cet utilisateur n'est pas dans votre salon.",

    region_select_title: 'Choisir la région vocale',
    region_changed: '✅ Région vocale changée à **{region}**.',
    region_automatic: '🌍 Automatique',

    select_user_block: 'Sélectionnez un utilisateur à bloquer',
    select_user_unblock: 'Sélectionnez un utilisateur à débloquer',
    user_blocked: '✅ {user} a été bloqué et retiré de votre salon.',
    user_unblocked: '✅ {user} a été débloqué.',
    cannot_block_self: '❌ Vous ne pouvez pas vous bloquer vous-même.',
    cannot_block_owner: '❌ Vous ne pouvez pas bloquer le propriétaire du salon.',

    claim_no_owner: "✅ L'ancien propriétaire a quitté. Vous êtes maintenant propriétaire de ce salon !",
    claim_owner_present: '❌ Le propriétaire original est toujours dans le salon. Vous ne pouvez pas le réclamer.',
    claim_not_in_channel: '❌ Vous devez être dans le salon pour le réclamer.',

    select_user_transfer: 'Sélectionnez un utilisateur à qui transférer la propriété',
    ownership_transferred: '✅ La propriété du salon a été transférée à {user}.',
    cannot_transfer_self: '❌ Vous ne pouvez pas vous transférer la propriété à vous-même.',
    target_must_be_in_channel: "❌ L'utilisateur sélectionné doit être dans votre salon.",

    channel_deleted: '✅ Votre salon a été supprimé.',
    delete_confirm: 'Êtes-vous sûr de vouloir supprimer votre salon ?',
    delete_confirm_yes: 'Oui, supprimer',
    delete_confirm_no: 'Annuler',

    unlimited: 'Illimité',
    yes: 'Oui',
    no: 'Non',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    back: 'Retour',

    language_changed: '✅ Langue changée en **Français**.',
    select_language: 'Sélectionner la langue du bot',
};
