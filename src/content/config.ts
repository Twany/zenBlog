import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    readTime: z.string(),
    lang: z.enum(['en', 'zh']),
    translationKey: z.string(),
    template: z
      .enum([
        'case-study',
        'workflow-tutorial',
        'design-review',
        'debugging-postmortem',
      ])
      .optional()
      .default('workflow-tutorial'),
    socialSummary: z.string().max(220).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
