"use client";

import React, { useCallback, useState } from "react";
import {
  ArrowRight,
  Brain,
  CheckCircle,
  MessageSquareText,
  Shield,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

export default function FlashFireInterview() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // handled globally
    },
  });

  const interviewFAQs = [
    {
      question: "What is AI interview practice, and how does it work?",
      answer:
        "AI interview practice uses artificial intelligence to simulate real interview questions and provide instant feedback. FlashFire's AI interview tool helps candidates practice mock interviews and prepare confidently for real interviews.",
    },
    {
      question: "Is this an AI mock interview or real interview questions?",
      answer:
        "FlashFire offers AI mock interviews built from real job descriptions, allowing users to practice interview questions they are likely to face in actual interviews.",
    },
    {
      question: "How does AI interview preparation help improve confidence?",
      answer:
        "AI interview preparation helps candidates practice repeatedly, receive instant feedback, and improve structure and clarity, leading to more confident interview performance.",
    },
  ];

  const featureCards = [
    {
      icon: Brain,
      title: "Understands Real Interview Questions Using AI",
      desc:
        "FlashFire analyzes the intent behind each question so your answer stays focused on what interviewers actually want.",
    },
    {
      icon: MessageSquareText,
      title: "Structures Answers for Mock Interviews Using Proven Frameworks",
      desc:
        "Get feedback on clarity, flow, and structure using proven frameworks like STAR and impact-driven storytelling.",
    },
    {
      icon: CheckCircle,
      title: "AI Feedback to Improve Mock Interview Answers",
      desc:
        "Instantly see what's missing - metrics, examples, or clarity - and improve before the real interview.",
    },
  ];

  const stats = [
    {
      value: "1.1M+",
      label: "ANSWERS PRACTICED",
      bullets: ["Real interview-style questions", "Practiced across roles & levels", "Built from real job descriptions"],
    },
    {
      value: "92%",
      label: "CONFIDENCE BOOST",
      bullets: ["Clear structure & guidance", "Reduced interview anxiety", "More confident responses"],
    },
    {
      value: "50+",
      label: "FASTER PREPARATION",
      bullets: ["No guesswork in answers", "Instant feedback after each response", "Focused improvement areas"],
    },
    {
      value: "3x",
      label: "ANSWERS PRACTICED",
      bullets: ["Tech, product & analytics", "Business & operations roles", "Entry to experienced levels"],
    },
  ];

  const audience = [
    {
      title: "Active Job Seekers",
      desc: "Applying regularly but not getting interview callbacks",
    },
    {
      title: "Career Switchers",
      desc: "Repositioning skills for a new role or industry",
    },
    {
      title: "Freshers & Students",
      desc: "Learn how to answer confidently and professionally in your first interviews.",
    },
    {
      title: "Confidence Builders",
      desc: "Learn how to answer confidently and professionally in your first interviews.",
    },
  ];

  const handleFaqToggle = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const handleCTAClick = useCallback((label: string, location: string) => {
    const getLocal = (key: string, fallback: string) =>
      typeof window !== "undefined" ? localStorage.getItem(key) || fallback : fallback;

    const utmSource = getLocal("utm_source", "WEBSITE");
    const utmMedium = getLocal("utm_medium", "Interview_Tips_Page");
    const utmCampaign = getLocal("utm_campaign", "Website");

    GTagUTM({
      eventName: "sign_up_click",
      label: `${location}_${label.replace(/\s+/g, "_")}`,
      utmParams: {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      },
    });

    trackButtonClick(label, `${location}_cta`, "cta", {
      button_location: location,
      section: "interview_tips_page",
    });

    trackSignupIntent(`${location}_cta`, {
      signup_source: location,
      funnel_stage: "signup_intent",
    });

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
    }
  }, []);

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flashfire AI Interview Practice Tool",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.flashfirejobs.com/features/interview-tips",
    description: "Practice mock interviews with FlashFire's AI interview tool. Get instant feedback, improve answers, and prepare confidently for real interviews.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "74" },
  };

  const faqSchemaInterview = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: interviewFAQs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.flashfirejobs.com" },
      { "@type": "ListItem", position: 2, name: "Features", item: "https://www.flashfirejobs.com/feature" },
      { "@type": "ListItem", position: 3, name: "AI Interview Practice", item: "https://www.flashfirejobs.com/features/interview-tips" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaInterview) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="min-h-screen overflow-x-hidden bg-white text-[#111827]">
        <section className="relative bg-[#fff3ee] px-4 py-20 sm:py-24">
          <div className="mx-auto grid max-w-[1220px] items-center gap-8 lg:grid-cols-[250px_minmax(0,1fr)_270px]">
            <div className="order-2 grid gap-2 sm:grid-cols-3 lg:order-1 lg:block lg:space-y-8">
              {[
                { label: "Answer real interview questions", offset: "lg:ml-14" },
                { label: "Get instant AI feedback", offset: "lg:ml-0" },
                { label: "Improve confidence & clarity", offset: "lg:ml-16" },
              ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex min-h-[42px] w-full items-center justify-center rounded-lg bg-white px-4 text-center text-[15px] font-extrabold text-[#111827] shadow-[0_14px_35px_rgba(17,24,39,0.08)] lg:w-fit lg:min-w-[176px] ${item.offset}`}
                  >
                    {item.label}
                  </div>
                ))}
            </div>

            <div className="order-1 text-center lg:order-2">
              <span className="mb-5 inline-flex rounded-full bg-[#ff4c00] px-4 py-1.5 text-[9px] font-extrabold uppercase text-white">
                # Cover Letter Builder
              </span>
              <h1 className="text-[34px] font-extrabold leading-[1.12] tracking-normal text-[#111827] sm:text-[43px]">
                AI Interview Practice
                <br />
                Tool for Realistic Mock Interviews
              </h1>
              <p className="mx-auto mt-6 max-w-[680px] text-[17px] font-medium leading-8 text-[#596273]">
                FlashFire is an AI-powered interview tool that helps job seekers practice mock
                interviews, get instant feedback, and improve interview performance. Our AI interview
                preparation platform uses real interview questions to build confidence and clarity
                before the real interview.
              </p>
            </div>

            <div className="order-3">
              <ReadinessCard />
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[980px]">
            <h2 className="mb-14 text-center text-[34px] font-extrabold leading-[1.08] text-[#111827] sm:text-[42px]">
              Who Is Precision Targeting For?
            </h2>
            <div className="grid auto-rows-fr gap-9 md:grid-cols-3">
              {featureCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="h-full min-h-[210px] min-w-0 overflow-hidden rounded-md border border-[#d5d5d5] bg-white p-7 shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
                  >
                    <span className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-[#ff4c00] text-white">
                      <Icon size={21} />
                    </span>
                    <h3 className="text-[16px] font-extrabold leading-6 text-[#111827]">{item.title}</h3>
                    <p className="mt-4 text-[13px] font-medium leading-6 text-[#6b7280]">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[1000px]">
            <div className="mb-14 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.08] text-[#111827] sm:text-[42px]">
                Trusted by job seekers worldwide
              </h2>
              <p className="mt-6 text-[16px] font-medium text-[#6b7280]">
                Our AI-driven targeting strategy focuses your effort where it matters most
              </p>
            </div>

            <div className="grid auto-rows-fr gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <article
                  key={`${stat.value}-${stat.label}`}
                  className="h-full min-w-0 overflow-hidden border border-black bg-white px-7 py-7 shadow-[4px_4px_0_0_rgba(0,0,0,0.85)]"
                >
                  <p className="text-center text-[36px] font-extrabold leading-none text-[#ff4c00]">
                    {stat.value}
                  </p>
                  <p className="mt-4 text-center text-[10px] font-extrabold uppercase text-[#6b7280]">
                    {stat.label}
                  </p>
                  <ul className="mt-5 space-y-2 text-[12px] font-medium leading-5 text-[#6b7280]">
                    {stat.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff4c00]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[960px]">
            <div className="mb-12 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.08] text-[#111827] sm:text-[42px]">
                Who Is This AI Interview Practice Tool For?
              </h2>
              <p className="mx-auto mt-5 max-w-[660px] text-[15px] font-medium leading-7 text-[#596273]">
                FlashFire is built for people who want structured interview practice, instant
                AI feedback, and confidence before real interviews.
              </p>
            </div>

            <div className="mx-auto grid max-w-[780px] auto-rows-fr gap-3 sm:grid-cols-2">
              {audience.map((item) => (
                <article
                  key={item.title}
                  className="h-full min-h-[128px] min-w-0 overflow-hidden rounded-md border border-[#d5d5d5] bg-white px-7 py-6 shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
                >
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff4c00] text-white">
                    <CheckCircle size={24} strokeWidth={3} />
                  </span>
                  <h3 className="text-[19px] font-extrabold leading-tight text-[#ff4c00]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13px] font-medium leading-6 text-[#6b7280]">{item.desc}</p>
                </article>
              ))}
            </div>

            <div className="mx-auto mt-12 max-w-[940px] rounded-md border border-[#d5d5d5] bg-white px-8 py-7 text-center shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
              <h3 className="text-[20px] font-extrabold text-[#ff4c00]">
                Anyone serious about interview success
              </h3>
              <p className="mt-3 text-[16px] font-medium leading-7 text-[#596273]">
                Ideal for candidates who want realistic mock interviews, instant insights, and measurable
                improvement - all in one place.
              </p>
            </div>
          </div>
        </section>

        <TestimonialVideoSection />

        <section id="faq" className={faqStyles.faqSection}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>FAQs About Our AI Interview Practice & Mock Interview Tool</h2>
            <p>
              We get it, AI interview practice can sound complex. Here&apos;s everything explained,
              plain and simple.
            </p>
          </div>

          <div className={faqStyles.faqContainer}>
            {interviewFAQs.map((faq, index) => (
              <div
                key={faq.question}
                className={`${faqStyles.faqItem} ${
                  activeFaqIndex === index ? faqStyles.active : ""
                }`}
              >
                <button className={faqStyles.faqQuestion} onClick={() => handleFaqToggle(index)}>
                  <span>{faq.question}</span>
                  <span className={faqStyles.icon}>
                    {activeFaqIndex === index ? <FaTimes /> : <FaPlus />}
                  </span>
                </button>

                {activeFaqIndex === index && (
                  <div className={faqStyles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white px-4 py-20">
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="text-[34px] font-extrabold leading-tight text-[#111827]">
              Ready to practice like it&apos;s game day?
            </h2>
            <p className="mx-auto mt-5 max-w-[600px] text-[16px] font-medium leading-7 text-[#596273]">
              Start a mock interview now and refine your answers instantly.
            </p>
            <button
              {...getButtonProps()}
              onClick={() => handleCTAClick("Start Free Practice", "interview_tips_final_cta")}
              className="mt-8 inline-flex h-[46px] min-w-[190px] items-center justify-center gap-2 rounded-md border-2 border-black bg-white px-7 text-[14px] font-extrabold text-black transition hover:bg-[#ffe8dd]"
              style={{ boxShadow: "0 4px 0 0 #ff4c00" }}
            >
              Start Free Practice
              <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ReadinessCard() {
  return (
    <div className="mx-auto w-full max-w-[260px] rounded-lg border border-[#ffd8ca] bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[11px] font-extrabold text-[#111827]">Interview Readiness Overview</h3>
        <span className="text-[8px] font-extrabold text-[#ff4c00]">AI Assessment</span>
      </div>
      <p className="text-[8px] font-medium leading-4 text-[#6b7280]">
        Get a real-time interview readiness score using our AI interview practice tool.
      </p>
      <div className="mt-4">
        <div className="mb-2 flex justify-between text-[8px] font-medium text-[#6b7280]">
          <span>Overall readiness</span>
          <span>72%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[#ffe3d7]">
          <div className="h-full w-[72%] rounded-full bg-[#ff4c00]" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          ["Communication", "Strong"],
          ["Problem Solving", "Good"],
          ["Confidence", "Average"],
          ["Structure", "Needs work"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-md border border-[#ffd8ca] bg-[#fff3ee] p-3">
            <p className="text-[8px] font-medium text-[#6b7280]">{label}</p>
            <p className="mt-1 text-[8px] font-extrabold text-[#111827]">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-md border border-[#ffd8ca] bg-white p-3">
        <p className="text-[8px] font-medium leading-4 text-[#6b7280]">
          <strong className="text-[#ff4c00]">AI Insight:</strong> Add more examples and metrics to
          improve interview performance.
        </p>
      </div>
    </div>
  );
}

function TestimonialVideoSection() {
  return (
    <>
      <HomePageHappyUsers variant="pricing" />
      <HomePageHappyUsers variant="pricingVideos" />
    </>
  );
}
