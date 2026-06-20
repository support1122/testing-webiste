"use client";

import { useMemo, useState } from "react";
import { Clock, DollarSign, Info, RotateCcw, Timer } from "lucide-react";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
  }).format(Number.isFinite(value) ? value : 0);

export default function HourlyToSalaryCalculator() {
  const [hourlyRate, setHourlyRate] = useState(45);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [overtimeHours, setOvertimeHours] = useState(0);

  const results = useMemo(() => {
    const rate = Math.max(0, hourlyRate);
    const regularHours = Math.max(0, hoursPerWeek);
    const overtime = Math.max(0, overtimeHours);
    const weeks = Math.max(0, weeksPerYear);
    const weeklyRegularPay = rate * regularHours;
    const weeklyOvertimePay = rate * 1.5 * overtime;
    const weeklyPay = weeklyRegularPay + weeklyOvertimePay;
    const annualSalary = weeklyPay * weeks;

    return {
      annualSalary,
      monthlyPay: annualSalary / 12,
      biweeklyPay: annualSalary / 26,
      weeklyPay,
      dailyPay: weeklyPay / 5,
      regularAnnualHours: regularHours * weeks,
      overtimeAnnualHours: overtime * weeks,
      totalAnnualHours: (regularHours + overtime) * weeks,
      overtimeAnnualPay: weeklyOvertimePay * weeks,
    };
  }, [hourlyRate, hoursPerWeek, overtimeHours, weeksPerYear]);

  const resetDefaults = () => {
    setHourlyRate(45);
    setHoursPerWeek(40);
    setWeeksPerYear(52);
    setOvertimeHours(0);
  };

  return (
    <main className="min-h-screen bg-[#fff8f4] text-[#101114]">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 max-[768px]:px-4 max-[768px]:py-16">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 border border-[#f55d1d]/30 bg-white px-3 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#f55d1d]">
            <Clock size={18} aria-hidden="true" />
            Hourly to Salary Calculator
          </div>
          <h1 className="text-5xl font-black leading-[1.02] tracking-normal max-[768px]:text-4xl max-[480px]:text-3xl">
            Convert hourly pay into annual salary in seconds.
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-7 text-[#5c504b] max-[480px]:text-base">
            Enter your hourly rate, weekly hours, work weeks, and overtime to estimate annual, monthly, biweekly, and weekly pay.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="border border-[#f0ded4] bg-white p-6 shadow-[0_18px_60px_rgba(245,93,29,0.08)] max-[480px]:p-4">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black">Hourly details</h2>
              <button
                type="button"
                onClick={resetDefaults}
                className="inline-flex h-10 w-10 items-center justify-center border border-[#ead8cf] bg-[#fff8f4] text-[#101114] transition hover:border-[#f55d1d]"
                aria-label="Reset hourly to salary calculator"
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
                  <Timer size={18} className="text-[#f55d1d]" aria-hidden="true" />
                  <input
                    type="number"
                    min="0"
                    value={hoursPerWeek}
                    onChange={(event) => setHoursPerWeek(Number(event.target.value))}
                    className="min-h-12 w-full bg-transparent px-3 text-base font-bold outline-none"
                  />
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Paid work weeks per year</span>
                <div className="flex items-center border border-[#ead8cf] bg-[#fffaf7] px-4">
                  <Clock size={18} className="text-[#f55d1d]" aria-hidden="true" />
                  <input
                    type="number"
                    min="0"
                    max="52"
                    value={weeksPerYear}
                    onChange={(event) => setWeeksPerYear(Number(event.target.value))}
                    className="min-h-12 w-full bg-transparent px-3 text-base font-bold outline-none"
                  />
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Overtime hours per week</span>
                <div className="flex items-center border border-[#ead8cf] bg-[#fffaf7] px-4">
                  <Timer size={18} className="text-[#f55d1d]" aria-hidden="true" />
                  <input
                    type="number"
                    min="0"
                    value={overtimeHours}
                    onChange={(event) => setOvertimeHours(Number(event.target.value))}
                    className="min-h-12 w-full bg-transparent px-3 text-base font-bold outline-none"
                  />
                </div>
              </label>
            </div>
          </section>

          <section className="grid gap-4">
            <div className="bg-[#101114] p-7 text-white max-[480px]:p-5">
              <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#ffb18a]">Estimated annual salary</p>
              <div className="mt-3 text-5xl font-black leading-none max-[480px]:text-4xl">
                {formatCurrency(results.annualSalary)}
              </div>
              <p className="mt-3 text-base font-medium text-[#f6ddd1]">
                Based on {formatNumber(results.totalAnnualHours)} total paid hours per year.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
              {[
                ["Monthly pay", results.monthlyPay],
                ["Biweekly pay", results.biweeklyPay],
                ["Weekly pay", results.weeklyPay],
                ["Daily pay", results.dailyPay],
                ["Regular annual hours", `${formatNumber(results.regularAnnualHours)} hrs`],
                ["Overtime annual pay", results.overtimeAnnualPay],
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
              <h2 className="text-xl font-black">Quick comparisons</h2>
              <div className="mt-4 grid gap-3 text-sm font-bold text-[#4b403b]">
                <div className="flex justify-between gap-4">
                  <span>Equivalent at 40 hours, 52 weeks</span>
                  <span>{formatCurrency(Math.max(0, hourlyRate) * 40 * 52)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Overtime hours per year</span>
                  <span>{formatNumber(results.overtimeAnnualHours)} hrs</span>
                </div>
                <div className="flex justify-between gap-4 border-t border-[#f0ded4] pt-3 text-[#101114]">
                  <span>Total annual hours</span>
                  <span>{formatNumber(results.totalAnnualHours)} hrs</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 border border-[#f0ded4] bg-[#fffdfb] p-4 text-sm font-medium leading-6 text-[#6b5b53]">
              <Info size={18} className="mt-1 shrink-0 text-[#f55d1d]" aria-hidden="true" />
              <p>
                This calculator estimates gross pay before taxes and deductions. Use the take-home pay calculator if you want an after-tax paycheck estimate.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
