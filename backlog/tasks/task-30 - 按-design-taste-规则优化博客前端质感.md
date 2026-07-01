---
id: TASK-30
title: 按 design taste 规则优化博客前端质感
status: Done
assignee:
  - Codex
created_date: '2026-07-01 10:47'
updated_date: '2026-07-01 10:53'
labels:
  - ui
  - performance
  - design
dependencies: []
references:
  - /Users/yanyikuo/Desktop/project/blog/zenBlog/src/layouts/BaseLayout.astro
  - /Users/yanyikuo/Desktop/project/blog/zenBlog/src/utils/blog.ts
  - /Users/yanyikuo/Desktop/project/blog/zenBlog/public/images/posts
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
对现有 Astro 博客做保守的 design-taste-frontend 优化：保持信息架构、纯白主题、导航和内容结构不变，只修复生产字体加载与文章配图来源这类高价值问题。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 生产环境不再通过 Google Fonts link 加载站点主字体。
- [x] #2 首页与 Blog 列表使用真实生成图片资产，不再使用手写 SVG 或 OG 图作为文章配图。
- [x] #3 不改变文章详情 SEO/OG 分享图、URL 结构或主导航。
- [x] #4 项目检查、构建和视觉 QA 通过。
- [x] #5 部署到 Cloudflare 并推送提交。
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. 复制 image tool 生成的 PNG 到 public/images/posts，并删除上一轮手写 SVG 配图。
2. 将 getBlogPostFeatureImageUrl 指向 PNG 资产，保持 getBlogPostImageUrl 继续服务 SEO/OG 分享图。
3. 下载现有 Instrument Sans 与 Newsreader 的 woff2 字体到 public/fonts，在 global.css 使用 @font-face，并移除 BaseLayout 中的 Google Fonts link。
4. 运行 check/lint/build/Prettier/visual QA，确认首页、Blog 列表和文章页无回归。
5. 部署到 Cloudflare，完成 Backlog、选题/SOP 判断、git commit 和 push。
<!-- SECTION:PLAN:END -->

## Notes

<!-- SECTION:NOTES:BEGIN -->
- 自托管 Instrument Sans 与 Newsreader 字体，移除 Google Fonts 生产请求。
- 首页与 Blog 列表文章配图改为 AI 生成 PNG 资产，SEO/OG 图仍保持 `/og/{locale}/{slug}.png`。
- 已通过 `npm run check`、`npm run lint`、`npm run build`、`npm run visual:qa -- --base-url=http://127.0.0.1:4321 --out-dir=/tmp/zenblog-taste-qa`。
- 已验证线上 `https://twany.me` 不再包含 Google Fonts 链接，并能返回 `/fonts/*.woff2` 与 `/images/posts/*.png`。
<!-- SECTION:NOTES:END -->
