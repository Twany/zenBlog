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
  }),
});

export const collections = { blog };
