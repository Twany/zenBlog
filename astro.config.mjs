import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  site: 'https://themaninblue.com',
  trailingSlash: 'always',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    remarkPlugins: [remarkGfm],
  },
});
