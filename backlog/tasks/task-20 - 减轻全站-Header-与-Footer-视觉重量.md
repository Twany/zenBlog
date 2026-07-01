---
id: TASK-20
title: 减轻全站 Header 与 Footer 视觉重量
status: Done
assignee:
  - '@Codex'
created_date: '2026-06-27 12:04'
updated_date: '2026-07-01 06:16'
labels:
  - frontend
  - design
  - navigation
dependencies: []
references:
  - >-
    /Users/yanyikuo/Desktop/project/blog/zenBlog/src/components/TopographicHeader.astro
  - /Users/yanyikuo/Desktop/project/blog/zenBlog/src/components/Footer.astro
  - /Users/yanyikuo/Desktop/project/blog/zenBlog/src/layouts/BaseLayout.astro
  - /Users/yanyikuo/Desktop/project/blog/zenBlog/src/styles/global.css
  - >-
    /Users/yanyikuo/Desktop/project/blog/zenBlog/src/components/pages/BlogPostPage.astro
  - /Users/yanyikuo/Desktop/project/blog/zenBlog/src/scripts/blog-post.ts
  - /Users/yanyikuo/Desktop/project/blog/zenBlog/tailwind.config.mjs
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Goal: 降低博客全站 Header/Footer 对内容主体的视觉干扰，尤其让 Library 页的书架成为第一屏主体。
Scope: 仅调整全站 Header、Footer、主布局顶部留白和相关滚动偏移；不改变路由、内容数据或页面主体组件。
Definition of Done: Header/Footer 在桌面端明显减重，导航和语言切换仍可用，构建检查通过，并记录浏览器验证结果。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Header 从高饱和大色块改为更轻的固定导航，同时保留品牌、主导航、当前页状态和语言切换。
- [x] #2 主内容顶部留白匹配新的 Header 高度，Library 页第一屏更早露出书架主体。
- [x] #3 Footer 从四列深色大区块改为更紧凑的轻量收口，同时保留主要链接、说明和联系入口。
- [x] #4 项目格式检查、Astro 检查和静态构建通过。
- [x] #5 桌面 Library 页完成浏览器渲染验证，确认无控制台错误、无横向溢出，并有截图证据。
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Audit current Header/Footer visual weight and global layout spacing.
2. Reduce Header height, saturation, typography scale, and mobile menu weight while preserving navigation and language switching.
3. Replace the heavy four-column Footer with a compact footer that keeps primary links, about copy, and contact CTA.
4. Adjust BaseLayout top padding and prose scroll offset for the lighter Header.
5. Run formatting, Astro checks, build, and browser desktop QA on `/library/`.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented on 2026-06-27. Browser desktop QA succeeded with screenshot evidence at `/var/folders/kr/xzdc75yd0l5_y98_s1fqf3h80000gq/T/zenblog-header-footer-light-desktop.png`. In-app browser viewport/mobile validation repeatedly timed out at the Browser tool layer; mobile menu accessibility was still improved in source by adding a localized aria-label to the toggle button.

追加精修：在 Anthropic 式极简改造后，继续优化文章阅读页和移动端体验。主要调整 BlogPostPage：收窄文章页最大宽度，手机标题降级，元信息允许换行，移动目录改为轻量 border-y 控件，正文容器收窄到 68ch，正文 body 改为 sans 以提升中英文移动端可读性，上下篇导航在手机端取消大 padding 和右对齐。同步更新 blog-post.ts，使移动目录展开状态写入 aria-expanded；更新 typography 正文、列表、引用字号和行高。已通过 eslint、astro check、astro build，并部署 Cloudflare 版本 445794f5-cd59-43db-acac-44b1865a1de7。
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Summary:
- Reduced the global header from a tall saturated blue brand block to a compact translucent fixed navigation bar.
- Reduced the global footer from a heavy four-column dark section to a compact light footer with primary navigation, about copy, and contact CTA.
- Adjusted main top padding and prose scroll offset to match the lighter header.
- Added an accessible aria-label for the mobile menu button.

Verification:
- `npx prettier --check src/components/TopographicHeader.astro src/components/Footer.astro src/layouts/BaseLayout.astro src/styles/global.css` passed.
- `npm run check` passed with 0 errors/warnings/hints.
- `npm run build` passed and generated all routes.
- Browser desktop QA on `/library/` confirmed page identity, meaningful content, lighter 80px desktop header, 236px compact footer, no console errors, no horizontal overflow, and screenshot evidence.

Remaining risk:
- Browser viewport/mobile control timed out repeatedly in the in-app browser tool, so mobile menu behavior was validated by source/build checks but not completed through mobile Browser interaction in this session.
<!-- SECTION:FINAL_SUMMARY:END -->
