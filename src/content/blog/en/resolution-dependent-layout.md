---
title: "Resolution Dependent Layout"
description: "Way before there was a thing called responsive design, I wrote about a technique that could enable a website to change its design based on the size of the screen."
pubDate: 2024-10-02
category: CSS
tags: ["Responsive Design", "History", "Layout"]
readTime: "8 min"
lang: en
translationKey: resolution-dependent-layout
---
Before media queries became a standard, we had to use JavaScript hacks to detect viewport width. This article looks back at the history of responsive design and how far we have come.

## The Old Way

In 2004, we did things differently.

> "The web is fluid, but our designs are rigid."

We used `window.onresize` events to swap stylesheets. It was clumsy, slow, and prone to breaking.

## The New Way

Today, we have **CSS Container Queries** which allow us to style elements based on their parent container size, not just the viewport.

```css
@container (min-width: 700px) {
  .card {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
}
```
