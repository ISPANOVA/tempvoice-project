/**
 * هذا الملف يصل لخدمات البوت عبر `global.__tempvoiceBotService`، الذي يُسجّله
 * server.js (في جذر المشروع) فور تشغيل البوت بنجاح. البوت والداشبورد يعملان
 * في نفس عملية Node.js الواحدة، فلا حاجة لأي طلب HTTP أو مفتاح سري بينهما.
 *
 * لماذا global بدل require نسبي مباشر إلى bot/src/botService.js؟
 * لأن Next.js (خصوصًا مع Turbopack) يحاول تتبع وتجميع (bundle) كل استدعاءات
 * require ضمن حدود مجلد المشروع (dashboard/)، واستدعاء ملف من مجلد bot/
 * الخارجي قد لا يُحل بشكل موثوق عبر كل أوضاع التشغيل. التسجيل على global
 * في وقت التشغيل الفعلي (server.js) يتجاوز هذا القيد ويضمن عمل الاتصال دائمًا.
 */

export interface MutualGuild {
  id: string;
  name: string;
  icon: string | null;
  memberCount: number;
}

export interface GuildDetails {
  id: string;
  name: string;
  icon: string | null;
  channels: { id: string; name: string; type: number; parentId: string | null }[];
  roles: { id: string; name: string; color: string }[];
}

interface BotServiceShape {
  getMutualGuilds: (userGuildIds: string[]) => MutualGuild[];
  getGuildDetails: (guildId: string) => GuildDetails;
  getGuildSetupStatus: (guildId: string) => Promise<{ isSetup: boolean; creatorChannels: any[] }>;
  isBotReady: () => boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var __tempvoiceBotService: BotServiceShape | undefined;
}

function getService(): BotServiceShape {
  const service = global.__tempvoiceBotService;
  if (!service) {
    throw new Error(
      "خدمة البوت غير متاحة بعد. تأكد أن التطبيق يُشغَّل عبر node server.js من جذر المشروع (وليس next start مباشرة بمفرده)."
    );
  }
  return service;
}

export async function getMutualGuilds(userGuildIds: string[]): Promise<MutualGuild[]> {
  return getService().getMutualGuilds(userGuildIds);
}

export async function getGuildDetails(guildId: string): Promise<GuildDetails> {
  return getService().getGuildDetails(guildId);
}

export async function getGuildSetupStatus(
  guildId: string
): Promise<{ isSetup: boolean; creatorChannels: any[] }> {
  return getService().getGuildSetupStatus(guildId);
}

export function isBotReady(): boolean {
  const service = global.__tempvoiceBotService;
  return service ? service.isBotReady() : false;
}
