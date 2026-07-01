---
id: TASK-15
title: 优化博客语义可访问性、工具链与 Header 视觉重量
status: Done
assignee:
  - Codex
created_date: '2026-06-17 03:55'
updated_date: '2026-06-17 04:07'
labels:
  - frontend
  - accessibility
  - maintenance
dependencies: []
references:
  - src/components/SectionHeading.astro
  - src/components/TopographicHeader.astro
  - src/components/pages/BlogListPage.astro
  - src/components/pages/BlogPostPage.astro
  - src/components/pages/ContactPage.astro
  - src/styles/global.css
  - eslint.config.js
  - package.json
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
修复当前博客审计中发现的非文章页 H1 缺失、交互控件触控/对比度/focus 不足、lint/check 工具链不可用，并降低固定 Header 的视觉压迫感，同时保持现有 Astro/Tailwind 架构和内容路由不变。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 首页、博客归档、联系页、实验页、关于页、笔记页等非文章页面具备合理的 H1 语义，文章页仍保留文章标题 H1。
- [x] #2 筛选按钮、标签按钮、文章目录项、页脚/导航链接和表单控件具备可见 focus 状态，移动端主要交互目标不低于 44px 或有等效可点击区域。
- [x] #3 主要低对比文本（元信息、标签、页脚 CTA、实验卡片文字等）提升到可读水平，不牺牲现有视觉层级。
- [x] #4 Header 在桌面和移动端视觉重量降低，固定导航仍清晰可用，滚动收缩行为正常。
- [x] #5 npm run lint 通过；npm run check 能实际执行或项目明确安装所需依赖后通过；npm run build 通过。
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. 调整语义标题：扩展 SectionHeading 支持 as/h1 参数，并在非文章页面入口标题使用 h1；避免影响文章页现有 h1。
2. 优化 Header：降低默认高度、简化背景图层强度、缩小 logo/nav 字号和间距，保持移动菜单与滚动收缩逻辑。
3. 修复可访问性细节：增加全局 focus-visible 样式，扩大筛选标签/清除按钮/目录项/页脚链接等触控区域，提升元信息、标签、页脚 CTA、实验卡片等低对比文本。
4. 修复工具链：清理未使用导入/变量，给浏览器脚本配置 ESLint browser globals，安装或补齐 astro check 所需依赖；保持 build/lint/check 全部可执行。
5. 运行验证：npm run lint、npm run check、npm run build，并用浏览器截图复查 header、H1、移动端交互与文章目录。
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented semantic heading updates, accessible control sizing/focus/contrast improvements, lighter header treatment, and toolchain cleanup. Verification: npm run lint passed; npm run check passed with 0 errors/0 warnings/0 hints; npm run build passed. Build still emits a Vite warning from Astro internal remotePattern imports, not from project code.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Updated the blog frontend to address the requested audit items:
- Added semantic H1 coverage for non-article pages while preserving article title H1s.
- Improved focus-visible styling, touch target sizing, text contrast, tag/filter controls, article TOC controls, footer links, and form controls.
- Reworked the fixed header into a lighter translucent/neutral navigation with reduced height, smaller nav typography, subtler topographic texture, and clearer mobile menu.
- Fixed toolchain issues by adding @astrojs/check, removing the now-redundant Tailwind line-clamp plugin, configuring browser globals for ESLint, cleaning unused imports/schema script handling, and adding JSON data color validation.

Validation:
- npm run lint passed.
- npm run check passed with 0 errors, 0 warnings, 0 hints.
- npm run build passed; only remaining warning is from Astro/Vite internal dependency imports.
<!-- SECTION:FINAL_SUMMARY:END -->
