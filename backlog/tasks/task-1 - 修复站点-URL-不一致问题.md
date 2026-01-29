---
id: TASK-1
title: 修复站点 URL 不一致问题
status: Done
assignee: []
created_date: '2026-01-28 11:08'
updated_date: '2026-01-28 15:43'
labels:
  - bug
  - seo
dependencies: []
priority: high
ordinal: 500
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
astro.config.mjs 中配置的是 https://twany.me，但 src/data/site.ts 使用的是 https://themaninblue.com。这会导致 canonical URLs、sitemap 和 RSS 生成错误。需要统一使用正确的域名。
<!-- SECTION:DESCRIPTION:END -->
