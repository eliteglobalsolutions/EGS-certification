'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Locale, translations } from '@/lib/i18n/translations';

type I18nContextType = { locale: Locale; setLocale: (locale: Locale) => void; t: (key: string) => string };
const I18nContext = createContext<I18nContextType | null>(null);

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const saved = window.localStorage.getItem('egs_locale') as Locale | null;
    if (saved === 'en' || saved === 'zh') setLocale(saved);
  }, []);

  const onSetLocale = (next: Locale) => {
    setLocale(next);
    window.localStorage.setItem('egs_locale', next);
  };

  const value = useMemo(
    () => ({ locale, setLocale: onSetLocale, t: (key: string) => translations[locale][key] ?? key }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within AppProviders');
  return context;
}
