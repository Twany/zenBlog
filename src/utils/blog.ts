import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';
import { defaultLocale } from './i18n';

export type BlogEntry = CollectionEntry<'blog'>;

export const getSlugFromEntry = (entry: BlogEntry) => {
  const parts = entry.slug.split('/');
  if (parts.length > 1) {
    return parts.slice(1).join('/');
  }
  return entry.slug;
};

export const shouldShowDrafts = () => import.meta.env.DEV;

export const isVisibleBlogPost = (entry: BlogEntry) =>
  !entry.data.draft || shouldShowDrafts();

export const getBlogPosts = async (locale: Locale) => {
  const entries = await getCollection('blog');
  return entries
    .filter((entry) => entry.data.lang === locale && isVisibleBlogPost(entry))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
};

export const getBlogIndexUrl = (locale: Locale) => {
  if (locale === defaultLocale) {
    return '/blog/';
  }
  return `/${locale}/blog/`;
};

export const getBlogPostUrl = (locale: Locale, slug: string) => {
  if (locale === defaultLocale) {
    return `/blog/${slug}/`;
  }
  return `/${locale}/blog/${slug}/`;
};

export const getBlogPostImageUrl = (locale: Locale, slug: string) =>
  `/og/${locale}/${slug}.png`;

export const getBlogPostFeatureImageUrl = (slug: string) =>
  `/images/posts/${slug}.svg`;
