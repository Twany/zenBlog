# Twany Blog

一个现代化、SEO 友好的博客，使用 Astro 构建，支持多语言和无头 CMS。

[English](./README.md)

## 架构理念

本项目采用 **"本地改代码，云端改内容"** 的架构：

```
┌─────────────────────────────────────────────────────────────────┐
│                         内容编辑者                               │
│                                                                 │
│     访问 /admin/ → GitHub 登录 → 编辑内容 → 自动发布            │
│                                                                 │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                          GITHUB                                 │
│                                                                 │
│   • 博客文章 (Markdown)                                         │
│   • 笔记 & 实验项目 (JSON)                                      │
│   • 网站代码 & 配置                                             │
│                                                                 │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    ▼                           ▼
┌───────────────────────────────┐   ┌───────────────────────────┐
│           开发者              │   │       CLOUDFLARE          │
│                               │   │                           │
│   git pull                    │   │   推送后自动部署          │
│   修改代码和样式              │   │   托管静态站点            │
│   git push                    │   │   全球 CDN 加速           │
│                               │   │                           │
└───────────────────────────────┘   └───────────────────────────┘
```

### 为什么采用这种架构？

| 方面 | 本地开发 | 云端 CMS |
|------|----------|----------|
| **谁用** | 开发者 | 内容编辑者 |
| **做什么** | 代码、样式、组件 | 博客文章、笔记、数据 |
| **工具** | VS Code、Git、npm | 只需浏览器 |
| **技能要求** | 需要编程知识 | 无需任何技术背景 |
| **工作流** | 编辑 → 提交 → 推送 | 编辑 → 发布（一键完成） |

### 优势

- **职责分离**：开发者专注代码，编辑者专注内容
- **无需服务器**：静态站点 + 无服务器 OAuth = 零维护成本
- **版本控制**：所有更改都记录在 Git 中，轻松回滚
- **快速安全**：静态文件通过全球 CDN 分发
- **成本低廉**：Cloudflare 免费套餐足够大多数场景

## 特性

- **Astro 5** - 快速的静态站点生成
- **多语言** - 支持中英文
- **Sveltia CMS** - 无头 CMS，GitHub 认证
- **Tailwind CSS** - 原子化 CSS 框架
- **SEO 优化** - Schema.org 结构化数据、站点地图、RSS 订阅
- **响应式** - 移动端优先设计
- **无障碍** - 符合 WCAG AA 标准

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | [Astro](https://astro.build/) |
| 样式 | [Tailwind CSS](https://tailwindcss.com/) |
| CMS | [Sveltia CMS](https://github.com/sveltia/sveltia-cms) |
| 认证 | [Cloudflare Workers OAuth](https://github.com/Twany/cf-oauth-worker) |
| 托管 | [Cloudflare Pages](https://pages.cloudflare.com/) |
| 语言 | [TypeScript](https://www.typescriptlang.org/) |

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

### 内容编辑者（云端）

1. 访问 `https://your-site.com/admin/`
2. 使用 GitHub 登录
3. 创建和编辑内容
4. 点击「发布」- 更改自动生效

无需任何编程知识，无需本地环境配置。

### 开发者（本地）

```bash
# 获取最新内容更改
git pull

# 修改代码/样式
# ...编辑文件...

# 本地测试
npm run dev

# 部署
git add .
git commit -m "你的更改"
git push
```

### 内容位置

| 内容类型 | 位置 | 编辑方式 |
|----------|------|----------|
| 博客文章 | `src/content/blog/[en\|zh]/` | CMS 或本地 |
| 笔记 | `src/data/notes.json` | CMS 或本地 |
| 实验项目 | `src/data/experiments.json` | CMS 或本地 |
| 站点配置 | `src/data/site.ts` | 仅本地 |
| 组件 | `src/components/` | 仅本地 |

## 多语言路由

| 语言 | 路径 | RSS |
|------|------|-----|
| 英文 | `/` | `/rss.xml` |
| 中文 | `/zh/` | `/zh/rss.xml` |

## 部署

本站部署在 Cloudflare Pages 上，推送后自动部署。

```bash
npm run build
```

`dist/` 目录包含生产构建文件。

## CMS 认证配置

CMS 使用部署在 Cloudflare Workers 上的自建 OAuth 服务。

### 快速配置

1. 部署 [cf-oauth-worker](https://github.com/Twany/cf-oauth-worker) 到 Cloudflare Workers
2. 创建 GitHub OAuth App（注意：不是 GitHub App）
3. 在 Cloudflare Dashboard 配置环境变量
4. 更新 `public/admin/config.yml` 中的 OAuth worker URL

详细说明请参考 [cf-oauth-worker README](https://github.com/Twany/cf-oauth-worker)。

## 许可证

MIT

## 致谢

设计灵感来自 [themaninblue.com](https://themaninblue.com/)
