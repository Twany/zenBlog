# Twany Blog

A modern, SEO-friendly blog built with Astro, featuring multilingual support and a headless CMS.

[中文文档](./README.zh.md)

## Features

- **Astro 5** - Fast static site generation
- **Multilingual** - English and Chinese support
- **Sveltia CMS** - Headless CMS with GitHub authentication
- **Tailwind CSS** - Utility-first styling
- **SEO Optimized** - Schema.org structured data, sitemap, RSS feeds
- **Responsive** - Mobile-first design
- **Accessible** - WCAG AA compliant

## Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Sveltia CMS](https://github.com/sveltia/sveltia-cms) - Content management
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Cloudflare Workers](https://workers.cloudflare.com/) - Deployment

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Twany/zenBlog.git
cd zenBlog

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check` | Type check with Astro |
| `npm run lint` | Lint code with ESLint |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run unit tests |

## Project Structure

```
src/
├── components/       # Reusable UI components
├── content/          # Blog posts (Markdown)
│   └── blog/
│       ├── en/       # English posts
│       └── zh/       # Chinese posts
├── data/             # Static data (notes, experiments)
├── layouts/          # Page layouts
├── pages/            # Route pages
├── scripts/          # Client-side scripts
├── styles/           # Global styles
└── utils/            # Utility functions
public/
├── admin/            # CMS configuration
└── images/           # Static images
```

## Content Management

### Using the CMS

1. Visit `/admin/` on your deployed site
2. Sign in with GitHub
3. Create and edit content

### Manual Editing

- **Blog posts**: Add Markdown files to `src/content/blog/[en|zh]/`
- **Notes**: Edit `src/data/notes.json`
- **Experiments**: Edit `src/data/experiments.json`

## Multilingual Routes

| Language | Path | RSS |
|----------|------|-----|
| English | `/` | `/rss.xml` |
| Chinese | `/zh/` | `/zh/rss.xml` |

## Deployment

This site is deployed on Cloudflare Workers/Pages.

```bash
npm run build
```

The `dist/` folder contains the production build.

## CMS Authentication

The CMS uses a self-hosted OAuth service on Cloudflare Workers. See [cf-oauth-worker](https://github.com/Twany/cf-oauth-worker) for setup instructions.

## License

MIT

## Acknowledgments

Design inspiration from [themaninblue.com](https://themaninblue.com/)
