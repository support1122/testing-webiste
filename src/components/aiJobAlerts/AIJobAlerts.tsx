"use client";
import {
  Sparkles, ArrowRight, CheckCircle, X, Check, BellRing
} from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";

const updateCtaUrl = (basePath: string, label: string) => {
  if (typeof window === "undefined") return;
  const slug = label.trim().replace(/\s+/g, "-");
  const isCanada = window.location.pathname.startsWith("/en-ca");
  const normalizedBase = isCanada ? `/en-ca${basePath}` : basePath;
  const newUrl = `${normalizedBase}/${slug}`;
  window.history.pushState({}, "", newUrl);
  window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
};

export default function AIJobAlertsPage() {
  const ctaLabel = "Get Started";
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#fff7f2] text-slate-900 min-h-screen font-sans">
      <main className="mt-0">
        {/* Hero Section - Modern Glassmorphism Card */}
        <section className="min-h-screen flex items-center bg-gradient-to-br from-[#fff0e6] via-[#fff7f2] to-[#ffede6] relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#ff4c00]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#ff4c00]/5 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* LEFT - Content */}
              <div className="space-y-8 max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#ff4c00]/20 text-[#ff4c00] font-semibold text-sm shadow-sm">
                  <Sparkles size={16} />
                  AI Job Alerts & Smart Job Notification App
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
                  Stop refreshing job boards and{" "}
                  <span className="text-[#ff4c00]">missing opportunities</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                  With our AI job alerts, you receive instant job alerts the moment relevant roles are posted — allowing you to apply before most candidates even see the listing.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Discover jobs faster",
                    "Apply earlier than competitors",
                    "Eliminate irrelevant alerts",
                    "Reduce job search stress",
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-[#ff4c00]/10">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff4c00]/10 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-[#ff4c00]" />
                      </div>
                      <span className="text-sm text-slate-700 font-medium">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => updateCtaUrl("/ai-job-alerts", ctaLabel)}
                    className="inline-flex items-center justify-center rounded-xl bg-[#ff4c00] px-8 py-4 text-base font-semibold text-white hover:bg-[#e04400] transition-colors duration-200 shadow-lg shadow-[#ff4c00]/20"
                  >
                    {ctaLabel}
                    <ArrowRight size={18} className="ml-2" />
                  </button>
                </div>
              </div>

              {/* RIGHT - Modern Glassmorphism Card */}
              <div className="relative lg:pl-8">
                <div className="relative rounded-3xl border border-white/50 bg-white/70 backdrop-blur-xl p-8 shadow-2xl shadow-[#ff4c00]/10">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff4c00] to-[#ff6b35] flex items-center justify-center shadow-lg">
                        <BellRing className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 uppercase tracking-wide">Live Job Alerts</p>
                        <p className="text-xs text-slate-500">Real-time notifications</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      Live
                    </div>
                  </div>

                  {/* Job Cards */}
                  <div className="space-y-4">
                    {[
                      { role: "Frontend Engineer — React", score: "94%", time: "2m ago", tags: ["Remote", "Senior"] },
                      { role: "Software Intern — Remote", score: "89%", time: "5m ago", tags: ["Entry"] },
                      { role: "Product Manager — AI Team", score: "96%", time: "12m ago", tags: ["Hybrid", "Lead"] },
                    ].map((job, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-gradient-to-r from-white to-[#fff7f2] border border-[#ffd6c2]/50 hover:border-[#ff4c00]/30 transition-colors duration-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-bold text-slate-800">{job.role}</p>
                          <span className="text-xs font-bold text-[#ff4c00] bg-[#ff4c00]/10 px-2 py-1 rounded-full">NEW</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          {job.tags.map((tag) => (
                            <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[#ff4c00]">Match: {job.score}</span>
                          <span className="text-xs text-slate-400">{job.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stats Footer */}
                  <div className="mt-6 pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-xl bg-[#fff7f2]">
                      <p className="text-2xl font-bold text-slate-900">2.4k</p>
                      <p className="text-xs text-slate-500 mt-1">Jobs Today</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#fff7f2]">
                      <p className="text-2xl font-bold text-[#ff4c00]">98%</p>
                      <p className="text-xs text-slate-500 mt-1">Match Rate</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#fff7f2]">
                      <p className="text-2xl font-bold text-slate-900">&lt;3s</p>
                      <p className="text-xs text-slate-500 mt-1">Alert Speed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section - Modern Cards */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] text-sm font-semibold mb-4">The Problem</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                Why Job Seekers Struggle with <span className="text-[#ff4c00]">Traditional Job Alerts</span>
              </h2>
              <p className="text-lg text-slate-600 mt-4">
                Most job alert systems are slow, generic, and overloaded with irrelevant listings.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
              {/* Pain Points */}
              <div className="space-y-4">
                <p className="text-lg text-slate-700 font-semibold mb-4">This leads to:</p>
                <div className="grid gap-3">
                  {[
                    "Delayed notifications",
                    "Spam job emails",
                    "Missed high-fit roles",
                    "Endless filtering",
                    "Application burnout",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-4 p-4 rounded-xl bg-red-50/80 border border-red-100 hover:border-red-200 transition-colors duration-200">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <X className="h-4 w-4 text-red-500" />
                      </div>
                      <span className="text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solution Cards */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#fff7f2] to-[#ffede6] border-l-4 border-[#ff4c00] mt-13  p-6 rounded-2xl shadow-sm">
                  <p className="text-lg font-bold text-slate-900 mb-3">
                    Tired of refreshing LinkedIn every hour?
                  </p>
                  <p className="text-slate-700 mb-2">
                    Frustrated to see "500+ applicants" have already applied?
                  </p>
                  <p className="text-slate-500 text-sm">
                    By the time traditional alerts arrive, the opportunity may already be saturated.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[#ff4c00] to-[#ff6b35] rounded-2xl p-6 text-white shadow-lg shadow-[#ff4c00]/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-bold text-lg">The Solution</p>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Our AI job alerts platform solves this using real-time job updates and intelligent filtering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section - Bento Grid Style */}
        <section className="bg-[#fff7f2] py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-[#ff4c00] text-sm font-semibold mb-4">Benefits</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                Key Benefits <span className="text-[#ff4c00]">at a Glance</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Apply Before the Crowd", desc: "Receive opportunities within seconds and be the first to apply." },
                { title: "Never Miss Relevant Jobs", desc: "Precision-based matching engine finds your perfect roles." },
                { title: "Eliminate Irrelevant Listings", desc: "AI-driven filtering logic removes spam and noise." },
                { title: "Reduce Weekly Job Search Time", desc: "Automation replaces manual browsing and scrolling." },
                { title: "Avoid Application Fatigue", desc: "Apply only to high-fit roles that match your skills." },
                { title: "Smarter Career Discovery", desc: "Powered by AI-powered career alerts and insights." },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#ff4c00]/30 hover:shadow-xl hover:shadow-[#ff4c00]/5 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#ff4c00]/10 flex items-center justify-center mb-4 group-hover:bg-[#ff4c00]/20 transition-colors">
                    <CheckCircle className="w-6 h-6 text-[#ff4c00]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#ff4c00] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works - Modern Timeline */}
        <section className="relative bg-white py-28 overflow-hidden">

  {/* subtle background glow */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-[#ff4c00]/5 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#ff4c00]/5 rounded-full blur-3xl"></div>

  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

    {/* Heading */}
    <div className="text-center max-w-2xl mx-auto mb-20">
      <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] text-sm font-semibold mb-4">
        How It Works
      </span>

      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
        How Our <span className="text-[#ff4c00]">AI Job Alerts System Works</span>
      </h2>

      <p className="text-slate-600 text-lg">
        Setting up your alerts takes less than 2 minutes.
      </p>
    </div>

    <div className="relative">

      {/* vertical timeline */}
      <div className="hidden md:block absolute left-7 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ff4c00] via-[#ff4c00]/40 to-transparent"></div>

      <div className="space-y-10">

        {[
          { step: "1", title: "Create Your Career Profile", desc: "Enter your skills, experience, preferred roles, and location preferences." },
          { step: "2", title: "AI Analyzes Your Profile", desc: "Our engine uses intelligent AI job matching to understand your expertise, career direction, and role suitability." },
          { step: "3", title: "Smart Matching Algorithm Filters Jobs", desc: "Applies skills-based filtering, experience alignment, location relevance, and context-aware matching." },
          { step: "4", title: "Receive Instant Job Alerts", desc: "Jobs are delivered via app notifications, email alerts, and SMS alerts (optional) within seconds." },
          { step: "5", title: "Apply Immediately", desc: "Apply before listings get crowded, increase interview probability, and reduce missed opportunities." },
        ].map((item) => (

          <div
            key={item.step}
            className="group relative flex items-start gap-6"
          >

            {/* Step circle */}
            <div className="
              relative z-10
              flex-shrink-0
              w-14 h-14
              rounded-2xl
              bg-gradient-to-br from-[#ff4c00] to-[#ff6b35]
              text-white
              flex items-center justify-center
              text-lg font-bold
              shadow-[0_10px_25px_rgba(255,76,0,0.25)]
              group-hover:scale-105
              transition
            ">
              {item.step}
            </div>

            {/* Card */}
            <div className="
              flex-1
              bg-white
              border border-slate-200
              rounded-2xl
              p-6
              shadow-sm
              hover:shadow-xl
              hover:border-[#ff4c00]/30
              transition-all duration-300
            ">

              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#ff4c00] transition">
                {item.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>

            </div>
          </div>
        ))}

      </div>
    </div>
  </div>
</section>

        {/* Features Section - Grid with Icons */}
        <section className="bg-[#fff7f2] py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-[#ff4c00] text-sm font-semibold mb-4">Features</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                Key Features of Our <span className="text-[#ff4c00]">AI-Powered Job Notification App</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Real-Time AI Job Alerts",
                "Smart Job Matching Algorithm",
                "Instant Job Alerts Within Seconds",
                "Personalized Job Recommendations",
                "Advanced Filtering Controls",
                "Multi-Channel Notification Support",
                "Save Jobs & Track Applications",
                "One-Click Apply Integration",
                "Dashboard to Manage Alerts",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-[#ff4c00]/30 hover:shadow-md transition-all duration-200 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#ff4c00]/20 transition-colors">
                    <Check className="w-5 h-5 text-[#ff4c00]" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#ff4c00] transition-colors">
                    {feature}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table - Modern Cards */}
        <section className="bg-white py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] text-sm font-semibold mb-4">Comparison</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                AI Job Alerts vs <span className="text-[#ff4c00]">Traditional Job Alerts</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Traditional */}
              <div className="bg-white rounded-3xl p-8 border-2 border-red-100 hover:border-red-200 transition-colors duration-200">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-red-100">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                    <X className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Traditional Job Alerts
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Generic email blasts",
                    "Delayed notifications",
                    "Manual filtering required",
                    "Limited customization",
                    "High irrelevant listings",
                    "Static filters",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-slate-600">
                      <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                        <X className="h-3 w-3 text-red-500" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Job Alerts */}
              <div className="bg-gradient-to-br from-[#ff4c00] to-[#ff6b35] rounded-3xl p-8 border-2 border-[#ff4c00] relative overflow-hidden shadow-xl shadow-[#ff4c00]/20">
                <div className="absolute top-0 right-0 bg-white text-[#ff4c00] text-xs font-bold px-4 py-2 rounded-bl-2xl">
                  RECOMMENDED
                </div>
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/20">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    AI Job Alerts Platform
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Personalized job recommendations",
                    "Instant job alerts",
                    "AI-powered job matching",
                    "Smart preference learning",
                    "Precision-based targeting",
                    "Adaptive AI matching",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/90">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Gradient Cards */}
        <section className="bg-gradient-to-br from-[#ff4c00] to-[#ff6b35] py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
              {[
                { value: "50k+", label: "Active Users" },
                { value: "1M+", label: "Jobs Matched" },
                { value: "94%", label: "Success Rate" },
                { value: "<3s", label: "Avg. Alert Time" },
              ].map((stat, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <p className="text-4xl md:text-5xl font-extrabold mb-2">{stat.value}</p>
                  <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Can Use - Tag Cloud Style */}
        <section className="bg-white py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] text-sm font-semibold mb-4">For Everyone</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                Who Can Use This <span className="text-[#ff4c00]">Job Notification App?</span>
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Fresh graduates",
                "Entry-level professionals",
                "Mid-career professionals",
                "Career switchers",
                "Remote job seekers",
                "Freelancers & contractors",
                "Executives & senior professionals",
                "International applicants",
                "Tech & non-tech professionals",
              ].map((item, idx) => (
                <div
                  key={item}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#fff7f2] border border-[#ff4c00]/10 hover:border-[#ff4c00]/30 hover:bg-[#ffede6] transition-all duration-200"
                >
                  <div className="w-2 h-2 rounded-full bg-[#ff4c00]"></div>
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Modern Accordion */}
        <section className="ff-faq-section">
          <div className="ff-faq-shell">
            <div className="ff-faq-header">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#ff4c00]/20 text-[#ff4c00] text-sm font-semibold mb-4">FAQ</span>
              <h2>
                Frequently Asked Questions
              </h2>
            </div>

            <div className="ff-faq-list">
              {[
                { q: "What are AI job alerts?", a: "AI job alerts use intelligent algorithms to notify you about relevant job openings instantly." },
                { q: "How does a job notification app work?", a: "A job notification app analyzes your skills and preferences to deliver targeted alerts." },
                { q: "Are instant job alerts truly real-time?", a: "Yes. Our instant job alerts trigger immediately after job postings go live." },
                { q: "How accurate are AI job recommendations?", a: "Accuracy improves continuously using AI job matching." },
                { q: "Can I customize my alerts?", a: "Absolutely. Filter by location, salary, remote jobs, and more." },
                { q: "Is this AI job alerts app free to use?", a: "Yes. Flexible access options available." },
                { q: "How quickly will I receive notifications?", a: "Real-time alerts and daily job notifications are available." },
                { q: "Is my data secure?", a: "Yes. Privacy and security are core priorities." },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`ff-faq-item ${activeFaqIndex === i ? "is-active" : ""}`}
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

        {/* Final CTA - Modern Rounded */}
        <section className="relative bg-white py-28 overflow-hidden">
  <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

    <div className="
      relative
      bg-gradient-to-br from-[#fff7f2] to-[#ffede6]
      rounded-[48px]
      px-8 md:px-16
      py-16 md:py-20
      text-center
      shadow-[0_20px_60px_rgba(255,76,0,0.12)]
      border border-[#ff4c00]/10
      overflow-hidden
    ">

      {/* glow layers */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#ff4c00]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#ff4c00]/10 rounded-full blur-3xl"></div>

      {/* subtle inner highlight */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent pointer-events-none"></div>

      <div className="relative z-10">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight max-w-2xl mx-auto mb-4">
          Ready to Get Instant Job Alerts?
        </h2>

        {/* Subtext */}
        <p className="text-lg text-slate-600 max-w-lg mx-auto mb-10">
          Stop missing opportunities. Start applying before the crowd.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">

          <button
            type="button"
            onClick={() => updateCtaUrl("/ai-job-alerts", ctaLabel)}
            className="
              group
              inline-flex
              items-center
              justify-center
              rounded-full
              bg-[#ff4c00]
              text-white
              px-12
              py-4
              text-base
              font-semibold
              shadow-[0_10px_30px_rgba(255,76,0,0.35)]
              hover:-translate-y-[3px]
              hover:shadow-[0_15px_40px_rgba(255,76,0,0.45)]
              active:translate-y-[2px]
              transition-all duration-200
            "
          >
            {ctaLabel}
            <span className="ml-2 group-hover:translate-x-1 transition">
              <ArrowRight size={18} />
            </span>
          </button>

          {/* trust pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {[
              "Instant setup",
              "No credit card required",
              "Free to start",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#ffd6c2] shadow-sm"
              >
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-slate-600 font-medium">{item}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  </div>
</section>
      </main>
    </div>
  );
}
