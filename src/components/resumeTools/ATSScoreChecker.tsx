"use client";

import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, RotateCcw, Sparkles } from "lucide-react";

type ScoreCategory = { label: string; score: number; maxScore: number; tip: string };
type ATSResult = {
  overallScore: number;
  grade: string;
  summary: string;
  categories: ScoreCategory[];
  foundKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
};

async function extractTextFromPdf(arrayBuffer: ArrayBuffer): Promise<string> {
  await new Promise<void>((resolve, reject) => {
    if ((window as unknown as Record<string, unknown>).pdfjsLib) { resolve(); return; }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfjsLib = (window as any).pdfjsLib;
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += (content.items as { str: string }[]).map((item) => item.str).join(" ") + "\n";
  }
  return text;
}

export default function ATSScoreChecker() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyze = async (text: string) => {
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const res = await fetch("/api/ats-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: text }),
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

  const handleFile = async (f: File) => {
    setFile(f);
    setError("");
    try {
      let text = "";
      if (f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")) {
        const ab = await f.arrayBuffer();
        text = await extractTextFromPdf(ab);
      } else {
        text = await f.text();
      }
      if (!text.trim()) throw new Error("Could not read resume text");
      await analyze(text);
    } catch (e) {
      setLoading(false);
      setError("Could not read the file. Please try a .txt or .docx instead.");
      console.error(e);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const gradeColor = (grade: string) =>
    grade === "A" ? "text-green-400" :
    grade === "B" ? "text-blue-400" :
    grade === "C" ? "text-yellow-400" : "text-red-400";

  const scoreBarColor = (pct: number) =>
    pct >= 80 ? "bg-green-500" : pct >= 55 ? "bg-orange-400" : "bg-red-400";

  return (
    <main className="min-h-screen bg-[#fff8f4]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 max-[768px]:py-8 max-[480px]:px-4">

        {/* Hero */}
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f0ded4] bg-white px-3 py-1 text-sm font-medium text-[#f55d1d]">
            <Sparkles size={14} /> AI-Powered ATS Checker
          </span>
          <h1 className="text-4xl font-black leading-tight text-[#0b0b0b] max-[480px]:text-3xl">
            ATS Score Checker
          </h1>
          <p className="text-base text-[#6c5c54]">
            Upload your resume and our AI instantly scores it against ATS criteria — keywords, formatting, action verbs, and achievements. Get a real score in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Upload Panel */}
          <div className="flex flex-col gap-6">
            <div
              className={`relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-12 transition-all cursor-pointer max-[480px]:p-8 ${
                dragging ? "border-[#f55d1d] bg-[#fff2ec]" : "border-[#ead8cf] bg-white hover:border-[#f55d1d] hover:bg-[#fffaf7]"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => !loading && fileInputRef.current?.click()}
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-full transition-colors ${dragging ? "bg-[#f55d1d]" : "bg-[#fff2ec]"}`}>
                <Upload size={28} className={dragging ? "text-white" : "text-[#f55d1d]"} />
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-[#312925]">
                  {file ? file.name : dragging ? "Drop it here!" : "Drop your resume here"}
                </p>
                <p className="mt-1 text-sm text-[#6c5c54]">
                  {file ? `${(file.size / 1024).toFixed(1)} KB` : "PDF, TXT, DOC — or click to browse"}
                </p>
              </div>
              {file && !loading && (
                <button onClick={(e) => { e.stopPropagation(); handleReset(); }}
                  className="flex items-center gap-2 rounded-full border border-[#ead8cf] bg-[#fff8f4] px-4 py-2 text-xs font-medium text-[#6c5c54] hover:bg-[#fff2ec] transition">
                  <RotateCcw size={12} /> Upload different file
                </button>
              )}
              {!file && (
                <span className="rounded-full bg-[#fff2ec] px-5 py-2 text-sm font-bold text-[#f55d1d]">Choose File →</span>
              )}
              <input ref={fileInputRef} type="file" accept=".txt,.pdf,.doc,.docx" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            </div>

            {/* How it works card */}
            <div className="rounded-2xl border border-[#f0ded4] bg-white p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
              <p className="text-xs font-bold text-[#312925] mb-3 uppercase tracking-wider">What we check</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Contact info — email, phone, LinkedIn",
                  "Formatting — sections, bullets, length",
                  "Keywords — technical skills & tools",
                  "Action verbs — strong opening words",
                  "Achievements — numbers & quantified results",
                ].map(tip => (
                  <li key={tip} className="flex items-start gap-2 text-xs text-[#6c5c54]">
                    <CheckCircle size={12} className="text-[#f55d1d] shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {error && (
              <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
                <AlertCircle size={16} /> {error}
              </div>
            )}
          </div>

          {/* Results Panel */}
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-[#f0ded4] bg-white p-16 text-center">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#ead8cf] border-t-[#f55d1d]" />
              <div>
                <p className="text-base font-bold text-[#312925]">AI is analyzing your resume…</p>
                <p className="text-sm text-[#9c8880] mt-1">This takes about 5–10 seconds</p>
              </div>
            </div>
          ) : result ? (
            <div className="flex flex-col gap-5">

              {/* Score hero */}
              <div className="rounded-2xl bg-[#101114] p-8 text-white">
                <p className="text-sm font-medium text-[#aaa]">ATS Score</p>
                <div className="mt-2 flex items-end gap-4">
                  <span className="text-7xl font-black leading-none">{result.overallScore}</span>
                  <span className="mb-2 text-2xl font-bold text-[#aaa]">/100</span>
                  <span className={`mb-2 text-4xl font-black ${gradeColor(result.grade)}`}>{result.grade}</span>
                </div>
                <div className="mt-4 h-2.5 w-full rounded-full bg-[#2a2a2a]">
                  <div className={`h-2.5 rounded-full transition-all duration-700 ${scoreBarColor(result.overallScore)}`}
                    style={{ width: `${result.overallScore}%` }} />
                </div>
                <p className="mt-3 text-sm text-[#aaa]">{result.summary}</p>
              </div>

              {/* Score breakdown */}
              <div className="rounded-xl border border-[#f0ded4] bg-white p-6 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
                <p className="mb-4 text-sm font-bold text-[#312925]">Score Breakdown</p>
                <div className="flex flex-col gap-3">
                  {result.categories.map((cat) => {
                    const pct = Math.round((cat.score / cat.maxScore) * 100);
                    return (
                      <div key={cat.label}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="font-medium text-[#312925]">{cat.label}</span>
                          <span className="text-[#6c5c54]">{cat.score}/{cat.maxScore}</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-[#f0ded4]">
                          <div className={`h-2 rounded-full transition-all duration-500 ${scoreBarColor(pct)}`}
                            style={{ width: `${pct}%` }} />
                        </div>
                        <p className="mt-0.5 text-[11px] text-[#9c8880]">{cat.tip}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Keywords */}
              <div className="grid grid-cols-2 gap-4 max-[480px]:grid-cols-1">
                <div className="rounded-xl border border-[#f0ded4] bg-white p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle size={15} className="text-green-500" />
                    <p className="text-xs font-bold text-[#312925]">Found Keywords</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.foundKeywords?.length > 0
                      ? result.foundKeywords.map((k) => (
                          <span key={k} className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 border border-green-100">{k}</span>
                        ))
                      : <p className="text-xs text-[#9c8880]">None detected</p>
                    }
                  </div>
                </div>
                <div className="rounded-xl border border-[#f0ded4] bg-white p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
                  <div className="mb-3 flex items-center gap-2">
                    <XCircle size={15} className="text-red-400" />
                    <p className="text-xs font-bold text-[#312925]">Missing Keywords</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords?.map((k) => (
                      <span key={k} className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 border border-red-100">{k}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              {result.suggestions?.length > 0 && (
                <div className="rounded-xl border border-[#f0ded4] bg-[#fffdfb] p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
                  <div className="mb-3 flex items-center gap-2">
                    <AlertCircle size={15} className="text-[#f55d1d]" />
                    <p className="text-xs font-bold text-[#312925]">AI Suggestions to Improve</p>
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
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#ead8cf] bg-white p-16 text-center max-[768px]:hidden">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff2ec]">
                <FileText size={28} className="text-[#f55d1d]" />
              </div>
              <p className="text-base font-bold text-[#312925]">Your ATS score will appear here</p>
              <p className="text-sm text-[#9c8880]">Upload your resume to get an AI-powered score</p>
            </div>
          )}
        </div>

        {/* Info banner */}
        <div className="rounded-xl border border-[#f0ded4] bg-white p-6 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
          <p className="text-sm font-bold text-[#312925] mb-2">How ATS scoring works</p>
          <p className="text-sm text-[#6c5c54]">
            Applicant Tracking Systems scan resumes for keywords, formatting, and structure before a human ever sees them. Our AI evaluates your contact info, section clarity, keyword density, use of action verbs, and quantified achievements — the five factors most correlated with ATS pass rates.
          </p>
        </div>

      </div>
    </main>
  );
}
