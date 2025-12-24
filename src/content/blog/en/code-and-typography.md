---
title: "Code & Typography"
description: "A showcase of how we handle code blocks and typography in this new system using Markdown."
pubDate: 2024-11-15
category: CSS
tags: ["Markdown", "Code", "Design"]
readTime: "5 min"
lang: en
translationKey: code-typography
---
We consume content at a staggering rate. But are we actually reading? Or are we just scanning? In this essay, I explore the impact of typography on reading comprehension.

## Typography Principles

When designing for the web, we must consider:

- **Hierarchy**: Using size and weight to guide the eye.
- **Contrast**: Ensuring text is legible against the background.
- **Spacing**: Giving elements room to breathe.

### Code Example

Here is a snippet of **TypeScript** code that demonstrates how we handle the layout:

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

And here is some CSS:

```css
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 2rem;
}
```

## Variable Fonts

With the advent of [variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide) and better CSS support for typesetting, the web is finally catching up to print.

![Abstract Shape](https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop)
