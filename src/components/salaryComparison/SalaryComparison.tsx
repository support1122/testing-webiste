"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight, DollarSign, Info, RotateCcw } from "lucide-react";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

type OfferInputProps = {
  bonus: number;
  benefits: number;
  commute: number;
  label: string;
  salary: number;
  setBonus: (value: number) => void;
  setBenefits: (value: number) => void;
  setCommute: (value: number) => void;
  setSalary: (value: number) => void;
};

function OfferInput({
  bonus,
  benefits,
  commute,
  label,
  salary,
  setBonus,
  setBenefits,
  setCommute,
  setSalary,
}: OfferInputProps) {
  return (
    <div className="grid gap-4 border border-[#f0ded4] bg-white p-5">
      <h3 className="text-xl font-black">{label}</h3>
      {[
        ["Base salary", salary, setSalary],
        ["Annual bonus or equity", bonus, setBonus],
        ["Benefits value", benefits, setBenefits],
        ["Commute or work costs", commute, setCommute],
      ].map(([inputLabel, value, setter]) => (
        <label key={inputLabel as string} className="grid gap-2">
          <span className="text-sm font-bold text-[#312925]">{inputLabel as string}</span>
          <div className="flex items-center border border-[#ead8cf] bg-[#fffaf7] px-4">
            <DollarSign size={18} className="text-[#f55d1d]" aria-hidden="true" />
            <input
              type="number"
              min="0"
              value={value as number}
              onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))}
              className="min-h-12 w-full bg-transparent px-3 text-base font-bold outline-none"
            />
          </div>
        </label>
      ))}
    </div>
  );
}

export default function SalaryComparison() {
  const [salaryA, setSalaryA] = useState(110000);
  const [bonusA, setBonusA] = useState(10000);
  const [benefitsA, setBenefitsA] = useState(8000);
  const [commuteA, setCommuteA] = useState(2400);
  const [salaryB, setSalaryB] = useState(125000);
  const [bonusB, setBonusB] = useState(5000);
  const [benefitsB, setBenefitsB] = useState(6000);
  const [commuteB, setCommuteB] = useState(1200);

  const results = useMemo(() => {
    const totalA = Math.max(0, salaryA) + Math.max(0, bonusA) + Math.max(0, benefitsA) - Math.max(0, commuteA);
    const totalB = Math.max(0, salaryB) + Math.max(0, bonusB) + Math.max(0, benefitsB) - Math.max(0, commuteB);
    const difference = totalB - totalA;

    return {
      totalA,
      totalB,
      difference,
      monthlyDifference: difference / 12,
      winner: difference > 0 ? "Offer B" : difference < 0 ? "Offer A" : "Tie",
    };
  }, [benefitsA, benefitsB, bonusA, bonusB, commuteA, commuteB, salaryA, salaryB]);

  const resetDefaults = () => {
    setSalaryA(110000);
    setBonusA(10000);
    setBenefitsA(8000);
    setCommuteA(2400);
    setSalaryB(125000);
    setBonusB(5000);
    setBenefitsB(6000);
    setCommuteB(1200);
  };

  return (
    <main className="min-h-screen bg-[#fff8f4] text-[#101114]">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 max-[768px]:px-4 max-[768px]:py-16">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 border border-[#f55d1d]/30 bg-white px-3 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#f55d1d]">
            <ArrowLeftRight size={18} aria-hidden="true" />
            Salary Comparison
          </div>
          <h1 className="text-5xl font-black leading-[1.02] tracking-normal max-[768px]:text-4xl max-[480px]:text-3xl">
            Compare two job offers side by side.
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-7 text-[#5c504b] max-[480px]:text-base">
            Compare salary, bonus, benefits, and recurring work costs to see which offer has stronger total value.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <section className="grid gap-5 md:grid-cols-2">
            <OfferInput
              bonus={bonusA}
              benefits={benefitsA}
              commute={commuteA}
              label="Offer A"
              salary={salaryA}
              setBonus={setBonusA}
              setBenefits={setBenefitsA}
              setCommute={setCommuteA}
              setSalary={setSalaryA}
            />
            <OfferInput
              bonus={bonusB}
              benefits={benefitsB}
              commute={commuteB}
              label="Offer B"
              salary={salaryB}
              setBonus={setBonusB}
              setBenefits={setBenefitsB}
              setCommute={setCommuteB}
              setSalary={setSalaryB}
            />
          </section>

          <section className="grid gap-4">
            <div className="bg-[#101114] p-7 text-white max-[480px]:p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#ffb18a]">Better value</p>
                <button
                  type="button"
                  onClick={resetDefaults}
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/25 text-white transition hover:border-[#ffb18a]"
                  aria-label="Reset salary comparison"
                  title="Reset comparison"
                >
                  <RotateCcw size={18} aria-hidden="true" />
                </button>
              </div>
              <div className="text-5xl font-black leading-none max-[480px]:text-4xl">{results.winner}</div>
              <p className="mt-3 text-base font-medium text-[#f6ddd1]">
                Difference: {formatCurrency(Math.abs(results.difference))} per year, or {formatCurrency(Math.abs(results.monthlyDifference))} per month.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                ["Offer A total value", results.totalA],
                ["Offer B total value", results.totalB],
                ["Annual difference", Math.abs(results.difference)],
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
                This comparison focuses on quantifiable value. Also consider growth, manager quality, stability, visa support, commute, and team fit.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
