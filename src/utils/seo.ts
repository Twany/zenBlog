import { SITE } from '../data/site';
import { defaultLocale, getLocalizedPath, locales, localeToHreflang, type Locale } from './i18n';

export const buildCanonicalUrl = (pathname: string, locale: Locale) => {
  const localizedPath = getLocalizedPath(pathname, locale);
  return new URL(localizedPath, SITE.url).toString();
};

export const buildAlternateLinks = (pathname: string) => {
  return locales.map((locale) => ({
    locale,
    hrefLang: localeToHreflang[locale],
    href: new URL(getLocalizedPath(pathname, locale), SITE.url).toString(),
  }));
};

export const buildXDefaultLink = (pathname: string) => {
  return new URL(getLocalizedPath(pathname, defaultLocale), SITE.url).toString();
};
