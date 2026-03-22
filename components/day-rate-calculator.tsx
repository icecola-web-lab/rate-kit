'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';

export function DayRateCalculator() {
  const locale = useLocale();
  const t = useTranslations('calculators.dayRate');
  const [annualIncome, setAnnualIncome] = useState('100000');
  const [billableDaysPerMonth, setBillableDaysPerMonth] = useState('12');
  const [workingMonths, setWorkingMonths] = useState('11');
  const [overhead, setOverhead] = useState('20');

  const formatter = useMemo(
    () => ({
      currency: new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }),
      decimal: new Intl.NumberFormat(locale, { maximumFractionDigits: 2 })
    }),
    [locale]
  );

  const result = useMemo(() => {
    const parsedAnnualIncome = Number(annualIncome);
    const parsedBillableDaysPerMonth = Number(billableDaysPerMonth);
    const parsedWorkingMonths = Number(workingMonths);
    const parsedOverhead = Number(overhead);

    if (![parsedAnnualIncome, parsedBillableDaysPerMonth, parsedWorkingMonths, parsedOverhead].every(Number.isFinite)) {
      return { error: t('errors.invalidNumbers') };
    }

    if (parsedAnnualIncome <= 0 || parsedBillableDaysPerMonth <= 0 || parsedWorkingMonths <= 0 || parsedOverhead < 0) {
      return { error: t('errors.invalidRange') };
    }

    const billableDaysPerYear = parsedBillableDaysPerMonth * parsedWorkingMonths;
    const revenueTarget = parsedAnnualIncome * (1 + parsedOverhead / 100);
    const dayRate = revenueTarget / billableDaysPerYear;
    const monthlyRevenueTarget = revenueTarget / 12;

    return {
      parsedAnnualIncome,
      parsedOverhead,
      billableDaysPerYear,
      revenueTarget,
      dayRate,
      monthlyRevenueTarget
    };
  }, [annualIncome, billableDaysPerMonth, overhead, t, workingMonths]);

  const formatCurrency = (value: number) => formatter.currency.format(value);
  const formatNumber = (value: number) => formatter.decimal.format(value);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="day-income" name="annualIncome" label={t('fields.annualIncome')} hint={t('fields.annualIncomeHint')} value={annualIncome} onChange={setAnnualIncome} />
        <Field
          id="day-days"
          name="billableDaysPerMonth"
          label={t('fields.billableDaysPerMonth')}
          hint={t('fields.billableDaysPerMonthHint')}
          value={billableDaysPerMonth}
          onChange={setBillableDaysPerMonth}
        />
        <Field id="day-months" name="workingMonths" label={t('fields.workingMonths')} hint={t('fields.workingMonthsHint')} value={workingMonths} onChange={setWorkingMonths} />
        <Field id="day-overhead" name="overhead" label={t('fields.overhead')} hint={t('fields.overheadHint')} value={overhead} onChange={setOverhead} />
      </div>

      {'error' in result ? (
        <div aria-live="polite" className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {result.error}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <ResultCard label={t('results.dayRate')} value={formatCurrency(result.dayRate)} />
            <ResultCard label={t('results.revenueTarget')} value={formatCurrency(result.revenueTarget)} />
            <ResultCard label={t('results.billableDaysPerYear')} value={formatNumber(result.billableDaysPerYear)} />
            <ResultCard label={t('results.monthlyRevenueTarget')} value={formatCurrency(result.monthlyRevenueTarget)} />
          </div>
          <div className="rounded-2xl bg-accent px-4 py-4 text-sm leading-7 text-accent-foreground">
            {t('results.summary', {
              income: formatCurrency(result.parsedAnnualIncome),
              overhead: `${formatNumber(result.parsedOverhead)}%`,
              rate: formatCurrency(result.dayRate)
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
