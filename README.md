# Twany Blog

A modern, SEO-friendly blog built with Astro, featuring multilingual support and a headless CMS.

[中文文档](./README.zh.md)

## Architecture Philosophy

This project follows a **"Local for Code, Cloud for Content"** architecture:

```
┌─────────────────────────────────────────────────────────────────┐
│                        CONTENT EDITORS                          │
│                                                                 │
│   Visit /admin/ → GitHub OAuth → Edit Content → Auto Publish   │
│                                                                 │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                          GITHUB                                 │
│                                                                 │
│   • Blog posts (Markdown)                                       │
│   • Notes & Experiments (JSON)                                  │
│   • Site code & configuration                                   │
│                                                                 │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    ▼                           ▼
┌───────────────────────────┐   ┌───────────────────────────────┐
│      DEVELOPERS           │   │      CLOUDFLARE               │
│                           │   │                               │
│   git pull               │   │   Auto-deploy on push         │
│   Code & Style changes    │   │   Serve static site           │
│   git push               │   │   Global CDN                  │
│                           │   │                               │
└───────────────────────────┘   └───────────────────────────────┘
```

### Why This Architecture?

| Aspect | Local Development | Cloud CMS |
|--------|-------------------|-----------|
| **Who** | Developers | Content editors |
| **What** | Code, styles, components | Blog posts, notes, data |
| **Tools** | VS Code, Git, npm | Web browser only |
| **Skills needed** | Programming | None |
| **Workflow** | Edit → Commit → Push | Edit → Publish (one click) |

### Benefits

- **Separation of concerns**: Developers focus on code, editors focus on content
- **No server required**: Static site + serverless OAuth = zero maintenance
- **Version control**: All changes tracked in Git, easy rollback
- **Fast & secure**: Static files served from global CDN
- **Cost effective**: Cloudflare free tier handles most use cases

## Features

- **Astro 5** - Fast static site generation
- **Multilingual** - English and Chinese support
- **Sveltia CMS** - Headless CMS with GitHub authentication
- **Tailwind CSS** - Utility-first styling
- **SEO Optimized** - Schema.org structured data, sitemap, RSS feeds
- **Responsive** - Mobile-first design
- **Accessible** - WCAG AA compliant

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Astro](https://astro.build/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| CMS | [Sveltia CMS](https://github.com/sveltia/sveltia-cms) |
| Auth | [Cloudflare Workers OAuth](https://github.com/Twany/cf-oauth-worker) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |

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

### For Content Editors (Cloud)

1. Visit `https://your-site.com/admin/`
2. Sign in with GitHub
3. Create and edit content
4. Click "Publish" - changes go live automatically

No coding knowledge required. No local setup needed.

### For Developers (Local)

```bash
# Get latest content changes
git pull

# Make code/style changes
# ...edit files...

# Test locally
npm run dev

# Deploy
git add .
git commit -m "your changes"
git push
```

### Content Locations

| Content Type | Location | Edit Via |
|--------------|----------|----------|
| Blog posts | `src/content/blog/[en\|zh]/` | CMS or local |
| Notes | `src/data/notes.json` | CMS or local |
| Experiments | `src/data/experiments.json` | CMS or local |
| Site settings | `src/data/site.json` | CMS or local |
| Components | `src/components/` | Local only |
| UI labels | `src/data/uiLabels.ts` | Local only |

### CMS Features

The CMS (`/admin/`) provides a full-featured content management interface:

| Category | Content | Description |
|----------|---------|-------------|
| **Blog Posts (English)** | English articles | Markdown with frontmatter |
| **博客文章 (中文)** | Chinese articles | Markdown with frontmatter |
| **Data Files** | | |
| ├─ Notes | Short-form content | Bilingual, tags, images |
| └─ Experiments | Project showcase | Bilingual, colors, tech stack |
| **Settings** | | |
| └─ Site Settings | Global config | Site info, social links, display limits |

#### What You Can Edit in CMS

- **Site Info**: Name, tagline, description (EN/ZH), URL, author, email
- **Social Links**: Twitter, GitHub, LinkedIn URLs
- **Display Limits**: Number of items shown on homepage, related posts, etc.
- **Blog Posts**: Full Markdown editor with preview
- **Notes**: Quick thoughts with bilingual support
- **Experiments**: Project cards with tech stack tags

## Multilingual Routes

| Language | Path | RSS |
|----------|------|-----|
| English | `/` | `/rss.xml` |
| Chinese | `/zh/` | `/zh/rss.xml` |

## Deployment

This site is deployed on Cloudflare Pages with automatic deployments on push.

```bash
npm run build
```

The `dist/` folder contains the production build.

## CMS Authentication Setup

The CMS uses a self-hosted OAuth service on Cloudflare Workers.

### Quick Setup

1. Deploy [cf-oauth-worker](https://github.com/Twany/cf-oauth-worker) to Cloudflare Workers
2. Create a GitHub OAuth App (not GitHub App)
3. Configure environment variables in Cloudflare Dashboard
4. Update `public/admin/config.yml` with your OAuth worker URL

See [cf-oauth-worker README](https://github.com/Twany/cf-oauth-worker) for detailed instructions.

## License

MIT

## Acknowledgments

Design inspiration from [themaninblue.com](https://themaninblue.com/)
