import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { defaultLang, languages, type Lang } from "./i18n/config";

const languageOptions = Object.keys(languages) as [Lang, ...Lang[]];

const blogsCollection = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blogs" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        lang: z.enum(languageOptions).default(defaultLang),
        pubDate: z.date(),
        author: z.string().optional(),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().optional(),
        image: z.object({
            url: image(),
            alt: z.string().optional()
        })
        .optional(),
    }),
});

export const collections = {
    blogs: blogsCollection,
};
