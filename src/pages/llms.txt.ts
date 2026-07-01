import { SITE } from '../data/site';
import { getBlogPosts, getBlogPostUrl, getSlugFromEntry } from '../utils/blog';

export async function GET() {
  const [enPosts, zhPosts] = await Promise.all([
    getBlogPosts('en'),
    getBlogPosts('zh'),
  ]);

  const lines = [
    `# ${SITE.name}`,
    '',
    SITE.description.en,
    '',
    '## Core Pages',
    `- Home: ${SITE.url}/`,
    `- Blog archive: ${SITE.url}/blog/`,
    `- Spatial library: ${SITE.url}/library/`,
    `- Chinese home: ${SITE.url}/zh/`,
    '',
    '## Recent English Articles',
    ...enPosts
      .slice(0, 10)
      .map(
        (post) =>
          `- ${post.data.title}: ${SITE.url}${getBlogPostUrl('en', getSlugFromEntry(post))}`
      ),
    '',
    '## Recent Chinese Articles',
    ...zhPosts
      .slice(0, 10)
      .map(
        (post) =>
          `- ${post.data.title}: ${SITE.url}${getBlogPostUrl('zh', getSlugFromEntry(post))}`
      ),
    '',
    '## Notes',
    '- Content is bilingual when a translation exists.',
    '- Public writing focuses on AI workflows, code, design, product thinking, publishing systems, and independent building.',
  ];

  return new Response(`${lines.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
