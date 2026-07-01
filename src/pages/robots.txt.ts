import { SITE } from '../data/site';

export function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Allow: /llms.txt',
    `Sitemap: ${SITE.url}/sitemap-index.xml`,
    '',
  ].join('\n');
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
