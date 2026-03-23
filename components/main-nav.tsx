'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="md:hidden">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex w-full items-center justify-between rounded-2xl border border-border bg-white px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span>{t('menu')}</span>
          {isOpen ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
        </button>
        {isOpen ? (
          <nav id="main-navigation" className="mt-3 flex flex-col gap-2 rounded-2xl border border-border bg-white p-2 text-sm shadow-sm">
            {items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'rounded-xl px-3 py-2.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    isActive ? 'bg-blue-100 text-blue-800' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>
        ) : null}
      </div>
      <nav className="hidden flex-wrap gap-2 text-sm md:flex">
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
    </>
  );
}
