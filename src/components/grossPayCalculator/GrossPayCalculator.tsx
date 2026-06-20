"use client";

import { useMemo, useState } from "react";
import { Calculator, Clock, DollarSign, Info, RotateCcw } from "lucide-react";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

export default function GrossPayCalculator() {
  const [hourlyRate, setHourlyRate] = useState(32);
  const [regularHours, setRegularHours] = useState(40);
  const [overtimeHours, setOvertimeHours] = useState(0);
  const [bonus, setBonus] = useState(0);

  const results = useMemo(() => {
    const regularWeeklyPay = Math.max(0, hourlyRate) * Math.max(0, regularHours);
    const overtimeWeeklyPay = Math.max(0, hourlyRate) * 1.5 * Math.max(0, overtimeHours);
    const weeklyGross = regularWeeklyPay + overtimeWeeklyPay;
    const annualBonus = Math.max(0, bonus);
    const annualGross = weeklyGross * 52 + annualBonus;

    return {
      weeklyGross,
      biweeklyGross: annualGross / 26,
      monthlyGross: annualGross / 12,
      annualGross,
      regularWeeklyPay,
      overtimeWeeklyPay,
      annualBonus,
    };
  }, [bonus, hourlyRate, overtimeHours, regularHours]);

  const resetDefaults = () => {
    setHourlyRate(32);
    setRegularHours(40);
    setOvertimeHours(0);
    setBonus(0);
  };

  return (
    <main className="min-h-screen bg-[#fff8f4] text-[#101114]">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 max-[768px]:px-4 max-[768px]:py-16">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 border border-[#f55d1d]/30 bg-white px-3 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#f55d1d]">
            <Calculator size={18} aria-hidden="true" />
            Gross Pay Calculator
          </div>
          <h1 className="text-5xl font-black leading-[1.02] tracking-normal max-[768px]:text-4xl max-[480px]:text-3xl">
            Calculate gross pay before taxes and deductions.
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-7 text-[#5c504b] max-[480px]:text-base">
            Estimate weekly, biweekly, monthly, and annual gross pay from hourly rate, regular hours, overtime, and bonus.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="border border-[#f0ded4] bg-white p-6 shadow-[0_18px_60px_rgba(245,93,29,0.08)] max-[480px]:p-4">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black">Pay inputs</h2>
              <button
                type="button"
                onClick={resetDefaults}
                className="inline-flex h-10 w-10 items-center justify-center border border-[#ead8cf] bg-[#fff8f4] text-[#101114] transition hover:border-[#f55d1d]"
                aria-label="Reset gross pay calculator"
                title="Reset calculator"
              >
                <RotateCcw size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Hourly rate</span>
                <div className="flex items-center border border-[#ead8cf] bg-[#fffaf7] px-4">
                  <DollarSign size={18} className="text-[#f55d1d]" aria-hidden="true" />
                  <input
                    type="number"
                    min="0"
                    value={hourlyRate}
                    onChange={(event) => setHourlyRate(Number(event.target.value))}
                    className="min-h-12 w-full bg-transparent px-3 text-base font-bold outline-none"
                  />
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Regular hours per week</span>
                <div className="flex items-center border border-[#ead8cf] bg-[#fffaf7] px-4">
                  <Clock size={18} className="text-[#f55d1d]" aria-hidden="true" />
                  <input
                    type="number"
                    min="0"
                    value={regularHours}
                    onChange={(event) => setRegularHours(Number(event.target.value))}
                    className="min-h-12 w-full bg-transparent px-3 text-base font-bold outline-none"
                  />
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Overtime hours per week</span>
                <div className="flex items-center border border-[#ead8cf] bg-[#fffaf7] px-4">
                  <Clock size={18} className="text-[#f55d1d]" aria-hidden="true" />
                  <input
                    type="number"
                    min="0"
                    value={overtimeHours}
                    onChange={(event) => setOvertimeHours(Number(event.target.value))}
                    className="min-h-12 w-full bg-transparent px-3 text-base font-bold outline-none"
                  />
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Annual bonus</span>
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
            </div>
          </section>

          <section className="grid gap-4">
            <div className="bg-[#101114] p-7 text-white max-[480px]:p-5">
              <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#ffb18a]">Estimated annual gross pay</p>
              <div className="mt-3 text-5xl font-black leading-none max-[480px]:text-4xl">
                {formatCurrency(results.annualGross)}
              </div>
              <p className="mt-3 text-base font-medium text-[#f6ddd1]">
                {formatCurrency(results.weeklyGross)} weekly gross pay before taxes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
              {[
                ["Weekly gross", results.weeklyGross],
                ["Biweekly gross", results.biweeklyGross],
                ["Monthly gross", results.monthlyGross],
                ["Regular weekly pay", results.regularWeeklyPay],
                ["Overtime weekly pay", results.overtimeWeeklyPay],
                ["Annual bonus", results.annualBonus],
              ].map(([label, value]) => (
                <div key={label} className="border border-[#f0ded4] bg-white p-5">
                  <p className="text-sm font-bold text-[#6c5c54]">{label}</p>
                  <p className="mt-2 text-2xl font-black text-[#101114]">{formatCurrency(value as number)}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 border border-[#f0ded4] bg-[#fffdfb] p-4 text-sm font-medium leading-6 text-[#6b5b53]">
              <Info size={18} className="mt-1 shrink-0 text-[#f55d1d]" aria-hidden="true" />
              <p>
                Gross pay is income before tax, benefits, retirement contributions, and other deductions. Use the after-tax tools for net income estimates.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
