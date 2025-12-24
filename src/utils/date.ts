import type { Locale } from './i18n';
import { localeToLang } from './i18n';

export const formatDate = (date: Date, locale: Locale) => {
  return new Intl.DateTimeFormat(localeToLang[locale], {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date);
};

export const formatDateLong = (date: Date, locale: Locale) => {
  return new Intl.DateTimeFormat(localeToLang[locale], {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(date);
};
