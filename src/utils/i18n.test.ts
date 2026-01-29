import { describe, it, expect } from 'vitest';
import {
  isLocale,
  withLeadingSlash,
  withTrailingSlash,
  stripLocale,
  getLocaleFromPath,
  getLocalizedPath,
} from './i18n';

describe('i18n utilities', () => {
  describe('isLocale', () => {
    it('returns true for valid locales', () => {
      expect(isLocale('en')).toBe(true);
      expect(isLocale('zh')).toBe(true);
    });

    it('returns false for invalid locales', () => {
      expect(isLocale('fr')).toBe(false);
      expect(isLocale('de')).toBe(false);
      expect(isLocale('')).toBe(false);
    });
  });

  describe('withLeadingSlash', () => {
    it('adds leading slash if missing', () => {
      expect(withLeadingSlash('blog')).toBe('/blog');
      expect(withLeadingSlash('blog/post')).toBe('/blog/post');
    });

    it('keeps existing leading slash', () => {
      expect(withLeadingSlash('/blog')).toBe('/blog');
      expect(withLeadingSlash('/')).toBe('/');
    });
  });

  describe('withTrailingSlash', () => {
    it('adds trailing slash if missing', () => {
      expect(withTrailingSlash('/blog')).toBe('/blog/');
      expect(withTrailingSlash('/blog/post')).toBe('/blog/post/');
    });

    it('keeps existing trailing slash', () => {
      expect(withTrailingSlash('/blog/')).toBe('/blog/');
      expect(withTrailingSlash('/')).toBe('/');
    });
  });

  describe('stripLocale', () => {
    it('removes locale prefix from path', () => {
      expect(stripLocale('/zh/blog/')).toBe('/blog/');
      expect(stripLocale('/zh/about/')).toBe('/about/');
    });

    it('keeps path without locale prefix', () => {
      expect(stripLocale('/blog/')).toBe('/blog/');
      expect(stripLocale('/')).toBe('/');
    });

    it('handles paths without slashes', () => {
      expect(stripLocale('zh/blog')).toBe('/blog/');
    });
  });

  describe('getLocaleFromPath', () => {
    it('extracts locale from path', () => {
      expect(getLocaleFromPath('/zh/blog/')).toBe('zh');
      expect(getLocaleFromPath('/zh/')).toBe('zh');
    });

    it('returns default locale for paths without locale', () => {
      expect(getLocaleFromPath('/blog/')).toBe('en');
      expect(getLocaleFromPath('/')).toBe('en');
    });
  });

  describe('getLocalizedPath', () => {
    it('adds locale prefix for non-default locale', () => {
      expect(getLocalizedPath('/blog/', 'zh')).toBe('/zh/blog/');
      expect(getLocalizedPath('/', 'zh')).toBe('/zh/');
    });

    it('removes locale prefix for default locale', () => {
      expect(getLocalizedPath('/zh/blog/', 'en')).toBe('/blog/');
      expect(getLocalizedPath('/blog/', 'en')).toBe('/blog/');
    });
  });
});
