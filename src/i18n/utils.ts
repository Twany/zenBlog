import { defaultLang, supportedLanguages, type Lang } from "./config";

const localeSet = new Set(supportedLanguages);

const normalizePathname = (pathname: string): string => {
  if (!pathname) return "/";
  if (!pathname.startsWith("/")) {
    return `/${pathname}`;
  }
  return pathname === "" ? "/" : pathname;
};

export const removeLocaleFromPath = (pathname: string): string => {
  const normalized = normalizePathname(pathname);
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) {
    return "/";
  }
  const maybeLocale = segments[0];
  if (localeSet.has(maybeLocale as Lang) && maybeLocale !== defaultLang) {
    const rest = segments.slice(1);
    if (rest.length === 0) {
      return "/";
    }
    return `/${rest.join("/")}`;
  }
  return normalized;
};

export const localizePath = (pathname: string, lang: Lang): string => {
  const normalized = normalizePathname(pathname);
  if (lang === defaultLang) {
    return normalized;
  }
  if (normalized === "/") {
    return `/${lang}`;
  }
  return `/${lang}${normalized}`;
};

export const getPathSelector = (lang: Lang) => {
  return (pathname: string) => localizePath(pathname, lang);
};

export const getLangFromPathname = (pathname: string): Lang => {
  const normalized = normalizePathname(pathname);
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) {
    return defaultLang;
  }
  const maybeLocale = segments[0];
  if (localeSet.has(maybeLocale as Lang) && maybeLocale !== defaultLang) {
    return maybeLocale as Lang;
  }
  return defaultLang;
};
