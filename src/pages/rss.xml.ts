import rss from '@astrojs/rss';
import { getBlogPosts, getBlogPostUrl, getSlugFromEntry } from '../utils/blog';
import { SITE } from '../data/site';

export async function GET() {
  const posts = await getBlogPosts('en');
  return rss({
    title: `${SITE.title} (EN)`,
    description: SITE.description.en,
    site: SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: getBlogPostUrl('en', getSlugFromEntry(post)),
      pubDate: post.data.pubDate,
    })),
  });
}
