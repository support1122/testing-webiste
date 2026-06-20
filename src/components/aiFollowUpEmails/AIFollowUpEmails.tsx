"use client";

import { MailCheck, Clock, Sparkles, FileText, Mail, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function AIFollowUpEmailsPage() {
  const ctaLabel = "Generate Email";
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const updateCtaUrl = (basePath: string, label: string) => {
    if (typeof window === "undefined") return;
    const slug = label.trim().replace(/\s+/g, "-");
    const isCanada = window.location.pathname.startsWith("/en-ca");
    const normalizedBase = isCanada ? `/en-ca${basePath}` : basePath;
    const newUrl = `${normalizedBase}/${slug}`;
    window.history.pushState({}, "", newUrl);
    window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
  };

  return (
    <div className="bg-[#fff7f2] text-slate-900 min-h-screen">
      <main className="mt-0">
        {/* HERO - Asymmetric Layout with Soft Gradients */}
        <section className="relative overflow-hidden">
          {/* Soft background decoration */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#ff4c00]/8 via-[#ff4c00]/4 to-transparent rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#ff4c00]/6 to-transparent rounded-full translate-y-1/2 -translate-x-1/4"></div>

          <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* LEFT - Content takes 7 columns */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#ff4c00]/10 border border-[#ff4c00]/20 px-4 py-2 text-sm font-semibold text-[#ff4c00] mb-6">
                  <Sparkles className="h-4 w-4" />
                  AI Follow-Up Email Generator
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
                  AI Follow-Up Email Generator for Job
                  <span className="block text-[#ff4c00] mt-2">Applications & Interviews</span>
                </h1>

                <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
                  Don&apos;t let a recruiter&apos;s silence cost you opportunities. Instantly create
                  powerful follow-up emails after job applications and interviews in under 60 seconds.
                </p>

                <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-xl">
                  {[
                    { icon: MailCheck, text: "Write like a top candidate" },
                    { icon: Clock, text: "Eliminate tone & wording mistakes" },
                    { icon: Sparkles, text: "Improve recruiter response probability" },
                    { icon: FileText, text: "Save hours of writing effort" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-slate-200/60">
                      <div className="w-10 h-10 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-[#ff4c00]" />
                      </div>
                      <span className="text-slate-700 font-medium text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => updateCtaUrl("/ai-follow-up-email-generator", ctaLabel)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#ff4c00] px-8 py-4 text-base md:text-lg font-semibold text-white hover:bg-[#e04400] border border-[#ff4c00] hover:border-[#e04400]"
                  >
                    {ctaLabel}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <span className="text-sm text-slate-500">Free to use</span>
                </div>
              </div>

              {/* RIGHT - Preview Card takes 5 columns */}
              <div className="lg:col-span-5">
                <div className="relative">
                  {/* Decorative dots pattern */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 opacity-30">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="2" fill="#ff4c00" />
                      </pattern>
                      <rect width="100" height="100" fill="url(#dots)" />
                    </svg>
                  </div>

                  <div className="rounded-3xl border border-[#ff4c00]/20 bg-white p-6 shadow-xl shadow-[#ff4c00]/5 relative">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                      <div className="w-3 h-3 rounded-full bg-[#ff4c00]/30"></div>
                      <div className="w-3 h-3 rounded-full bg-[#ff4c00]/20"></div>
                      <div className="w-3 h-3 rounded-full bg-[#ff4c00]/10"></div>
                      <span className="ml-auto text-xs text-slate-400 font-medium">Preview</span>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-[#fff7f2] to-white border border-[#ffd6c2] p-5 space-y-3 text-sm text-slate-700">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <Mail className="h-3 w-3" />
                        <span>To: recruiter@company.com</span>
                      </div>
                      <p className="font-semibold text-slate-900 text-sm">Subject: Quick follow‑up on my application</p>
                      <div className="space-y-2 text-slate-600 leading-relaxed text-sm">
                        <p>Hi [Recruiter Name],</p>
                        <p>
                          I&apos;m writing to follow up on my application for the{" "}
                          <span className="font-semibold text-[#ff4c00]">Frontend Engineer</span> role.
                        </p>
                        <p>I remain very excited about the opportunity...</p>
                      </div>
                      <div className="pt-3 border-t border-[#ffd6c2] flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#ff4c00]/20 flex items-center justify-center">
                          <Sparkles className="h-3 w-3 text-[#ff4c00]" />
                        </div>
                        <span className="text-xs text-slate-500">Generated by Flashfire</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY FOLLOW-UPS ARE HARD - Organic Card Layout */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#ff4c00]/20 to-transparent"></div>

          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-sm font-semibold text-[#ff4c00] mb-4">
                Common Challenges
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                Why Job Seekers Struggle with Follow-Up Emails
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Writing follow-ups often feels uncomfortable and uncertain.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Questions Block */}
              <div className="lg:col-span-2 bg-gradient-to-br from-[#fffaf7] to-white rounded-3xl border border-[#ff4c00]/15 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#ff4c00]/10 flex items-center justify-center">
                    <span className="text-2xl">❓</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Common Questions</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "What should I say?",
                    "Will I sound desperate?",
                    "Is my tone professional enough?",
                    "What subject line works best?",
                    "When is the right follow-up timing?",
                    "Will I get a response?",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                      <div className="h-2 w-2 rounded-full bg-[#ff4c00] flex-shrink-0"></div>
                      <span className="text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Card */}
              <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 flex flex-col justify-center">
                <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-5">
                  <span className="text-3xl">⚠️</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Poorly written emails often lead to:</h3>
                <ul className="space-y-3">
                  {["No responses", "Weak impressions", "Missed opportunities", "Damaged credibility"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-400"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Solution Banner */}
            <div className="mt-8 bg-gradient-to-r from-[#ff4c00] to-[#ff6b35] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">Silence doesn&apos;t always mean rejection</h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Often, a simple professional follow-up can revive your job application status and get you noticed.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateCtaUrl(
                      "/ai-follow-up-email-generator",
                      "Create Your Follow-Up Email Instantly"
                    )
                  }
                  className="bg-white text-[#ff4c00] px-6 py-3.5 rounded-xl font-semibold hover:bg-[#fff7f2] whitespace-nowrap shadow-lg flex-shrink-0"
                >
                  Create Your Follow-Up Email →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* KEY BENEFITS - Masonry-style Grid */}
        <section className="bg-[#fff7f2] py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-semibold text-[#ff4c00] mb-4">
                Benefits
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Key Benefits at a Glance
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Write Perfect Emails Instantly",
                  desc: "No more second-guessing your words.",
                  icon: Sparkles,
                },
                {
                  title: "Increase Recruiter Response Rates",
                  desc: "Clear, confident messaging that stands out.",
                  icon: MailCheck,
                },
                {
                  title: "Send Error-Free Emails Every Time",
                  desc: "Eliminate grammar & tone mistakes automatically.",
                  icon: CheckCircle2,
                },
                {
                  title: "Optimize Subject Lines Automatically",
                  desc: "Smart subject line examples included.",
                  icon: FileText,
                },
                {
                  title: "Eliminate Follow-Up Anxiety",
                  desc: "AI handles tone, clarity & structure.",
                  icon: Users,
                },
                {
                  title: "Save Time After Every Application",
                  desc: "Emails generated in under 60 seconds.",
                  icon: Clock,
                },
              ].map((item, idx) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-[#ff4c00]/30 hover:shadow-lg hover:shadow-[#ff4c00]/5"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#fff7f2] border border-[#ff4c00]/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-[#ff4c00]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto text-center mt-10">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 inline-flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#ff4c00] flex-shrink-0" />
                <p className="text-slate-600">
                  Protect your professional image with every email — always maintain a polite and concise message.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TRUSTED BY - Floating Card Layout */}
        <section className="relative py-20 bg-white overflow-hidden">
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-[600px] h-[600px] bg-[#ff4c00]/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-5xl mx-auto px-4 md:px-6 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-sm font-semibold text-[#ff4c00] mb-4">
              Social Proof
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-12">
              Thousands of candidates already use our{" "}
              <span className="text-[#ff4c00]">AI follow-up email generator</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                { icon: Users, text: "Used by job seekers across industries" },
                { icon: FileText, text: "Designed for real hiring workflows" },
                { icon: Mail, text: "Built for professional recruiter communication" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#fff7f2] border border-[#ff4c00]/10 flex items-center justify-center">
                    <item.icon className="h-7 w-7 text-[#ff4c00]" />
                  </div>
                  <span className="text-slate-700 font-medium text-center">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS - Connected Timeline */}
        <section className="bg-[#fff7f2] py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-semibold text-[#ff4c00] mb-4">
                Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                How Our AI Follow-Up Email Generator Works
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Creating a powerful job application follow-up email has never been easier.
              </p>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#ff4c00] via-[#ff4c00]/30 to-transparent"></div>

              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Enter Basic Details",
                    desc: "Provide essential context:",
                    bullets: [
                      "Job title",
                      "Company name",
                      "Application date",
                      "Recruiter name (optional)",
                      "Interview stage (if applicable)",
                    ],
                    note: "This helps personalize your follow-up email after a job application.",
                    icon: FileText,
                  },
                  {
                    step: "2",
                    title: "AI Analyzes Email Context",
                    desc: "Our engine evaluates:",
                    bullets: [
                      "Hiring stage",
                      "Company communication tone",
                      "Desired messaging style",
                      "Follow-up timing relevance",
                      "Missing recruiter details",
                    ],
                    note: "Ensuring precision in every message.",
                    icon: Sparkles,
                  },
                  {
                    step: "3",
                    title: "Smart Email Generation",
                    desc: "The AI instantly creates:",
                    bullets: [
                      "Polished follow-up emails after job applications",
                      "Multiple recruiter follow-up email variations",
                      "High-impact interview follow-up email drafts",
                    ],
                    note: "All use proven follow-up email template logic.",
                    icon: MailCheck,
                  },
                  {
                    step: "4",
                    title: "Personalization & Customization",
                    desc: "Refine your message easily:",
                    bullets: [
                      "Adjust tone (formal/confident/polite)",
                      "Modify length",
                      "Add achievements",
                      "Insert a stronger call to action",
                      "Attach supporting materials",
                    ],
                    icon: Mail,
                  },
                  {
                    step: "5",
                    title: "Copy, Send, or Automate",
                    desc: "Finalize and send:",
                    bullets: [
                      "One-click copy",
                      "Email-ready formatting",
                      "Supports automated follow-up emails",
                    ],
                    note: "Generate your email in 60 seconds.",
                    icon: Clock,
                  },
                ].map((item, idx) => (
                  <div
                    key={item.step}
                    className="relative pl-16 md:pl-20"
                  >
                    {/* Step Number */}
                    <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#ff4c00] text-white flex items-center justify-center text-lg font-bold shadow-lg shadow-[#ff4c00]/20 border-4 border-[#fff7f2]">
                      {item.step}
                    </div>

                    {/* Content Card */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#fff7f2] border border-[#ff4c00]/10 flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-[#ff4c00]" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                      </div>
                      <p className="text-base text-slate-600 mb-4">{item.desc}</p>
                      {item.bullets && (
                        <div className="grid md:grid-cols-2 gap-3 mb-4">
                          {item.bullets.map((bullet) => (
                            <div key={bullet} className="flex items-center gap-2 bg-[#fff7f2] rounded-lg px-3 py-2.5 border border-[#ff4c00]/10">
                              <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#ff4c00]"></div>
                              <span className="text-sm text-slate-700">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {item.note && (
                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff4c00] bg-[#fff7f2] px-4 py-2 rounded-lg border border-[#ff4c00]/10">
                          <Sparkles className="h-4 w-4" />
                          {item.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BUILT-IN INTELLIGENCE - Feature Grid with Icons */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-sm font-semibold text-[#ff4c00] mb-4">
                Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Built-In Email Intelligence
              </h2>
              <p className="mt-4 text-base text-slate-600">
                Every email is backed by smart logic designed for recruiter communication.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Smart Template Selection",
                  desc: "Automatic follow-up email template selection based on stage and context.",
                },
                {
                  title: "Optimized Subject Lines",
                  desc: "Subject line examples designed for opens and replies.",
                },
                {
                  title: "Job-Stage Specific Messaging",
                  desc: "Messaging tailored for post-application, recruiter, and interview follow-ups.",
                },
                {
                  title: "Recruiter Communication Optimization",
                  desc: "Lines crafted to respect time, show interest, and stay concise.",
                },
                {
                  title: "Interview Follow-Up Focus",
                  desc: "Precision interview follow-up email generation for stronger impressions.",
                },

                {
                  title: "ATS-Friendly Email Formatting",
                  desc: "Follow-up emails structured for clarity, readability, and professional impact.",
                },
              ].map((item, idx) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#fffaf7] to-white p-6 hover:border-[#ff4c00]/20 hover:shadow-lg hover:shadow-[#ff4c00]/5">
                  <div className="w-12 h-12 rounded-xl bg-[#ff4c00]/10 border border-[#ff4c00]/20 flex items-center justify-center mb-4">
                    <span className="text-[#ff4c00] font-bold text-lg">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KEY FEATURES - Compact Card Grid */}
        <section className="bg-[#fff7f2] py-20">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-semibold text-[#ff4c00] mb-4">
                Capabilities
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Key Features Designed for Maximum Response
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "AI-Powered Follow-Up Email Templates", desc: "Professionally structured emails generated instantly." },
                { title: "Smart Subject Line Optimization", desc: "High-engagement wording that gets opened." },
                { title: "Job-Stage Specific Emails", desc: "Generate emails for applications, recruiters, hiring managers, and interviews." },
                { title: "Automated Follow-Up Scheduling", desc: "Supports intelligent automated follow-up emails." },
                { title: "Tone & Professionalism Control", desc: "Always maintain a professional, confident follow-up voice." },
                { title: "Grammar & Clarity Checks", desc: "Error-free emails without manual proofreading." },
                { title: "Multiple Variations", desc: "Test different versions to see what works best." },
                { title: "Under 60 Seconds", desc: "Generate complete emails in less than a minute." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md hover:shadow-slate-200/50"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center mb-3">
                    <CheckCircle2 className="h-4 w-4 text-[#ff4c00]" />
                  </div>
                  <h3 className="text-base font-semibold mb-2 text-slate-900 leading-tight">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE - Modern Card Style */}
        <section className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-sm font-semibold text-[#ff4c00] mb-4">
                Comparison
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                AI Follow-Up Email Generator vs Writing Manually
              </h2>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
              <table className="w-full text-base">
                <thead>
                  <tr className="bg-gradient-to-r from-[#fff7f2] to-[#fff0e6]">
                    <th className="px-6 py-5 font-semibold text-slate-900 text-left">Feature</th>
                    <th className="px-6 py-5 font-semibold text-[#ff4c00] text-left">AI Follow-Up Email Generator</th>
                    <th className="px-6 py-5 font-semibold text-slate-500 text-left">Manual Writing</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Time Required", ai: "Under 1 minute", manual: "15–30 minutes" },
                    { feature: "Personalization", ai: "AI-optimized", manual: "Depends on skill" },
                    { feature: "Subject Line", ai: "Optimized automatically", manual: "Trial & error" },
                    { feature: "Tone", ai: "Professionally balanced", manual: "May sound unsure" },
                    { feature: "Job-Specific Customization", ai: "Dynamic", manual: "Generic" },
                    { feature: "Automation", ai: "Supports automated follow-up emails", manual: "Not available" },
                    { feature: "Error-Free", ai: "Built-in checks", manual: "Manual proofreading" },
                  ].map((row, idx) => (
                    <tr key={row.feature} className={idx % 2 === 0 ? "bg-white" : "bg-[#fffaf7]/50"}>
                      <td className="px-6 py-4 font-medium text-slate-700">{row.feature}</td>
                      <td className="px-6 py-4 text-slate-700">
                        <span className="inline-flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="h-3 w-3 text-[#ff4c00]" />
                          </div>
                          {row.ai}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{row.manual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-center text-base text-slate-600">
              Modern job search requires smarter communication tools.
            </p>
          </div>
        </section>

        {/* WHO CAN USE THIS - Tag Cloud Style */}
        <section className="bg-[#fff7f2] py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-semibold text-[#ff4c00] mb-4">
                Audience
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Who Can Use This AI Follow-Up Email Generator?
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Fresh graduates",
                "Entry-level professionals",
                "Mid-career professionals",
                "Career switchers",
                "Freelancers & remote job seekers",
                "Professionals applying to multiple roles",
                "Candidates checking job application status",
                "Anyone sending a recruiter follow-up email",
                "Interview candidates crafting an interview follow-up email",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 text-slate-700 font-medium shadow-sm hover:border-[#ff4c00]/30 hover:shadow-md"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA - Two Column with Feature List */}
        <section className="relative py-20 bg-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff4c00]/20 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#ff4c00]/5 rounded-full blur-3xl"></div>

          <div className="relative max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* LEFT CONTENT */}
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-sm font-semibold text-[#ff4c00] mb-4">
                  Get Started
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                  Write Smarter Follow-Up Emails with AI
                </h2>

                <p className="text-lg text-slate-600 mb-4">
                  Don&apos;t let your application get buried. Don&apos;t let recruiters forget your profile.
                </p>

                <p className="text-slate-500 mb-8">
                  With our AI follow-up email generator, you can create professional emails instantly.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    updateCtaUrl(
                      "/ai-follow-up-email-generator",
                      "Generate Email"
                    )
                  }
                  className="bg-[#ff4c00] text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-[#ff4c00]/20 hover:shadow-xl hover:shadow-[#ff4c00]/30"
                >
                  Generate Email
                </button>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-[#ff4c00]" /> Instant generation
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-[#ff4c00]" /> No writing skills required
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-[#ff4c00]" /> Secure & private
                  </span>
                </div>
              </div>

              {/* RIGHT FEATURE PANEL */}
              <div className="bg-gradient-to-br from-[#fffaf7] to-white rounded-3xl border border-[#ff4c00]/15 p-8 shadow-xl shadow-[#ff4c00]/5">
                <div className="space-y-5">
                  {[
                    "Create professional emails instantly",
                    "Improve response probability",
                    "Save hours of writing",
                  ].map((text, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#ff4c00]/20 to-[#ff4c00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-[#ff4c00]" />
                      </div>
                      <p className="font-semibold text-slate-900 text-lg">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION - Clean Accordion */}
        <section className="ff-faq-section">
          <div className="ff-faq-shell">
            <div className="ff-faq-header">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-sm font-semibold text-[#ff4c00] mb-4">
                FAQ
              </span>
              <h2>
                Frequently Asked Questions
              </h2>
            </div>

            <div className="ff-faq-list">
              {[
                {
                  q: "When should I send a follow-up email?",
                  a: "For applications: 5–7 business days after applying. For interviews: within 24–48 hours. Flashfire suggests optimal timing based on the stage and your application date.",
                },
                {
                  q: "Will follow-ups make me look desperate?",
                  a: "Not if done right. Flashfire crafts professional, confident emails that show genuine interest without being pushy. Timing and tone matter.",
                },
                {
                  q: "Can I customize the generated emails?",
                  a: "Absolutely. Use Flashfire&apos;s templates as a starting point, then personalize with specific details about your conversation or the role.",
                },
                {
                  q: "What if I don't hear back after following up?",
                  a: "One follow-up is usually enough. If there&apos;s no response after 7–10 days, it&apos;s likely the role has moved forward. Flashfire helps you move on strategically.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`ff-faq-item ${
                    activeFaqIndex === i ? "is-active" : ""
                  }`}
                >
                  <button
                    className="ff-faq-question"
                    onClick={() => setActiveFaqIndex(activeFaqIndex === i ? null : i)}
                  >
                    <span className="ff-faq-question-text">
                      {item.q}
                    </span>
                    <span className="ff-faq-icon">
                      {activeFaqIndex === i ? <FaTimes /> : <FaPlus />}
                    </span>
                  </button>
                  {activeFaqIndex === i && (
                    <div className="ff-faq-answer">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
