"use client";

import { useMemo, useState } from "react";
import { Calculator, DollarSign, Info, Percent, RotateCcw } from "lucide-react";

const stateTaxRates = {
  none: 0,
  low: 0.03,
  medium: 0.05,
  high: 0.08,
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const formatPercent = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(Number.isFinite(value) ? value : 0);

function estimateFederalTax(taxableIncome: number) {
  const brackets = [
    { limit: 11600, rate: 0.1 },
    { limit: 47150, rate: 0.12 },
    { limit: 100525, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243725, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Number.POSITIVE_INFINITY, rate: 0.37 },
  ];

  let remaining = Math.max(0, taxableIncome);
  let previousLimit = 0;
  let tax = 0;

  for (const bracket of brackets) {
    const taxableAtRate = Math.min(remaining, bracket.limit - previousLimit);
    if (taxableAtRate <= 0) break;

    tax += taxableAtRate * bracket.rate;
    remaining -= taxableAtRate;
    previousLimit = bracket.limit;
  }

  return tax;
}

export default function SalaryCalculator() {
  const [salary, setSalary] = useState(120000);
  const [bonus, setBonus] = useState(10000);
  const [preTaxPercent, setPreTaxPercent] = useState(5);
  const [stateTax, setStateTax] = useState<keyof typeof stateTaxRates>("medium");

  const results = useMemo(() => {
    const grossAnnual = Math.max(0, salary) + Math.max(0, bonus);
    const preTaxDeduction = grossAnnual * (Math.max(0, preTaxPercent) / 100);
    const taxableIncome = Math.max(0, grossAnnual - preTaxDeduction - 14600);
    const federalTax = estimateFederalTax(taxableIncome);
    const medicareTax = grossAnnual * 0.0145 + Math.max(0, grossAnnual - 200000) * 0.009;
    const ficaTax = Math.min(Math.max(0, grossAnnual), 168600) * 0.062 + medicareTax;
    const stateTaxAmount = taxableIncome * stateTaxRates[stateTax];
    const totalTax = federalTax + ficaTax + stateTaxAmount;
    const takeHomeAnnual = Math.max(0, grossAnnual - preTaxDeduction - totalTax);

    return {
      grossAnnual,
      preTaxDeduction,
      federalTax,
      ficaTax,
      stateTaxAmount,
      totalTax,
      takeHomeAnnual,
      monthly: takeHomeAnnual / 12,
      biweekly: takeHomeAnnual / 26,
      weekly: takeHomeAnnual / 52,
      hourly: takeHomeAnnual / 2080,
      effectiveTaxRate: grossAnnual > 0 ? totalTax / grossAnnual : 0,
    };
  }, [bonus, preTaxPercent, salary, stateTax]);

  const resetDefaults = () => {
    setSalary(120000);
    setBonus(10000);
    setPreTaxPercent(5);
    setStateTax("medium");
  };

  return (
    <main className="min-h-screen bg-[#fff8f4] text-[#101114]">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 max-[768px]:px-4 max-[768px]:py-16">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 border border-[#f55d1d]/30 bg-white px-3 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#f55d1d]">
            <Calculator size={18} aria-hidden="true" />
            Salary Calculator
          </div>
          <h1 className="text-5xl font-black leading-[1.02] tracking-normal max-[768px]:text-4xl max-[480px]:text-3xl">
            Estimate your take-home pay before you accept the offer.
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-7 text-[#5c504b] max-[480px]:text-base">
            Compare gross salary, bonus, deductions, estimated taxes, and monthly take-home pay in one quick view.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="border border-[#f0ded4] bg-white p-6 shadow-[0_18px_60px_rgba(245,93,29,0.08)] max-[480px]:p-4">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black">Offer details</h2>
              <button
                type="button"
                onClick={resetDefaults}
                className="inline-flex h-10 w-10 items-center justify-center border border-[#ead8cf] bg-[#fff8f4] text-[#101114] transition hover:border-[#f55d1d]"
                aria-label="Reset calculator"
                title="Reset calculator"
              >
                <RotateCcw size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Annual base salary</span>
                <div className="flex items-center border border-[#ead8cf] bg-[#fffaf7] px-4">
                  <DollarSign size={18} className="text-[#f55d1d]" aria-hidden="true" />
                  <input
                    type="number"
                    min="0"
                    value={salary}
                    onChange={(event) => setSalary(Number(event.target.value))}
                    className="min-h-12 w-full bg-transparent px-3 text-base font-bold outline-none"
                  />
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Annual bonus or equity value</span>
                <div className="flex items-center border border-[#ead8cf] bg-[#fffaf7] px-4">
                  <DollarSign size={18} className="text-[#f55d1d]" aria-hidden="true" />
                  <input
                    type="number"
                    min="0"
                    value={bonus}
                    onChange={(event) => setBonus(Number(event.target.value))}
                    className="min-h-12 w-full bg-transparent px-3 text-base font-bold outline-none"
                  />
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Pre-tax deductions</span>
                <div className="flex items-center border border-[#ead8cf] bg-[#fffaf7] px-4">
                  <Percent size={18} className="text-[#f55d1d]" aria-hidden="true" />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={preTaxPercent}
                    onChange={(event) => setPreTaxPercent(Number(event.target.value))}
                    className="min-h-12 w-full bg-transparent px-3 text-base font-bold outline-none"
                  />
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">State tax estimate</span>
                <select
                  value={stateTax}
                  onChange={(event) => setStateTax(event.target.value as keyof typeof stateTaxRates)}
                  className="min-h-12 w-full border border-[#ead8cf] bg-[#fffaf7] px-4 text-base font-bold outline-none"
                >
                  <option value="none">No state income tax</option>
                  <option value="low">Low state tax, about 3%</option>
                  <option value="medium">Medium state tax, about 5%</option>
                  <option value="high">High state tax, about 8%</option>
                </select>
              </label>
            </div>
          </section>

          <section className="grid gap-4">
            <div className="bg-[#101114] p-7 text-white max-[480px]:p-5">
              <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#ffb18a]">Estimated take-home</p>
              <div className="mt-3 text-5xl font-black leading-none max-[480px]:text-4xl">
                {formatCurrency(results.takeHomeAnnual)}
              </div>
              <p className="mt-3 text-base font-medium text-[#f6ddd1]">
                {formatCurrency(results.monthly)} per month after estimated deductions and taxes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
              {[
                ["Gross annual", results.grossAnnual],
                ["Monthly", results.monthly],
                ["Biweekly", results.biweekly],
                ["Weekly", results.weekly],
                ["Hourly", results.hourly],
                ["Pre-tax deductions", results.preTaxDeduction],
              ].map(([label, value]) => (
                <div key={label} className="border border-[#f0ded4] bg-white p-5">
                  <p className="text-sm font-bold text-[#6c5c54]">{label}</p>
                  <p className="mt-2 text-2xl font-black text-[#101114]">{formatCurrency(value as number)}</p>
                </div>
              ))}
            </div>

            <div className="border border-[#f0ded4] bg-white p-5">
              <h2 className="text-xl font-black">Estimated taxes</h2>
              <div className="mt-4 grid gap-3 text-sm font-bold text-[#4b403b]">
                <div className="flex justify-between gap-4">
                  <span>Federal income tax</span>
                  <span>{formatCurrency(results.federalTax)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Social Security and Medicare</span>
                  <span>{formatCurrency(results.ficaTax)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>State income tax</span>
                  <span>{formatCurrency(results.stateTaxAmount)}</span>
                </div>
                <div className="flex justify-between gap-4 border-t border-[#f0ded4] pt-3 text-[#101114]">
                  <span>Effective tax rate</span>
                  <span>{formatPercent(results.effectiveTaxRate)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 border border-[#f0ded4] bg-[#fffdfb] p-4 text-sm font-medium leading-6 text-[#6b5b53]">
              <Info size={18} className="mt-1 shrink-0 text-[#f55d1d]" aria-hidden="true" />
              <p>
                This calculator is for planning only. Actual payroll can change based on filing status, location, benefits, equity vesting, retirement contributions, and local taxes.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
