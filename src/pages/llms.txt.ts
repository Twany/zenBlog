import { SITE } from '../data/site';
import { getBlogPosts, getBlogPostUrl, getSlugFromEntry } from '../utils/blog';
import { getTopicSummaries } from '../utils/topics';

export async function GET() {
  const [enPosts, zhPosts] = await Promise.all([
    getBlogPosts('en'),
    getBlogPosts('zh'),
  ]);
  const topics = getTopicSummaries(enPosts, 'en').slice(0, 8);

  const lines = [
    `# ${SITE.name}`,
    '',
    SITE.description.en,
    '',
    '## Core Pages',
    `- Home: ${SITE.url}/`,
    `- Blog archive: ${SITE.url}/blog/`,
    `- Topics: ${SITE.url}/topics/`,
    `- Spatial library: ${SITE.url}/library/`,
    `- Chinese home: ${SITE.url}/zh/`,
    '',
    '## Topics',
    ...topics.map((topic) => `- ${topic.name}: ${SITE.url}${topic.href}`),
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
