import {
  getBlogIndexUrl,
  getBlogPostUrl,
  getSlugFromEntry,
  type BlogEntry,
} from './blog';
import type { Locale } from './i18n';

export type TopicSummary = {
  name: string;
  slug: string;
  count: number;
  href: string;
  latestPost: BlogEntry;
  posts: BlogEntry[];
  description: string;
  kind: 'category' | 'tag';
};

const topicDescriptions: Record<string, { en: string; zh: string }> = {
  'AI Workflow': {
    en: 'Practical ways to turn AI-assisted work into durable systems, artifacts, and writing.',
    zh: '把 AI 协作变成稳定系统、可复用产物和公开写作的实践。',
  },
  Codex: {
    en: 'Field notes on using Codex as a coding, design, publishing, and workflow partner.',
    zh: '关于把 Codex 用作编程、设计、发布和工作流伙伴的现场记录。',
  },
  Automation: {
    en: 'Small automations that remove repeated manual steps from real work.',
    zh: '把真实工作里的重复步骤变少的小型自动化。',
  },
  Publishing: {
    en: 'How writing, validation, and deployment become one repeatable publishing path.',
    zh: '如何把写作、校验和部署变成一条可重复的发布路径。',
  },
  Startup: {
    en: 'Startup stories, product judgment, and the long path from idea to traction.',
    zh: '创业故事、产品判断，以及从想法到牵引力的长路。',
  },
  'Product Thinking': {
    en: 'Product decisions, positioning, user research, and the tradeoffs behind useful tools.',
    zh: '产品决策、定位、用户研究，以及有用工具背后的取舍。',
  },
  Cloudflare: {
    en: 'Deployment, edge infrastructure, and operational details around Cloudflare.',
    zh: '围绕 Cloudflare 的部署、边缘基础设施和运维细节。',
  },
};

export const slugifyTopic = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'topic';

const topicDescription = (name: string, lang: Locale) =>
  topicDescriptions[name]?.[lang] ??
  (lang === 'en'
    ? `Articles connected by ${name}, gathered as a focused reading path.`
    : `围绕「${name}」整理的一组文章，适合按主题连续阅读。`);

export const getTopicFilterUrl = (
  locale: Locale,
  topic: string,
  kind: 'category' | 'tag'
) => {
  const params = new URLSearchParams();
  params.set(kind === 'category' ? 'category' : 'tag', topic);
  return `${getBlogIndexUrl(locale)}?${params.toString()}`;
};

export const getTopicSummaries = (posts: BlogEntry[], locale: Locale) => {
  const groups = new Map<
    string,
    { kind: 'category' | 'tag'; posts: BlogEntry[] }
  >();

  posts.forEach((post) => {
    const candidates = [
      { name: post.data.category, kind: 'category' as const },
      ...(post.data.tags ?? []).map((tag) => ({
        name: tag,
        kind: 'tag' as const,
      })),
    ];

    candidates.forEach(({ name, kind }) => {
      const current = groups.get(name);
      if (current) {
        current.posts.push(post);
      } else {
        groups.set(name, { kind, posts: [post] });
      }
    });
  });

  return Array.from(groups.entries())
    .map(([name, group]) => {
      const groupedPosts = group.posts.sort(
        (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
      );
      const latestPost = groupedPosts[0];
      return {
        name,
        slug: slugifyTopic(name),
        count: groupedPosts.length,
        href: getTopicFilterUrl(locale, name, group.kind),
        latestPost,
        posts: groupedPosts,
        description: topicDescription(name, locale),
        kind: group.kind,
      } satisfies TopicSummary;
    })
    .filter((topic) => topic.count > 0)
    .sort(
      (a, b) =>
        b.count - a.count ||
        b.latestPost.data.pubDate.valueOf() -
          a.latestPost.data.pubDate.valueOf() ||
        a.name.localeCompare(b.name)
    );
};

export const getTopicLatestHref = (locale: Locale, topic: TopicSummary) =>
  getBlogPostUrl(locale, getSlugFromEntry(topic.latestPost));
