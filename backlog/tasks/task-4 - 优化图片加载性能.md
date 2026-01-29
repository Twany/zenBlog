---
id: TASK-4
title: 优化图片加载性能
status: Done
assignee: []
created_date: '2026-01-28 11:09'
updated_date: '2026-01-28 15:48'
labels:
  - performance
  - seo
dependencies: []
priority: medium
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
当前问题：1) NoteCard.astro 直接加载外部 Unsplash 图片未优化 2) 图片缺少 width/height 属性导致 CLS 3) alt 文本策略不完善。建议：使用 Astro 的 Image 组件、添加尺寸属性、改进 alt 文本。
<!-- SECTION:DESCRIPTION:END -->
