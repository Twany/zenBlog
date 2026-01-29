---
id: TASK-5
title: 提取内联脚本到独立文件
status: Done
assignee: []
created_date: '2026-01-28 11:09'
updated_date: '2026-01-28 15:49'
labels:
  - refactor
  - performance
dependencies: []
priority: medium
ordinal: 4000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
BlogPostPage.astro 包含 62 行内联脚本用于 TOC 和阅读进度条功能。应提取到 src/scripts/blog-post.ts 独立文件，利用 Astro 的脚本打包优化，提高可维护性。
<!-- SECTION:DESCRIPTION:END -->
