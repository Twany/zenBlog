---
id: TASK-26
title: 移除首页阅读轨道与 Topics 页面入口
status: Done
assignee:
  - '@Codex'
created_date: '2026-07-01 09:14'
updated_date: '2026-07-01 09:19'
labels:
  - frontend
  - ux
  - content
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Goal: 按用户反馈删掉首页 Reading tracks/阅读轨道模块，并移除 /topics 独立入口，降低信息结构重复。Scope: 当前 zenBlog 前台导航、首页、专题路由和相关链接；保留文章页内 category/tag 到博客筛选的具体链接。Definition of Done: 不再出现 Topics 导航和首页阅读轨道，/topics 路由移除或不再被站内引用，lint/check/build 通过，部署 Cloudflare 并推送。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 首页不再展示 Reading tracks/阅读轨道模块。
- [x] #2 主导航、footer 和首页 CTA 不再链接 /topics 或 /zh/topics。
- [x] #3 移除 /topics 与 /zh/topics 页面路由，避免保留冗余专题页。
- [x] #4 保留文章页 tag/category 到博客筛选的链接，不破坏继续阅读路径。
- [x] #5 通过 lint/check/build，部署 Cloudflare，提交并推送。
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
移除首页 Reading tracks/阅读轨道模块、主导航和 footer 的 Topics 入口、/topics 与 /zh/topics 页面路由，并清理 llms.txt、visual QA 和发布脚本中的 topics 检查。保留文章页 category/tag 到博客归档筛选的轻量入口，同时把文案从 topic tracks 改为 archive filters。通过 lint、Astro check、build、本地 visual QA、线上关键页检查，并部署 Cloudflare 版本 8831c6f2-138b-4068-af1e-7bb2dd5e2279。
<!-- SECTION:FINAL_SUMMARY:END -->
