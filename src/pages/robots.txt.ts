import { SITE } from '../data/site';

export function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap-index.xml\n`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
