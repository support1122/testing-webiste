"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { CheckCircle, Target, BarChart, TrendingUp, Clock, Zap } from "lucide-react";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

export default function JobTrackerPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener
    },
  });

  const handleGetMeInterview = () => {
    try {
      const utmSource = typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("utm_source") || "WEBSITE"
        : "WEBSITE";
      const utmMedium = typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("utm_medium") || "Job_Tracker_Page"
        : "Job_Tracker_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Job_Tracker_Get_Me_Interview_Button",
          utmParams: {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: typeof window !== "undefined" && window.localStorage
              ? localStorage.getItem("utm_campaign") || "Website"
              : "Website",
          },
        });
      } catch (gtagError) {
        console.warn('GTagUTM error:', gtagError);
      }

      try {
        trackButtonClick("Get Me Interview", "job_tracker_cta", "cta", {
          button_location: "job_tracker_hero_section",
          section: "job_tracker_hero"
        });
        trackSignupIntent("job_tracker_cta", {
          signup_source: "job_tracker_hero_button",
          funnel_stage: "signup_intent"
        });
      } catch (trackError) {
        console.warn('Tracking error:', trackError);
      }

      // Check current path first
      const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
      const normalizedPath = currentPath.split('?')[0];
      const isAlreadyOnGetMeInterview = normalizedPath === '/get-me-interview' ||
        normalizedPath === '/en-ca/get-me-interview';
      const isOnJobTrackerPage = normalizedPath === '/features/job-tracker' ||
        normalizedPath === '/en-ca/features/job-tracker' ||
        normalizedPath === '/features/job-application-tracker' ||
        normalizedPath === '/en-ca/features/job-application-tracker';

      // If already on the route, save scroll position and prevent navigation
      if (isAlreadyOnGetMeInterview) {
        const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
        }

        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: 'instant' });
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: 'instant' });
            setTimeout(() => {
              window.scrollTo({ top: currentScrollY, behavior: 'instant' });
            }, 50);
          });
        });

        return;
      }

      // Dispatch custom event to force show modal FIRST
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
      }

      // If on job tracker features page, change URL but keep page content visible
      if (isOnJobTrackerPage) {
        const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

        // Update URL for tracking without navigation
        if (typeof window !== 'undefined') {
          const targetPath = normalizedPath.startsWith('/en-ca') ? '/en-ca/get-me-interview' : '/get-me-interview';
          window.history.pushState({}, '', targetPath);
        }

        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: 'instant' });
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: 'instant' });
            setTimeout(() => {
              window.scrollTo({ top: currentScrollY, behavior: 'instant' });
            }, 50);
          });
        });

        return;
      }

      // Save current scroll position before navigation to preserve it
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());

        const targetPath = '/get-me-interview';
        window.history.pushState({}, '', targetPath);
      }

      // Only navigate if NOT already on the page
      const targetPath = '/get-me-interview';
      router.push(targetPath);
    } catch (error) {
      console.warn('Error in Get Me Interview handler:', error);
    }
  };

  const handleHowItWorks = () => {
    const section = document.getElementById("how-it-works")
    if (!section) return

    const yOffset = -80 // adjust if navbar height changes
    const y =
      section.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset

    window.scrollTo({ top: y, behavior: "smooth" })
  }

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Job Application Tracker",
    "image": "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/job-tracker.png",
    "description": "Job application tracker that helps you monitor, manage, and follow up on every application in one place. Stay organized and never miss updates—try Flashfire free.",
    "brand": {
      "@type": "Brand",
      "name": "FlashFireJobs"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.flashfirejobs.com/features/job-application-tracker",
      "priceCurrency": "USD",
      "price": "0"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "55"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Navbar />
      <div className="bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-20 items-center">

            {/* ================= LEFT ================= */}
            <div>
              {/* Eyebrow */}
              <span className="inline-block mb-5 text-sm font-semibold tracking-wide text-[#ff4c00]">
                JOB TRACKER
              </span>

              {/* Headline */}
              <h1 className="text-[44px] md:text-[54px] xl:text-[64px] font-extrabold leading-[1.05] text-[#0b1220]">
                Track, Organize, and <br />
                <span className="text-[#ff4c00]">Optimize</span> Your Job <br />
                Search
              </h1>

              {/* Subtext */}
              <p className="mt-7 text-lg text-[#5b6475] max-w-xl leading-relaxed">
                Forget spreadsheets and endless bookmarks. Save, apply,
                track, and revisit job applications — all from one clean,
                streamlined FlashFire dashboard.
              </p>

              {/* Feature bullets */}
              <div className="mt-10 grid sm:grid-cols-2 gap-y-5 gap-x-8 text-[15px] font-medium text-[#0b1220]">
                {[
                  "Centralized job tracking",
                  "Actionable job insights",
                  "Track recruiters & contacts",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-[#ff4c00] text-[#ff4c00] flex items-center justify-center text-sm">
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <button
                  {...getButtonProps()}
                  onClick={handleGetMeInterview}
                  className="bg-white border-2 border-black px-6 sm:px-8 py-3 sm:py-4 font-bold text-black text-base sm:text-lg hover:bg-[#f9e8e0] transition-colors rounded-lg inline-flex items-center justify-center gap-2"
                  style={{ boxShadow: '0 4px 0 0 rgba(245, 93, 29, 1)' }}
                >
                  Get Me Interview →
                </button>
                <button
                  onClick={handleHowItWorks}
                  className="border-2 border-[#ff4c00] text-[#ff4c00] bg-transparent hover:bg-[#fff2ea] px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg transition-colors rounded-lg inline-flex items-center justify-center gap-2"
                >
                  How It Works
                </button>
              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="relative">

              {/* Soft background blob */}
              <div className="absolute -top-10 -right-10 w-[520px] h-[520px] bg-[#fff1ea] rounded-[48px]" />

              {/* Dashboard Card */}
              <div className="relative bg-white rounded-2xl border border-[#ffd6c4] shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h4 className="font-semibold text-[#0b1220]">
                      My job search
                    </h4>
                    <p className="text-xs text-[#5b6475]">
                      Track everything in one place
                    </p>
                  </div>

                  <button className="text-sm bg-[#ff4c00] text-white px-4 py-2 rounded-lg">
                    Add More
                  </button>
                </div>

                {/* Columns */}
                <div className="grid grid-cols-3 gap-4 text-xs">
                  {[
                    { title: "Wishlist", count: 10 },
                    { title: "Applied", count: 5 },
                    { title: "Interview", count: 2 },
                  ].map((col) => (
                    <div
                      key={col.title}
                      className="bg-[#fff1ea] rounded-xl p-3 border border-[#ffd6c4]"
                    >
                      <div className="flex justify-between font-semibold mb-3 text-[#0b1220]">
                        <span>{col.title}</span>
                        <span>{col.count}</span>
                      </div>

                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="h-9 bg-white rounded-md border border-[#ffd6c4]"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>
        <section className="bg-[#f9fcff] py-24">
          <div className="max-w-7xl mx-auto px-6">

            {/* ================= HEADING ================= */}
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#0b1220]">
                What Makes FlashFire's Job Application <br />
                <span className="text-[#ff4c00]">Tracker Stand Out?</span>
              </h2>
            </div>

            {/* ================= CARDS ================= */}
            <div className="grid md:grid-cols-3 gap-10 items-stretch">

              {/* ===== CARD 1 ===== */}
              <div className="bg-white border border-[#ffd6c4] rounded-2xl shadow-sm p-8 flex flex-col h-full">
                {/* Visual */}
                <div className="h-48 bg-[#fff6f1] rounded-xl border border-[#ffd6c4] p-4 mb-8">
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-white rounded-lg px-3 py-2"
                      >
                        <div className="h-3 w-28 bg-gray-200 rounded" />
                        <div className="h-7 w-20 bg-[#ff4c00]/10 rounded-md" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0b1220] mb-3">
                  One-Click Job Import
                </h3>
                <p className="text-[#5b6475] text-sm leading-relaxed mt-auto">
                  Instantly save jobs from LinkedIn, Indeed, and company
                  sites using our Chrome extension — no spreadsheets needed.
                </p>
              </div>

              {/* ===== CARD 2 ===== */}
              <div className="bg-white border border-[#ffd6c4] rounded-2xl shadow-sm p-8 flex flex-col h-full">
                {/* Visual */}
                <div className="h-48 bg-[#fff6f1] rounded-xl border border-[#ffd6c4] p-6 mb-8 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute left-6 bottom-6 bg-white px-3 py-1 rounded shadow text-xs font-medium">
                      Applied 50
                    </div>
                    <div className="absolute right-6 top-6 bg-white px-3 py-1 rounded shadow text-xs font-medium">
                      Accepted 2
                    </div>
                    <span className="text-[#ff4c00] font-semibold text-sm">
                      Job Search Insights
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0b1220] mb-3">
                  Job Search Insights
                </h3>
                <p className="text-[#5b6475] text-sm leading-relaxed mt-auto">
                  Understand how your applications perform with clear
                  insights into interviews, rejections, and offers.
                </p>
              </div>

              {/* ===== CARD 3 ===== */}
              <div className="bg-white border border-[#ffd6c4] rounded-2xl shadow-sm p-8 flex flex-col h-full">
                {/* Visual */}
                <div className="h-48 bg-[#fff6f1] rounded-xl border border-[#ffd6c4] p-4 mb-8 flex gap-4">
                  <div className="w-1/3 space-y-3">
                    {["Notes", "Contacts", "Docs"].map((item) => (
                      <div
                        key={item}
                        className="bg-white rounded-lg px-3 py-2 text-xs font-medium"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="flex-1 bg-white rounded-xl p-4 border border-[#ffd6c4]">
                    <p className="text-sm font-semibold mb-3">
                      Skill Match
                    </p>
                    <div className="h-10 bg-[#fff6f1] rounded-lg" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0b1220] mb-3">
                  Advanced CRM Tools
                </h3>
                <p className="text-[#5b6475] text-sm leading-relaxed mt-auto">
                  Manage recruiters, notes, documents, and skills — all
                  linked directly to each job application.
                </p>
              </div>

            </div>
          </div>
        </section>
        {/* ================= HOW IT WORKS ================= */}
        <section id="how-it-works" className="bg-white py-28">
          <div className="max-w-7xl mx-auto px-6">

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-sm font-semibold tracking-wide text-[#ff4c00]">
                HOW IT WORKS
              </span>

              <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0b1220]">
                A smarter way to
                <br />
                <span className="text-[#ff4c00]">
                  manage your job search
                </span>
              </h2>

              <p className="mt-6 text-lg text-[#5b6475]">
                From saving jobs to tracking interviews — everything stays
                organized in one place.
              </p>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-2 gap-10">

              {[
                {
                  step: "01",
                  title: "Save jobs instantly",
                  desc: "Save jobs from LinkedIn, Indeed, or company websites with a single click using FlashFire.",
                },
                {
                  step: "02",
                  title: "Organize by status",
                  desc: "Categorize jobs as Wishlist, Applied, Interview, or Offer so nothing slips through.",
                },
                {
                  step: "03",
                  title: "Track progress",
                  desc: "Visual insights show how many applications convert into interviews and offers.",
                },
                {
                  step: "04",
                  title: "Manage recruiters",
                  desc: "Store recruiter contacts, notes, and follow-ups linked to each application.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-[#fff7f2] border border-[#ffd6c4] rounded-2xl p-1 hover:-translate-y-1 transition"
                >
                  <div className="bg-white rounded-xl p-8 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#ff4c00] text-white font-bold flex items-center justify-center">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-extrabold text-[#0b1220]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-[#5b6475] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ================= WHO IS THIS FOR ================= */}
        <section className="bg-[#fff7f2] py-28">
          <div className="max-w-7xl mx-auto px-6">

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-sm font-semibold tracking-wide text-[#ff4c00]">
                WHO IT’S FOR
              </span>

              <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0b1220] leading-tight">
                Who Is This <br />
                <span className="text-[#ff4c00]">Job Application Tracker</span> For?
              </h2>

              <p className="mt-6 text-lg text-[#5b6475] leading-relaxed">
                FlashFire’s job application tracker is built for job seekers who want
                clarity, structure, and momentum in their job search — without messy
                spreadsheets or missed follow-ups.
              </p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

              {/* Card 1 */}
              <div className="bg-white border border-[#ffd6c4] rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition">
                <div className="w-12 h-12 rounded-xl bg-[#fff1ea] flex items-center justify-center mb-6 text-[#ff4c00] font-bold">
                  01
                </div>
                <h3 className="text-lg font-extrabold text-[#0b1220] mb-3">
                  Active Job Seekers
                </h3>
                <p className="text-sm text-[#5b6475] leading-relaxed">
                  Perfect for candidates applying to multiple roles every week and
                  needing a single place to track everything clearly.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-[#ffd6c4] rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition">
                <div className="w-12 h-12 rounded-xl bg-[#fff1ea] flex items-center justify-center mb-6 text-[#ff4c00] font-bold">
                  02
                </div>
                <h3 className="text-lg font-extrabold text-[#0b1220] mb-3">
                  Spreadsheet-Tired Professionals
                </h3>
                <p className="text-sm text-[#5b6475] leading-relaxed">
                  For professionals who are tired of managing job searches using
                  spreadsheets, notes, and scattered bookmarks.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-[#ffd6c4] rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition">
                <div className="w-12 h-12 rounded-xl bg-[#fff1ea] flex items-center justify-center mb-6 text-[#ff4c00] font-bold">
                  03
                </div>
                <h3 className="text-lg font-extrabold text-[#0b1220] mb-3">
                  Interview-Heavy Candidates
                </h3>
                <p className="text-sm text-[#5b6475] leading-relaxed">
                  Ideal for candidates managing interviews, recruiter conversations,
                  referrals, and follow-ups across multiple companies.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white border border-[#ffd6c4] rounded-2xl p-8 shadow-sm hover:-translate-y-1 transition">
                <div className="w-12 h-12 rounded-xl bg-[#fff1ea] flex items-center justify-center mb-6 text-[#ff4c00] font-bold">
                  04
                </div>
                <h3 className="text-lg font-extrabold text-[#0b1220] mb-3">
                  Serious Career Builders
                </h3>
                <p className="text-sm text-[#5b6475] leading-relaxed">
                  Anyone who wants a smarter, more organized job tracking system to
                  improve consistency, follow-ups, and interview success.
                </p>
              </div>

            </div>
          </div>
        </section>


        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* ===== Heading ===== */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#0b1220]">
                How to Use FlashFire’s <br />
                <span className="text-[#ff4c00]">Job Application Tracker</span>
              </h2>
            </div>

            <div className="space-y-20">
              {/* ================= ROW 1 ================= */}
              <div className="grid lg:grid-cols-2 gap-14 items-center">
                {/* Left text */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#ff4c00] mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#ff4c00]" />
                    SAVE JOBS
                  </div>

                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#0b1220] leading-tight">
                    Save Jobs <span className="text-[#ff4c00]">Effortlessly</span>
                  </h3>

                  <p className="mt-4 text-[#5b6475] leading-relaxed max-w-lg">
                    Use the browser extension to save job postings directly from any website.
                    No spreadsheets, no copying links.
                  </p>


                </div>

                {/* Right visual */}
                <div className="relative">
                  <div className="rounded-[28px] bg-gradient-to-br from-[#fff1ea] to-[#fff8f4] border border-[#ffd6c4] p-8">
                    <div className="bg-white rounded-2xl border border-[#ffd6c4] shadow-sm p-6">
                      <div className="flex gap-4">
                        <div className="w-1/3 space-y-2">
                          {["LinkedIn", "Wellfound", "Google", "Indeed", "Others"].map((x) => (
                            <div
                              key={x}
                              className="bg-[#fff1ea] border border-[#ffd6c4] text-xs font-semibold text-[#0b1220] rounded-full px-3 py-2"
                            >
                              {x}
                            </div>
                          ))}
                        </div>

                        <div className="flex-1 border border-[#ffd6c4] rounded-xl p-4">
                          <div className="h-3 w-28 bg-gray-200 rounded mb-3" />
                          <div className="h-3 w-44 bg-gray-200 rounded mb-5" />
                          <div className="h-16 bg-[#fff1ea] rounded-lg border border-[#ffd6c4]" />

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= ROW 2 ================= */}
              <div className="grid lg:grid-cols-2 gap-14 items-center">
                {/* Left visual */}
                <div className="relative order-2 lg:order-1">
                  <div className="rounded-[28px] bg-gradient-to-br from-[#fff7f2] to-[#fff1ea] border border-[#ffd6c4] p-8">
                    <div className="bg-white rounded-2xl border border-[#ffd6c4] shadow-sm p-6">
                      <div className="grid grid-cols-3 gap-3">
                        {["Wishlist", "Applied", "Interview"].map((t) => (
                          <div key={t} className="bg-[#fff1ea] border border-[#ffd6c4] rounded-xl p-3">
                            <div className="flex justify-between text-xs font-semibold text-[#0b1220] mb-2">
                              <span>{t}</span>
                              <span>0{t === "Wishlist" ? 9 : t === "Applied" ? 5 : 2}</span>
                            </div>
                            <div className="space-y-2">
                              {[1, 2, 3].map((i) => (
                                <div key={i} className="h-9 bg-white border border-[#ffd6c4] rounded-lg" />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right text */}
                <div className="order-1 lg:order-2">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#ff4c00] mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#ff4c00]" />
                    ORGANIZE APPLICATIONS
                  </div>

                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#0b1220] leading-tight">
                    Organize Your <span className="text-[#ff4c00]">Applications</span>
                  </h3>

                  <p className="mt-4 text-[#5b6475] leading-relaxed max-w-lg">
                    Label and categorize saved applications with statuses, tags, and notes
                    so your job search stays structured.
                  </p>


                </div>
              </div>

              {/* ================= ROW 3 ================= */}
              <div className="grid lg:grid-cols-2 gap-14 items-center">
                {/* Left text */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#ff4c00] mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#ff4c00]" />
                    JOB INSIGHTS
                  </div>

                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#0b1220] leading-tight">
                    Analyze <span className="text-[#ff4c00]">Your Progress</span>
                  </h3>

                  <p className="mt-4 text-[#5b6475] leading-relaxed max-w-lg">
                    Track trends, see conversion from applied → interview → offer,
                    and improve what’s working to land interviews faster.
                  </p>


                </div>

                {/* Right visual */}
                <div className="relative">
                  <div className="rounded-[28px] bg-gradient-to-br from-[#fff1ea] to-[#fff8f4] border border-[#ffd6c4] p-8">
                    <div className="bg-white rounded-2xl border border-[#ffd6c4] shadow-sm p-6">
                      <div className="text-sm font-semibold text-[#0b1220] mb-4">
                        Job Search Summary ✨
                      </div>

                      {/* simple "flow" mock */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-24 text-xs font-semibold text-[#0b1220]">Applied</div>
                          <div className="flex-1 h-3 rounded bg-[#ff4c00]/20" />
                          <div className="w-10 text-xs text-[#5b6475]">50</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 text-xs font-semibold text-[#0b1220]">Interview</div>
                          <div className="flex-1 h-3 rounded bg-[#ff4c00]/15" />
                          <div className="w-10 text-xs text-[#5b6475]">8</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 text-xs font-semibold text-[#0b1220]">Accepted</div>
                          <div className="flex-1 h-3 rounded bg-[#ff4c00]/10" />
                          <div className="w-10 text-xs text-[#5b6475]">2</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 text-xs font-semibold text-[#0b1220]">Rejected</div>
                          <div className="flex-1 h-3 rounded bg-[#ff4c00]/10" />
                          <div className="w-10 text-xs text-[#5b6475]">15</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= ROW 4 ================= */}
              <div className="grid lg:grid-cols-2 gap-14 items-center">
                {/* Left visual */}
                <div className="relative order-2 lg:order-1">
                  <div className="rounded-[28px] bg-gradient-to-br from-[#fff7f2] to-[#fff1ea] border border-[#ffd6c4] p-8">
                    <div className="bg-white rounded-2xl border border-[#ffd6c4] shadow-sm p-6">
                      <div className="flex gap-4">
                        <div className="w-1/3 space-y-2">
                          {["Notes", "Contacts", "Docs", "History"].map((t) => (
                            <div
                              key={t}
                              className="bg-[#fff1ea] border border-[#ffd6c4] rounded-full px-3 py-2 text-xs font-semibold text-[#0b1220]"
                            >
                              {t}
                            </div>
                          ))}
                        </div>

                        <div className="flex-1 border border-[#ffd6c4] rounded-xl p-4">
                          <div className="text-sm font-semibold text-[#0b1220] mb-3">
                            Manage Contact
                          </div>
                          <div className="h-10 bg-gray-100 rounded-lg mb-3" />
                          <div className="h-16 bg-[#fff1ea] border border-[#ffd6c4] rounded-lg" />

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right text */}
                <div className="order-1 lg:order-2">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#ff4c00] mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#ff4c00]" />
                    TRACK CONTACTS
                  </div>

                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#0b1220] leading-tight">
                    Manage Contacts <span className="text-[#ff4c00]">and Interviews</span>
                  </h3>

                  <p className="mt-4 text-[#5b6475] leading-relaxed max-w-lg">
                    Store recruiter details, referrals, and interview notes for every
                    application so you’re always ready.
                  </p>

                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
      <Footer />
    </>
  );
}

