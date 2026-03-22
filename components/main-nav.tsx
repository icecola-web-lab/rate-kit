'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const items = [
  { href: '/', key: 'home' },
  { href: '/hourly-rate-calculator', key: 'hourlyRate' },
  { href: '/day-rate-calculator', key: 'dayRate' },
  { href: '/retainer-calculator', key: 'retainer' },
  { href: '/guides/hourly-vs-project-pricing', key: 'guide' },
  { href: '/privacy', key: 'privacy' },
  { href: '/terms', key: 'terms' }
] as const;

export function MainNav() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  return (
    <nav className="flex flex-wrap gap-2 text-sm">
      {items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'rounded-full px-3 py-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              isActive ? 'bg-blue-100 text-blue-800' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            )}
          >
            {t(item.key)}
          </Link>
        );
      })}
    </nav>
  );
}
