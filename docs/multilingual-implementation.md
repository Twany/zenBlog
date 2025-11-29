# Astro 多语言实现方案

> 适用于当前 `zenBlog` 项目：英文为默认语言（URL 不带语言前缀），中文使用 `/zh` 前缀，且可继续扩展更多语言。

## 1. 语言配置与工具

- `src/i18n/config.ts`
  - `languages` 定义所有可用语言（label、nativeLabel、description）。
  - `defaultLang`、`supportedLanguages`，以及供下拉框使用的 `languageSelectOptions`。
- `src/i18n/utils.ts`
  - `localizePath(path, lang)`：根据语言生成最终路径（默认语言不加前缀，其余语言加 `/lang`）。
  - `removeLocaleFromPath()`、`getLangFromPathname()`：用于从 URL 推断/移除语言信息。
  - 这些工具结合 `withBase()`（`src/utils/helpers.ts`）可以在站点带有 `base` 时仍能保持正确的地址。

## 2. 内容层（Content Collections）

- `src/content.config.ts` 中为 `blogs` 集合新增 `lang` 字段（默认 `defaultLang`）。
- Markdown 前言区例如 `src/content/blogs/post-1.md` 增加 `lang: "en"`：
  ```yaml
  ---
  title: "First Adventure on Mars"
  lang: "en"
  ---
  ```
- 通过 `lang` 可过滤文章，从而在不同语言的列表页只渲染对应语言的内容。

## 3. 站点配置（文案、导航、CTA 等）

- `src/site.config.ts` 不再输出单一对象，而是 `Record<Lang, SiteConfig>`，包含：
  - `headerNavLinks`、`footerNavLinks`：带有 `id`（如 `home/blog/tags`）及 `href`，使用 `localizePath()` 自动拼接本地化路径。
  - `hero/about/contact/blog/tags/home/notFound/subscribe` 等所有页面文案，中文和英文各自维护。
- `getSiteConfig(lang)` 读取对应语言版本，默认 `defaultLang`。

## 4. 布局与组件

### MainLayout
- `src/layouts/MainLayout.astro` 增加 `lang` prop。
- 将 `lang` 传递给 `Nav` / `Footer` / `Subscribe` 等组件，保证组件内均使用到正确的 `siteConfig`。

### Header/Nav 区域
- `src/components/Nav.astro`：
  - 使用 `getSiteConfig(lang)` 渲染当前语言的导航。
  - 新增 `LanguageSwitcher` 下拉框（`src/components/LanguageSwitcher.astro`），内联脚本根据当前 URL 生成跳转地址。
  - Mobile 模式也提供切换入口。
- `NavLinks.astro`：利用 `link.id` 与 `activePage` 对比，保持翻译后仍能高亮。
- `SiteIdentity.astro`：接受 `lang`，显示对应站点标题。

### Footer & Subscribe
- `Footer.astro`、`Subscribe.astro` 通过 `lang` 读取本地化文案（如订阅表单的 placeholder、按钮文字、社交标题等）。

### 其他组件
- `PostCardPreview.astro`、`PostListPreview.astro` 在渲染链接时调用 `localizePath()`，避免跨语言跳转。

## 5. 页面层

- 每个页面（Home/About/Contact/Blog/Tags/404）都会：
  1. 从 `Astro.props` 或 URL 中确定 `lang`（404 会尝试从路径推断）。
  2. `const siteConfig = getSiteConfig(lang);`
  3. 将 `lang` 传给 `MainLayout`，并用 `siteConfig` 的文案填充 UI。
- 列表/详情页：
  - `blog/[...page].astro`、`blog/[id].astro`、`tags/[id]/[...page].astro` 会在 `getStaticPaths` 中根据 `lang` 过滤文章或标签集合，再将 `lang` 作为 props 渲染。
- 404 页面（`src/pages/404.astro`）通过 `getLangFromPathname` 自动判断 `/zh/*` 访问时的语言。

## 6. 路由结构与扩展语言

- 在 `src/pages` 下为中文创建 `/zh` 子目录，页面直接引用英文版本组件并传入 `lang="zh"`。
  - 例如 `src/pages/zh/index.astro`：
    ```astro
    ---
    import HomePage from "../index.astro";
    ---
    <HomePage lang="zh" />
    ```
- 动态路由（如 `blog/[id]`、`tags/[id]/[...]`）的中文版本也定义自己的 `getStaticPaths`，确保生成 `/zh/...` 静态页面。
- 若未来需增加更多语言：
  1. 在 `src/i18n/config.ts` 中加入新的 `languages` 条目。
  2. 在 `src/site.config.ts` 中添加该语言的配置对象。
  3. 为需要的页面创建 `/<lang>/` 目录和 wrapper 组件。
  4. 在内容文件前言区标记 `lang`。

## 7. 多语言切换体验

- LanguageSwitcher 的工作流程：
  1. 读取当前 URL `Astro.url.pathname`，去除 base 和语言前缀。
  2. 为每个语言构造 `withBase(localizePath(...)) + search` 的 href。
  3. 下拉改变时直接跳转到对应语言页面。

## 8. 构建与数据流

- `npm run build` 会生成默认语言和 `/zh` 路由的静态页面。
- RSS 仅输出默认语言文章（`src/pages/rss.xml.ts`）。如想为其他语言生成 RSS，可复制一个新文件，如 `rss.zh.xml.ts`，过滤另一种语言并在 `site.config` 中加入链接。

## 9. 文件索引

| 模块 | 作用 |
|------|------|
| `src/i18n/config.ts` | 注册语言、默认语言、下拉选项 |
| `src/i18n/utils.ts` | URL 处理、语言检测 |
| `src/site.config.ts` | 多语言文案、导航、CTA |
| `src/layouts/MainLayout.astro` | 全局 layout 接收 `lang` |
| `src/components/LanguageSwitcher.astro` | Header 下拉语言切换 |
| `src/pages/zh/**` | 中文路由 wrapper |
| `src/content/**` | Markdown 增加 `lang` 字段 |

该方案遵循 Astro 官方推荐的 “多语言文件夹 + 组件化” 模式，同时借助配置和工具函数减少重复逻辑，后续只需增添配置即可扩展到更多语言。
