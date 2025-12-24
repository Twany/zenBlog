import rss from '@astrojs/rss';
import { getBlogPosts, getBlogPostUrl, getSlugFromEntry } from '../../utils/blog';
import { SITE } from '../../data/site';

export async function GET() {
  const posts = await getBlogPosts('zh');
  return rss({
    title: `${SITE.title} (ZH)`,
    description: SITE.description.zh,
    site: SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: getBlogPostUrl('zh', getSlugFromEntry(post)),
      pubDate: post.data.pubDate,
    })),
  });
}
