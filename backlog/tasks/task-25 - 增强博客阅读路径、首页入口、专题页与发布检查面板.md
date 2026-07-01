---
id: TASK-25
title: 增强博客阅读路径、首页入口、专题页与发布检查面板
status: Done
assignee:
  - '@Codex'
created_date: '2026-07-01 08:52'
updated_date: '2026-07-01 09:07'
labels:
  - frontend
  - ux
  - content
  - admin
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Goal: 落地下一阶段 1、2、3、5：文章详情页增加下一篇/相关主题/继续阅读，首页改为个人知识入口，专题页升级为内容地图，admin 增加发布检查面板。Scope: 当前 zenBlog 前台与 /admin；沿用现有极简白底风格和内容数据，不引入后端服务。Definition of Done: 功能完整、移动端无明显溢出，lint/check/build/visual QA 通过，部署 Cloudflare 并推送。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 文章详情页展示同主题/同标签相关文章、上一篇/下一篇或继续阅读入口，并支持中英双语。
- [x] #2 首页重构为个人知识入口，突出身份、核心主题、精选文章、最近更新与构建中的项目。
- [x] #3 专题页升级为内容地图，展示 topic 说明、文章数量、代表文章、最近更新，并兼容中英双语。
- [x] #4 /admin 提供发布检查面板，列出每篇文章的 draft、template、tags、description、socialSummary、OG 图、双语配对等状态。
- [x] #5 通过 lint/check/build/visual QA，部署 Cloudflare，提交并推送。
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
完成文章页阅读路径增强、首页个人知识入口重构、专题页内容地图升级、/admin 发布检查面板，并将原 Sveltia CMS 移到 /admin/cms/。修复 topic 聚合时 category/tag 同名导致重复计数的问题。通过 lint、Astro check、build、本地 visual QA、线上关键页短超时检查，并部署 Cloudflare 版本 7e3e0466-21c1-496a-a7dc-d8e422c244aa。
<!-- SECTION:FINAL_SUMMARY:END -->
