const en = {
  // عام
  appName: "TempVoice",
  login: "Login with Discord",
  logout: "Logout",
  loading: "Loading...",
  save: "Save changes",
  saved: "Saved",
  saving: "Saving...",
  unsavedChanges: "You have unsaved changes",
  cancel: "Cancel",
  confirm: "Confirm",
  delete: "Delete",
  back: "Back",
  learnMore: "Learn more",
  free: "Free",
  allFeaturesFree: "All features unlocked, forever free",

  // صفحة تسجيل الدخول
  loginTitle: "Manage your voice channels",
  loginSubtitle:
    "Sign in with Discord to set up temporary voice channels for your server — completely free, every feature unlocked.",
  loginButton: "Continue with Discord",

  // اختيار السيرفر
  selectServerTitle: "Hey, {name}!",
  selectServerSubtitle: "Choose a server to manage",
  noMutualServers: "No matching servers found",
  noMutualServersDesc: "Add the bot to a Discord server first, or refresh if you just added it.",
  inviteBot: "Add to Discord",
  refresh: "Refresh",
  botNotSetup: "Not set up yet",
  botSetup: "Active",

  // نافبار الداشبورد
  navOverview: "Overview",
  navPermissions: "Permissions",
  navModeration: "Moderation",
  navOthers: "Others",
  navServers: "Switch server",

  // نظرة عامة
  creatorChannelName: "Temporary Channel Name",
  creatorChannelNameDesc: "Set the default naming format for temporary channels when they are created.",
  creatorChannelCategory: "Temporary Channel Category",
  creatorChannelCategoryDesc: "Choose the category where temporary channels will be created.",
  creatorChannelUserLimit: "Temporary Channel User Limit",
  creatorChannelUserLimitDesc: "Set the default user limit for temporary channels when they are created.",
  creatorChannelBitrate: "Temporary Channel Bitrate",
  creatorChannelBitrateDesc:
    "Choose the audio bitrate for temporary voice channels. Higher values improve quality.",
  creatorChannelPosition: "Temporary Channel Position",
  creatorChannelPositionDesc: "Set where the temporary channel will be created relative to the Creator Channel.",
  positionTop: "At the top",
  positionBottom: "At the bottom",
  unlimited: "Unlimited (0)",
  addCreatorChannel: "Add Creator Channel",
  creatorChannels: "Creator Channels",

  // صلاحيات
  accessRoles: "Temporary Channel Access Roles",
  accessRolesDesc:
    "Select roles required to see or access temporary channels, overriding the default @everyone permission.",
  privacyModeTitle: "Temporary Channel Privacy Mode",
  privacyModeDesc: "Choose whether temporary channels are public, locked, or hidden by default.",
  privacyPublic: "Public",
  privacyLocked: "Locked",
  privacyHidden: "Hidden",
  syncPermissions: "Temporary Channel Permissions",
  syncPermissionsDesc: "Choose where to sync permissions from when creating a temporary channel.",
  syncNone: "Don't sync",
  syncCategory: "Sync from category",
  ownerPermissions: "Temporary Channel Owner Permissions",
  ownerPermissionsDesc:
    "Grant owners of temporary channels extra permissions (e.g. Manage Channel, Move Members).",

  // المودريشن
  toggleFeatures: "Toggle Features",
  toggleFeaturesDesc: "Choose which features temporary channel owners are allowed to use.",
  recoverSettings: "Recover Owner Settings",
  recoverSettingsDesc: "Recover a temporary channel with the same settings it had before being deleted.",
  moderationLog: "Moderation Log",
  moderationLogDesc: "Sends messages to a text channel using a webhook URL to log temporary channel actions.",
  censorNames: "Censor Channel Names",
  censorNamesDesc: "Automatically censor inappropriate words in temporary channel names.",
  viewSettings: "View settings",
  ageRestriction: "Age Restriction for In-Voice Chat",
  ageRestrictionDesc: "Users will need to confirm they are of legal age to see messages in this channel.",

  // الأخرى
  greetingMessage: "Temporary Channel Greeting",
  greetingMessageDesc: "Sends a message to the temporary channel's text chat when it's created.",
  voiceRole: "Temporary Voice Role",
  voiceRoleDesc: "Assign a role to users when they are in a temporary voice channel.",
  selectRole: "Select a role",
  interfaceInChat: "TempVoice Interface in Voice Chat",
  interfaceInChatDesc: "Send the TempVoice interface directly into the in-voice chat of a temporary channel.",

  // أزرار الواجهة (معاينة)
  interfacePreviewTitle: "Interface Preview",
  interfacePreviewDesc: "This is how the interface will look inside Discord.",
  sendInterface: "Send Interface",
  sendInterfaceDesc: "Send the customized TempVoice interface to a text channel of your choice.",
  selectTextChannel: "Select a text channel",
  send: "Send",

  // عام للأزرار
  btnName: "NAME",
  btnLimit: "LIMIT",
  btnPrivacy: "PRIVACY",
  btnWaitingRoom: "WAITING ROOM",
  btnChat: "CHAT",
  btnTrust: "TRUST",
  btnUntrust: "UNTRUST",
  btnInvite: "INVITE",
  btnKick: "KICK",
  btnRegion: "REGION",
  btnBlock: "BLOCK",
  btnUnblock: "UNBLOCK",
  btnClaim: "CLAIM",
  btnTransfer: "TRANSFER",
  btnDelete: "DELETE",

  // اللغة
  dashboardLanguage: "Dashboard Language",
  botLanguage: "Bot Language",

  // أخطاء
  errorGeneric: "Something went wrong. Please try again.",
  errorNoAccess: "You don't have permission to manage this server.",
  errorBotNotInGuild: "The bot is not in this server yet.",
};

export default en;
