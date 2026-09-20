import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
async function walk(dir) {
  const items = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(items.map(item => item.isDirectory() ? walk(path.join(dir, item.name)) : path.join(dir, item.name)))).flat();
}
const files = (await walk(root)).filter(file => file.endsWith('.html'));
const pages = new Map();
for (const file of files) pages.set('/' + path.relative(root, file).replaceAll('\\', '/').replace(/index\.html$/, ''), await readFile(file, 'utf8'));
const external = new Set();
const errors = [];
let checked = 0;
for (const [route, html] of pages) {
  for (const match of html.matchAll(/\b(href|src)\s*=\s*["']([^"']+)["']/g)) {
    const value = match[2].replaceAll('&amp;', '&');
    if (/^(data:|blob:|mailto:|tel:)/.test(value)) continue;
    const url = new URL(value, `https://audit.invalid${route}`);
    if (url.origin !== 'https://audit.invalid') { external.add(url.href); continue; }
    checked++;
    const pathname = decodeURIComponent(url.pathname);
    const target = pages.get(pathname) ?? pages.get(pathname.replace(/\/$/, '') + '/');
    if (target !== undefined) {
      if (pathname !== '/' && !pathname.endsWith('/')) errors.push(`${route}: nonstandard page URL ${value}`);
      if (url.hash) {
        const ids = [...target.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]);
        if (!ids.includes(decodeURIComponent(url.hash.slice(1)))) errors.push(`${route}: missing anchor ${value}`);
      }
    } else {
      const file = path.resolve(root, '.' + pathname);
      if (!file.startsWith(root + path.sep) || !(await stat(file).catch(() => null))?.isFile()) errors.push(`${route}: missing target ${value}`);
    }
  }
  for (const match of html.matchAll(/https?:\/\/(?:localhost|127\.0\.0\.1)[^"'\s<]*/g)) errors.push(`${route}: local host leaked into output: ${match[0]}`);
}
console.log(`Audited ${pages.size} pages and ${checked} local URL references.`);
console.log('External URLs (inventory only; not proof of availability):\n' + [...external].sort().join('\n'));
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log('PASS: local targets, fragments, trailing slashes, and localhost leakage.');
