import { redirect } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LegacyHourlyRateCalculatorPage() {
  redirect({ href: '/hourly-rate-calculator', locale: routing.defaultLocale });
}
