"use client";

import { ListChecks, CalendarCheck, BarChart3, Send, MessageSquare, CalendarClock, CheckCircle, TrendingUp, ArrowRight, Sparkles, X, FileText, Clock, Filter, Tag, Shield, Smartphone, Zap, Target, Brain, Database, Globe, LayoutDashboard, Bell, Search, ChevronDown } from "lucide-react";
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

export default function JobApplicationStatusTrackerPage() {
  const ctaLabel = "Start Tracking";
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#fff7f2] text-slate-900 min-h-screen">
      <main className="mt-0">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white min-h-[90vh] flex items-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* LEFT */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-orange-600 font-semibold text-sm border border-orange-200 shadow-sm">
                  <ListChecks size={16} />
                  Job Application Status Tracker & Follow-Up Dashboard
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
                  Track every job application in one smart dashboard — and never miss a follow-up again.
                </h1>

                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                    Our job application status tracker helps you track your job application status, manage recruiter interactions, and stay fully organized using a powerful application status dashboard.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    "Eliminate job search chaos",
                    "Never forget recruiter follow-ups",
                    "Stay ahead of interview deadlines",
                    "Take full control of your job search",
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ff4c00]/10 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-[#ff4c00]" />
                      </div>
                      <span className="text-base md:text-lg text-slate-700 font-medium">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => updateCtaUrl("/job-application-status-tracker", ctaLabel)}
                    className="inline-flex items-center justify-center rounded-xl bg-[#ff4c00] px-10 py-4 text-base md:text-lg font-semibold text-white hover:bg-[#e24400] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#ff4c00]/25"
                  >
                    {ctaLabel}
                    <ArrowRight size={18} className="ml-2" />
                  </button>
                </div>
              </div>

              {/* RIGHT – APPLICATION TRACKER PREVIEW */}
              <div className="relative">
                <div className="rounded-3xl border border-orange-200/50 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-2xl">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-orange-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center border border-orange-200">
                        <LayoutDashboard className="h-5 w-5 text-[#ff4c00]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                          Application Status Dashboard
                        </p>
                        <p className="text-xs text-slate-500">12 active applications</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center border border-orange-100">
                        <Bell className="h-4 w-4 text-[#ff4c00]" />
                      </div>
                      <div className="w-2 h-2 rounded-full bg-[#ff4c00]"></div>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <Search className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-400">Search applications...</span>
                  </div>

                  {/* Application Cards */}
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-white to-orange-50/50 border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#635bff] to-[#96f7d6] flex items-center justify-center text-white font-bold text-xs">
                            ST
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">Frontend Developer</p>
                            <p className="text-xs text-slate-600">Stripe • Remote</p>
                          </div>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-[#ff4c00]/10 text-[#ff4c00] font-semibold border border-[#ffd6c2]">Interviewing</span>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-orange-100">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-500">Applied 3 days ago</span>
                        </div>
                        <div className="flex gap-1">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-white to-blue-50/30 border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#96bf48] to-[#5e8e3e] flex items-center justify-center text-white font-bold text-xs">
                            SP
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">Software Engineer Intern</p>
                            <p className="text-xs text-slate-600">Shopify • Canada</p>
                          </div>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-semibold border border-blue-200">Applied</span>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-blue-100">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-500">Applied 1 week ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-white to-yellow-50/30 border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff5a5f] to-[#fc642d] flex items-center justify-center text-white font-bold text-xs">
                            AB
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">UI Engineer</p>
                            <p className="text-xs text-slate-600">Airbnb • United States</p>
                          </div>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold border border-yellow-200">Follow-up</span>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-yellow-100">
                        <div className="flex items-center gap-2">
                          <Bell className="h-3 w-3 text-yellow-600" />
                          <span className="text-xs text-yellow-700 font-medium">Follow-up due tomorrow</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-200/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-300/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Job Application Tracking Becomes Frustrating */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 font-semibold text-sm mb-6 border border-orange-100">
                <Zap size={16} />
                Common Challenges
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                Why Job Application Tracking <span className="text-[#ff4c00]">Becomes Frustrating</span>
              </h2>
              <p className="text-lg text-slate-700 mt-4">
                Applying to multiple jobs without a system quickly becomes overwhelming.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Bento Grid Layout */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  "Applied to 50 jobs and forgot which recruiter replied?",
                  "Can't remember which company scheduled your interview?",
                  "Lost track of follow-up emails?",
                  "Tired of messy spreadsheets?",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 p-5 rounded-2xl bg-gradient-to-br from-[#fff7f2] to-white border border-[#ffd6c2] shadow-sm">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                      <X className="h-4 w-4 text-red-500" />
                    </div>
                    <span className="text-base text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-lg text-slate-700 mb-6 font-medium">
                Manual tracking often leads to:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  "Forgotten follow-ups",
                  "Missed interview opportunities",
                  "Disorganized notes",
                  "Spreadsheet fatigue",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-[#fff7f2] border border-[#ffd6c2]">
                    <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                      <X className="h-3 w-3 text-red-500" />
                    </div>
                    <span className="text-base text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-[#fff7f2] border border-[#ff4c00]/20 p-8 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#ff4c00]/10 flex items-center justify-center border border-[#ff4c00]/20">
                    <Brain className="h-6 w-6 text-[#ff4c00]" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-900 mb-2">
                      Many job seekers struggle to track application progress effectively.
                    </p>
                    <p className="text-base text-slate-700">
                      Our intelligent job application tracker eliminates this stress instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 font-semibold text-sm mb-4 border border-orange-100">
                <Target size={16} />
                Benefits
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
                Key Benefits <span className="text-[#ff4c00]">at a Glance</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Track Every Application Without Confusion",
                  desc: "One centralized system replaces spreadsheets.",
                  icon: LayoutDashboard,
                },
                {
                  title: "Never Miss Critical Follow-Ups",
                  desc: "Automated reminders keep you proactive.",
                  icon: Bell,
                },
                {
                  title: "Take Control of Your Job Search",
                  desc: "Complete visibility across all opportunities.",
                  icon: Target,
                },
                {
                  title: "Reduce Job Search Stress",
                  desc: "Know exactly where every application stands.",
                  icon: Shield,
                },
                {
                  title: "Save Hours of Manual Tracking",
                  desc: "Automation handles updates & reminders.",
                  icon: Zap,
                },
                {
                  title: "Stay Fully Organized",
                  desc: "Built for smarter job search organization.",
                  icon: CheckCircle,
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#ff4c00]/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-[#ff4c00] transition-colors duration-300">
                    <benefit.icon className="h-6 w-6 text-[#ff4c00] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-[#fff7f2] py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-orange-600 font-semibold text-sm mb-4 border border-orange-200 shadow-sm">
                <Clock size={16} />
                Quick Setup
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
                How Our <span className="text-[#ff4c00]">Job Application Status Tracker Works</span>
              </h2>
              <p className="text-sm text-slate-600">
                Setting up your dashboard takes less than 2 minutes.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              {[
                {
                  step: "1",
                  title: "Add Your Job Details",
                  desc: "Enter company name, role, application date, and source to create a structured tracker record.",
                },
                {
                  step: "2",
                  title: "Update Your Application Stage",
                  desc: "Track statuses like Applied, Interview Scheduled, Offer Received, or Rejected with one-click updates.",
                },
                {
                  step: "3",
                  title: "Automate Your Follow-Ups",
                  desc: "Never forget recruiter communication with smart follow-up reminders and interaction tracking.",
                },
                {
                  step: "4",
                  title: "Track Progress Visually",
                  desc: "Get clear application stage visibility, prioritized opportunity tracking, and instant progress insights.",
                },
                {
                  step: "5",
                  title: "Analyze Outcomes & Optimize",
                  desc: "Make smarter decisions using application metrics, interview conversion tracking, and performance insights.",
                },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="relative bg-white rounded-2xl p-6 border border-orange-200/50 shadow-sm"
                >
                  <div className="flex flex-col h-full">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff4c00] to-[#ff7a45] text-white flex items-center justify-center text-sm font-bold mb-4 shadow-lg shadow-orange-200">
                      {item.step}
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-4 w-4 text-[#ff4c00]/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real-Time Status Updates & Other Features */}
        <section className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4 border border-blue-100">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-3">
                  Real-Time Status Updates
                </h3>
                <ul className="space-y-3">
                  {["Real-time status updates", "Live dashboard refresh", "Instant tracking visibility"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4c00]"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4 border border-green-100">
                  <Database className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-3">
                  Centralized Job Search Management
                </h3>
                <ul className="space-y-3">
                  {["No scattered records", "No lost notes", "No tracking confusion"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff4c00]"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4 border border-purple-100">
                  <Globe className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-3">
                  Integrated Job Listing Tracking
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Track applications across multiple platforms using integrated job listing tracking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Job Application Tracker Delivers Better Results */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 font-semibold text-sm mb-4 border border-orange-100">
                <TrendingUp size={16} />
                Results
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
                Why This <span className="text-[#ff4c00]">Job Application Tracker Delivers Better Results</span>
              </h2>
              <p className="text-sm text-slate-600">
                Spreadsheets track data. We deliver clarity & control.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                "Understand your entire job search instantly",
                "Prevent missed follow-ups",
                "Eliminate tracking errors",
                "Reduce mental overload",
                "Prioritize high-impact applications",
                "Stay organized throughout your job search",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 p-5 rounded-xl bg-white border border-slate-200 hover:border-[#ff4c00]/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#ff4c00]/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#ff4c00]"></div>
                  </div>
                  <span className="text-sm text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#fff7f2] to-white border border-[#ff4c00]/20 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#ff4c00] flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Users typically experience:</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Faster job search organization",
                  "Reduced follow-up mistakes",
                  "Improved recruiter response probability",
                  "Better interview preparation timing",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-orange-100">
                    <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="bg-[#fff7f2] py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-orange-600 font-semibold text-sm mb-4 border border-orange-200 shadow-sm">
                <Sparkles size={16} />
                Features
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
                Key Features Designed for <span className="text-[#ff4c00]">Job Search Control</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Centralized Application Status Dashboard",
                  desc: "Monitor every opportunity from one interface.",
                },
                {
                  title: "Real-Time Application Tracking",
                  desc: "Know exactly where each application stands.",
                },
                {
                  title: "Automated Follow-Up Reminders",
                  desc: "Eliminate missed recruiter interactions.",
                },
                {
                  title: "Smart Priority Tagging System",
                  desc: "Organize using priority tagging, custom status labels, and intelligent workflow categorization.",
                },
                {
                  title: "Interview Tracking & Scheduling",
                  desc: "Never miss critical deadlines.",
                },
                {
                  title: "Structured Recruiter Notes",
                  desc: "Maintain clean communication records.",
                },
                {
                  title: "Application Analytics & Insights",
                  desc: "Measure performance using application metrics, progress tracking, and outcome evaluation.",
                },
                {
                  title: "Cloud-Based Access",
                  desc: "Desktop + Mobile. Anywhere, anytime.",
                },
                {
                  title: "One-Click Status Updates",
                  desc: "Fast, friction-free updates.",
                },

              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-[#ff4c00]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center mb-3">
                    <div className="w-2 h-2 rounded-full bg-[#ff4c00]"></div>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Job Seekers Choose */}
        <section className="bg-[#fff7f2] py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-orange-600 font-semibold text-sm mb-4 border border-orange-200 shadow-sm">
                <CheckCircle size={16} />
                Why Choose Us
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
                Why Job Seekers Choose Our <span className="text-[#ff4c00]">Application Status Dashboard</span>
              </h2>
              <p className="text-sm text-slate-600">
                Job seekers want clarity, efficiency, and control.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                "Stay fully organized",
                "Prevent missed follow-ups",
                "Reduce job search stress",
                "Save hours of tracking work",
                "Gain full visibility",
                "Improve recruiter response probability",
                "Easily manage job applications",
                "Designed for complete job search organization",
                "Beginner-friendly interface",
                "Secure & confidential data handling",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-[#ff4c00]/30 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff4c00]"></div>
                  </div>
                  <span className="text-sm text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-[#fff7f2] py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-orange-600 font-semibold text-sm mb-4 border border-orange-200 shadow-sm">
                <BarChart3 size={16} />
                Comparison
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
                Job Application Status Tracker vs <span className="text-[#ff4c00]">Spreadsheets</span>
              </h2>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-50 to-orange-50 border-b border-slate-200">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Traditional Spreadsheet Tracking</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#ff4c00]">Our Application Status Dashboard</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Manual updates required", "One-click status updates"],
                      ["No reminders", "Automated follow-up alerts"],
                      ["Limited visualization", "Interactive dashboard view"],
                      ["Easy to forget follow-ups", "Smart reminder notifications"],
                      ["No analytics", "Application performance insights"],
                      ["Disorganized notes", "Structured recruiter tracking"],
                    ].map(([traditional, ours], index) => (
                      <tr
                        key={index}
                        className={`border-b border-slate-100 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                      >
                        <td className="px-6 py-4 text-sm text-slate-700">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                              <X className="h-3 w-3 text-red-500" />
                            </div>
                            <span>{traditional}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            </div>
                            <span className="font-medium">{ours}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-[#fff7f2] border-t border-slate-200 px-6 py-4">
                <p className="text-sm font-semibold text-slate-900 text-center">
                  Modern job search requires smarter systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who Can Use This */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 font-semibold text-sm mb-4 border border-orange-100">
                <Globe size={16} />
                For Everyone
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
                Who Can Use This <span className="text-[#ff4c00]">Job Application Tracker?</span>
              </h2>
              <p className="text-sm text-slate-600">
                Designed for job seekers at every stage of their career
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Fresh graduates",
                "Entry-level professionals",
                "Mid-career professionals",
                "Career switchers",
                "Remote job seekers",
                "Freelancers managing applications",
                "Executives applying confidentially",
                "International applicants",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-orange-50/30 border border-orange-200/50 hover:border-[#ff4c00]/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#ff4c00]/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#ff4c00]"></div>
                  </div>
                  <span className="text-sm text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-white ">
          <section className="relative py-20  bg-gradient-to-br from-[#fcf7f4] via-[#fcf7f4] to-[#fff7f2]  overflow-hidden">

            {/* Soft Glow Background */}
            <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-[#ff4c00]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-[#ff4c00]/10 rounded-full blur-3xl"></div>

            <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">

              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-sm border border-[#ffd6c2] text-[#ff4c00] font-semibold text-sm mb-6">
                <Sparkles size={16} />
                Get Started Today
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                Ready to Track Your Applications?
              </h2>

              {/* Subtext */}
              <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto">
                Stop relying on spreadsheets. Take full control of your job search.
              </p>

              {/* CTA */}
              <button
                type="button"
                onClick={() => updateCtaUrl("/job-application-status-tracker", ctaLabel)}
                className="
                group
                inline-flex items-center justify-center
                rounded-full
                bg-[#ff4c00]
                text-white
                px-12 py-4
                text-base font-semibold
                shadow-[0_10px_30px_rgba(255,76,0,0.35)]
                hover:-translate-y-[2px]
                hover:shadow-[0_15px_40px_rgba(255,76,0,0.45)]
                transition-all duration-200
                mb-6
                "
              >
                {ctaLabel}
                <span className="ml-2 group-hover:translate-x-1 transition">
                  <ArrowRight size={18} />
                </span>
              </button>

              {/* Trust line */}
              <p className="text-sm text-slate-500">
                Instant setup • No credit card required • Free to start
              </p>

            </div>
          </section>

        </section>

        {/* FAQ SECTION */}
        <section className="ff-faq-section">
          <div className="ff-faq-shell">
            <div className="ff-faq-header">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-orange-600 font-semibold text-sm mb-4 border border-orange-200 shadow-sm">
                <MessageSquare size={16} />
                Support
              </div>
              <h2>
                FAQs
              </h2>
            </div>

            <div className="ff-faq-list">
              {[
                {
                  q: "What is a job application status tracker?",
                  a: "A job application status tracker helps you monitor, organize, and manage job applications efficiently.",
                },
                {
                  q: "How does an application status dashboard work?",
                  a: "An application status dashboard provides visual tracking and updates across all applications.",
                },
                {
                  q: "Can I automate follow-up reminders?",
                  a: "Yes. Our job application follow-up tracker includes smart reminders.",
                },
                {
                  q: "Is this better than Excel or Google Sheets?",
                  a: "Yes. Automation, reminders, analytics, and visualization offer major advantages.",
                },
                {
                  q: "Can I track unlimited applications?",
                  a: "Absolutely.",
                },
                {
                  q: "Is this suitable for freshers?",
                  a: "Yes. Beginner-friendly and intuitive.",
                },
                {
                  q: "Can I access it on mobile?",
                  a: "Yes. Cloud-based cross-device access.",
                },
                {
                  q: "Is my data secure?",
                  a: "Yes. Privacy and security are core priorities.",
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
                    <div className="ff-faq-icon">
                      <span>
                        {activeFaqIndex === i ? <FaTimes /> : <FaPlus />}
                      </span>
                    </div>
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
