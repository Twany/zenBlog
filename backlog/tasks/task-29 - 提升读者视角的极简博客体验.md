---
id: TASK-29
title: 提升读者视角的极简博客体验
status: Done
assignee:
  - Codex
created_date: '2026-07-01 09:53'
updated_date: '2026-07-01 10:02'
labels:
  - ui
  - ux
  - redesign
dependencies: []
references:
  - >-
    /Users/yanyikuo/Desktop/project/blog/zenBlog/src/components/pages/HomePage.astro
  - >-
    /Users/yanyikuo/Desktop/project/blog/zenBlog/src/components/pages/BlogListPage.astro
  - >-
    /Users/yanyikuo/Desktop/project/blog/zenBlog/src/components/TopographicHeader.astro
  - /Users/yanyikuo/Desktop/project/blog/zenBlog/src/styles
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
基于现有极简方向继续优化博客界面，让读者在首页、列表和文章周边路径中更快判断内容价值，同时补齐必要的可访问性与交互状态。保持当前信息架构和纯白背景，不恢复复杂内容展示。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 首页与博客列表保持读者优先，只突出配图、标题和必要日期信息。
- [x] #2 全局排版、焦点态、hover/active 状态和阅读节奏有可见提升。
- [x] #3 Header 更轻量但不破坏用户已恢复的基础样式与导航路径。
- [x] #4 构建、类型检查或项目现有验证通过。
- [x] #5 修改部署到 Cloudflare 线上环境。
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. 扫描当前 Astro/Tailwind 样式入口、布局、Header、Footer、首页、Blog 列表和文章卡片，确认现有模式与风险。
2. 做保守视觉升级：强化全局排版节奏、焦点态、hover/active 反馈、跳转可访问性，不引入新框架或大面积重写。
3. 轻量优化 Header：降低视觉重量、保留已恢复的导航样式基础和当前导航项，不新增复杂入口。
4. 调整首页与 Blog 列表细节：继续坚持读者只需要配图、标题、日期的核心信息，修掉不必要的噪音和过重标签感。
5. 运行项目验证，修复发现的问题，部署到 Cloudflare，并完成 Backlog/选题/SOP 记录。
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
完成读者视角极简改版：降低 Header 视觉重量；将全站主字体改为 Instrument Sans + Newsreader；移除 Blog 可见标签筛选但保留搜索匹配标签；删除文章页阅读路径、归档筛选胶囊和正文后作者块；将相关推荐降为标题+日期。验证通过：npm run check、npm run lint、npm run build、触碰文件 Prettier、项目 visual:qa。Cloudflare 已部署，版本 f2b851f9-5315-493f-be2f-b4893f48fa89；公开域 https://twany.me 返回 200。Workers 预览域受 Cloudflare Access 保护，返回登录 302。
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
本次改版继续沿用纯白、读者优先、极简必要的方向，重点减少作者内部组织系统在读者界面中的存在感。主要变化包括：Header 从全大写高字距导航改为更轻的自然导航；全局字体改为 Instrument Sans + Newsreader，并补齐文本换行、数字排版、focus ring 和 active 状态；首页 CTA 和列表卡片降噪；Blog 归档移除可见标签筛选，仅保留搜索与分类，搜索仍覆盖标签；文章详情页删除阅读路径、归档筛选胶囊和正文后作者块，保留目录、分享、相邻文章与简化相关推荐。

验证：npm run check、npm run lint、npm run build、触碰文件 Prettier、npm run visual:qa -- --base-url=http://127.0.0.1:4321 --out-dir=/tmp/zenblog-redesign-qa 均通过。Cloudflare 部署成功，版本 f2b851f9-5315-493f-be2f-b4893f48fa89；https://twany.me 与 /blog/ 返回 200。
<!-- SECTION:FINAL_SUMMARY:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 Cloudflare 部署完成并记录线上验证结果。
<!-- DOD:END -->
