import { notFound } from 'next/navigation';
import { isLocale, Locale } from './dictionaries';

export function resolveLocale(locale: string): Locale {
  if (!isLocale(locale)) notFound();
  return locale;
}

export function publicLocalePrefix(locale: Locale): string {
  return locale === 'zh' ? '/cn' : '';
}

export function localizedPath(locale: Locale, path = ''): string {
  const normalized = path && path !== '/' ? (path.startsWith('/') ? path : `/${path}`) : '';
  return `${publicLocalePrefix(locale)}${normalized}` || '/';
}

export function localizedUrl(locale: Locale, siteUrl: string, path = ''): string {
  const prefix = publicLocalePrefix(locale);
  const normalized = path && path !== '/' ? (path.startsWith('/') ? path : `/${path}`) : '';
  return `${siteUrl}${prefix}${normalized}`;
}
