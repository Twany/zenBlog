/* global console, document, URL */
import { chromium } from 'playwright-core';
import { mkdir, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const projectRoot = path.resolve(new URL('..', import.meta.url).pathname);
const blogRoot = path.join(projectRoot, 'src/content/blog');
const outputRoot = path.join(projectRoot, 'public/og');
const chromePath =
  process.env.CHROME_PATH ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const args = new Map(
  process.argv.slice(2).map((arg) => {
    const [key, ...value] = arg.replace(/^--/, '').split('=');
    return [key, value.join('=') || 'true'];
  })
);

const requestedSlug = args.get('slug');

const splitFrontmatter = (text) => {
  if (!text.startsWith('---\n')) throw new Error('Missing frontmatter');
  const end = text.indexOf('\n---\n', 4);
  if (end === -1) throw new Error('Unterminated frontmatter');
  return text.slice(4, end).split('\n');
};

const yamlScalar = (value) => {
  const trimmed = value.trim();
  if (
    trimmed.length >= 2 &&
    trimmed[0] === trimmed[trimmed.length - 1] &&
    ["'", '"'].includes(trimmed[0])
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
};

const parseFrontmatter = (lines) => {
  const data = {};
  let key = '';
  for (const line of lines) {
    if (line.startsWith('  - ') && key) {
      data[key] ??= [];
      data[key].push(yamlScalar(line.slice(4)));
      continue;
    }
    const index = line.indexOf(':');
    if (index === -1) continue;
    key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    data[key] = value ? yamlScalar(value) : [];
  }
  return data;
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const templateTone = {
  'case-study': '#56c7c9',
  'workflow-tutorial': '#2f6df6',
  'design-review': '#d99b66',
  'debugging-postmortem': '#7aa36d',
};

const postHtml = (post) => {
  const accent = templateTone[post.template] ?? '#56c7c9';
  const title = escapeHtml(post.title);
  const description = escapeHtml(post.socialSummary || post.description);
  const category = escapeHtml(post.category);
  const langLabel = post.lang === 'zh' ? '中文长文' : 'Long-form essay';
  const template = escapeHtml(post.template || 'workflow-tutorial');
  const tags = (post.tags ?? []).slice(0, 4).map(escapeHtml);

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        width: 1200px;
        height: 630px;
        background: #ffffff;
        color: #111827;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      .frame {
        position: relative;
        display: grid;
        grid-template-rows: auto 1fr auto;
        width: 1200px;
        height: 630px;
        padding: 58px 70px 54px;
        overflow: hidden;
        border: 1px solid #dbe3ef;
      }
      .frame::before {
        content: "";
        position: absolute;
        inset: 0;
        border-top: 10px solid ${accent};
      }
      .brand {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #536177;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
      .brand strong {
        color: #111827;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 34px;
        font-weight: 500;
        letter-spacing: 0;
        text-transform: none;
      }
      .content {
        align-self: center;
        max-width: 930px;
      }
      .kicker {
        color: ${accent};
        font-size: 26px;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      h1 {
        margin: 28px 0 22px;
        max-width: 980px;
        color: #111827;
        font-family: Georgia, "Times New Roman", serif;
        font-size: ${post.lang === 'zh' ? '70px' : '64px'};
        font-weight: 500;
        letter-spacing: 0;
        line-height: 0.98;
      }
      p {
        margin: 0;
        max-width: 880px;
        color: #536177;
        font-size: 27px;
        line-height: 1.35;
      }
      .footer {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 40px;
        padding-top: 30px;
        border-top: 1px solid #dbe3ef;
      }
      .tags {
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
      }
      .tag {
        border: 1px solid #dbe3ef;
        padding: 10px 14px;
        color: #536177;
        font-size: 20px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .meta {
        color: #536177;
        font-size: 21px;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-align: right;
        text-transform: uppercase;
        white-space: nowrap;
      }
    </style>
  </head>
  <body>
    <main class="frame">
      <div class="brand">
        <strong>Twany Blog</strong>
        <span>${escapeHtml(langLabel)}</span>
      </div>
      <section class="content">
        <div class="kicker">${category}</div>
        <h1>${title}</h1>
        <p>${description}</p>
      </section>
      <div class="footer">
        <div class="tags">${tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
        <div class="meta">${escapeHtml(template)}</div>
      </div>
    </main>
  </body>
</html>`;
};

const readPosts = async () => {
  const posts = [];
  for (const lang of ['en', 'zh']) {
    const dir = path.join(blogRoot, lang);
    const files = (await readdir(dir)).filter((file) => file.endsWith('.md'));
    for (const file of files) {
      const slug = file.replace(/\.md$/, '');
      if (requestedSlug && requestedSlug !== slug) continue;
      const text = await readFile(path.join(dir, file), 'utf8');
      const frontmatter = parseFrontmatter(splitFrontmatter(text));
      posts.push({ ...frontmatter, slug, lang });
    }
  }
  return posts;
};

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
});

const page = await browser.newPage({
  viewport: { width: 1200, height: 630, deviceScaleFactor: 1 },
});

const posts = await readPosts();
for (const post of posts) {
  const outputDir = path.join(outputRoot, post.lang);
  await mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, `${post.slug}.png`);
  await page.setContent(postHtml(post), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts?.ready);
  await page.screenshot({ path: outputPath, fullPage: false });
  console.log(`Generated ${outputPath}`);
}

await browser.close();

if (posts.length === 0) {
  console.warn('No posts matched for OG image generation.');
}
