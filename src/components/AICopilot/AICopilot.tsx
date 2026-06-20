"use client"
import { Search, FileCheck, Send, MapPin, Briefcase, TrendingUp, ArrowRight, } from "lucide-react";
import Image from "next/image";
import { FaPlus, FaTimes } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { trackButtonClick, trackExternalLink } from "@/src/utils/PostHogTracking";
import { WHATSAPP_SUPPORT_URL } from "@/src/utils/whatsapp";
import HomePageHappyUsers from "../homePageHappyUsers/homePageHappyUsers";

const dispatchCustomEvent = (eventName: string) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(eventName));
  }
};

export default function AICopilot() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const prefix = pathname.startsWith("/en-ca") ? "/en-ca" : "";


  const handleStartApplyingClick = (target: "modal" | "cta" = "modal") => {
    const currentScrollY =
      typeof window !== "undefined" ? window.scrollY : undefined;

    trackButtonClick("Start Applying with AI", "ai_copilot_section", "cta", {
      section: "ai_copilot",
    });
    dispatchCustomEvent("showCalendlyModal");

    if (typeof window !== "undefined") {
      const origin =
        pathname && pathname !== `${prefix}/AI-copilot`
          ? pathname
          : `${prefix}/AI-copilot`;
      sessionStorage.setItem("previousPageBeforeGetMeInterview", origin);
      if (currentScrollY !== undefined) {
        sessionStorage.setItem(
          "preserveScrollPosition",
          currentScrollY.toString()
        );
      }
    }

    // Change URL without actual navigation
    const newUrl =
      target === "modal"
        ? `${prefix}/AI-copilot/get-me-interview`
        : `${prefix}/AI-copilot/Start-applying-with-AI`;
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", newUrl);
    }
  };

  const handleTalkToExpertClick = () => {
    trackButtonClick("Talk to an Expert", "ai_copilot_section", "secondary", {
      section: "ai_copilot",
    });
    trackExternalLink(WHATSAPP_SUPPORT_URL, "Talk to an Expert", "ai_copilot_section", {
      link_type: "whatsapp_support",
      component: "ai_copilot",
    });
    if (typeof window !== "undefined") {
      window.open(WHATSAPP_SUPPORT_URL, "_blank");
    }
  };

  return (
    <>
      <section className="w-full bg-white pt-16 pb-16">
        <div className="max-w-[1280px] mx-auto px-6 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

            {/* LEFT CONTENT */}
            <div className="max-w-[560px]">
              <p className="text-sm font-semibold text-[#ff4c00] mb-4 uppercase tracking-wide">
                AI Job Application Automation Platform
              </p>

              <h1 className="text-[4rem] leading-[1.05] font-extrabold text-black">
                AI Job Application Automation Software That Applies to Jobs for You
              </h1>

              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                FlashFire is an AI job search platform that automates job applications, finds relevant roles, optimizes your resume, and submits applications daily to help you get interviews faster.
              </p>

              <div className="mt-10 flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => handleStartApplyingClick("modal")}
                  className="bg-[#ff4c00] text-white px-6 sm:px-5 py-3 sm:py-4 shadow-[0_3px_0_black] rounded-xl text-lg font-semibold hover:scale-105 transition"
                >
                  Get me interview
                </button>

                <button
                  type="button"
                  onClick={handleTalkToExpertClick}
                  className="text-orange-500 bg-orange-500/10 font-medium py-4 px-6 hover:underline border border-orange-500/20 rounded-xl text-lg font-semibold transition"
                >
                  Talk to an Expert
                  <div className="text-orange-500 hover:text-orange-600" />
                </button>
              </div>
            </div>

            {/* RIGHT AI FLOW CARD */}
            <div className="flex justify-center">
              <div className="w-full max-w-[440px] bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">

                {/* Header */}
                <div className="px-6 py-5 border-b bg-gray-50">
                  <h3 className="text-base font-semibold text-black">
                    Your Job Applications — On Autopilot
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    FlashFire is an automatic job application software that runs daily, finds relevant roles, and applies safely on your behalf.
                  </p>
                </div>

                {/* Context Row */}
                <div className="px-6 py-4 border-b flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Briefcase size={16} />
                    <span>Data Analyst</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin size={16} />
                    <span>USA</span>
                  </div>
                </div>

                {/* Status List */}
                <div className="px-6 py-6 space-y-5">

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#fff0e8] flex items-center justify-center">
                      <Search className="text-[#ff4c00]" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">
                        Searching relevant jobs
                      </p>
                      <p className="text-xs text-gray-500">
                        Based on your profile & preferences
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#fff0e8] flex items-center justify-center">
                      <FileCheck className="text-[#ff4c00]" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">
                        Resume optimized
                      </p>
                      <p className="text-xs text-gray-500">
                        ATS-friendly for each job
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#fff0e8] flex items-center justify-center">
                      <Send className="text-[#ff4c00]" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">
                        Applications submitted
                      </p>
                      <p className="text-xs text-gray-500">
                        Safely & automatically
                      </p>
                    </div>
                  </div>

                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-[#fffaf6] border-t text-sm text-gray-600">
                  ✔ New applications sent every day
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="w-full bg-[#fffaf6] py-28">
        <div className="max-w-[1200px] mx-auto px-6">

          {/* Header */}
          <div className="max-w-[780px] mx-auto text-center">
            <h2 className="text-[3.2rem] font-extrabold text-black leading-tight">
              What Is <span className="text-[#ff4c00]">AI Job Application Automation?</span>
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              AI job application automation uses intelligent software to search,
              customize, and submit job applications on your behalf — every day —
              without manual effort.
            </p>
          </div>

          {/* Content Grid */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Card 1 */}
            <div className="rounded-3xl bg-white p-10 shadow-sm border">
              <Search className="text-[#ff4c00] mb-5" size={32} />
              <h3 className="text-xl font-semibold text-black mb-3">
                Finds relevant jobs
              </h3>
              <p className="text-gray-600 leading-relaxed">
                AI continuously scans job boards and company sites to identify
                roles that match your skills, experience, and preferences.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-3xl bg-white p-10 shadow-sm border">
              <FileCheck className="text-[#ff4c00] mb-5" size={32} />
              <h3 className="text-xl font-semibold text-black mb-3">
                Customizes applications
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your resume and responses are tailored for each role using
                job-specific keywords to improve ATS performance.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-3xl bg-white p-10 shadow-sm border">
              <Send className="text-[#ff4c00] mb-5" size={32} />
              <h3 className="text-xl font-semibold text-black mb-3">
                Applies automatically
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Applications are submitted daily, consistently, and safely —
                even while you focus on interview preparation.
              </p>
            </div>

          </div>

          {/* Bottom Highlight */}
          <div className="mt-20 text-center text-lg text-gray-700">
            Unlike manual applications, AI automation scales your reach without
            sacrificing quality or control.
          </div>

        </div>
      </section>

      <section className="w-full bg-white py-28">
        <div className="max-w-[1200px] mx-auto px-6">

          {/* Heading */}
          <div className="text-center max-w-[760px] mx-auto">
            <h2 className="text-[3.4rem] font-extrabold text-black leading-tight">
              How Our AI Job Application Automation Software Works
            </h2>

            <p className="mt-5 text-lg text-gray-600">
              One simple setup. After that, FlashFire applies to jobs for you
              automatically — every day.
            </p>
          </div>

          {/* Steps */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* STEP 1 */}
            <div className="rounded-3xl bg-[#fff7f3] p-10 ring-1 ring-[#ff4c00]/30">
              <div className="text-[#ff4c00] text-sm font-semibold mb-4">
                STEP 1
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">
                Define your job preferences
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Choose roles, locations, experience level, and preferences using
                simple filters.
              </p>
            </div>

            {/* STEP 2 */}
            <div className="rounded-3xl bg-[#fff7f3] p-10 ring-1 ring-[#ff4c00]/30">
              <div className="text-[#ff4c00] text-sm font-semibold mb-4">
                STEP 2
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">
                Upload your resume once
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Upload your resume and answer a few screening questions just one
                time.
              </p>
            </div>

            {/* STEP 3 – SUBTLE HIGHLIGHT */}
            <div className="rounded-3xl bg-[#fff7f3] p-10 ring-1 ring-[#ff4c00]/30">
              <div className="text-[#ff4c00] text-sm font-semibold mb-4">
                STEP 3
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">
                FlashFire teams up with you to apply every day
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our AI job application automation software finds new roles, optimizes resumes, and applies automatically every day.
              </p>
            </div>

          </div>
        </div>
      </section>
      <section className="relative w-full bg-[#fffaf6] py-28 overflow-hidden">
        {/* Warm ambient background */}
        <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-[#ff4c00]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#ff4c00]/5 blur-3xl" />

        <div className="relative max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24">

          {/* LEFT — HEADER / CORE MESSAGE */}
          <div>
            <span className="inline-flex items-center gap-3 mb-6 text-sm font-semibold uppercase tracking-wide text-[#ff4c00]">
              Execution Engine
              <span className="h-[1px] w-12 bg-[#ff4c00]/60" />
            </span>

            <h2 className="text-[3.4rem] leading-[1.08] font-extrabold text-[#2a1208]">
              Execution beats
              <br />
              <span className="text-[#ff4c00]">motivation.</span>
            </h2>

            <p className="mt-7 text-lg text-[#6b3b2a] max-w-[520px]">
              FlashFire replaces fragile willpower with a system that executes
              consistently — even when attention, energy, or time runs out.
            </p>

            {/* Key outcomes */}
            <div className="mt-12 space-y-5">
              {[
                "Runs daily without manual effort",
                "Scales execution automatically",
                "Never breaks under pressure",
                "Built for long-term momentum",
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-9 w-9 rounded-xl bg-[#ff4c00]/15 flex items-center justify-center text-[#ff4c00] font-bold">
                    ✓
                  </div>
                  <span className="text-base text-[#2a1208]">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — EXECUTION GRID (STARTS LOWER) */}
          <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Manual Effort",
                desc: "Requires constant focus, energy, and daily motivation.",
                muted: true,
              },
              {
                title: "FlashFire Engine",
                desc: "Executes automatically once configured.",
              },
              {
                title: "Inconsistent Output",
                desc: "Breaks when schedules get busy.",
                muted: true,
              },
              {
                title: "Always-On System",
                desc: "Runs silently in the background.",
              },
              {
                title: "Linear Growth",
                desc: "Effort caps results quickly.",
                muted: true,
              },
              {
                title: "Scalable Momentum",
                desc: "One setup compounds endlessly.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`
            rounded-2xl p-6 border transition-all duration-300
            ${card.muted
                    ? "bg-white border-[#ff4c00]/20 text-[#7a4a38]"
                    : "bg-[#ff4c00]/95 text-white border-[#ff4c00] hover:-translate-y-1 hover:shadow-xl"
                  }
          `}
              >
                <h4 className="text-lg font-semibold">
                  {card.title}
                </h4>
                <p className={`mt-3 text-sm ${card.muted ? "text-[#7a4a38]" : "text-white/85"}`}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="w-full bg-white py-32">
        <div className="max-w-[1240px] mx-auto px-6">

          {/* Header */}
          <div className="max-w-[920px]">
            <h2 className="text-[3.5rem] leading-[1.05] font-extrabold text-black">
              Manual job applications
              <br />
              <span className="text-[#ff4c00]">weren’t built for scale.</span>
            </h2>

            <p className="mt-8 text-xl text-gray-600 max-w-[720px]">
              Automatic job application software removes the manual limits
              that slow modern job searches — without sacrificing precision.
            </p>
          </div>

          {/* Divider */}
          <div className="mt-20 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Content */}
          <div className="relative mt-28 grid grid-cols-1 md:grid-cols-2 gap-x-28 gap-y-20">

            {/* Vertical Spine (Unique Element) */}
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-px
                      bg-gradient-to-b from-[#ff4c00]/0 via-[#ff4c00]/40 to-[#ff4c00]/0" />

            {[
              {
                title: "Time compounds",
                desc: "Manual applications consume hours that don’t scale. Automation turns the same time into exponentially more reach.",
                index: "01",
              },
              {
                title: "Consistency matters",
                desc: "Applying once in a while isn’t enough. Software applies every day with the same level of accuracy.",
                index: "02",
              },
              {
                title: "Reach expands",
                desc: "Manual effort caps how many companies you can reach. Automation removes that ceiling entirely.",
                index: "03",
              },
              {
                title: "ATS alignment",
                desc: "Applications are tailored with role-specific language so they survive automated screening systems.",
                index: "04",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative pl-14"
              >
                {/* Index Marker */}
                <div className="
            absolute left-0 top-1
            h-9 w-9 rounded-full
            flex items-center justify-center
            bg-[rgba(251,240,235,1)]
            text-sm font-semibold text-[#ff4c00]
            group-hover:bg-[#ff4c00]
            group-hover:text-white
            transition
          ">
                  {item.index}
                </div>

                <h3 className="text-2xl font-semibold text-black">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-relaxed max-w-[480px]">
                  {item.desc}
                </p>

                {/* Subtle underline on hover */}
                <div className="mt-6 h-px w-0 bg-[#ff4c00] group-hover:w-20 transition-all duration-300" />
              </div>
            ))}

          </div>

          {/* Closing Statement */}
          <div className="mt-32 max-w-[780px]">
            <p className="text-lg text-gray-700 leading-relaxed">
              FlashFire doesn’t automate shortcuts — it automates discipline.
              <span className="text-black font-medium"> You stay intentional.</span>
              <span className="text-[#ff4c00] font-medium"> The system handles execution.</span>
            </p>
          </div>

        </div>
      </section>

      {/* Why Use FlashFire Section */}
      <section className="w-full bg-white py-28">
        <div className="max-w-[1200px] mx-auto px-6">

          {/* Header */}
          <div className="text-center max-w-[760px] mx-auto">
            <h2 className="text-[3.4rem] font-extrabold text-black">
              Why Use <span className="text-[#ff4c00]">FlashFire?</span>
            </h2>
            <p className="mt-5 text-lg text-gray-600">
              FlashFire is an AI job search platform designed to automate job applications, increase reach, and help job seekers land more interviews.
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-24 space-y-28">

            {/* ROW 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-black mb-4">
                  Get More Interviews
                </h3>
                <div className="w-14 h-[3px] bg-[#ff4c00] mb-6" />
                <p className="text-gray-600 leading-relaxed max-w-[520px]">
                  Most people need to apply to dozens of jobs to get a single
                  interview. FlashFire applies consistently every day to increase
                  your chances.
                </p>
              </div>

              <div className="bg-[#fafafa] rounded-3xl p-4 flex justify-center">
                <Image
                  src="/images/AIcopilot1.png"
                  alt="Get more interviews"
                  width={320}
                  height={320}
                  className="object-contain"
                />
              </div>
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="bg-[#fafafa] rounded-3xl p-4 flex justify-center">
                <Image
                  src="/images/AIcopilot2.png"
                  alt="Get more interviews"
                  width={320}
                  height={320}
                  className="object-contain"
                />
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-black mb-4">
                  Never Miss an Opportunity
                </h3>
                <div className="w-14 h-[3px] bg-[#ff4c00] mb-6" />
                <p className="text-gray-600 leading-relaxed max-w-[520px]">
                  FlashFire tracks new job postings daily so you never apply late
                  or miss newly opened roles.
                </p>
              </div>
            </div>

            {/* ROW 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-black mb-4">
                  Auto-Apply to the Right Jobs
                </h3>
                <div className="w-14 h-[3px] bg-[#ff4c00] mb-6" />
                <p className="text-gray-600 leading-relaxed max-w-[520px]">
                  Apply only to roles that match your profile. FlashFire tailors
                  your resume automatically for every job.
                </p>
              </div>

              <div className="bg-[#fafafa] rounded-3xl p-4 flex justify-center">
                <Image
                  src="/images/AIcopilot3.png"
                  alt="Get more interviews"
                  width={320}
                  height={320}
                  className="object-contain"
                />
              </div>
            </div>

            {/* ROW 4 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="bg-[#fafafa] rounded-3xl p-4 flex justify-center">
                <Image
                  src="/images/AIcopilot4.png"
                  alt="Get more interviews"
                  width={320}
                  height={320}
                  className="object-contain"
                />
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-black mb-4">
                  Save Hours Every Week
                </h3>
                <div className="w-14 h-[3px] bg-[#ff4c00] mb-6" />
                <p className="text-gray-600 leading-relaxed max-w-[520px]">
                  Stop wasting hours on repetitive applications. FlashFire handles
                  the work so you can focus on interviews and preparation.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      <HomePageHappyUsers />
     
      {/* FAQ Section */}
      <section className="ff-faq-section">
        <div className="ff-faq-shell">
          <div className="ff-faq-header">
            <h2>
              FAQs
            </h2>
          </div>

          <div className="ff-faq-list">
            {[
              {
                q: "What is AI job application automation?",
                a: "AI job application automation uses software to find relevant roles, tailor resumes, and automatically submit applications based on your preferences."
              },
              {
                q: "Is FlashFire an AI job search platform?",
                a: "Yes. FlashFire is an AI job search platform that discovers jobs, optimizes applications, and applies automatically every day."
              },
              {
                q: "How does automatic job application software work?",
                a: "Automatic job application software scans listings, matches relevant roles, customizes resumes, and submits applications automatically without manual effort."
              }
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
       {/* CTA SECTION */}
       <section className="w-full bg-white py-28">
  <div className="max-w-[1200px] mx-auto px-6">
    
    <div
      className="
        relative
        rounded-[48px]
        bg-[#f9e8e0]
        px-8 md:px-16
        py-16 md:py-24
        text-center
        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        overflow-hidden
      "
    >
      {/* subtle background glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#ff4c00]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#ff4c00]/10 rounded-full blur-3xl"></div>

      {/* Headline */}
      <h2 className="text-[2.2rem] md:text-[3rem] font-extrabold text-black leading-tight max-w-3xl mx-auto">
        Ready to Automate Your Job Applications?
      </h2>

      {/* small supporting line (UX boost, SEO safe) */}
      <p className="mt-4 text-gray-600 text-base md:text-lg max-w-xl mx-auto">
        Let AI handle repetitive tasks while you focus on what truly matters.
      </p>

      {/* CTA Button */}
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => handleStartApplyingClick("cta")}
          className="
            group
            inline-flex
            items-center
            gap-3
            bg-[#ff4c00]
            text-white
            px-10
            py-4
            rounded-full
            text-lg
            font-semibold
            shadow-[0_4px_0_black]
            hover:shadow-[0_6px_0_black]
            hover:-translate-y-[2px]
            active:translate-y-[2px]
            active:shadow-[0_2px_0_black]
            transition-all duration-200
          "
        >
          Start Applying with AI
          <span className="group-hover:translate-x-1 transition">
            <ArrowRight size={20} />
          </span>
        </button>
      </div>
    </div>

  </div>
</section>

    </>
  );
}
