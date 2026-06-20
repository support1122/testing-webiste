"use client";

import { useMemo, useState } from "react";
import { Calculator, DollarSign, Info, Percent, RotateCcw } from "lucide-react";

const standardDeductions = {
  single: 14600,
  married: 29200,
  head: 21900,
};

const stateTaxRates = {
  none: 0,
  low: 0.03,
  medium: 0.05,
  high: 0.08,
};

type FilingStatus = keyof typeof standardDeductions;
type StateTax = keyof typeof stateTaxRates;

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

function estimateFederalTax(taxableIncome: number, filingStatus: FilingStatus) {
  const singleBrackets = [
    { limit: 11600, rate: 0.1 },
    { limit: 47150, rate: 0.12 },
    { limit: 100525, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243725, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Number.POSITIVE_INFINITY, rate: 0.37 },
  ];

  const hohBrackets = [
    { limit: 16550,  rate: 0.10 },
    { limit: 63100,  rate: 0.12 },
    { limit: 100500, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243700, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Number.POSITIVE_INFINITY, rate: 0.37 },
  ];
  const marriedBrackets = singleBrackets.map((b) => ({
    limit: Number.isFinite(b.limit) ? b.limit * 2 : b.limit,
    rate: b.rate,
  }));
  const brackets =
    filingStatus === "head" ? hohBrackets :
    filingStatus === "married" ? marriedBrackets :
    singleBrackets;

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

export default function AfterTaxIncomeCalculator() {
  const [grossIncome, setGrossIncome] = useState(125000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [preTaxDeductions, setPreTaxDeductions] = useState(6000);
  const [taxCredits, setTaxCredits] = useState(0);
  const [stateTax, setStateTax] = useState<StateTax>("medium");

  const results = useMemo(() => {
    const annualGross = Math.max(0, grossIncome);
    const annualPreTaxDeductions = Math.max(0, preTaxDeductions);
    const taxableIncome = Math.max(0, annualGross - annualPreTaxDeductions - standardDeductions[filingStatus]);
    const stateAGI = Math.max(0, annualGross - annualPreTaxDeductions);
    const federalBeforeCredits = estimateFederalTax(taxableIncome, filingStatus);
    const federalTax = Math.max(0, federalBeforeCredits - Math.max(0, taxCredits));
    const medicareTax = annualGross * 0.0145 + Math.max(0, annualGross - 200000) * 0.009;
    const ficaTax = Math.min(annualGross, 168600) * 0.062 + medicareTax;
    const stateTaxAmount = stateAGI * stateTaxRates[stateTax];
    const totalTax = federalTax + ficaTax + stateTaxAmount;
    const afterTaxIncome = Math.max(0, annualGross - annualPreTaxDeductions - totalTax);

    return {
      annualGross,
      taxableIncome,
      federalTax,
      ficaTax,
      stateTaxAmount,
      totalTax,
      afterTaxIncome,
      monthlyAfterTax: afterTaxIncome / 12,
      biweeklyAfterTax: afterTaxIncome / 26,
      weeklyAfterTax: afterTaxIncome / 52,
      effectiveTaxRate: annualGross > 0 ? totalTax / annualGross : 0,
    };
  }, [filingStatus, grossIncome, preTaxDeductions, stateTax, taxCredits]);

  const resetDefaults = () => {
    setGrossIncome(125000);
    setFilingStatus("single");
    setPreTaxDeductions(6000);
    setTaxCredits(0);
    setStateTax("medium");
  };

  return (
    <main className="min-h-screen bg-[#fff8f4] text-[#101114]">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 max-[768px]:px-4 max-[768px]:py-16">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 border border-[#f55d1d]/30 bg-white px-3 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#f55d1d]">
            <Calculator size={18} aria-hidden="true" />
            After Tax Income Calculator
          </div>
          <h1 className="text-5xl font-black leading-[1.02] tracking-normal max-[768px]:text-4xl max-[480px]:text-3xl">
            Estimate how much income you keep after taxes.
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-7 text-[#5c504b] max-[480px]:text-base">
            Model annual income, filing status, deductions, tax credits, and state tax to estimate after-tax income.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="border border-[#f0ded4] bg-white p-6 shadow-[0_18px_60px_rgba(245,93,29,0.08)] max-[480px]:p-4">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black">Income details</h2>
              <button
                type="button"
                onClick={resetDefaults}
                className="inline-flex h-10 w-10 items-center justify-center border border-[#ead8cf] bg-[#fff8f4] text-[#101114] transition hover:border-[#f55d1d]"
                aria-label="Reset after tax income calculator"
                title="Reset calculator"
              >
                <RotateCcw size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Annual gross income</span>
                <div className="flex items-center border border-[#ead8cf] bg-[#fffaf7] px-4">
                  <DollarSign size={18} className="text-[#f55d1d]" aria-hidden="true" />
                  <input
                    type="number"
                    min="0"
                    value={grossIncome}
                    onChange={(event) => setGrossIncome(Number(event.target.value))}
                    className="min-h-12 w-full bg-transparent px-3 text-base font-bold outline-none"
                  />
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Filing status</span>
                <select
                  value={filingStatus}
                  onChange={(event) => setFilingStatus(event.target.value as FilingStatus)}
                  className="min-h-12 w-full border border-[#ead8cf] bg-[#fffaf7] px-4 text-base font-bold outline-none"
                >
                  <option value="single">Single</option>
                  <option value="married">Married filing jointly</option>
                  <option value="head">Head of household</option>
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Pre-tax deductions</span>
                <div className="flex items-center border border-[#ead8cf] bg-[#fffaf7] px-4">
                  <DollarSign size={18} className="text-[#f55d1d]" aria-hidden="true" />
                  <input
                    type="number"
                    min="0"
                    value={preTaxDeductions}
                    onChange={(event) => setPreTaxDeductions(Number(event.target.value))}
                    className="min-h-12 w-full bg-transparent px-3 text-base font-bold outline-none"
                  />
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Annual tax credits</span>
                <div className="flex items-center border border-[#ead8cf] bg-[#fffaf7] px-4">
                  <DollarSign size={18} className="text-[#f55d1d]" aria-hidden="true" />
                  <input
                    type="number"
                    min="0"
                    value={taxCredits}
                    onChange={(event) => setTaxCredits(Number(event.target.value))}
                    className="min-h-12 w-full bg-transparent px-3 text-base font-bold outline-none"
                  />
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">State tax estimate</span>
                <div className="flex items-center border border-[#ead8cf] bg-[#fffaf7] px-4">
                  <Percent size={18} className="text-[#f55d1d]" aria-hidden="true" />
                  <select
                    value={stateTax}
                    onChange={(event) => setStateTax(event.target.value as StateTax)}
                    className="min-h-12 w-full bg-transparent px-3 text-base font-bold outline-none"
                  >
                    <option value="none">No state income tax</option>
                    <option value="low">Low state tax, about 3%</option>
                    <option value="medium">Medium state tax, about 5%</option>
                    <option value="high">High state tax, about 8%</option>
                  </select>
                </div>
              </label>
            </div>
          </section>

          <section className="grid gap-4">
            <div className="bg-[#101114] p-7 text-white max-[480px]:p-5">
              <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#ffb18a]">Estimated after-tax income</p>
              <div className="mt-3 text-5xl font-black leading-none max-[480px]:text-4xl">
                {formatCurrency(results.afterTaxIncome)}
              </div>
              <p className="mt-3 text-base font-medium text-[#f6ddd1]">
                {formatCurrency(results.monthlyAfterTax)} per month after estimated taxes and pre-tax deductions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
              {[
                ["Gross income", results.annualGross],
                ["Taxable income", results.taxableIncome],
                ["Monthly after tax", results.monthlyAfterTax],
                ["Biweekly after tax", results.biweeklyAfterTax],
                ["Weekly after tax", results.weeklyAfterTax],
                ["Effective tax rate", formatPercent(results.effectiveTaxRate)],
              ].map(([label, value]) => (
                <div key={label} className="border border-[#f0ded4] bg-white p-5">
                  <p className="text-sm font-bold text-[#6c5c54]">{label}</p>
                  <p className="mt-2 text-2xl font-black text-[#101114]">
                    {typeof value === "number" ? formatCurrency(value) : value}
                  </p>
                </div>
              ))}
            </div>

            <div className="border border-[#f0ded4] bg-white p-5">
              <h2 className="text-xl font-black">Estimated annual tax breakdown</h2>
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
                  <span>Total estimated taxes</span>
                  <span>{formatCurrency(results.totalTax)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 border border-[#f0ded4] bg-[#fffdfb] p-4 text-sm font-medium leading-6 text-[#6b5b53]">
              <Info size={18} className="mt-1 shrink-0 text-[#f55d1d]" aria-hidden="true" />
              <p>
                This is a planning estimate only. Actual after-tax income can change based on tax year, location, filing details, benefits, withholdings, and local taxes.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
