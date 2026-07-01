---
id: TASK-31
title: 修正博客半成品体验点
status: Done
assignee:
  - Codex
created_date: '2026-07-01 11:39'
updated_date: '2026-07-01 11:45'
labels:
  - ux
  - ui
dependencies: []
references:
  - >-
    /Users/yanyikuo/Desktop/project/blog/zenBlog/src/components/pages/ContactPage.astro
  - >-
    /Users/yanyikuo/Desktop/project/blog/zenBlog/src/components/pages/ExperimentsPage.astro
  - >-
    /Users/yanyikuo/Desktop/project/blog/zenBlog/src/components/ExperimentCard.astro
  - >-
    /Users/yanyikuo/Desktop/project/blog/zenBlog/src/components/pages/HomePage.astro
  - >-
    /Users/yanyikuo/Desktop/project/blog/zenBlog/src/components/pages/BlogPostPage.astro
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
按应用审视结果移除或收敛半成品体验：Contact 表单、占位社交链接、Experiments 假链接、Popular 命名、AI Summary 命名。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Contact 页不再呈现会误导为站内提交的 mailto 表单。
- [x] #2 占位社交链接不再渲染为可点击按钮。
- [x] #3 Experiments 卡片和底部建议按钮不再表现为无效交互。
- [x] #4 首页 Popular 文案改为与实际逻辑一致的 Featured。
- [x] #5 文章 AI Summary 文案改为 Summary。
- [x] #6 检查、构建、视觉 QA、Cloudflare 部署、提交推送完成。
<!-- AC:END -->

## Notes

<!-- SECTION:NOTES:BEGIN -->
- Contact 页改为明确的邮箱联系入口，删除 mailto 表单脚本和占位社交按钮。
- Experiments 卡片改为静态展示，删除无动作建议按钮。
- 首页文案改为 Featured essays，文章摘要模块改为 Summary。
- About 文案改为当前博客真实定位。
- 已通过 check、lint、build、visual QA，并部署到 Cloudflare。
<!-- SECTION:NOTES:END -->
