---
id: TASK-24
title: 升级博客发布流水线、OG 图与文章模板
status: Done
assignee:
  - '@Codex'
created_date: '2026-07-01 08:28'
updated_date: '2026-07-01 08:46'
labels:
  - workflow
  - seo
  - content
  - frontend
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Goal: 按内容生产链路优先级落地 1+2+4：升级 zenblog-publish-blog skill，补文章 OG 图片体系，建立文章模板体系。Scope: 当前 zenBlog 项目与本机 zenblog-publish-blog skill；不改 admin 后台，不引入重型服务。Definition of Done: 新发布流程能自动利用专题/SEO能力，文章页具备每篇文章专属 OG 图，模板与脚本可校验，lint/check/build/visual QA 通过，部署 Cloudflare 并推送远端。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 zenblog-publish-blog skill 更新：发布时要求自动生成/推荐专题归属、标签、摘要、社交摘要、发布后自检结果。
- [x] #2 项目支持每篇文章专属 OG 图 URL，并由 SEO meta/JSON-LD 使用，不再只依赖站点 icon。
- [x] #3 建立 3-4 种长文模板体系，发布脚本或校验脚本能基于模板字段辅助内容一致性。
- [x] #4 发布后自检覆盖文章 URL、OG 图、专题入口、llms.txt/RSS/SEO 基础，并有日志输出。
- [x] #5 通过 lint/check/build/visual QA，部署到 Cloudflare，提交并推送。
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
升级 zenblog-publish-blog skill 的直发约定；新增文章模板字段、模板配置、内容校验脚本和发布脚本的模板/OG/线上自检；生成每篇文章的中英 OG PNG 并接入 SEO meta、Twitter card、JSON-LD；完成 lint、Astro check、build、线上视觉 QA，并部署到 Cloudflare 版本 4b99eb26-ff3f-4ef2-8bee-2f2bbf7177f9。
<!-- SECTION:FINAL_SUMMARY:END -->
