---
id: TASK-11
title: 优化字体加载策略
status: Done
assignee: []
created_date: '2026-01-28 11:11'
updated_date: '2026-01-28 15:56'
labels:
  - performance
dependencies: []
priority: low
ordinal: 10000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Google Fonts 加载可能导致 CLS。建议：1) 在 URL 中添加 display=swap 参数 2) 考虑系统字体回退方案 3) 或自托管字体文件以获得更好控制
<!-- SECTION:DESCRIPTION:END -->
