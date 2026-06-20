"use client";

import { Target, Sparkles, Users, CheckCircle, Award, UserCheck, TrendingUp, FileText, Brain, Zap, Shield, Clock, BarChart3, Search, Filter, AlertCircle, ArrowRight, X } from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

const updateCtaUrl = (basePath: string, label: string) => {
  if (typeof window === "undefined") return;
  const slug = label.trim().replace(/\s+/g, "-");
  const isCanada = window.location.pathname.startsWith("/en-ca");
  const normalizedBase = isCanada ? `/en-ca${basePath}` : basePath;
  const newUrl = `${normalizedBase}/${slug}`;
  window.history.pushState({}, "", newUrl);
  window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
};

export default function AIJobMatchingPlatformPage() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#fff7f2] text-slate-900 min-h-screen">


      <main className="mt-0">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#fff0e6] via-[#fff7f2] to-white min-h-[90vh] flex items-center py-16 md:py-24 overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-20 left-10 w-72 h-72 border border-slate-900 rounded-full"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 border border-slate-900 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-900 rounded-full"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* LEFT CONTENT - 7 cols */}
              <div className="lg:col-span-7 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur border border-[#ffd6c2] rounded-full">
                  <Sparkles className="w-4 h-4 text-[#ff4c00]" />
                  <span className="text-sm font-semibold text-slate-700">AI-Powered Job Matching Technology</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
                  AI Job Matching Platform for{" "}
                  <span className="text-[#ff4c00]">Personalized Job Recommendations</span>
                </h1>

                <div className="space-y-4 text-lg text-slate-700 leading-relaxed max-w-2xl">
                  <p className="font-medium text-slate-900">
                    Stop wasting hours scrolling through irrelevant job listings.
                  </p>
                  <p>
                    Our AI job matching platform uses an advanced job matching algorithm powered by machine learning matching to instantly connect your resume with the most relevant opportunities.
                  </p>
                </div>

                {/* Highlights Grid */}
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {[
                    "Get real-time personalized job recommendations",
                    "Eliminate mismatched applications",
                    "Discover better-fit roles faster",
                    "Improve interview success probability",
                  ].map((text) => (
                    <div key={text} className="flex items-start gap-3 p-3 rounded-lg bg-white/60 border border-[#ffd6c2]/50">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#ff4c00]/10 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-[#ff4c00]" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                  <button
                    type="button"
                    onClick={() => updateCtaUrl("/ai-job-matching-platform", "Start Matching Jobs Now")}
                    className="inline-flex items-center justify-center rounded-lg bg-[#ff4c00] px-8 py-4 text-base font-bold text-white hover:bg-[#e24400] transition-colors shadow-lg shadow-[#ff4c00]/20"
                  >
                    Start Matching Jobs Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Shield className="h-4 w-4 text-[#ff4c00]" />
                    <span>Secure & Confidential</span>
                  </div>
                </div>
              </div>

              {/* RIGHT PREVIEW - 5 cols */}
              <div className="lg:col-span-5">
                <div className="relative">
                  {/* Main Card */}
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#ff4c00]"></div>
                        <span className="text-sm font-bold text-white uppercase tracking-wider">AI Matching Analysis</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span className="text-xs text-slate-400">Live</span>
                      </div>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Profile Section */}
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-[#ff4c00]/10 flex items-center justify-center">
                            <UserCheck className="h-5 w-5 text-[#ff4c00]" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Your Profile</p>
                            <p className="text-sm font-bold text-slate-900">Senior Frontend Developer</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">Skills</span>
                            <span className="font-semibold text-slate-900">React, JavaScript, UI</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">Location</span>
                            <span className="font-semibold text-slate-900">United States</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">Salary Range</span>
                            <span className="font-semibold text-slate-900">$70k – $90k</span>
                          </div>
                        </div>
                      </div>

                      {/* Match Score */}
                      <div className="space-y-3">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Compatibility Analysis</p>
                        {[
                          ["Skill Match", "High", "95%"],
                          ["Location Fit", "Yes", "100%"],
                          ["Salary Alignment", "Matched", "90%"],
                        ].map(([label, value, percent]) => (
                          <div key={label} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                            <span className="text-sm font-medium text-slate-700">{label}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-[#ff4c00]">{percent}</span>
                              <span className="px-3 py-1 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] font-bold text-xs">{value}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Priority Result */}
                      <div className="bg-gradient-to-br from-[#fff7f2] to-orange-50 rounded-xl p-4 border-2 border-[#ffd6c2]">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Top Recommendation</p>
                          <Award className="h-4 w-4 text-[#ff4c00]" />
                        </div>
                        <p className="text-lg font-bold text-slate-900 mb-1">Frontend Developer</p>
                        <p className="text-sm text-slate-600 mb-3">TechCorp Inc. • San Francisco, CA</p>
                        <div className="flex items-center gap-2">
                          <span className="inline-block px-3 py-1 rounded-full bg-[#ff4c00] text-white text-xs font-bold">
                            98% Match
                          </span>
                          <span className="text-xs text-slate-500">Recommended to apply</span>
                        </div>
                      </div>
                    </div>
                  </div>



                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits at a Glance */}
        <section className="bg-[#fff7f2] py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Key Benefits at a <span className="text-[#ff4c00]">Glance</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Reduce Job Search Time",
                  desc: "Stop manually filtering irrelevant jobs.",
                },
                {
                  title: "Receive Highly Relevant Matches",
                  desc: "Powered by intelligent candidate-job matching",
                },
                {
                  title: "Improve Resume-Job Alignment",
                  desc: "Automatic resume-job alignment optimization.",
                },
                {
                  title: "Eliminate Application Burnout",
                  desc: "Apply only to high-fit roles.",
                },
                {
                  title: "Increase Interview Probability",
                  desc: "Better matching → Better outcomes.",
                },
                {
                  title: "Discover Hidden Opportunities",
                  desc: "AI detects keyword searches miss.",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-[#ffd6c2] rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-[#ff4c00]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 mb-2">{benefit.title}</h3>
                      <p className="text-sm text-slate-600">{benefit.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Our AI Job Matching Platform Works */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-bold mb-4">
                Process
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                How Our <span className="text-[#ff4c00]">AI Job Matching Platform</span> Works
              </h2>
              <p className="text-lg text-slate-600">
                Finding the right job should feel effortless — and now it does.
              </p>
            </div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff4c00] via-[#ff4c00]/50 to-slate-200 hidden md:block"></div>

              <div className="space-y-12">
                {[
                  {
                    step: "01",
                    title: "Upload Your Resume or Build Your Profile",
                    desc: "Simply upload your resume or create your career profile.",
                    items: ["No lengthy forms", "No manual data entry stress", "Works seamlessly with your resume builder output"],
                  },
                  {
                    step: "02",
                    title: "AI Analyzes Your Skills & Experience",
                    desc: "Our AI job matching system evaluates:",
                    items: ["Technical skills", "Experience depth", "Career trajectory", "Role preferences"],
                    footer: "Delivering deeper resume-job alignment.",
                  },
                  {
                    step: "03",
                    title: "AI Scans Thousands of Job Descriptions",
                    desc: "The platform continuously processes listings using:",
                    items: ["Semantic matching", "Skills-based matching", "Context-aware recruitment"],
                    footer: "Far beyond static keyword filters.",
                  },
                  {
                    step: "04",
                    title: "AI Matches Resume to Job Description",
                    desc: "Our engine performs intelligently: AI match resume to a job description",
                    items: ["Semantic matching", "AI talent matching", "Machine learning matching"],
                    highlight: "This is why users consider it the: Best AI to match a resume to a job description",
                  },
                  {
                    step: "05",
                    title: "Get Instant Personalized Job Matches",
                    desc: "Receive real-time:",
                    items: ["AI job recommendations", "High-fit opportunities", "Smart role prioritization"],
                    footer: "Powered by predictive job recommendations.",
                  },
                ].map((section, index) => (
                  <div key={index} className="relative flex gap-8 md:gap-12">
                    {/* Step Number */}
                    <div className="hidden md:flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-[#ff4c00] text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-[#ff4c00]/30 shrink-0 z-10">
                        {section.step}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 bg-slate-50 rounded-2xl p-8 border border-slate-200">
                      <div className="md:hidden w-12 h-12 rounded-xl bg-[#ff4c00] text-white flex items-center justify-center font-bold mb-4">
                        {section.step}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                        {section.title}
                      </h3>
                      <p className="text-slate-700 mb-4">{section.desc}</p>

                      <ul className="space-y-3 mb-4">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#ff4c00]"></div>
                            <span className="text-slate-600">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {section.footer && (
                        <p className="text-slate-900 font-semibold mt-4 pt-4 border-t border-slate-200">
                          {section.footer}
                        </p>
                      )}

                      {section.highlight && (
                        <div className="mt-4 p-4 bg-white rounded-xl border-l-4 border-[#ff4c00] shadow-sm">
                          <p className="text-slate-700">
                            <span className="font-semibold">Key Advantage:</span>{" "}
                            <span className="text-[#ff4c00] font-bold">{section.highlight}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Smart Opportunity Ranking */}
            <div className="mt-16 bg-gradient-to-br from-[#fff7f2] to-white rounded-2xl p-8 border-2 border-[#ffd6c2]">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Smart Opportunity Ranking
              </h3>
              <p className="text-lg text-slate-700">
                Each role receives a <span className="font-semibold text-[#ff4c00]">candidate suitability score</span>
              </p>
              <p className="text-base text-slate-600 mt-2">
                Helping you focus on jobs with the highest success probability.
              </p>
            </div>

            {/* Continuous Learning */}
            <div className="mt-8 bg-white rounded-2xl p-8 border-2 border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Continuous Learning for Higher Accuracy
              </h3>
              <p className="text-lg text-slate-700 mb-4">
                Our AI job matching engine continuously improves.
              </p>
              <ul className="space-y-2">
                {["Learns preferences", "Refines matching patterns", "Increases relevance"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Why This AI Job Matching Platform Delivers Better Results */}
        <section className="bg-[#fff7f2] py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                Why This AI Job Matching Platform <span className="text-[#ff4c00]">Delivers Better Results</span>
              </h2>
              <p className="text-lg text-slate-700 mb-4">
                Traditional job boards show listings.
              </p>
              <p className="text-lg text-slate-700 font-semibold">
                We deliver intelligent alignment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                "Understand real job fit — not just keywords",
                "Prioritize roles based on compatibility",
                "Reduce irrelevant applications",
                "Improve decision confidence",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-[#ffd6c2]">
                  <CheckCircle className="h-6 w-6 text-[#ff4c00] shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#ff4c00] to-[#ff7a45] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Users typically experience:</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold mb-2">Faster</div>
                  <div className="text-sm opacity-90">Job discovery</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">Better</div>
                  <div className="text-sm opacity-90">Candidate-job matching accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">Stronger</div>
                  <div className="text-sm opacity-90">Interview alignment</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] text-sm font-bold mb-4">
                Features
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
                Key Features of Our <span className="text-[#ff4c00]">AI-Powered Job Matching Platform</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Advanced AI Job Matching Engine",
                  desc: "Powered by intelligent AI job matching models that understand context beyond keywords.",
                },
                {
                  title: "Deep Semantic Resume Analysis",
                  desc: "Leverages semantic matching for contextual understanding of your experience.",
                  bullets: ["Detects skill relationships", "Identifies role compatibility", "Eliminates keyword dependency"],
                },
                {
                  title: "Skills & Experience-Based Matching",
                  desc: "Combines multiple evaluation factors:",
                  bullets: ["Skills-based matching", "Experience depth evaluation", "Career trajectory logic"],
                },
                {
                  title: "Candidate-Job Compatibility Score",
                  desc: "Each opportunity receives a detailed candidate suitability score based on multiple dimensions.",
                },
                {
                  title: "Intelligent Resume-Job Alignment",
                  desc: "Improves your resume-job alignment automatically through AI optimization suggestions.",
                },
                {
                  title: "Real-Time AI Job Recommendations",
                  desc: "Dynamic AI job recommendations that update as new positions match your profile.",
                },
                {
                  title: "Smart Filters & Personalization",
                  desc: "Refine matches by your specific criteria:",
                  bullets: ["Industry", "Location", "Salary", "Career goals"],
                },
                {
                  title: "Resume Optimization Insights",
                  desc: "Receive actionable feedback to improve matching strength instantly.",
                },
                {
                  title: "High-Match Opportunity Alerts",
                  desc: "Never miss relevant roles again with instant notifications for top matches.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#ff4c00] transition-colors shadow-sm hover:shadow-lg"
                >
                  {/* Top Accent Bar */}
                  <div className="h-1 w-12 bg-[#ff4c00] rounded-full mb-6 group-hover:w-full transition-all duration-300"></div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4">
                    {feature.desc}
                  </p>

                  {feature.bullets && (
                    <ul className="space-y-2">
                      {feature.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1 h-1 rounded-full bg-[#ff4c00]"></div>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Why Job Seekers Choose Section */}
        <section className="bg-[#fff7f2] py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Why Job Seekers Choose Our <span className="text-[#ff4c00]">AI Job Matcher</span>
              </h2>
              <p className="text-lg text-slate-700">
                Job seekers want outcomes — not endless searching.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Save hours of manual filtering",
                "Receive true personalized job recommendations",
                "Reduce irrelevant applications",
                "Improve interview chances",
                "Discover hidden opportunities",
                "Simple, beginner-friendly platform",
                "Secure & confidential resume handling",
                "Match jobs based on skills and experience",
                "Find relevant jobs faster with AI",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white border-2 border-[#ffd6c2] rounded-xl p-5 flex items-center gap-3 hover:shadow-lg transition"
                >
                  <CheckCircle className="h-6 w-6 text-[#ff4c00] shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                AI Job Matching vs <span className="text-[#ff4c00]">Traditional Job Boards</span>
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-[#ffd6c2]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#ff4c00] to-[#ff7a45] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Feature</th>
                      <th className="px-6 py-4 text-left font-bold">Traditional Job Boards</th>
                      <th className="px-6 py-4 text-left font-bold">AI-Powered Job Matching Platform</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      {
                        feature: "Search Method",
                        traditional: "Manual keyword search",
                        ai: "Intelligent job matching algorithm",
                      },
                      {
                        feature: "Listings",
                        traditional: "Generic listings",
                        ai: "Personalized job recommendations",
                      },
                      {
                        feature: "Resume Alignment",
                        traditional: "No resume alignment",
                        ai: "AI match resume to a job description",
                      },
                      {
                        feature: "Filtering",
                        traditional: "Time-consuming filtering",
                        ai: "Smart suitability ranking",
                      },
                      {
                        feature: "Personalization",
                        traditional: "Same results for everyone",
                        ai: "Customized AI job recommendations",
                      },
                      {
                        feature: "Relevance",
                        traditional: "Limited relevance scoring",
                        ai: "Context-aware AI-powered job matching",
                      },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-orange-50/30"}>
                        <td className="px-6 py-4 font-semibold text-slate-900">{row.feature}</td>
                        <td className="px-6 py-4 text-slate-600">{row.traditional}</td>
                        <td className="px-6 py-4 text-[#ff4c00] font-semibold">{row.ai}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Who Can Use Section */}
        <section className="bg-[#fff7f2] py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Who Can Use This <span className="text-[#ff4c00]">AI Job Matching Platform?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Fresh graduates",
                "Entry-level professionals",
                "Mid-career professionals",
                "Career switchers",
                "Tech specialists",
                "Remote job seekers",
                "Executives & leaders",
                "International applicants",
              ].map((persona) => (
                <div
                  key={persona}
                  className="bg-white border-2 border-[#ffd6c2] rounded-xl p-6 text-center hover:shadow-lg transition hover:-translate-y-1"
                >
                  <CheckCircle className="h-6 w-6 text-[#ff4c00] mx-auto mb-3" />
                  <p className="font-semibold text-slate-900">{persona}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative bg-gradient-to-br from-[#fff7f2] via-[#fff7f2] to-white py-24 overflow-hidden">

          {/* soft glow */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#ff4c00]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#ff4c00]/10 rounded-full blur-3xl"></div>

          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-slate-900 leading-tight">
              Find the Right Job Faster with <span className="text-[#ff4c00]">AI-Powered Job Matching</span>
            </h2>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-slate-700 mb-6 max-w-2xl mx-auto">
              Stop relying on outdated job search methods.
            </p>

            <p className="text-base md:text-lg text-slate-700 mb-10">
              With our AI job matching platform, you can:
            </p>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-4 mb-12 text-left max-w-2xl mx-auto">
              {[
                "Access smarter AI job recommendations",
                "Improve resume-job alignment",
                "Prioritize high-fit opportunities",
                "Reduce job search time dramatically",
                "Apply with confidence",
                "Get personalized job matches based on your skills",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-3 rounded-xl border border-[#ffd6c2] shadow-sm hover:shadow-md transition"
                >
                  <CheckCircle className="h-5 w-5 text-[#ff4c00] shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-5">

              <button
                type="button"
                onClick={() => updateCtaUrl("/ai-job-matching-platform", "Start Matching Jobs Now")}
                className="
        group
        inline-flex
        items-center
        justify-center
        rounded-full
        bg-[#ff4c00]
        px-12
        py-5
        text-lg
        font-semibold
        text-white
        shadow-[0_10px_30px_rgba(255,76,0,0.3)]
        hover:-translate-y-[3px]
        hover:shadow-[0_15px_40px_rgba(255,76,0,0.4)]
        active:translate-y-[2px]
        transition-all duration-200
      "
              >
                Start Matching Jobs Now
                <span className="ml-2 group-hover:translate-x-1 transition">→</span>
              </button>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-600">
                {[
                  "Instant matches",
                  "No complicated setup",
                  "Secure & confidential",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-full bg-white border border-[#ffd6c2] shadow-sm"
                  >
                    • {item}
                  </span>
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="ff-faq-section">
          <div className="ff-faq-shell">
            <div className="ff-faq-header">
              <h2>
                Frequently Asked
                <span className="block">Questions</span>
              </h2>
            </div>

            <div className="ff-faq-list">
              {[
                {
                  q: "What is AI job matching?",
                  a: "AI job matching uses machine learning to intelligently connect candidates with relevant job opportunities.",
                },
                {
                  q: "How does an AI job matching platform work?",
                  a: "An AI job matching platform analyzes resumes and job descriptions to generate personalized matches.",
                },
                {
                  q: "What is a job matching algorithm?",
                  a: "A job matching algorithm evaluates compatibility between candidate profiles and job requirements.",
                },
                {
                  q: "Can AI match my resume accurately?",
                  a: "Yes. Our engine uses semantic matching and machine learning matching.",
                },
                {
                  q: "Is AI job matching better than traditional job boards?",
                  a: "For relevance, efficiency, and alignment — absolutely.",
                },
                {
                  q: "How accurate are personalized job recommendations?",
                  a: "Accuracy improves continuously through machine learning matching.",
                },
                {
                  q: "Is my resume data secure?",
                  a: "Yes. Security and confidentiality are core priorities.",
                },
                {
                  q: "Who should use an AI-powered job matching platform?",
                  a: "Any job seeker who wants faster, smarter, high-relevance job discovery.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`ff-faq-item ${activeFaqIndex === i ? "is-active" : ""
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
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-0.3rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
      `}} />
    </div>
  );
}
