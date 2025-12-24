---
title: "代码与排版"
description: "展示我们如何在这个新系统中使用 Markdown 处理代码块和排版。"
pubDate: 2024-11-15
category: CSS
tags: ["Markdown", "Code", "Design"]
readTime: "5 分钟"
lang: zh
translationKey: code-typography
---
我们要以惊人的速度消费内容。但我们真的在阅读吗？还是只是在扫描？在这篇文章中，我探讨了数字时代排版对阅读理解和记忆保留的影响。

## 排版原则

在为网络设计时，我们必须考虑：

- **层级**：使用大小和粗细来引导视线。
- **对比度**：确保文本在背景上清晰可读。
- **间距**：给元素呼吸的空间。

### 代码示例

这是一个 **TypeScript** 代码片段，演示了我们如何处理布局：

```typescript
interface LayoutProps {
  children: React.ReactNode;
  isMobile: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isMobile }) => {
  return (
    <div className={isMobile ? 'p-4' : 'p-8'}>
      {children}
    </div>
  );
};
```

以及一些 CSS：

```css
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 2rem;
}
```

## 可变字体

随着 [可变字体](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide) 和 CSS 对排版更好支持的出现，网络终于赶上了印刷品。

![Abstract Shape](https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop)
