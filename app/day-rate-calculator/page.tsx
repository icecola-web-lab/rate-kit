import { redirect } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LegacyDayRateCalculatorPage() {
  redirect({ href: '/day-rate-calculator', locale: routing.defaultLocale });
}
