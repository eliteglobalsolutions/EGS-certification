import { notFound } from 'next/navigation';
import { isLocale, Locale } from './dictionaries';

export function resolveLocale(locale: string): Locale {
  if (!isLocale(locale)) notFound();
  return locale;
}
