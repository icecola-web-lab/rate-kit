import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/en',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#2563eb',
    categories: ['business', 'finance', 'productivity'],
    icons: [
      {
        src: '/icon.svg',
        type: 'image/svg+xml',
        sizes: 'any'
      }
    ]
  };
}
