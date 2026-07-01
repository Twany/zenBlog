---
id: TASK-22
title: 优化博客体验审视中的 9 个问题
status: Done
assignee:
  - '@Codex'
created_date: '2026-07-01 06:50'
labels:
  - frontend
  - ux
  - qa
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Goal: 落地最近 UX/UI/功能审视中识别的 9 个优化点。
Scope: Contact 表单可用性、移动端博客筛选折叠、首页定位文案、Library 列表阅读模式、标签体系收敛、文章继续阅读引导、筛选 URL 状态、Notes 时间线表达、视觉 QA 基线能力。不得重做无关页面或改 admin 逻辑。
Definition of Done: 9 个问题均有对应代码改动或可验证行为，lint/check/build/visual QA 通过，部署 Cloudflare 并推送远端。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Contact 不再使用占位 Formspree ID，用户能通过表单触发可用联系动作。
- [x] #2 移动端 Blog 筛选默认折叠，文章更早出现。
- [x] #3 首页增加克制的站点定位文案。
- [x] #4 Library 提供轻量列表/阅读模式入口。
- [x] #5 Blog 标签展示收敛，避免移动端标签墙过长。
- [x] #6 文章页底部继续阅读区域更明确。
- [x] #7 Blog 筛选状态同步到 URL，刷新/分享可保留。
- [x] #8 Notes 页面更像时间线，区分短想法与长文。
- [x] #9 visual QA 支持基线截图生成/对比入口。
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
- Contact 改为可用的 mailto 提交流程，保留表单校验和可访问状态提示。
- Blog 列表移动端筛选默认折叠，常用标签收敛展示，筛选状态同步 URL。
- Homepage、Library、Article、Notes 分别补充定位、列表阅读、继续阅读和时间线表达。
- visual QA 新增 Notes 覆盖，并支持 `visual:qa:update` / `visual:qa:compare`。
- 已通过 check、lint、build、本地 visual QA、线上 visual QA，并部署 Cloudflare。
<!-- SECTION:NOTES:END -->
