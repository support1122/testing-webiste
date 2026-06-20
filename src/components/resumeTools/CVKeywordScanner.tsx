"use client";

import { useState } from "react";
import { ScanSearch, CheckCircle, XCircle, AlertCircle, RotateCcw, Sparkles } from "lucide-react";

type ScanResult = {
  matchRate: number;
  matchLevel: string;
  summary: string;
  matched: string[];
  missing: string[];
  suggestions: string[];
};

export default function CVKeywordScanner() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScan = async () => {
    if (!resume.trim() || !jobDesc.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const res = await fetch("/api/cv-keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: resume, jobDescription: jobDesc }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => { setResume(""); setJobDesc(""); setResult(null); setError(""); };

  const matchColor = (rate: number) =>
    rate >= 70 ? "text-green-400" : rate >= 45 ? "text-yellow-400" : "text-red-400";

  const barColor = (rate: number) =>
    rate >= 70 ? "bg-green-500" : rate >= 45 ? "bg-yellow-400" : "bg-red-400";

  return (
    <main className="min-h-screen bg-[#fff8f4]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 max-[768px]:py-8 max-[480px]:px-4">

        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f0ded4] bg-white px-3 py-1 text-sm font-medium text-[#f55d1d]">
            <Sparkles size={14} /> AI-Powered Keyword Scanner
          </span>
          <h1 className="text-4xl font-black leading-tight text-[#0b0b0b] max-[480px]:text-3xl">
            CV Keyword Scanner
          </h1>
          <p className="text-base text-[#6c5c54]">
            Paste your CV and a job description. Our AI finds which keywords match and which are missing — so you can tailor your resume for every application.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="border border-[#f0ded4] bg-white p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)] rounded-xl">
              <p className="mb-2 text-sm font-bold text-[#312925]">Your CV / Resume</p>
              <textarea
                className="w-full resize-none rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 py-3 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                rows={9}
                placeholder="Paste your full CV or resume text here..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
              />
            </div>
            <div className="border border-[#f0ded4] bg-white p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)] rounded-xl">
              <p className="mb-2 text-sm font-bold text-[#312925]">Job Description</p>
              <textarea
                className="w-full resize-none rounded-lg border border-[#ead8cf] bg-[#fffaf7] px-4 py-3 text-sm text-[#312925] outline-none focus:border-[#f55d1d] transition"
                rows={9}
                placeholder="Paste the job description you're applying to..."
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleScan}
                disabled={!resume.trim() || !jobDesc.trim() || loading}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#ff4c00] py-3 text-sm font-bold text-white shadow-[0_4px_0_#000] hover:bg-[#ff5a0f] hover:shadow-[0_5px_0_#000] transition active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Sparkles size={14} /> {loading ? "Scanning…" : "Scan Keywords"}
              </button>
              {result && (
                <button onClick={handleReset} className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#ead8cf] bg-white text-[#6c5c54] hover:bg-[#fff2ec] transition">
                  <RotateCcw size={16} />
                </button>
              )}
            </div>
            {loading && (
              <div className="flex items-center gap-3 rounded-xl border border-[#f0ded4] bg-white p-4">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#ead8cf] border-t-[#f55d1d]" />
                <span className="text-sm text-[#6c5c54]">AI is scanning keywords…</span>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
                <AlertCircle size={16} /> {error}
              </div>
            )}
          </div>

          {result ? (
            <div className="flex flex-col gap-5">
              {/* Match rate */}
              <div className="rounded-2xl bg-[#101114] p-8 text-white">
                <p className="text-sm text-[#aaa]">Keyword Match Rate</p>
                <div className="mt-2 flex items-end gap-3">
                  <span className={`text-7xl font-black leading-none ${matchColor(result.matchRate)}`}>{result.matchRate}%</span>
                  <span className="mb-2 text-lg font-medium text-[#aaa]">{result.matchLevel}</span>
                </div>
                <div className="mt-4 h-2.5 w-full rounded-full bg-[#2a2a2a]">
                  <div className={`h-2.5 rounded-full transition-all duration-700 ${barColor(result.matchRate)}`}
                    style={{ width: `${result.matchRate}%` }} />
                </div>
                <p className="mt-3 text-sm text-[#aaa]">{result.summary}</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-xl border border-[#f0ded4] bg-white p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle size={15} className="text-green-500" />
                    <p className="text-xs font-bold text-[#312925]">Matched Keywords ({result.matched.length})</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matched.map((k) => (
                      <span key={k} className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 border border-green-100">{k}</span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-[#f0ded4] bg-white p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
                  <div className="mb-3 flex items-center gap-2">
                    <XCircle size={15} className="text-red-400" />
                    <p className="text-xs font-bold text-[#312925]">Missing Keywords — Add These ({result.missing.length})</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missing.map((k) => (
                      <span key={k} className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 border border-red-100">{k}</span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-[#9c8880]">Add these to your resume where they genuinely apply to improve your match rate.</p>
                </div>

                {result.suggestions?.length > 0 && (
                  <div className="rounded-xl border border-[#f0ded4] bg-[#fffdfb] p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
                    <div className="mb-3 flex items-center gap-2">
                      <AlertCircle size={15} className="text-[#f55d1d]" />
                      <p className="text-xs font-bold text-[#312925]">AI Suggestions</p>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {result.suggestions.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#312925]">
                          <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f55d1d]" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#ead8cf] bg-white p-16 text-center max-[768px]:hidden">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff2ec]">
                <ScanSearch size={28} className="text-[#f55d1d]" />
              </div>
              <p className="text-base font-bold text-[#312925]">Keyword analysis will appear here</p>
              <p className="text-sm text-[#9c8880]">Paste your CV and a job description to get started</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
