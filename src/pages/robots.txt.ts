import type { APIRoute } from 'astro';
import { pageUrl } from '../data/urls';

export const GET: APIRoute = ({ site }) => {
  const sitemap = site ? `Sitemap: ${new URL(pageUrl('/sitemap.xml'), site).href}\n` : '';
  return new Response(`User-agent: *\nAllow: /\n${sitemap}`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
