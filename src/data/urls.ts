/** Public routes only; confidential work must never become a public case study. */
export const publicProjectSlugs = ['paydart', 'pregtrack-app', 'famconnect', 'staffezee', 'pharmavault'];
const configuredBase = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');

export const pageUrl = (path = '/') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (configuredBase && (normalizedPath === configuredBase || normalizedPath.startsWith(`${configuredBase}/`))) {
    return normalizedPath;
  }
  return `${configuredBase}${normalizedPath}`;
};
export const assetUrl = (path: string) => pageUrl(path);
export const projectUrl = (slug: string) => pageUrl(`/projects/${slug}/`);
export const contactUrls = {
  email: 'mailto:akshayanmohandass@gmail.com',
  linkedIn: 'https://www.linkedin.com/in/akshayan-mohandass-',
  resume: 'https://drive.google.com/uc?export=download&id=1JxVQMcN5wL2YpTLA3L74jXCL82JdWJon',
};
