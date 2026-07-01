/* global console, document, getComputedStyle, window */
import { chromium } from 'playwright-core';
import { Buffer } from 'node:buffer';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const args = new Map(
  process.argv.slice(2).map((arg) => {
    const [key, ...value] = arg.replace(/^--/, '').split('=');
    return [key, value.join('=') || 'true'];
  })
);

const baseUrl = (
  args.get('base-url') ??
  process.env.VISUAL_QA_BASE_URL ??
  'https://twany.me'
).replace(/\/$/, '');
const outDir = path.resolve(
  args.get('out-dir') ?? process.env.VISUAL_QA_OUT_DIR ?? 'visual-qa'
);
const baselineDir = path.resolve(
  args.get('baseline-dir') ??
    process.env.VISUAL_QA_BASELINE_DIR ??
    'visual-qa-baseline'
);
const updateBaseline = args.has('update-baseline');
const failOnDiff = args.has('fail-on-diff');
const useBaseline = updateBaseline || failOnDiff || args.has('baseline-dir');
const chromePath =
  args.get('chrome-path') ??
  process.env.CHROME_PATH ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const pages = [
  ['home', '/'],
  ['article', '/blog/codex-blog-publishing-system/'],
  ['blog', '/blog/'],
  ['notes', '/notes/'],
  ['library', '/library/'],
  ['contact', '/contact/'],
];

const viewports = [
  ['mobile', { width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 }],
  ['desktop', { width: 1440, height: 1000, deviceScaleFactor: 1 }],
];

await mkdir(outDir, { recursive: true });
if (useBaseline) {
  await mkdir(baselineDir, { recursive: true });
}

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
});

const results = [];

for (const [viewportName, viewport] of viewports) {
  const context = await browser.newContext({ viewport });

  for (const [pageName, route] of pages) {
    const page = await context.newPage();
    const errors = [];

    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    const url = `${baseUrl}${route}`;
    const response = await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 45_000,
    });

    const screenshotName = `${viewportName}-${pageName}.png`;
    const screenshotPath = path.join(outDir, screenshotName);
    await page.screenshot({ path: screenshotPath, fullPage: false });

    let baselineStatus = 'not-checked';
    let baselinePath = null;

    if (useBaseline) {
      baselinePath = path.join(baselineDir, screenshotName);

      if (updateBaseline) {
        await copyFile(screenshotPath, baselinePath);
        baselineStatus = 'updated';
      } else {
        try {
          const [currentScreenshot, baselineScreenshot] = await Promise.all([
            readFile(screenshotPath),
            readFile(baselinePath),
          ]);
          baselineStatus =
            Buffer.compare(currentScreenshot, baselineScreenshot) === 0
              ? 'matched'
              : 'changed';
        } catch {
          baselineStatus = 'missing';
        }
      }
    }

    const metrics = await page.evaluate(() => {
      const header = document.querySelector('header');
      const heading = document.querySelector('h1, h2');
      const tocButton = document.querySelector('[data-toc-toggle]');

      return {
        title: document.title,
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        hasHorizontalOverflow:
          document.documentElement.scrollWidth > window.innerWidth + 1,
        headerHeight: header
          ? Math.round(header.getBoundingClientRect().height)
          : null,
        firstHeading: heading ? heading.textContent.trim().slice(0, 120) : null,
        tocVisible: tocButton
          ? getComputedStyle(tocButton).display !== 'none'
          : false,
      };
    });

    results.push({
      viewport: viewportName,
      page: pageName,
      url,
      status: response?.status() ?? null,
      errors,
      screenshotPath,
      baselinePath,
      baselineStatus,
      ...metrics,
    });

    await page.close();
  }

  await context.close();
}

await browser.close();

const reportPath = path.join(outDir, 'report.json');
await writeFile(reportPath, `${JSON.stringify(results, null, 2)}\n`);

const failures = results.filter(
  (result) =>
    !result.status ||
    result.status < 200 ||
    result.status >= 300 ||
    result.errors.length > 0 ||
    result.hasHorizontalOverflow ||
    (failOnDiff && ['changed', 'missing'].includes(result.baselineStatus))
);

for (const result of results) {
  const status = failures.includes(result) ? 'FAIL' : 'OK';
  console.log(
    `${status} ${result.viewport}/${result.page} ${result.status} overflow=${result.hasHorizontalOverflow} errors=${result.errors.length} baseline=${result.baselineStatus}`
  );
}

console.log(`Report: ${reportPath}`);
if (useBaseline) {
  console.log(`Baseline: ${baselineDir}`);
}

if (failures.length > 0) {
  process.exitCode = 1;
}
