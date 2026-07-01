import { getBlogIndexUrl } from './blog';
import type { Locale } from './i18n';

export const getTopicFilterUrl = (
  locale: Locale,
  topic: string,
  kind: 'category' | 'tag'
) => {
  const params = new URLSearchParams();
  params.set(kind === 'category' ? 'category' : 'tag', topic);
  return `${getBlogIndexUrl(locale)}?${params.toString()}`;
};
