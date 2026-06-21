/**
 * يبني الدومين العام للتطبيق من DISCORD_REDIRECT_URI بدل الاعتماد على
 * req.nextUrl.origin أو req.url، لأن هذه الأخيرة قد تعكس عنوان الشبكة
 * الداخلي (مثل localhost أو بورت داخلي) عندما يعمل التطبيق خلف بروكسي
 * عكسي كما هو الحال على Railway، مما يسبب تحويل المستخدم لرابط محلي
 * خاطئ بعد أي عملية تحتاج بناء رابط كامل (تسجيل دخول، خروج، حماية مسارات).
 *
 * يُستخدم هذا الملف في كل مكان يحتاج بناء رابط مطلق صحيح: middleware.ts،
 * و API routes الخاصة بالمصادقة (login, callback, logout).
 */
export function getAppBaseUrl(): string {
  const redirectUri = process.env.DISCORD_REDIRECT_URI;
  if (redirectUri) {
    try {
      return new URL(redirectUri).origin;
    } catch {
      // تجاهل وانتقل للـ fallback أدناه
    }
  }
  return "http://localhost:3000";
}
