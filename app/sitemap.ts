import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/site';
import { getLocalizedPath } from '@/lib/seo';

const routes = ['/', '/hourly-rate-calculator', '/day-rate-calculator', '/retainer-calculator', '/guides/hourly-vs-project-pricing', '/privacy', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.url}${route === '/' ? `/${locale}` : `/${locale}${route}`}`,
      lastModified: new Date(),
      changeFrequency: route === '/' ? 'weekly' : 'monthly',
      priority: route === '/' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((item) => [item, `${siteConfig.url}${getLocalizedPath(item, route)}`]))
      }
    }))
  );
}
