---
id: TASK-21
title: 固化视觉 QA 脚本并推送远端
status: Done
assignee:
  - '@Codex'
created_date: '2026-07-01 06:34'
updated_date: '2026-07-01 06:37'
labels:
  - frontend
  - qa
  - tooling
dependencies: []
references:
  - /Users/yanyikuo/Desktop/project/blog/zenBlog/scripts/visual_qa.mjs
  - /Users/yanyikuo/Desktop/project/blog/zenBlog/package.json
  - /Users/yanyikuo/Desktop/project/blog/zenBlog/visual-qa/report.json
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
- [x] #1 新增可运行的视觉 QA 脚本，默认检查 twany.me 的首页、文章页、博客列表、Library、Contact。
- [x] #2 脚本覆盖 mobile 390x844 与 desktop 1440x1000，并输出截图与 JSON 报告。
- [x] #3 脚本在非 2xx 状态、console error 或横向溢出时以非零退出。
- [x] #4 相关代码通过 lint、Astro check 和 build。
- [x] #5 本地 commits 成功推送到 origin/main。
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented `npm run visual:qa` using `playwright-core` plus system Google Chrome. The script checks five public pages across mobile and desktop viewports, writes screenshots and `report.json`, and fails on bad status, console errors, or horizontal overflow. Verified locally and pushed origin/main to commit `669df72`.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Summary:
- Added `scripts/visual_qa.mjs` and `npm run visual:qa`.
- Added `playwright-core` as a dev dependency while using the system Chrome executable, so the project does not download bundled browsers.
- Ignored generated `visual-qa/` screenshots and reports.
- Ran visual QA against `https://twany.me` for home, article, blog, library, and contact at 390x844 and 1440x1000.
- Pushed `main` to `origin` through commit `669df72`.

Verification:
- `npm run visual:qa` passed: all checked pages returned 200, no console errors, no horizontal overflow.
- `eslint .` passed.
- `astro check` passed.
- `astro build` passed.

Notes:
- Astro check/build should be run sequentially, not in parallel, because Astro content cache writes can race on the same temporary data-store file.
<!-- SECTION:FINAL_SUMMARY:END -->
