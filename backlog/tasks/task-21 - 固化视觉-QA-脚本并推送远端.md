---
id: TASK-21
title: 固化视觉 QA 脚本并推送远端
status: In Progress
assignee:
  - '@Codex'
created_date: '2026-07-01 06:34'
labels:
  - frontend
  - qa
  - tooling
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Goal: 将本次临时 Playwright 视觉验收固化为项目脚本，并把整理后的 commits 推送到 GitHub。
Scope: 添加可复用 visual QA 脚本、npm 命令和必要的 dev dependency；不改页面视觉与业务逻辑。
Definition of Done: `npm run visual:qa` 可检查线上关键页面的移动端/桌面响应、console error 和横向溢出；工作区干净；main 分支成功 push 到 origin。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 新增可运行的视觉 QA 脚本，默认检查 twany.me 的首页、文章页、博客列表、Library、Contact。
- [ ] #2 脚本覆盖 mobile 390x844 与 desktop 1440x1000，并输出截图与 JSON 报告。
- [ ] #3 脚本在非 2xx 状态、console error 或横向溢出时以非零退出。
- [ ] #4 相关代码通过 lint、Astro check 和 build。
- [ ] #5 本地 commits 成功推送到 origin/main。
<!-- AC:END -->
