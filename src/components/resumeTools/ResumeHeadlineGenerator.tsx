"use client";

import { useState } from "react";
import { Type, Copy, Check, RotateCcw, Sparkles, RefreshCw } from "lucide-react";

// ─── Template Database ────────────────────────────────────────────────────────
// Each template uses placeholders: {role} {years} {skill} {niche} {adjective}
// Templates are grouped by pattern type so we can pick varied structures

type Template = {
  id: string;
  pattern: (v: Vars) => string;
  requires: ("years" | "skill" | "niche")[]; // which fields must be present
};

type Vars = {
  role: string;
  years: string;
  skill: string;
  niche: string;
  adj: string;
};

const ADJECTIVES = [
  "Results-Driven","Ambitious","Strategic","Dynamic","Innovative","Dedicated",
  "Passionate","Detail-Oriented","High-Impact","Goal-Oriented","Resourceful","Proactive",
];

const TEMPLATES: Template[] = [
  // ── With years + skill + niche ──
  { id:"A1", requires:["years","skill","niche"], pattern:({role,years,skill,niche,adj})=>`${adj} ${role} with ${years}+ Years of ${skill} Experience | Helping ${niche} Teams Achieve More` },
  { id:"A2", requires:["years","skill","niche"], pattern:({role,years,skill,niche})=>`${skill}-Focused ${role} with ${years}+ Years of Experience | Delivering Consistent Results in ${niche}` },
  { id:"A3", requires:["years","skill","niche"], pattern:({role,years,skill,niche})=>`${years}+ Year ${role} Specialising in ${skill} | Driving Growth and Innovation Across ${niche}` },
  { id:"A4", requires:["years","skill","niche"], pattern:({role,years,skill,niche})=>`Senior ${role} — ${years}+ Years Building ${skill} Solutions that Move the Needle in ${niche}` },
  { id:"A5", requires:["years","skill","niche"], pattern:({role,years,skill,niche,adj})=>`${adj} ${role} | ${years}+ Years of ${skill} Mastery | Passionate About Transforming ${niche}` },
  { id:"A6", requires:["years","skill","niche"], pattern:({role,years,skill,niche})=>`${role} with ${years}+ Years in ${niche} | ${skill} Expert | Proven Track Record of Delivering Impact` },
  { id:"A7", requires:["years","skill","niche"], pattern:({role,years,skill,niche,adj})=>`${adj} ${niche} ${role} | ${years}+ Years of ${skill} Expertise | Committed to Scalable, High-Impact Solutions` },
  { id:"A8", requires:["years","skill","niche"], pattern:({role,years,skill,niche})=>`${years}+ Year ${role} Leveraging ${skill} to Drive Revenue and Efficiency in ${niche}` },

  // ── With years + skill (no niche) ──
  { id:"B1", requires:["years","skill"], pattern:({role,years,skill,adj})=>`${adj} ${role} with ${years}+ Years of ${skill} Excellence | Turning Complex Problems into Simple Solutions` },
  { id:"B2", requires:["years","skill"], pattern:({role,years,skill})=>`${years}+ Year ${role} Specialising in ${skill} | Consistently Delivering Quality Work and Measurable Business Impact` },
  { id:"B3", requires:["years","skill"], pattern:({role,years,skill,adj})=>`${adj} ${role} | ${years}+ Years of Hands-On ${skill} Experience | Ready to Drive Results from Day One` },
  { id:"B4", requires:["years","skill"], pattern:({role,years,skill})=>`${years}+ Year ${skill}-Focused ${role} | Strong Collaborator with a Proven Record of Shipping on Time` },
  { id:"B5", requires:["years","skill"], pattern:({role,years,skill})=>`${role} with ${years}+ Years in ${skill} | Passionate About Building Products That Users Actually Love` },
  { id:"B6", requires:["years","skill"], pattern:({role,years,skill,adj})=>`${adj} ${role} — ${years}+ Years Applying ${skill} to Solve Real Business Problems and Create Lasting Value` },

  // ── With years + niche (no skill) ──
  { id:"C1", requires:["years","niche"], pattern:({role,years,niche,adj})=>`${adj} ${role} with ${years}+ Years of Deep ${niche} Expertise | Focused on Delivering Outcomes That Matter` },
  { id:"C2", requires:["years","niche"], pattern:({role,years,niche})=>`${niche} ${role} with ${years}+ Years of Industry Experience | Passionate About Building Teams That Outperform` },
  { id:"C3", requires:["years","niche"], pattern:({role,years,niche,adj})=>`${adj} ${role} — ${years}+ Years in ${niche} | Known for High-Quality Work and a Strong Ownership Mindset` },
  { id:"C4", requires:["years","niche"], pattern:({role,years,niche})=>`${role} with ${years}+ Years Focused on ${niche} | Committed to Continuous Improvement and Data-Driven Decision Making` },
  { id:"C5", requires:["years","niche"], pattern:({role,years,niche})=>`${years}+ Year ${role} | Deep Roots in ${niche} | Bringing Strategic Thinking and Execution to Every Challenge` },

  // ── With skill + niche (no years) ──
  { id:"D1", requires:["skill","niche"], pattern:({role,skill,niche,adj})=>`${adj} ${role} with Strong ${skill} Skills | Helping ${niche} Organisations Scale Faster and Smarter` },
  { id:"D2", requires:["skill","niche"], pattern:({role,skill,niche})=>`${niche} ${role} with Deep ${skill} Expertise | Translating Strategy into Results That Drive Business Forward` },
  { id:"D3", requires:["skill","niche"], pattern:({role,skill,niche,adj})=>`${adj} ${role} Specialising in ${skill} for ${niche} | Bridging the Gap Between Technical Excellence and Business Goals` },
  { id:"D4", requires:["skill","niche"], pattern:({role,skill,niche})=>`${role} — Leveraging ${skill} to Solve the Hardest ${niche} Challenges and Deliver Consistent Growth` },
  { id:"D5", requires:["skill","niche"], pattern:({role,skill,niche})=>`${niche}-Focused ${role} with a Passion for ${skill} | Building Solutions That Create Real, Measurable Value` },
  { id:"D6", requires:["skill","niche"], pattern:({role,skill,niche,adj})=>`${adj} ${role} | ${skill} Specialist in ${niche} | Committed to Shipping High-Quality Work on Time and on Budget` },

  // ── With years only ──
  { id:"E1", requires:["years"], pattern:({role,years,adj})=>`${adj} ${role} with ${years}+ Years of Experience | Passionate About Creating Impact and Growing High-Performing Teams` },
  { id:"E2", requires:["years"], pattern:({role,years})=>`${years}+ Year ${role} with a Proven Track Record | Consistently Delivering Results That Exceed Expectations and Drive Growth` },
  { id:"E3", requires:["years"], pattern:({role,years})=>`${role} with ${years}+ Years of Industry Experience | Combining Strategic Thinking with Hands-On Execution to Deliver Real Value` },
  { id:"E4", requires:["years"], pattern:({role,years,adj})=>`${adj} ${role} — ${years}+ Years of Delivering Excellence | Bringing Energy, Focus, and Strong Ownership to Every Role` },
  { id:"E5", requires:["years"], pattern:({role,years})=>`${years}+ Year ${role} | Strong Communicator and Collaborator | Ready to Make an Immediate and Measurable Business Impact` },

  // ── With skill only ──
  { id:"F1", requires:["skill"], pattern:({role,skill,adj})=>`${adj} ${role} with Deep ${skill} Expertise | Passionate About Using Technology to Solve Problems That Actually Matter` },
  { id:"F2", requires:["skill"], pattern:({role,skill})=>`${skill}-Focused ${role} | Turning Complex Technical Challenges into Clean, Scalable Solutions That Teams Love to Work With` },
  { id:"F3", requires:["skill"], pattern:({role,skill,adj})=>`${adj} ${role} Specialising in ${skill} | Known for Clean Work, Fast Delivery, and a Strong Bias Towards Action` },
  { id:"F4", requires:["skill"], pattern:({role,skill})=>`${role} with a Passion for ${skill} | Consistently Delivering High-Quality Solutions and Helping Teams Ship Faster and Better` },
  { id:"F5", requires:["skill"], pattern:({role,skill,adj})=>`${adj} ${role} | ${skill} Practitioner | Focused on Building Things That Are Reliable, Scalable, and Easy to Maintain` },
  { id:"F6", requires:["skill"], pattern:({role,skill})=>`${role} Leveraging ${skill} to Deliver Measurable Business Results | Open to Exciting Opportunities Where I Can Make a Difference` },

  // ── With niche only ──
  { id:"G1", requires:["niche"], pattern:({role,niche,adj})=>`${adj} ${niche} ${role} | Passionate About Building Products That Serve Real Users and Create Lasting Industry Impact` },
  { id:"G2", requires:["niche"], pattern:({role,niche})=>`${niche} ${role} | Bringing Deep Industry Insight and a Strong Execution Mindset to Every Problem and Every Team` },
  { id:"G3", requires:["niche"], pattern:({role,niche,adj})=>`${adj} ${role} with a ${niche} Focus | Committed to Continuous Learning, High-Quality Delivery, and Making Teams Better` },
  { id:"G4", requires:["niche"], pattern:({role,niche})=>`${role} with a Passion for ${niche} | Driven by Curiosity, Strong Ownership, and a Track Record of Delivering Business Value` },
  { id:"G5", requires:["niche"], pattern:({role,niche})=>`${niche}-Specialised ${role} | Combining Strategic Thinking with Practical Execution to Move Organisations Forward` },

  // ── Role only (no optional fields) ──
  { id:"H1", requires:[], pattern:({role,adj})=>`${adj} ${role} | Committed to Excellence, Continuous Learning, and Delivering Work That Makes a Real Difference` },
  { id:"H2", requires:[], pattern:({role})=>`${role} | Passionate About Making a Positive Impact | Strong Communicator, Collaborator, and Problem Solver` },
  { id:"H3", requires:[], pattern:({role,adj})=>`${adj} ${role} Ready to Deliver Results from Day One | Bringing Focus, Energy, and a Strong Ownership Mindset` },
  { id:"H4", requires:[], pattern:({role})=>`${role} | Bringing Energy, Drive, and a Growth Mindset to Every Challenge | Open to Exciting New Opportunities` },
  { id:"H5", requires:[], pattern:({role})=>`Motivated ${role} | Strong Work Ethic, Proven Collaborator, and a Track Record of Shipping on Time` },
  { id:"H6", requires:[], pattern:({role,adj})=>`${adj} ${role} with a Track Record of Getting Things Done | Passionate About Building Great Products and Great Teams` },
  { id:"H7", requires:[], pattern:({role})=>`${role} | Delivering Quality Work, Measurable Results, and a Positive Impact Wherever I Go` },
  { id:"H8", requires:[], pattern:({role,adj})=>`${adj} and Detail-Oriented ${role} | Known for High Standards, Fast Delivery, and a Relentless Focus on Business Outcomes` },
  { id:"H9", requires:[], pattern:({role})=>`${role} | Fast Learner, Adaptable, and Impact-Focused | Ready to Bring My Best to a Team That Cares About Quality` },
  { id:"H10", requires:[], pattern:({role,adj})=>`${adj} ${role} | Open to Exciting New Opportunities Where I Can Grow, Contribute, and Drive Meaningful Results` },
];

// Normalize free-text user input into properly formatted headline tokens
function toTitleCase(str: string): string {
  const minors = new Set(["a","an","the","and","but","or","for","nor","on","at","to","by","in","of","up","as","is","vs"]);
  return str
    .trim()
    .replace(/\s*,\s*/g, ", ")   // normalize comma spacing
    .split(/\s+/)
    .map((word, i) => {
      const lower = word.toLowerCase();
      // Always capitalize first word; keep minors lowercase mid-string
      if (i === 0 || !minors.has(lower)) {
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      }
      return lower;
    })
    .join(" ");
}

// Format skill field: "python , power bi" → "Python & Power BI"
// Handle comma/slash/ampersand separators, strip extra spaces
function formatSkill(raw: string): string {
  const parts = raw.split(/\s*[,/&]\s*/).map(s => toTitleCase(s.trim())).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]} & ${parts[1]}`;
  // 3+ skills: first two + "more"
  return `${parts[0]}, ${parts[1]} & More`;
}

// Format niche/industry: "e commerce" → "E-Commerce", "saas" → "SaaS", etc.
function formatNiche(raw: string): string {
  const known: Record<string, string> = {
    "e commerce": "E-Commerce", "ecommerce": "E-Commerce",
    "saas": "SaaS", "b2b": "B2B", "b2c": "B2C",
    "fintech": "Fintech", "healthtech": "HealthTech",
    "edtech": "EdTech", "martech": "MarTech",
    "hr tech": "HR Tech", "hrtech": "HR Tech",
    "ai": "AI", "ml": "ML",
  };
  const key = raw.toLowerCase().trim();
  return known[key] || toTitleCase(raw);
}

function normalizeVars(raw: Vars): Vars {
  return {
    role: toTitleCase(raw.role),
    years: raw.years.trim(),
    skill: formatSkill(raw.skill),
    niche: formatNiche(raw.niche),
    adj: raw.adj,
  };
}

function pickTemplates(vars: Vars, count = 5): string[] {
  const normalized = normalizeVars(vars);
  const { years, skill, niche } = normalized;
  const hasYears = years.trim().length > 0;
  const hasSkill = skill.trim().length > 0;
  const hasNiche = niche.trim().length > 0;

  const eligible = TEMPLATES.filter((t) => {
    for (const req of t.requires) {
      if (req === "years" && !hasYears) return false;
      if (req === "skill" && !hasSkill) return false;
      if (req === "niche" && !hasNiche) return false;
    }
    return true;
  });

  const shuffled = [...eligible].sort(() => Math.random() - 0.5);

  const seen = new Set<string>();
  const picked: string[] = [];
  for (const t of shuffled) {
    if (picked.length >= count) break;
    const text = t.pattern(normalized).trim();
    if (!seen.has(text) && text.length > 5) {
      seen.add(text);
      picked.push(text);
    }
  }
  return picked;
}

export default function ResumeHeadlineGenerator() {
  const [role, setRole] = useState("");
  const [years, setYears] = useState("");
  const [skill, setSkill] = useState("");
  const [niche, setNiche] = useState("");
  const [adjIdx, setAdjIdx] = useState(0);
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const [generated, setGenerated] = useState(false);

  const buildVars = (): Vars => ({
    role: role.trim() || "Professional",
    years: years.trim(),
    skill: skill.trim(),
    niche: niche.trim(),
    adj: ADJECTIVES[adjIdx % ADJECTIVES.length],
  });

  const handleGenerate = () => {
    if (!role.trim()) return;
    setAdjIdx((i) => i + 1);
    setHeadlines(pickTemplates(buildVars(), 5));
    setGenerated(true);
  };

  const handleReroll = () => {
    setAdjIdx((i) => i + 1);
    setHeadlines(pickTemplates({ ...buildVars(), adj: ADJECTIVES[(adjIdx + 1) % ADJECTIVES.length] }, 5));
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleReset = () => {
    setRole(""); setYears(""); setSkill(""); setNiche("");
    setHeadlines([]); setGenerated(false);
  };

  return (
    <main className="min-h-screen bg-[#fff8f4]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 max-[768px]:py-8 max-[480px]:px-4">

        {/* Hero — compact */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#f0ded4] bg-white px-3 py-1 text-sm font-medium text-[#f55d1d]">
              <Type size={14} /> Free Headline Generator
            </span>
          </div>
          <h1 className="text-4xl font-black leading-tight text-[#0b0b0b] max-[480px]:text-3xl">
            Resume Headline Generator
          </h1>
          <p className="text-base text-[#6c5c54] max-w-2xl">
            Enter your role and hit <span className="font-bold text-[#0b0b0b]">Generate</span> — get 5 recruiter-tested headlines instantly. Re-roll for fresh options.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Form */}
          <div className="border border-[#f0ded4] bg-white p-7 shadow-[0_18px_60px_rgba(245,93,29,0.08)] rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <p className="text-base font-black text-[#312925]">Your details</p>
              {generated && (
                <button onClick={handleReset} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ead8cf] bg-white text-[#6c5c54] hover:bg-[#fff2ec] transition">
                  <RotateCcw size={15} />
                </button>
              )}
            </div>
            <div className="flex flex-col gap-3">

              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">
                  Job Title / Role <span className="text-[#f55d1d]">*</span>
                </label>
                <input
                  type="text"
                  className="h-10 w-full rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  placeholder="e.g. Software Engineer, Marketing Manager"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">
                  Years of Experience <span className="text-xs font-normal text-[#9c8880]">(optional)</span>
                </label>
                <input
                  type="number" min="0" max="40"
                  className="h-10 w-full rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  placeholder="e.g. 5"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">
                  Top Skill / Tool <span className="text-xs font-normal text-[#9c8880]">(optional)</span>
                </label>
                <input
                  type="text"
                  className="h-10 w-full rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  placeholder="e.g. React, Python, Figma, SQL"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-[#312925]">
                  Industry / Niche <span className="text-xs font-normal text-[#9c8880]">(optional)</span>
                </label>
                <input
                  type="text"
                  className="h-10 w-full rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                  placeholder="e.g. Fintech, SaaS, Healthcare, E-commerce"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={!role.trim()}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#ff4c00] py-3.5 text-sm font-bold text-white shadow-[0_4px_0_#000] hover:bg-[#ff5a0f] hover:shadow-[0_5px_0_#000] transition active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Sparkles size={15} /> Generate Headlines
              </button>
            </div>
          </div>

          {/* Results */}
          {headlines.length > 0 ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black text-[#312925]">5 Headline Options — click any to copy</p>
                <button
                  onClick={handleReroll}
                  className="flex items-center gap-1.5 rounded-lg border border-[#ead8cf] bg-white px-3 py-2 text-xs font-medium text-[#312925] hover:bg-[#fff2ec] transition"
                >
                  <RefreshCw size={12} /> Re-roll
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {headlines.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => handleCopy(h, i)}
                    className="group flex items-center gap-4 rounded-xl border border-[#f0ded4] bg-white p-5 text-left shadow-[0_18px_60px_rgba(245,93,29,0.08)] hover:border-[#f55d1d] transition"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#fff2ec] text-xs font-bold text-[#f55d1d]">
                      {i + 1}
                    </span>
                    <p className="flex-1 text-sm font-medium text-[#312925] leading-snug">{h}</p>
                    {copied === i
                      ? <Check size={15} className="shrink-0 text-green-500" />
                      : <Copy size={15} className="shrink-0 text-[#9c8880] opacity-0 group-hover:opacity-100 transition" />
                    }
                  </button>
                ))}
              </div>

              <div className="rounded-xl border border-[#f0ded4] bg-[#fffdfb] p-4">
                <p className="text-xs text-[#6c5c54]">
                  <span className="font-bold text-[#312925]">Pro tip: </span>
                  Use this as the first line under your name on your CV, and as your LinkedIn headline. Keep it under 120 characters.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#ead8cf] bg-white p-16 text-center max-[768px]:hidden">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff2ec]">
                <Type size={28} className="text-[#f55d1d]" />
              </div>
              <p className="text-base font-bold text-[#312925]">Your 5 headlines will appear here</p>
              <p className="text-sm text-[#9c8880]">Enter your role and click Generate</p>
            </div>
          )}
        </div>

        {/* Template preview section */}
        <div className="rounded-2xl border border-[#f0ded4] bg-white p-7 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
          <p className="text-base font-black text-[#312925] mb-1">What makes a great resume headline?</p>
          <p className="text-sm text-[#6c5c54] mb-5">
            The best headlines combine your role, a differentiator (years, skill, or industry), and a value signal. Here are the proven patterns our generator uses:
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              { pattern: "[X]+ Year [Role] | [Skill] | [Industry]", example: "5+ Year Data Analyst | Python | Fintech" },
              { pattern: "[Skill]-Focused [Role] with [X]+ Years in [Industry]", example: "React-Focused Engineer with 4+ Years in SaaS" },
              { pattern: "[Adjective] [Role] with [X]+ Years of [Skill] Expertise", example: "Strategic Product Manager with 6+ Years of Agile Expertise" },
              { pattern: "[Industry] [Role] | [Skill] Expert | [X]+ Years", example: "Healthcare Analyst | SQL Expert | 3+ Years" },
              { pattern: "[Role] Specialising in [Skill]", example: "UX Designer Specialising in Figma & User Research" },
              { pattern: "[Role] — [X]+ Years Building [Skill] Solutions in [Industry]", example: "Engineer — 7+ Years Building ML Solutions in E-commerce" },
            ].map(({ pattern, example }) => (
              <div key={pattern} className="rounded-lg border border-[#f0ded4] bg-[#fff8f4] p-4">
                <p className="text-xs font-bold text-[#f55d1d] mb-1 font-mono">{pattern}</p>
                <p className="text-xs text-[#6c5c54]">e.g. {example}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
