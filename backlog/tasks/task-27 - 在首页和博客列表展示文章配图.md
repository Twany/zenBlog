---
id: TASK-27
title: 在首页和博客列表展示文章配图
status: Done
assignee:
  - '@Codex'
created_date: '2026-07-01 09:20'
updated_date: '2026-07-01 09:30'
labels:
  - frontend
  - ux
  - content
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Goal: 首页和 Blog 列表中的文章卡片展示每篇文章的配图，优先复用现有 public/og/{lang}/{slug}.png。Scope: PostCard、首页、博客列表页及相关样式；不改文章正文，不新增外部图片依赖。Definition of Done: 首页和博客列表文章卡片显示图片，移动端不溢出，lint/check/build/visual QA 通过，部署 Cloudflare 并推送。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 首页文章卡片展示对应文章图片。
- [x] #2 Blog 列表页文章卡片展示对应文章图片。
- [x] #3 中英文文章均使用对应语言的 OG 图片路径。
- [x] #4 卡片图片在移动端和桌面端比例稳定，无文字重叠或布局跳动。
- [x] #5 通过 lint/check/build/visual QA，部署 Cloudflare，提交并推送。
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
首页和 Blog 列表已展示文章配图，复用现有 /og/{lang}/{slug}.png。新增 getBlogPostImageUrl 统一图片路径；PostCard 支持 stacked 与 media 两种图片布局：首页使用大图，Blog 列表桌面使用左图右文的缩略图布局、移动端保持堆叠。通过 lint、Astro check、build、本地 visual QA、线上图片加载和溢出检查，并部署 Cloudflare 版本 aef62e3b-e301-4d15-a3d1-2d4615b1b553。
<!-- SECTION:FINAL_SUMMARY:END -->
