---
title: "分辨率依赖布局"
description: "早在响应式设计出现之前，我就写过一种能够使网站根据屏幕大小改变其设计的技术。"
pubDate: 2024-10-02
category: CSS
tags: ["Responsive Design", "History", "Layout"]
readTime: "8 分钟"
lang: zh
translationKey: resolution-dependent-layout
---
在媒体查询成为标准之前，我们不得不使用 JavaScript 来检测视口宽度。本文回顾了响应式设计的历史以及我们取得的进步。

## 旧方法

在 2004 年，我们做事的方式截然不同。

> “网络是流动的，但我们的设计是僵化的。”

我们使用 `window.onresize` 事件来交换样式表。这很笨拙、缓慢，而且容易出错。

## 新方法

今天，我们有了 **CSS 容器查询**，它允许我们根据父容器的大小而不仅仅是视口来设置元素的样式。

```css
@container (min-width: 700px) {
  .card {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
}
```
