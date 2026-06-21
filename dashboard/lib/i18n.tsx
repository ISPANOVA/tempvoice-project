"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { messages, Locale, Messages, getDirection, DEFAULT_LOCALE } from "@/messages";

interface I18nContextValue {
  locale: Locale;
  t: Messages;
  setLocale: (locale: Locale) => void;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "tempvoice_dashboard_locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (saved && saved in messages) {
      setLocaleState(saved as Locale);
    } else if (typeof navigator !== "undefined") {
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang in messages) setLocaleState(browserLang as Locale);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getDirection(locale);
  }, [locale]);

  function setLocale(newLocale: Locale) {
    setLocaleState(newLocale);
    window.localStorage.setItem(STORAGE_KEY, newLocale);
  }

  return (
    <I18nContext.Provider value={{ locale, t: messages[locale], setLocale, dir: getDirection(locale) }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

/** دالة بسيطة لاستبدال متغيرات في النص مثل {name} */
export function formatMessage(template: string, vars: Record<string, string | number> = {}) {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, String(value)),
    template
  );
}
