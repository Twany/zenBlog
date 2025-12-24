export const locales = ['en', 'zh'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export const localeToLang = {
  en: 'en-US',
  zh: 'zh-CN',
} as const;

export const localeToOg = {
  en: 'en_US',
  zh: 'zh_CN',
} as const;

export const localeToHreflang = {
  en: 'en',
  zh: 'zh-Hans',
} as const;

export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);

export const withLeadingSlash = (path: string) =>
  path.startsWith('/') ? path : `/${path}`;

export const withTrailingSlash = (path: string) =>
  path.endsWith('/') ? path : `${path}/`;

export const stripLocale = (pathname: string) => {
  const clean = withLeadingSlash(pathname);
  const segments = clean.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments.shift();
  }
  const stripped = `/${segments.join('/')}`;
  return withTrailingSlash(stripped === '/' ? '/' : stripped);
};

export const getLocaleFromPath = (pathname: string): Locale => {
  const segments = withLeadingSlash(pathname).split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    return segments[0];
  }
  return defaultLocale;
};

export const getLocalizedPath = (pathname: string, locale: Locale) => {
  const base = stripLocale(pathname);
  if (locale === defaultLocale) {
    return base;
  }
  const suffix = base === '/' ? '' : base;
  return withTrailingSlash(`/${locale}${suffix}`);
};
