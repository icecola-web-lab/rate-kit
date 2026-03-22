import { redirect } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LegacyRetainerCalculatorPage() {
  redirect({ href: '/retainer-calculator', locale: routing.defaultLocale });
}
