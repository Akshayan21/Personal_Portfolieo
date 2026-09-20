import type { APIRoute } from 'astro';
import { pageUrl, publicProjectSlugs, projectUrl } from '../data/urls';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://portfolio.invalid');
  const paths = [pageUrl('/'), pageUrl('/privacy/'), ...publicProjectSlugs.map(projectUrl)];
  const urls = paths.map(path => `  <url><loc>${new URL(path, origin).href}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
