"use client";

import { useMemo, useState } from "react";
import { BriefcaseBusiness, Info, MapPin, RotateCcw, TrendingUp } from "lucide-react";

const roleBases = {
  software: 105000,
  product: 115000,
  data: 110000,
  marketing: 78000,
  sales: 85000,
  operations: 72000,
};

const locationMultipliers = {
  low: 0.85,
  average: 1,
  high: 1.18,
  premium: 1.32,
};

type Role = keyof typeof roleBases;
type LocationCost = keyof typeof locationMultipliers;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

export default function SalaryEstimator() {
  const [role, setRole] = useState<Role>("software");
  const [years, setYears] = useState(4);
  const [locationCost, setLocationCost] = useState<LocationCost>("average");
  const [specialtyPremium, setSpecialtyPremium] = useState(5);

  const results = useMemo(() => {
    const experienceMultiplier = 1 + Math.min(Math.max(0, years), 20) * 0.055;
    const premiumMultiplier = 1 + Math.min(Math.max(0, specialtyPremium), 50) / 100;
    const midpoint = roleBases[role] * experienceMultiplier * locationMultipliers[locationCost] * premiumMultiplier;
    const low = midpoint * 0.86;
    const high = midpoint * 1.16;

    return {
      low,
      midpoint,
      high,
      monthlyMidpoint: midpoint / 12,
      negotiationTarget: high * 1.05,
    };
  }, [locationCost, role, specialtyPremium, years]);

  const resetDefaults = () => {
    setRole("software");
    setYears(4);
    setLocationCost("average");
    setSpecialtyPremium(5);
  };

  return (
    <main className="min-h-screen bg-[#fff8f4] text-[#101114]">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 max-[768px]:px-4 max-[768px]:py-16">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 border border-[#f55d1d]/30 bg-white px-3 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#f55d1d]">
            <TrendingUp size={18} aria-hidden="true" />
            Salary Estimator
          </div>
          <h1 className="text-5xl font-black leading-[1.02] tracking-normal max-[768px]:text-4xl max-[480px]:text-3xl">
            Estimate a realistic salary range for your next role.
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-7 text-[#5c504b] max-[480px]:text-base">
            Choose your role family, experience, location cost, and skill premium to estimate a salary range for planning and negotiation.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="border border-[#f0ded4] bg-white p-6 shadow-[0_18px_60px_rgba(245,93,29,0.08)] max-[480px]:p-4">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black">Role profile</h2>
              <button
                type="button"
                onClick={resetDefaults}
                className="inline-flex h-10 w-10 items-center justify-center border border-[#ead8cf] bg-[#fff8f4] text-[#101114] transition hover:border-[#f55d1d]"
                aria-label="Reset salary estimator"
                title="Reset estimator"
              >
                <RotateCcw size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Role family</span>
                <div className="flex items-center border border-[#ead8cf] bg-[#fffaf7] px-4">
                  <BriefcaseBusiness size={18} className="text-[#f55d1d]" aria-hidden="true" />
                  <select
                    value={role}
                    onChange={(event) => setRole(event.target.value as Role)}
                    className="min-h-12 w-full bg-transparent px-3 text-base font-bold outline-none"
                  >
                    <option value="software">Software engineering</option>
                    <option value="product">Product management</option>
                    <option value="data">Data and analytics</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="operations">Operations</option>
                  </select>
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Years of relevant experience</span>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={years}
                  onChange={(event) => setYears(Number(event.target.value))}
                  className="min-h-12 w-full border border-[#ead8cf] bg-[#fffaf7] px-4 text-base font-bold outline-none"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Location cost level</span>
                <div className="flex items-center border border-[#ead8cf] bg-[#fffaf7] px-4">
                  <MapPin size={18} className="text-[#f55d1d]" aria-hidden="true" />
                  <select
                    value={locationCost}
                    onChange={(event) => setLocationCost(event.target.value as LocationCost)}
                    className="min-h-12 w-full bg-transparent px-3 text-base font-bold outline-none"
                  >
                    <option value="low">Lower cost market</option>
                    <option value="average">Average cost market</option>
                    <option value="high">High cost market</option>
                    <option value="premium">Premium market</option>
                  </select>
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#312925]">Specialty or niche skill premium</span>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={specialtyPremium}
                  onChange={(event) => setSpecialtyPremium(Number(event.target.value))}
                  className="min-h-12 w-full border border-[#ead8cf] bg-[#fffaf7] px-4 text-base font-bold outline-none"
                />
              </label>
            </div>
          </section>

          <section className="grid gap-4">
            <div className="bg-[#101114] p-7 text-white max-[480px]:p-5">
              <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#ffb18a]">Estimated salary range</p>
              <div className="mt-3 text-4xl font-black leading-tight max-[480px]:text-3xl">
                {formatCurrency(results.low)} - {formatCurrency(results.high)}
              </div>
              <p className="mt-3 text-base font-medium text-[#f6ddd1]">
                Midpoint estimate: {formatCurrency(results.midpoint)} per year.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
              {[
                ["Lower range", results.low],
                ["Midpoint", results.midpoint],
                ["Upper range", results.high],
                ["Monthly midpoint", results.monthlyMidpoint],
                ["Negotiation target", results.negotiationTarget],
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
                This is a directional estimate for planning. Validate final numbers with current job postings, recruiter conversations, and location-specific market data.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
