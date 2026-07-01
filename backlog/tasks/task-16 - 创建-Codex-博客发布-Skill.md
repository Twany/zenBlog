---
id: TASK-16
title: 创建 Codex 博客发布 Skill
status: Done
assignee:
  - Codex
created_date: '2026-06-21 00:00'
updated_date: '2026-06-21 15:55'
labels:
  - automation
  - content
  - codex
dependencies: []
references:
  - src/content/config.ts
  - src/utils/blog.ts
  - src/pages/blog/[slug].astro
  - src/pages/zh/blog/[slug].astro
  - package.json
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
为当前 zenBlog 项目创建一个 Codex Skill，使用户触发“发布到博客”时，可以把当前 Codex 工作沉淀为中英双语长文草稿，经用户确认后再自动构建并部署到 Cloudflare。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 博客内容 schema 支持草稿状态，生产构建不会发布未确认草稿。
- [x] #2 提供可重复使用的脚本创建中英双语长文草稿，并能计算 slug、阅读时间、frontmatter。
- [x] #3 提供确认发布脚本，发布前运行 lint/check/build，成功后部署到 Cloudflare。
- [x] #4 创建本机 Codex Skill，触发语为“发布到博客”，且规则只服务当前 zenBlog 项目。
- [x] #5 Skill 与项目脚本通过基础校验，且不会在未经用户确认时自动发布。
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. 扩展内容 schema、博客查询与路由，支持 draft 字段并在生产中排除草稿。
2. 增加 scripts/blog_draft.py 与 scripts/blog_publish.py，分别处理草稿写入和确认发布部署。
3. 增加 npm scripts，方便 Skill 调用统一入口。
4. 使用 skill-creator 初始化 ~/.codex/skills/zenblog-publish-blog，写入项目专用工作流、质量门槛和脚本调用方式。
5. 运行脚本 dry-run、skill validate、lint/check/build，最后更新任务状态。
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented draft-first bilingual publishing support:
- Added optional `draft` to the Astro blog content schema and CMS fields.
- Updated blog post querying so drafts are visible in local dev but excluded from production builds.
- Added `scripts/blog_draft.py` to create paired zh/en Markdown drafts with shared slug/translationKey and computed read time.
- Added `scripts/blog_publish.py` to flip reviewed drafts to published, run lint/check/build, and deploy to Cloudflare; it falls back to local binaries when npm is unavailable.
- Added npm script aliases `blog:draft` and `blog:publish`.
- Created `/Users/yanyikuo/.codex/skills/zenblog-publish-blog` with trigger guidance for “发布到博客” and project-specific content rules.
- Added an AGENTS.md route note so this project points Codex to the skill.

Validation:
- `python3 -m py_compile scripts/blog_draft.py scripts/blog_publish.py` passed.
- Skill validation passed.
- Temporary draft smoke test passed; production build did not generate draft routes.
- ESLint passed via local binary.
- Astro check passed with 0 errors/0 warnings/0 hints.
- Astro build passed.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Created a zenBlog-specific Codex publishing system. The user can say “发布到博客” to generate reviewed Chinese + English long-form drafts, with safe draft gating. Explicit approval is required before `blog_publish.py` flips `draft` to false and deploys to Cloudflare.
<!-- SECTION:FINAL_SUMMARY:END -->
