"use client";

import { ArrowRight, CheckCircle, Check, GraduationCap, Briefcase, Repeat, BookOpen, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import styles from "@/src/components/homePageFAQ/homePageFAQ.module.css";

export default function CareerAdvisor() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is an AI career advisor?",
      a: "An AI career advisor uses data and machine learning to analyze your background, skills, and goals to provide personalized career guidance, role recommendations, and career planning support.",
    },
    {
      q: "How does AI-powered career guidance help job seekers?",
      a: "AI-powered career guidance helps job seekers identify in-demand roles, close skill gaps, and create a structured career development plan instead of relying on generic advice.",
    },
    {
      q: "Is FlashFire a career guidance platform or a coaching service?",
      a: "FlashFire is a career guidance platform that combines AI career coaching with actionable insights like skill roadmaps, resume improvements, and job market demand analysis.",
    },
  ];

  const audiences = [
    {
      icon: GraduationCap,
      title: "Recent Graduates",
      description:
        "Explore career paths aligned with your education, interests, and real market demand — before applying blindly.",
    },
    {
      icon: Briefcase,
      title: "Mid-Career Professionals",
      description:
        "Plan role transitions, promotions, or leadership moves with structured, data-driven career guidance.",
    },
    {
      icon: Repeat,
      title: "Career Changers",
      description:
        "Evaluate new industries, required skills, and realistic transition timelines before making a switch.",
    },
    {
      icon: BookOpen,
      title: "Students Planning Ahead",
      description:
        "Align coursework, projects, and certifications with real-world job roles companies are hiring for.",
    },
    {
      icon: TrendingUp,
      title: "Competitive Job Seekers",
      description:
        "Stay relevant by understanding which roles and skills are growing in the job market.",
    },
  ];
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // handled globally
    },
  });

  const pushCustomUrl = (path?: string) => {
    if (typeof window === "undefined" || !path) return;
    const isCanada = window.location.pathname.startsWith("/en-ca");
    const normalized = path.startsWith("/en-ca")
      ? path
      : isCanada
        ? `/en-ca${path}`
        : path;
    window.history.pushState({}, "", normalized);
  };

  const handleGetCareerAdvice = () => {
    const utmSource =
      typeof window !== "undefined"
        ? localStorage.getItem("utm_source") || "WEBSITE"
        : "WEBSITE";
    const utmMedium =
      typeof window !== "undefined"
        ? localStorage.getItem("utm_medium") || "Career_Advisor_Page"
        : "Career_Advisor_Page";

    GTagUTM({
      eventName: "sign_up_click",
      label: "Career_Advisor_Get_Career_Advice_Button",
      utmParams: {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign:
          typeof window !== "undefined"
            ? localStorage.getItem("utm_campaign") || "Website"
            : "Website",
      },
    });

    trackButtonClick("Get Career Advice", "career_advisor_cta", "cta", {
      button_location: "career_advisor_hero_section",
      section: "career_advisor_hero",
    });

    trackSignupIntent("career_advisor_cta", {
      signup_source: "career_advisor_hero_button",
      funnel_stage: "signup_intent",
    });

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
    }

    pushCustomUrl("/career-advisor/Get-Career-Advice");
  };

  return (
    <div className="bg-[#fff7f3] text-[#1a1a1a] ">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block bg-[#ff4c00]/10 text-[#ff4c00] px-4 py-1 rounded-full text-sm font-semibold mb-4">
            AI-Powered Career Guidance
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            AI Career Advisor for Personalized Career Guidance & Planning
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            FlashFire is an AI-powered career guidance platform that analyzes your profile to deliver role recommendations, skill gap insights, resume improvement suggestions, and a clear career development roadmap.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              {...getButtonProps()}
              onClick={handleGetCareerAdvice}
              className="bg-[#ff4c00] text-white px-6 py-3 shadow-[0_3px_0_black] rounded-xl font-semibold flex items-center gap-2 hover:opacity-90">
              Get Career Advice
              <ArrowRight size={18} />
            </button>


          </div>
        </div>

        {/* Right Visual */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-[#ff4c00]/20">
          <ul className="space-y-5">
            {[
              "Role recommendations based on your profile",
              "Skill gaps + learning roadmap",
              "Resume & ATS improvement suggestions",
              "Job market demand insights",
              "Next 30-60-90 day action plan",
            ].map((item, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <CheckCircle className="text-[#ff4c00]" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center">
            Career decisions made simple
          </h2>

          <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
            No vague advice or generic suggestions. FlashFire's AI career advisor delivers data-backed career guidance and career planning insights tailored to your profile and job market demand.
          </p>

          <div className="mt-14 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Role clarity",
                desc: "Understand which roles fit your background today and which ones you should prepare for next.",
              },
              {
                title: "Skill direction",
                desc: "Know exactly which skills are missing and which ones actually matter in the market.",
              },
              {
                title: "Focused action plan",
                desc: "Get a step-by-step plan instead of generic career advice.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-2xl p-8 hover:border-[#ff4c00] transition"
              >
                <h3 className="font-bold text-xl">{item.title}</h3>
                <p className="mt-3 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1 */}
      <section className="bg-[#fff7f3] py-20">
        <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT TEXT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a]">
              A Career Development Platform Powered by AI
            </h2>

            <ul className="mt-8 space-y-5 text-gray-700">
              {[
                "Personalized career path recommendations using AI",
                "Skill gap analysis with career planning roadmap",
                "Resume and ATS optimization for career growth",
                "Job market demand insights",
                "Next 30-60-90 day action plan",
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff4c00]/15 text-[#ff4c00]">
                    <Check size={16} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT IMAGE */}
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-200 flex justify-center">
            <Image
              src="/images/career1.png"
              alt="From classroom to career"
              width={420}
              height={320}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="bg-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT IMAGE */}
          <div className="bg-[#fff7f3] rounded-3xl p-10 border border-[#ff4c00]/15 flex justify-center">
            <Image
              src="/images/career2.png"
              alt="Entry level job recommendations"
              width={420}
              height={320}
              className="object-contain"
            />
          </div>

          {/* RIGHT TEXT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a]">
              Who Is This For?
            </h2>

            <ul className="mt-8 space-y-5 text-gray-700">
              {[
                "Recent graduates looking for career direction",
                "Mid-career professionals seeking new opportunities",
                "Career changers exploring new fields",
                "Students mapping coursework to real industry roles",
                "Job seekers aiming for the top 10% of job market",
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff4c00]/15 text-[#ff4c00]">
                    <Check size={16} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* WHO IS THIS FOR – STRONG EDITORIAL LAYOUT */}
      <section className="bg-[#fff7f3] py-32">
        <div className="max-w-[1280px] mx-auto px-6">

          <div className="grid lg:grid-cols-[420px_1fr] gap-20 items-start">

            {/* LEFT – STICKY INTRO */}
            <div className="lg:sticky lg:top-32">
              <span className="inline-block bg-[#ff4c00]/10 text-[#ff4c00] px-4 py-1 rounded-full text-sm font-semibold mb-5">
                Built for real career decisions
              </span>

              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] leading-tight">
                Who Is This AI Career Guidance Platform For?
              </h2>

              <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                FlashFire’s AI Career Advisor is designed for people who want clarity,
                direction, and momentum — not generic advice.
                <br /><br />
                Wherever you are in your journey, it adapts to help you move forward
                with confidence.
              </p>
            </div>

            {/* RIGHT – STEPPED AUDIENCE BLOCKS */}
            <div className="space-y-12">
              {audiences.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`relative bg-white rounded-3xl border border-[#ff4c00]/20 p-8 md:p-10 
                shadow-sm transition hover:border-[#ff4c00]
                ${index % 2 === 0 ? "ml-0 md:ml-12" : "ml-0 md:ml-32"}`}
                  >
                    {/* Icon Badge */}
                    <div className="absolute -top-6 left-8 h-12 w-12 rounded-2xl 
                              bg-[#ff4c00] flex items-center justify-center shadow-md">
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-[#1a1a1a]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-gray-700 leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className={styles.header}>
            <h2>Frequently Asked Questions About AI Career Guidance</h2>
            <p>
              Ask us anything—here are the essentials to get you started.
            </p>
          </div>

          <div className={`${styles.faqContainer} w-full`}>
            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                className={`${styles.faqItem} ${activeFaq === index ? styles.active : ""
                  }`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                >
                  <span>{faq.q}</span>
                  <span className={styles.icon}>
                    {activeFaq === index ? <FaTimes /> : <FaPlus />}
                  </span>
                </button>

                {activeFaq === index && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative pt-16 pb-10 bg-[#fff1ea] overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#ff4c00]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#ff4c00]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-black leading-tight mb-6">
              Ready to stop manually applying to{" "}
              <span className="text-[#ff4c00] relative inline-block">
                Get job calls?
                <span className="absolute left-0 bottom-0 w-full h-2 bg-[#ff4c00]/20 -z-10 rounded"></span>
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-lg text-gray-800 max-w-2xl mx-auto mb-10 leading-relaxed">
              Join thousands of job seekers who use FlashFire to create compelling
              cover letters that increase their interview chances.
            </p>

            {/* CTA Button */}
            <button
              {...getButtonProps()}
              onClick={handleGetCareerAdvice}
              className="group relative bg-[#ff4c00] hover:bg-[#e24400] 
        text-white px-10 py-4 font-semibold text-lg rounded-xl 
        shadow-[0_6px_0_black] hover:shadow-[0_4px_0_black] 
        active:translate-y-[2px] active:shadow-[0_2px_0_black]
        transition-all duration-200 inline-flex items-center gap-2"
            >
              Get Career Advice
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>

            {/* Trust Line */}
            <p className="mt-6 text-sm text-gray-600">
              Trusted by 560+ job seekers
            </p>
          </div>
        </div>
      </section>


    </div>
  );
}
