# Twany Blog

一个现代化、SEO 友好的博客，使用 Astro 构建，支持多语言和无头 CMS。

[English](./README.md)

## 特性

- **Astro 5** - 快速的静态站点生成
- **多语言** - 支持中英文
- **Sveltia CMS** - 无头 CMS，GitHub 认证
- **Tailwind CSS** - 原子化 CSS 框架
- **SEO 优化** - Schema.org 结构化数据、站点地图、RSS 订阅
- **响应式** - 移动端优先设计
- **无障碍** - 符合 WCAG AA 标准

## 技术栈

- [Astro](https://astro.build/) - 静态站点生成器
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Sveltia CMS](https://github.com/sveltia/sveltia-cms) - 内容管理
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Cloudflare Workers](https://workers.cloudflare.com/) - 部署平台

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 pnpm

### 安装

```bash
# 克隆仓库
git clone https://github.com/Twany/zenBlog.git
cd zenBlog

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 `http://localhost:4321`

### 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run check` | Astro 类型检查 |
| `npm run lint` | ESLint 代码检查 |
| `npm run format` | Prettier 代码格式化 |
| `npm run test` | 运行单元测试 |

## 项目结构

```
src/
├── components/       # 可复用 UI 组件
├── content/          # 博客文章 (Markdown)
│   └── blog/
│       ├── en/       # 英文文章
│       └── zh/       # 中文文章
├── data/             # 静态数据 (笔记、实验项目)
├── layouts/          # 页面布局
├── pages/            # 路由页面
├── scripts/          # 客户端脚本
├── styles/           # 全局样式
└── utils/            # 工具函数
public/
├── admin/            # CMS 配置
└── images/           # 静态图片
```

## 内容管理

### 使用 CMS

1. 访问部署站点的 `/admin/`
2. 使用 GitHub 登录
3. 创建和编辑内容

### 手动编辑

- **博客文章**：在 `src/content/blog/[en|zh]/` 添加 Markdown 文件
- **笔记**：编辑 `src/data/notes.json`
- **实验项目**：编辑 `src/data/experiments.json`

## 多语言路由

| 语言 | 路径 | RSS |
|------|------|-----|
| 英文 | `/` | `/rss.xml` |
| 中文 | `/zh/` | `/zh/rss.xml` |

## 部署

本站部署在 Cloudflare Workers/Pages 上。

```bash
npm run build
```

`dist/` 目录包含生产构建文件。

## CMS 认证

CMS 使用部署在 Cloudflare Workers 上的自建 OAuth 服务。详见 [cf-oauth-worker](https://github.com/Twany/cf-oauth-worker) 了解配置方法。

## 许可证

MIT

## 致谢

设计灵感来自 [themaninblue.com](https://themaninblue.com/)
