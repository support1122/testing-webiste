"use client";

// This is an SEO-focused landing page variant of the resume parser
// with additional context about "resume parser software" — same tool, richer content
import ResumeParser from "./ResumeParser";
import { ShieldCheck, Zap, Globe, Lock } from "lucide-react";

const features = [
  { icon: Zap, title: "Instant Extraction", body: "Parse contact details, work history, education, and skills in under a second." },
  { icon: ShieldCheck, title: "Privacy First", body: "Your resume is processed entirely in your browser. We never store or share your data." },
  { icon: Globe, title: "Any Format", body: "Supports plain text, TXT files, and copy-pasted resume content." },
  { icon: Lock, title: "No Sign-Up Needed", body: "Free forever. No account required to parse your resume." },
];

export default function ResumeParserSoftware() {
  return (
    <>
      {/* SEO intro content — above the tool */}
      <section className="w-full bg-white border-b border-[#f0ded4]">
        <div className="mx-auto max-w-7xl px-6 pt-14 pb-10 max-[768px]:pt-14 max-[480px]:pt-14 max-[480px]:px-4">
          <h2 className="text-4xl font-black text-[#0b0b0b] mb-4 max-[768px]:text-3xl max-[480px]:text-2xl">What is Resume Parser Software?</h2>
          <p className="text-base text-[#6c5c54] max-w-3xl mb-10 leading-relaxed">
            Resume parser software automatically extracts structured data from resumes — names, contact details, skills, work experience, and education. Recruiters use parsing software to process hundreds of CVs quickly. Candidates use it to see exactly what an ATS (Applicant Tracking System) reads from their resume.
          </p>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 max-[480px]:grid-cols-1">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-[#f0ded4] bg-[#fff8f4] p-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff2ec]">
                  <Icon size={18} className="text-[#f55d1d]" />
                </div>
                <p className="text-sm font-bold text-[#312925] mb-1">{title}</p>
                <p className="text-xs text-[#6c5c54] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ResumeParser />
    </>
  );
}
