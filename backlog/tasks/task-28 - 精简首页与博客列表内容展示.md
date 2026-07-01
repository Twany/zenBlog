---
id: TASK-28
title: 精简首页与博客列表内容展示
status: Done
assignee:
  - '@Codex'
created_date: '2026-07-01 09:44'
updated_date: '2026-07-01 09:48'
labels:
  - frontend
  - ux
  - content
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Goal: 从读者视角精简首页和 Blog 列表的信息密度，文章入口只保留配图、标题和时间等必要信息。Scope: HomePage、BlogListPage、PostCard 及相关样式；不改文章正文和发布系统。Definition of Done: 首页和 Blog 列表极简展示，移动端无溢出，lint/check/build/visual QA 通过，部署 Cloudflare 并推送。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 首页文章入口只展示配图、标题、日期，不展示摘要、标签、阅读时长。
- [x] #2 Blog 列表文章入口只展示配图、标题、日期，不展示摘要、标签、阅读时长。
- [x] #3 首页移除统计、构建中等对读者决策弱必要的信息块。
- [x] #4 保留基础导航、归档筛选和文章详情页必要阅读体验。
- [x] #5 通过 lint/check/build/visual QA，部署 Cloudflare，提交并推送。
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
从读者视角精简首页和 Blog 列表：文章卡片只保留配图、标题、日期；隐藏摘要、标签、分类和阅读时长。首页移除统计、Current signals、Now building、Lab 等弱必要区块，仅保留站点定位、最新入口和最新长文列表。通过 lint、Astro check、build、本地 visual QA、线上结构检查，并部署 Cloudflare 版本 c7f5bc26-e528-43f7-8895-8414330b3295。
<!-- SECTION:FINAL_SUMMARY:END -->
