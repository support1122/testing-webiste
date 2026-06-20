"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, FileText, RotateCcw, ChevronLeft, ChevronRight, Zap, Shield, Eye, CheckCircle } from "lucide-react";

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
  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = (content.items as { str: string }[]).map((item) => item.str).join(" ");
    fullText += pageText + "\n";
  }
  return fullText;
}

// ── PDF Viewer ────────────────────────────────────────────────────────────────
function PdfViewer({ file }: { file: File }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfDoc, setPdfDoc] = useState<unknown>(null);
  const [rendering, setRendering] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setRendering(true);
    (async () => {
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
      const ab = await file.arrayBuffer();
      const doc = await pdfjsLib.getDocument({ data: new Uint8Array(ab) }).promise;
      if (cancelled) return;
      setPdfDoc(doc);
      setNumPages(doc.numPages);
      setCurrentPage(1);
    })();
    return () => { cancelled = true; };
  }, [file]);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    let cancelled = false;
    (async () => {
      setRendering(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const page = await (pdfDoc as any).getPage(currentPage);
      if (cancelled) return;
      const canvas = canvasRef.current!;
      const containerWidth = canvas.parentElement?.clientWidth || 600;
      const viewport = page.getViewport({ scale: 1 });
      const scale = (containerWidth - 2) / viewport.width;
      const scaledViewport = page.getViewport({ scale });
      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;
      const ctx = canvas.getContext("2d")!;
      await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;
      if (!cancelled) setRendering(false);
    })();
    return () => { cancelled = true; };
  }, [pdfDoc, currentPage]);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        {rendering && (
          <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ead8cf] border-t-[#f55d1d]" />
              <span className="text-xs text-[#9c8880]">Rendering PDF…</span>
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className="w-full rounded-lg border border-[#ead8cf] bg-white shadow-sm" />
      </div>
      {numPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ead8cf] bg-white text-[#6c5c54] hover:bg-[#fff2ec] disabled:opacity-40 transition">
            <ChevronLeft size={14} />
          </button>
          <span className="text-xs font-medium text-[#6c5c54]">Page {currentPage} of {numPages}</span>
          <button onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))} disabled={currentPage === numPages}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ead8cf] bg-white text-[#6c5c54] hover:bg-[#fff2ec] disabled:opacity-40 transition">
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

const FEATURES = [
  { icon: Zap, title: "Instant Preview", desc: "See your PDF rendered exactly as recruiters see it — page by page." },
  { icon: Shield, title: "100% Private", desc: "Everything runs in your browser. Your resume never leaves your device." },
  { icon: Eye, title: "ATS View", desc: "Understand how an ATS system reads and processes your resume file." },
  { icon: CheckCircle, title: "Any PDF Format", desc: "Works with all PDF resumes — single or multi-page, any layout." },
];

export default function ResumeParser() {
  const [file, setFile] = useState<File | null>(null);
  const [isPdf, setIsPdf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    const pdf = f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
    setIsPdf(pdf);
    if (pdf) { setLoading(true); setTimeout(() => setLoading(false), 400); }
  };

  const handleReset = () => {
    setFile(null); setIsPdf(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  return (
    <main className="min-h-screen bg-[#fff8f4]">

      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col gap-10 max-[480px]:px-4">

        {/* ── Always-visible side-by-side layout ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* LEFT: Upload */}
          <div className="flex flex-col gap-4">
            <div
              className={`relative flex flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dashed bg-white p-12 text-center transition-all cursor-pointer max-[480px]:p-8 ${dragOver ? "border-[#f55d1d] bg-[#fffaf7]" : "border-[#ead8cf] hover:border-[#f55d1d] hover:bg-[#fffaf7]"}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-full transition-colors ${dragOver ? "bg-[#f55d1d]" : "bg-[#fff2ec]"}`}>
                <Upload size={28} className={dragOver ? "text-white" : "text-[#f55d1d]"} />
              </div>
              <div>
                <p className="text-lg font-black text-[#0b0b0b]">
                  {file ? file.name : dragOver ? "Drop it here!" : "Drop your resume here"}
                </p>
                <p className="mt-1 text-sm text-[#6c5c54]">or click to browse — PDF, DOC, TXT</p>
              </div>
              {file ? (
                <button onClick={(e) => { e.stopPropagation(); handleReset(); }}
                  className="flex items-center gap-2 rounded-full border border-[#ead8cf] bg-[#fff8f4] px-4 py-2 text-xs font-medium text-[#6c5c54] hover:bg-[#fff2ec] transition">
                  <RotateCcw size={12} /> Upload different file
                </button>
              ) : (
                <span className="rounded-full bg-[#fff2ec] px-5 py-2 text-sm font-bold text-[#f55d1d]">Choose File →</span>
              )}
              <input ref={fileInputRef} type="file" accept=".txt,.pdf,.doc,.docx" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            </div>

            {/* Tips card — always visible */}
            <div className="rounded-2xl border border-[#f0ded4] bg-white p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
              <p className="text-xs font-bold text-[#312925] mb-3 uppercase tracking-wider">What to check in your resume</p>
              <ul className="flex flex-col gap-2.5">
                {["Is your name clearly readable at the top?","Are email and phone easy to find?","Does the layout look clean and ATS-friendly?","Are section headings bold and visible?","Is the font size readable (11–12pt)?","No tables or graphics that ATS can't read?"].map(tip => (
                  <li key={tip} className="flex items-start gap-2 text-xs text-[#6c5c54]">
                    <CheckCircle size={12} className="text-[#f55d1d] shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: PDF Viewer or placeholder */}
          <div className="rounded-2xl border border-[#f0ded4] bg-white p-6 shadow-[0_18px_60px_rgba(245,93,29,0.08)] min-h-[500px]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-[#312925]">Resume Preview</p>
              {isPdf && <span className="rounded-full bg-green-50 border border-green-100 px-3 py-1 text-xs font-medium text-green-700">Live Preview</span>}
            </div>
            {isPdf && file ? (
              loading ? (
                <div className="flex flex-col items-center justify-center gap-4 py-24">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#ead8cf] border-t-[#f55d1d]" />
                  <span className="text-sm text-[#9c8880]">Loading PDF…</span>
                </div>
              ) : (
                <PdfViewer file={file} />
              )
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 h-full min-h-[400px] text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#fff2ec]">
                  <FileText size={32} className="text-[#f55d1d]" />
                </div>
                <p className="text-base font-bold text-[#312925]">Your resume will appear here</p>
                <p className="text-sm text-[#9c8880]">Upload a PDF to see a live preview</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Features grid ── */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 max-[480px]:grid-cols-1">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-[#f0ded4] bg-white p-5 shadow-[0_18px_60px_rgba(245,93,29,0.08)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff2ec] mb-3">
                <Icon size={18} className="text-[#f55d1d]" />
              </div>
              <p className="text-sm font-bold text-[#312925] mb-1">{title}</p>
              <p className="text-xs text-[#6c5c54] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* ── How it works ── */}
        <div className="rounded-3xl bg-[#0b0b0b] px-10 py-10 max-[480px]:px-6">
          <p className="text-lg font-black text-white mb-6">How it works</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { step: "01", title: "Upload your PDF", desc: "Click or drag-and-drop your resume PDF onto the upload area above." },
              { step: "02", title: "Instant render", desc: "We render your PDF directly in the browser — no server upload, no waiting." },
              { step: "03", title: "Review your resume", desc: "See exactly how your resume looks to recruiters and ATS systems." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col gap-2">
                <span className="text-4xl font-black text-[#f55d1d] leading-none">{step}</span>
                <p className="text-sm font-bold text-white">{title}</p>
                <p className="text-xs text-white/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
