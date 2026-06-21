import en from "./en";
import ar from "./ar";
import fr from "./fr";
import es from "./es";

export type Locale = "en" | "ar" | "fr" | "es";
export type Messages = typeof en;

export const messages: Record<Locale, Messages> = { en, ar, fr, es };

export const SUPPORTED_LOCALES: { code: Locale; name: string; flag: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", name: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
];

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export const DEFAULT_LOCALE: Locale = "en";
