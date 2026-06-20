"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, RotateCcw, AlignLeft } from "lucide-react";

const toneOptions = ["Professional","Confident","Creative","Executive","Entry-Level"];

const EXAMPLES = [
  { role: "Data Analyst", years: "3", skills: "Python, SQL, Power BI, Tableau", achievement: "reduced reporting time by 60% by automating dashboards", tone: "Professional" },
  { role: "Software Engineer", years: "5", skills: "React, Node.js, TypeScript, AWS", achievement: "led migration of monolith to microservices serving 1M+ users", tone: "Confident" },
  { role: "Product Manager", years: "4", skills: "Agile, Roadmapping, User Research, Jira", achievement: "launched 3 products that grew ARR by $2M", tone: "Executive" },
  { role: "Marketing Manager", years: "6", skills: "SEO, Google Ads, Content Strategy, Analytics", achievement: "grew organic traffic by 200% in 12 months", tone: "Creative" },
  { role: "Fresh Graduate", years: "0", skills: "Java, Python, Data Structures, REST APIs", achievement: "built a real-time chat app with 500+ active users as final year project", tone: "Entry-Level" },
];

function generateSummary(role: string, years: string, skills: string, achievement: string, tone: string): string[] {
  const yr = years.trim() ? `${years}+ year${Number(years) !== 1 ? "s" : ""}` : "several years";
  const sk = skills.trim() ? skills.trim() : "a broad technical skill set";
  const ach = achievement.trim() ? ` Known for ${achievement.trim()}.` : "";
  const r = role.trim() || "professional";

  const prefixes: Record<string, string[]> = {
    Professional: [
      `Results-oriented ${r} with ${yr} of experience in ${sk}.`,
      `Experienced ${r} with a proven track record spanning ${yr}, specialising in ${sk}.`,
      `Dedicated ${r} bringing ${yr} of hands-on expertise in ${sk}.`,
    ],
    Confident: [
      `High-impact ${r} with ${yr} of experience driving results through ${sk}.`,
      `Dynamic ${r} with ${yr} of demonstrated success leveraging ${sk}.`,
      `Accomplished ${r} with ${yr} of expertise in ${sk} — consistently delivering above expectations.`,
    ],
    Creative: [
      `Innovative ${r} with ${yr} of experience blending creativity and ${sk}.`,
      `Forward-thinking ${r} with ${yr} of experience turning complex challenges into elegant solutions through ${sk}.`,
      `Passionate ${r} with ${yr} of hands-on experience and a creative edge in ${sk}.`,
    ],
    Executive: [
      `Senior ${r} with ${yr} of strategic experience and deep expertise in ${sk}.`,
      `Visionary ${r} with ${yr} of leadership experience driving organisational growth through ${sk}.`,
      `Executive-level ${r} with ${yr} of experience building and scaling initiatives in ${sk}.`,
    ],
    "Entry-Level": [
      `Motivated ${r} with a strong foundation in ${sk} and a passion for continuous growth.`,
      `Ambitious ${r} equipped with solid knowledge of ${sk}, eager to contribute from day one.`,
      `Recent ${r} graduate with hands-on project experience in ${sk} and a drive to deliver results.`,
    ],
  };

  const pool = prefixes[tone] || prefixes["Professional"];
  return pool.map((prefix) => `${prefix}${ach} Seeking to leverage these strengths in a challenging ${r} role.`);
}

export default function AiResumeSummaryGenerator() {
  const [role, setRole] = useState("");
  const [years, setYears] = useState("");
  const [skills, setSkills] = useState("");
  const [achievement, setAchievement] = useState("");
  const [tone, setTone] = useState("Professional");
  const [summaries, setSummaries] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const [exampleIdx, setExampleIdx] = useState(0);

  const handleGenerate = () => {
    if (!role.trim()) return;
    setSummaries(generateSummary(role, years, skills, achievement, tone));
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleReset = () => { setRole(""); setYears(""); setSkills(""); setAchievement(""); setSummaries([]); setTone("Professional"); };

  const handleTryExample = () => {
    const ex = EXAMPLES[exampleIdx % EXAMPLES.length];
    setRole(ex.role); setYears(ex.years); setSkills(ex.skills);
    setAchievement(ex.achievement); setTone(ex.tone);
    setSummaries(generateSummary(ex.role, ex.years, ex.skills, ex.achievement, ex.tone));
    setExampleIdx((i) => i + 1);
  };

  return (
    <main className="min-h-screen bg-[#fff8f4]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 max-[768px]:py-8 max-[480px]:px-4">

        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f0ded4] bg-white px-3 py-1 text-sm font-medium text-[#f55d1d]">
            <Sparkles size={14} /> Free Summary Generator
          </span>
          <h1 className="text-4xl font-black leading-tight text-[#0b0b0b] max-[480px]:text-3xl">
            AI Resume Summary Generator
          </h1>
          <p className="text-base text-[#6c5c54]">
            Generate a compelling professional summary for your resume in seconds. Choose your tone and get 3 tailored options to pick from.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="border border-[#f0ded4] bg-white p-7 shadow-[0_18px_60px_rgba(245,93,29,0.08)] rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <p className="text-base font-black text-[#312925]">Tell us about yourself</p>
              <div className="flex items-center gap-2">
                <button onClick={handleTryExample}
                  className="rounded-lg border border-[#ead8cf] bg-[#fff8f4] px-3 py-1.5 text-xs font-medium text-[#f55d1d] hover:bg-[#fff2ec] transition">
                  Try an Example
                </button>
                {summaries.length > 0 && (
                  <button onClick={handleReset} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ead8cf] bg-white text-[#6c5c54] hover:bg-[#fff2ec] transition">
                    <RotateCcw size={15} />
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">Job Title / Role</label>
                <input type="text" className="min-h-12 w-full rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  placeholder="e.g. Product Manager, Data Analyst" value={role} onChange={(e) => setRole(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">Years of Experience</label>
                <input type="number" min="0" max="40" className="min-h-12 w-full rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  placeholder="e.g. 5" value={years} onChange={(e) => setYears(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">Top Skills <span className="font-normal text-[#9c8880]">(comma separated)</span></label>
                <input type="text" className="min-h-12 w-full rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  placeholder="e.g. Python, SQL, Machine Learning" value={skills} onChange={(e) => setSkills(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">Key Achievement <span className="font-normal text-[#9c8880]">(optional)</span></label>
                <input type="text" className="min-h-12 w-full rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  placeholder="e.g. growing revenue by 40%, leading a team of 10" value={achievement} onChange={(e) => setAchievement(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">Tone</label>
                <div className="flex flex-wrap gap-2">
                  {toneOptions.map((t) => (
                    <button key={t} onClick={() => setTone(t)}
                      className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${tone === t ? "border-[#f55d1d] bg-[#fff2ec] text-[#f55d1d]" : "border-[#ead8cf] bg-white text-[#6c5c54] hover:border-[#f55d1d]"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={handleGenerate} disabled={!role.trim()}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#ff4c00] py-3.5 text-sm font-bold text-white shadow-[0_4px_0_#000] hover:bg-[#ff5a0f] hover:shadow-[0_5px_0_#000] transition active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed">
                <Sparkles size={15} /> Generate Summary
              </button>
            </div>
          </div>

          {summaries.length > 0 ? (
            <div className="flex flex-col gap-4">
              <p className="text-sm font-black text-[#312925]">Generated Summaries — pick your favourite</p>
              {summaries.map((s, i) => (
                <div key={i} className="group relative rounded-xl border border-[#f0ded4] bg-white p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)] hover:border-[#f55d1d] transition">
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fff2ec] text-xs font-bold text-[#f55d1d]">{i + 1}</span>
                    <p className="flex-1 text-sm leading-relaxed text-[#312925]">{s}</p>
                    <button onClick={() => handleCopy(s, i)} className="shrink-0 opacity-0 group-hover:opacity-100 transition">
                      {copied === i ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-[#9c8880]" />}
                    </button>
                  </div>
                </div>
              ))}
              <div className="rounded-xl border border-[#f0ded4] bg-[#fffdfb] p-4">
                <p className="text-xs text-[#6c5c54]"><span className="font-bold text-[#312925]">Pro tip: </span>Keep your summary to 2–4 sentences and tailor it for each job application.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#ead8cf] bg-white p-16 text-center max-[768px]:hidden">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff2ec]">
                <AlignLeft size={28} className="text-[#f55d1d]" />
              </div>
              <p className="text-base font-bold text-[#312925]">Your summaries will appear here</p>
              <p className="text-sm text-[#9c8880]">Fill in the form to generate 3 options</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
