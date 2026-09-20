// Set SITE_URL to the verified production origin before deployment.
const site = process.env.SITE_URL;
const base = process.env.BASE_PATH || '/';
if (site) {
  const url = new URL(site);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL must be an HTTPS origin, e.g. https://portfolio.example');
  }
}
export default { site, base, trailingSlash: 'always', build: { format: 'directory' } };
