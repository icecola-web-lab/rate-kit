import { getTranslations, setRequestLocale } from 'next-intl/server';
import { StructuredData } from '@/components/structured-data';
import { Link } from '@/i18n/navigation';
import { buildPageMetadata } from '@/lib/seo';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/structured-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AppLocale } from '@/i18n/routing';

type LocalePageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guide.meta' });
  return buildPageMetadata({ locale, path: '/guides/hourly-vs-project-pricing', title: t('title'), description: t('description') });
}

export default async function GuidePage({ params }: LocalePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('guide');
  const common = await getTranslations('common');
  const nav = await getTranslations('nav');

  const whenHourly = t.raw('whenHourly') as string[];
  const whenProject = t.raw('whenProject') as string[];
  const appLocale = locale as AppLocale;

  const schemas = [
    buildArticleSchema({ locale: appLocale, path: '/guides/hourly-vs-project-pricing', title: t('title'), description: t('description') }),
    buildBreadcrumbSchema(appLocale, [
      { name: nav('home'), path: '/' },
      { name: t('title'), path: '/guides/hourly-vs-project-pricing' }
    ])
  ];

  return (
    <main className="container py-10 sm:py-14">
      <StructuredData data={schemas} />
      <section className="mb-8">
        <span className="section-kicker">{common('guide')}</span>
        <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{t('title')}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">{t('description')}</p>
      </section>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{t('quickTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 prose-muted">
            <p>{t('quickText')}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-muted px-4 py-3 text-sm font-medium text-foreground">{t('formulaHourly')}</div>
              <div className="rounded-xl bg-muted px-4 py-3 text-sm font-medium text-foreground">{t('formulaProject')}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('exampleTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 prose-muted">
            <p>{t('exampleText')}</p>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-left text-sm sm:text-base">
                <thead className="bg-muted/70 text-foreground">
                  <tr>
                    <th className="px-4 py-3">{t('table.metric')}</th>
                    <th className="px-4 py-3">{t('table.hourly')}</th>
                    <th className="px-4 py-3">{t('table.project')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">{t('table.estimatedHours')}</td>
                    <td className="px-4 py-3">10 hours</td>
                    <td className="px-4 py-3">10 hours</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">{t('table.basePrice')}</td>
                    <td className="px-4 py-3">$150 × 10</td>
                    <td className="px-4 py-3">$1,800 flat</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="px-4 py-3">{t('table.scopeRisk')}</td>
                    <td className="px-4 py-3">{t('table.clientPaysMore')}</td>
                    <td className="px-4 py-3">{t('table.youCarryRisk')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('whenHourlyTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                {whenHourly.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t('whenProjectTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                {whenProject.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('mistakeTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="prose-muted">
            <p>{t('mistakeText')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('ctaTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 prose-muted">
            <p>{t('ctaText')}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/hourly-rate-calculator" className="text-sm font-semibold text-primary">
                {t('hourlyCta')}
              </Link>
              <Link href="/retainer-calculator" className="text-sm font-semibold text-primary">
                {t('retainerCta')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
