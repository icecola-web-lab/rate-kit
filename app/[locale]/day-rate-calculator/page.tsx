import { getTranslations, setRequestLocale } from 'next-intl/server';
import { StructuredData } from '@/components/structured-data';
import { Link } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema, buildFaqSchema, buildSoftwareApplicationSchema } from '@/lib/structured-data';
import { DayRateCalculator } from '@/components/day-rate-calculator';
import { SeoFaqSection, SeoSections, type SeoContentSection, type SeoFaqItem } from '@/components/seo-sections';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type LocalePageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'calculators.dayRate.meta' });
  return buildPageMetadata({ locale, path: '/day-rate-calculator', title: t('title'), description: t('description') });
}

export default async function DayRateCalculatorPage({ params }: LocalePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('calculators.dayRate');
  const common = await getTranslations('common');
  const nav = await getTranslations('nav');
  const usage = t.raw('usage') as string[];
  const sections = t.raw('seo.sections') as SeoContentSection[];
  const faq = t.raw('seo.faq') as SeoFaqItem[];
  const appLocale = locale as AppLocale;

  const schemas = [
    buildSoftwareApplicationSchema({ locale: appLocale, path: '/day-rate-calculator', name: t('meta.title'), description: t('meta.description') }),
    buildBreadcrumbSchema(appLocale, [
      { name: nav('home'), path: '/' },
      { name: t('title'), path: '/day-rate-calculator' }
    ]),
    buildFaqSchema(appLocale, faq)
  ];

  return (
    <main className="container py-10 sm:py-14">
      <StructuredData data={schemas} />
      <PageHero kicker={common('calculator')} title={t('title')} description={t('description')} />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Card>
          <CardHeader>
            <CardTitle>{t('formTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <DayRateCalculator />
          </CardContent>
        </Card>
        <aside className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>{common('whenToUse')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                {usage.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <FormulaCard title={common('formula')} formulas={[t('formulaRevenueTarget'), t('formulaDayRate')]} />
          <Card>
            <CardHeader>
              <CardTitle>{t('relatedTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-7 text-muted-foreground sm:text-base">{t('relatedDescription')}</p>
              <Link href="/retainer-calculator" className="text-sm font-semibold text-primary">
                {t('relatedCta')}
              </Link>
            </CardContent>
          </Card>
        </aside>
      </div>
      <SeoSections sections={sections} />
      <SeoFaqSection title={t('seo.faqTitle')} items={faq} />
    </main>
  );
}

function PageHero({ kicker, title, description }: { kicker: string; title: string; description: string }) {
  return (
    <section className="mb-8">
      <span className="section-kicker">{kicker}</span>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">{description}</p>
    </section>
  );
}

function FormulaCard({ title, formulas }: { title: string; formulas: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {formulas.map((formula) => (
          <div key={formula} className="rounded-xl bg-muted px-4 py-3 text-sm font-medium text-foreground">
            {formula}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
