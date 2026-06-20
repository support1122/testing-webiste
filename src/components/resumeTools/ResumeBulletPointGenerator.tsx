"use client";

import { useState } from "react";
import { List, Copy, Check, RotateCcw, Sparkles } from "lucide-react";

const actionVerbsByCategory: Record<string, string[]> = {
  Leadership: ["Led","Managed","Directed","Supervised","Mentored","Oversaw","Guided","Coached","Championed","Spearheaded"],
  Achievement: ["Achieved","Delivered","Exceeded","Surpassed","Accomplished","Attained","Completed","Secured","Won","Earned"],
  Growth: ["Increased","Grew","Expanded","Scaled","Accelerated","Boosted","Doubled","Tripled","Maximized","Amplified"],
  Improvement: ["Improved","Optimized","Streamlined","Enhanced","Upgraded","Refined","Transformed","Modernized","Revamped","Strengthened"],
  Building: ["Built","Developed","Created","Designed","Engineered","Established","Launched","Introduced","Architected","Deployed"],
  Analysis: ["Analyzed","Evaluated","Assessed","Researched","Identified","Investigated","Measured","Tracked","Monitored","Reported"],
  Collaboration: ["Collaborated","Partnered","Coordinated","Facilitated","Aligned","Unified","Engaged","Supported","Assisted","Contributed"],
  Reduction: ["Reduced","Cut","Decreased","Eliminated","Minimized","Lowered","Saved","Resolved","Fixed","Addressed"],
};

function lcFirst(s: string) { return s.charAt(0).toLowerCase() + s.slice(1); }
function ucFirst(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

// Strip leading filler or verb phrases the user might type naturally
function cleanTask(t: string) {
  return t.trim()
    .replace(/^(i\s+)?(was\s+)?(responsible\s+for\s+|tasked\s+with\s+|helped\s+to\s+|helped\s+|worked\s+on\s+|worked\s+to\s+|managed\s+to\s+)/i, "")
    // Strip a leading past-tense action verb (e.g. "led", "built", "managed", "created")
    .replace(/^(led|built|managed|created|designed|developed|launched|delivered|drove|ran|handled|owned|oversee|oversaw|spearheaded|coordinated|collaborated|implemented|deployed|architected|analyzed|established|streamlined|improved|reduced|increased|grew|optimized|mentored|supervised|directed|facilitated|supported|executed)\s+/i, "")
    .trim();
}

function generateBullets(role: string, task: string, metric: string, category: string): string[] {
  const verbs = actionVerbsByCategory[category] || actionVerbsByCategory["Achievement"];
  const t = cleanTask(task);
  const r = role.trim();
  const hasMetric = metric.trim().length > 0;
  const m = metric.trim();

  // Build natural metric phrases
  const metricSuffix = hasMetric ? `, resulting in ${lcFirst(m)}` : "";
  const metricImpact = hasMetric ? `, achieving ${lcFirst(m)}` : " and driving measurable business impact";
  const metricBy = hasMetric ? `, contributing to ${lcFirst(m)}` : "";
  const metricWhich = hasMetric ? `, which ${lcFirst(m)}` : "";
  const metricAnd = hasMetric ? ` and ${lcFirst(m)}` : "";

  return [
    // Pattern 1: Verb + task + metric suffix
    `${verbs[0]} ${lcFirst(t)}${metricSuffix}.`,

    // Pattern 2: Verb + task + impact phrase
    `${verbs[1]} ${lcFirst(t)} as ${r}${metricImpact}.`,

    // Pattern 3: Verb + task + contributing metric
    `${verbs[2]} ${lcFirst(t)}${metricBy}, demonstrating expertise as a ${r}.`,

    // Pattern 4: Verb + task + which/that metric
    `${verbs[3]} ${lcFirst(t)}${metricWhich ? metricWhich : ", making a measurable impact on team performance"}.`,

    // Pattern 5: Verb + task + and metric (parallel structure)
    `${verbs[4]} ${lcFirst(t)}${metricAnd}, strengthening overall ${r.toLowerCase()} effectiveness.`,
  ].map(bullet => ucFirst(bullet));
}

export default function ResumeBulletPointGenerator() {
  const [role, setRole] = useState("");
  const [task, setTask] = useState("");
  const [metric, setMetric] = useState("");
  const [category, setCategory] = useState("Achievement");
  const [bullets, setBullets] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (!role.trim() || !task.trim()) return;
    setBullets(generateBullets(role, task, metric, category));
    setGenerated(true);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(bullets.map((b) => `• ${b}`).join("\n"));
    setCopied(-1);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleReset = () => { setRole(""); setTask(""); setMetric(""); setCategory("Achievement"); setBullets([]); setGenerated(false); };

  return (
    <main className="min-h-screen bg-[#fff8f4]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 max-[768px]:py-8 max-[480px]:px-4">

        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f0ded4] bg-white px-3 py-1 text-sm font-medium text-[#f55d1d]">
            <List size={14} /> Free Bullet Generator
          </span>
          <h1 className="text-4xl font-black leading-tight text-[#0b0b0b] max-[480px]:text-3xl">
            Resume Bullet Point Generator
          </h1>
          <p className="text-base text-[#6c5c54]">
            Turn vague job duties into sharp, ATS-friendly bullet points. Enter your role, what you did, and the result — we'll generate 5 polished versions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Input form */}
          <div className="border border-[#f0ded4] bg-white p-7 shadow-[0_18px_60px_rgba(245,93,29,0.08)] rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <p className="text-base font-black text-[#312925]">Describe your achievement</p>
              {generated && (
                <button onClick={handleReset} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ead8cf] bg-white text-[#6c5c54] hover:bg-[#fff2ec] transition">
                  <RotateCcw size={15} />
                </button>
              )}
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">Job Title / Role</label>
                <input
                  type="text"
                  className="min-h-12 w-full rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  placeholder="e.g. Software Engineer, Marketing Manager"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">What did you do? (task/responsibility)</label>
                <textarea
                  className="w-full resize-none rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 py-3 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  rows={3}
                  placeholder="e.g. redesigned the onboarding flow, managed a team of 5 engineers"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">Result / Metric <span className="font-normal text-[#9c8880]">(optional but powerful)</span></label>
                <input
                  type="text"
                  className="min-h-12 w-full rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  placeholder="e.g. increased conversion by 25%, saved $50K annually"
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">Verb style</label>
                <select
                  className="min-h-12 w-full rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {Object.keys(actionVerbsByCategory).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleGenerate}
                disabled={!role.trim() || !task.trim()}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#ff4c00] py-3.5 text-sm font-bold text-white shadow-[0_4px_0_#000] hover:bg-[#ff5a0f] hover:shadow-[0_5px_0_#000] transition active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Sparkles size={15} /> Generate Bullets
              </button>
            </div>
          </div>

          {/* Output */}
          {bullets.length > 0 ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black text-[#312925]">Generated Bullet Points</p>
                <button
                  onClick={handleCopyAll}
                  className="flex items-center gap-1.5 rounded-lg border border-[#ead8cf] bg-white px-3 py-2 text-xs font-medium text-[#312925] hover:bg-[#fff2ec] transition"
                >
                  {copied === -1 ? <><Check size={12} className="text-green-500" /> Copied!</> : <><Copy size={12} /> Copy All</>}
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {bullets.map((bullet, i) => (
                  <div key={i} className="group relative flex items-start gap-3 rounded-xl border border-[#f0ded4] bg-white p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)] hover:border-[#f55d1d] transition">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fff2ec] text-xs font-bold text-[#f55d1d]">{i + 1}</span>
                    <p className="flex-1 text-sm leading-relaxed text-[#312925]">{bullet}</p>
                    <button
                      onClick={() => handleCopy(bullet, i)}
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition"
                    >
                      {copied === i ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-[#9c8880]" />}
                    </button>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-[#f0ded4] bg-[#fffdfb] p-4">
                <p className="text-xs text-[#6c5c54]">
                  <span className="font-bold text-[#312925]">Tip: </span>
                  Pick the bullet that best fits your experience. Personalise numbers and specifics — authenticity matters more than polish.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#ead8cf] bg-white p-16 text-center max-[768px]:hidden">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff2ec]">
                <List size={28} className="text-[#f55d1d]" />
              </div>
              <p className="text-base font-bold text-[#312925]">Your bullet points will appear here</p>
              <p className="text-sm text-[#9c8880]">Fill in the form to generate 5 polished options</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
