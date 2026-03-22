'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';

export function RetainerCalculator() {
  const locale = useLocale();
  const t = useTranslations('calculators.retainer');
  const [hourlyRate, setHourlyRate] = useState('120');
  const [hoursPerMonth, setHoursPerMonth] = useState('20');
  const [scopeBuffer, setScopeBuffer] = useState('15');

  const formatter = useMemo(
    () => ({
      currency: new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }),
      decimal: new Intl.NumberFormat(locale, { maximumFractionDigits: 2 })
    }),
    [locale]
  );

  const result = useMemo(() => {
    const parsedHourlyRate = Number(hourlyRate);
    const parsedHoursPerMonth = Number(hoursPerMonth);
    const parsedScopeBuffer = Number(scopeBuffer);

    if (![parsedHourlyRate, parsedHoursPerMonth, parsedScopeBuffer].every(Number.isFinite)) {
      return { error: t('errors.invalidNumbers') };
    }

    if (parsedHourlyRate <= 0 || parsedHoursPerMonth <= 0 || parsedScopeBuffer < 0) {
      return { error: t('errors.invalidRange') };
    }

    const baseRetainer = parsedHourlyRate * parsedHoursPerMonth;
    const suggestedRetainer = baseRetainer * (1 + parsedScopeBuffer / 100);
    const annualizedRevenue = suggestedRetainer * 12;
    const effectiveHourly = suggestedRetainer / parsedHoursPerMonth;

    return {
      parsedHourlyRate,
      parsedHoursPerMonth,
      parsedScopeBuffer,
      baseRetainer,
      suggestedRetainer,
      annualizedRevenue,
      effectiveHourly
    };
  }, [hourlyRate, hoursPerMonth, scopeBuffer, t]);

  const formatCurrency = (value: number) => formatter.currency.format(value);
  const formatNumber = (value: number) => formatter.decimal.format(value);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="retainer-hourly-rate" name="hourlyRate" label={t('fields.hourlyRate')} hint={t('fields.hourlyRateHint')} value={hourlyRate} onChange={setHourlyRate} />
        <Field id="retainer-hours" name="hoursPerMonth" label={t('fields.hoursPerMonth')} hint={t('fields.hoursPerMonthHint')} value={hoursPerMonth} onChange={setHoursPerMonth} />
        <Field id="retainer-buffer" name="scopeBuffer" label={t('fields.scopeBuffer')} hint={t('fields.scopeBufferHint')} value={scopeBuffer} onChange={setScopeBuffer} />
      </div>

      {'error' in result ? (
        <div aria-live="polite" className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {result.error}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <ResultCard label={t('results.suggestedRetainer')} value={formatCurrency(result.suggestedRetainer)} />
            <ResultCard label={t('results.baseRetainer')} value={formatCurrency(result.baseRetainer)} />
            <ResultCard label={t('results.annualizedRevenue')} value={formatCurrency(result.annualizedRevenue)} />
            <ResultCard label={t('results.effectiveHourly')} value={formatCurrency(result.effectiveHourly)} />
          </div>
          <div className="rounded-2xl bg-accent px-4 py-4 text-sm leading-7 text-accent-foreground">
            {t('results.summary', {
              hourlyRate: formatCurrency(result.parsedHourlyRate),
              hours: formatNumber(result.parsedHoursPerMonth),
              buffer: `${formatNumber(result.parsedScopeBuffer)}%`,
              retainer: formatCurrency(result.suggestedRetainer)
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  id,
  name,
  label,
  hint,
  value,
  onChange
}: {
  id: string;
  name: string;
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-foreground" htmlFor={id}>
        {label}
      </label>
      <Input
        id={id}
        name={name}
        type="number"
        inputMode="decimal"
        autoComplete="off"
        step="any"
        value={value}
        aria-describedby={`${id}-hint`}
        onChange={(event) => onChange(event.target.value)}
      />
      <p id={`${id}-hint`} className="text-sm text-muted-foreground">
        {hint}
      </p>
    </div>
  );
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
    </div>
  );
}
