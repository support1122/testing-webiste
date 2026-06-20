"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  CheckCircle,
  ClipboardList,
  FileText,
  Shield,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

export default function CoverLetterPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener.
    },
  });

  const coverLetterFAQs = [
    {
      question: "What is an AI cover letter builder?",
      answer:
        "An AI cover letter builder uses artificial intelligence to analyze your resume and job description and generate personalized, job-specific cover letters optimized for ATS systems.",
    },
    {
      question: "Are the cover letters ATS-friendly?",
      answer:
        "Yes. Flashfire's AI cover letter generator creates ATS-friendly cover letters using recruiter-approved formatting and keyword optimization.",
    },
    {
      question: "Can I generate a cover letter for every job application?",
      answer:
        "Yes. Our cover letter builder allows you to generate a customized, ATS-friendly cover letter for each job application in minutes.",
    },
  ];

  const benefitCards = [
    {
      title: "Smart Content Generation",
      desc:
        "Our AI analyzes job descriptions and your resume to generate personalized cover letters that highlight relevant skills and experiences.",
      icon: Sparkles,
    },
    {
      title: "ATS-Friendly Formatting",
      desc:
        "Every cover letter is ATS-friendly, helping your application reach real recruiters and hiring managers with greater confidence.",
      icon: Target,
    },
    {
      title: "Save Time & Effort",
      desc:
        "Generate professional cover letters in minutes instead of hours. Customize templates and reuse content across applications.",
      icon: Zap,
    },
  ];

  const builderSteps = [
    {
      eyebrow: "UPLOAD RESUME",
      title: "Upload Your Resume to Generate an AI Cover Letter",
      desc:
        "Upload your resume and let our AI extract your key skills, experiences, and achievements to build your cover letter foundation.",
      visual: "upload",
    },
    {
      eyebrow: "MATCH JOB DESCRIPTION",
      title: "AI Analyzes Job Descriptions for ATS Keywords",
      desc:
        "Upload your resume and let our AI extract your key skills, experiences, and achievements to build your cover letter foundation.",
      visual: "match",
    },
    {
      eyebrow: "GENERATE & CUSTOMIZE",
      title: "Generate and Customize Your ATS-Friendly Cover Letter",
      desc:
        "Upload your resume and let our AI extract your key skills, experiences, and achievements to build your cover letter foundation.",
      visual: "generate",
    },
  ];

  const audience = [
    "Active Job Seekers",
    "Freshers and early-career professionals",
    "Mid-senior candidates applying to multiple roles",
    "Anyone who wants a faster, smarter cover letter builder",
    "Candidates facing ATS rejections",
  ];

  const handleFaqToggle = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const handleGetMeInterview = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Cover_Letter_Page"
          : "Cover_Letter_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Cover_Letter_Get_Me_Interview_Button",
          utmParams: {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign:
              typeof window !== "undefined" && window.localStorage
                ? localStorage.getItem("utm_campaign") || "Website"
                : "Website",
          },
        });
      } catch (gtagError) {
        console.warn("GTagUTM error:", gtagError);
      }

      try {
        trackButtonClick("Get Me Interview", "cover_letter_cta", "cta", {
          button_location: "cover_letter_hero_section",
          section: "cover_letter_hero",
        });
        trackSignupIntent("cover_letter_cta", {
          signup_source: "cover_letter_hero_button",
          funnel_stage: "signup_intent",
        });
      } catch (trackError) {
        console.warn("Tracking error:", trackError);
      }

      const currentPath =
        pathname || (typeof window !== "undefined" ? window.location.pathname : "");
      const normalizedPath = currentPath.split("?")[0];
      const isAlreadyOnGetMeInterview =
        normalizedPath === "/get-me-interview" ||
        normalizedPath === "/en-ca/get-me-interview";
      const isOnCoverLetterPage =
        normalizedPath === "/features/cover-letter" ||
        normalizedPath === "/en-ca/features/cover-letter" ||
        normalizedPath === "/features/ai-cover-letter-generator" ||
        normalizedPath === "/en-ca/features/ai-cover-letter-generator";

      if (isAlreadyOnGetMeInterview) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
        }
        requestAnimationFrame(() => window.scrollTo({ top: currentScrollY, behavior: "instant" }));
        return;
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
      }

      if (isOnCoverLetterPage) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
        if (typeof window !== "undefined") {
          window.history.pushState(
            {},
            "",
            normalizedPath.startsWith("/en-ca") ? "/en-ca/get-me-interview" : "/get-me-interview"
          );
        }
        requestAnimationFrame(() => window.scrollTo({ top: currentScrollY, behavior: "instant" }));
        return;
      }

      if (typeof window !== "undefined") {
        sessionStorage.setItem("preserveScrollPosition", window.scrollY.toString());
        window.history.pushState({}, "", "/get-me-interview");
      }

      router.push("/get-me-interview");
    } catch (error) {
      console.warn("Error in Get Me Interview handler:", error);
    }
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: "AI Cover Letter Generator",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/cover-letter.png",
    description:
      "AI cover letter generator built to create custom cover letters for every job. Use Flashfire's free cover letter generator and stand out faster.",
    brand: {
      "@type": "Brand",
      name: "FlashFire",
    },
    offers: {
      "@type": "Offer",
      url: "https://flashfirejobs.com/features/ai-cover-letter-generator",
      priceCurrency: "USD",
      price: "0",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "68",
    },
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flashfire AI Cover Letter Generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.flashfirejobs.com/features/ai-cover-letter-generator",
    description: "AI cover letter generator built to create custom cover letters for every job. Use Flashfire's free cover letter generator and stand out faster.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "68" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: coverLetterFAQs.map((faq) => ({
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
      { "@type": "ListItem", position: 3, name: "AI Cover Letter Generator", item: "https://www.flashfirejobs.com/features/ai-cover-letter-generator" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="min-h-screen overflow-x-hidden bg-white text-[#111827]">
        <section className="relative bg-[#fff3ee] px-4 pb-12 pt-14 sm:min-h-[470px] sm:pb-16 sm:pt-[88px]">
          <div className="mx-auto max-w-[1180px]">
            <HeroMiniCard className="left-[98px] top-[162px] hidden lg:flex" />
            <HeroWritingCard className="right-[64px] top-[255px] hidden lg:block" />

            <div className="mx-auto max-w-[720px] text-center">
              <span className="mb-5 inline-flex rounded-full bg-[#ff4c00] px-4 py-1.5 text-[9px] font-extrabold uppercase text-white">
                # Cover Letter Builder
              </span>
              <h1 className="text-[30px] font-extrabold leading-[1.14] tracking-normal text-[#111827] sm:text-[43px] sm:leading-[1.16]">
                AI Cover Letter Builder for
                <br className="hidden sm:block" />
                ATS-Friendly Job Applications
              </h1>
              <p className="mx-auto mt-6 max-w-[590px] text-[15px] font-medium leading-7 text-[#596273]">
                Flashfire helps job seekers generate personalized, ATS-friendly cover letters
                <br className="hidden sm:block" />
                tailored to each job application using AI.
              </p>

              <button
                {...getButtonProps()}
                onClick={handleGetMeInterview}
                className="mt-8 inline-flex h-[46px] min-w-[160px] items-center justify-center gap-2 rounded-md border-2 border-black bg-white px-7 text-[13px] font-extrabold text-black transition hover:bg-[#ffe8dd] sm:mt-9"
                style={{ boxShadow: "0 4px 0 0 #ff4c00" }}
              >
                Get Me Interview
                <ArrowRight size={15} />
              </button>

              <div className="mx-auto mt-8 grid w-full max-w-[440px] grid-cols-2 gap-x-4 gap-y-3 text-left text-[10px] sm:text-[12px] font-semibold text-[#111827]">{[
                  "AI-powered content generation",
                  "ATS-optimized formatting",
                  "Job-specific customization",
                  "Professional templates",
                ].map((item) => (
                  <span
                key={item}
                className="flex items-start gap-2 leading-5"
              >
                <Shield size={14} className="mt-[2px] shrink-0" />
                <span>{item}</span>
              </span>
                   ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[920px]">
            <div className="mb-12 text-center">
              <span className="mb-5 inline-flex rounded-full border border-[#ffd6c4] px-4 py-1 text-[11px] font-bold text-[#ff4c00]">
                How it works
              </span>
              <h2 className="text-[31px] font-extrabold leading-[1.08] text-[#111827] sm:text-[42px]">
                Why Flashfire Is the Best AI
                <br className="hidden sm:block" />
                Cover Letter Builder for ATS Success
              </h2>
              <p className="mx-auto mt-6 max-w-[610px] text-[17px] font-medium leading-7 text-[#596273]">
                ATS-friendly, recruiter-ready, and focused on real improvements that get results.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {benefitCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="min-h-[195px] border border-black bg-[#ff4c00] p-6 text-white shadow-[5px_5px_0_0_rgba(0,0,0,0.7)]"
                  >
                    <span className="mb-7 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#ff4c00]">
                      <Icon size={23} />
                    </span>
                    <h3 className="text-[19px] font-extrabold leading-tight">{item.title}</h3>
                    <p className="mt-4 text-[15px] font-medium leading-7 text-white/90">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[860px]">
            <div className="mb-14 text-center">
              <span className="mb-8 inline-flex rounded-full border border-[#ffd6c4] px-4 py-1 text-[11px] font-bold uppercase text-[#ff4c00]">
                The problem with modern job search
              </span>
              <h2 className="text-[31px] font-extrabold leading-[1.08] text-[#111827] sm:text-[42px]">
                Why cover letters break down
                <br className="hidden sm:block" />
                and how AI fixes it
              </h2>
            </div>

            <div className="grid border border-black md:grid-cols-2">
              <div>
                <div className="flex h-[54px] items-center gap-3 border-b border-black bg-[#f0f0f0] px-5 text-[15px] font-extrabold text-[#111827]">
                  <Zap size={16} fill="#ff4c00" className="text-[#ff4c00]" />
                  Why Generic Cover Letters Fail?
                </div>
                {[
                  "Generic letters do not match job descriptions",
                  "ATS keywords are often missing",
                  "Manual customization takes too long",
                  "There is no consistent structure",
                  "Applications feel copied instead of tailored",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex min-h-[54px] items-center border-b border-black px-4 py-3 text-[13px] font-medium leading-5 text-[#6b7280] last:border-b-0 sm:px-5 sm:text-[14px] md:last:border-b"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="border-t border-black md:border-l md:border-t-0">
                <div className="flex h-[54px] items-center gap-3 bg-[#ff4c00] px-5 text-[15px] font-extrabold text-white">
                  <Check size={16} strokeWidth={3} />
                  How AI changes the game
                </div>
                {[
                  "Generates job-specific cover letters instantly",
                  "Adds ATS keywords from the job description",
                  "Highlights relevant skills and achievements",
                  "Keeps formatting recruiter-ready",
                  "Learns from edits and improves continuously",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex min-h-[54px] items-center gap-3 border-b border-[#ff9a78] bg-[#fff3ee] px-4 py-3 text-[13px] font-semibold leading-5 text-[#111827] last:border-b-0 sm:px-5 sm:text-[14px]"
                  >
                    <Check size={18} strokeWidth={3} className="text-[#ff4c00]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[900px]">
            <div className="mb-12 text-center">
              <h2 className="text-[31px] font-extrabold leading-[1.12] text-[#111827] sm:text-[40px] sm:leading-tight">
                How Our AI Cover Letter Generator
                <br className="hidden sm:block" />
                Creates ATS-Friendly Cover Letters
              </h2>
              <p className="mx-auto mt-4 max-w-[560px] text-[15px] font-medium leading-7 text-[#596273]">
                ATS-friendly, recruiter-ready, and focused on real improvements that get results.
              </p>
            </div>

            <div className="space-y-8 sm:space-y-10">
              {builderSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="grid min-h-[260px] items-center gap-7 border border-black bg-white p-5 shadow-[4px_4px_0_0_rgba(0,0,0,0.75)] sm:grid-cols-2 sm:gap-10 sm:p-8 sm:shadow-[5px_5px_0_0_rgba(0,0,0,0.75)] lg:p-10"
                >
                  <div className={index % 2 === 1 ? "sm:order-2" : ""}>
                    <p className="text-[11px] font-extrabold uppercase text-[#ff4c00]">
                      {step.eyebrow}
                    </p>
                    <h3 className="mt-4 text-[22px] font-extrabold leading-tight text-[#ff4c00] sm:mt-5 sm:text-[24px]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-[15px] font-semibold leading-7 text-black">
                      {step.desc}
                    </p>
                  </div>
                  <div className={index % 2 === 1 ? "sm:order-1" : ""}>
                    <CoverLetterVisual type={step.visual} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fff3ee] px-4 py-16 sm:py-24">
          <div className="mx-auto grid max-w-[1120px] gap-12 md:grid-cols-[1fr_1.25fr] md:items-center">
            <div>
              <h2 className="text-[31px] font-extrabold leading-tight text-black sm:text-[40px]">
                How Flashfire&apos;s AI Job
                <br className="hidden sm:block" />
                Automation Platform Works in
                <span className="text-[#ff4c00]"> 4 Simple Steps</span>
              </h2>
              <p className="mt-5 max-w-[520px] text-[15px] font-medium leading-7 text-[#6b7280] sm:mt-6 sm:text-[17px] sm:leading-8">
                We turn your endless job hunt into a smooth, automated path to interview calls.
                You set the goal, Flashfire takes care of the journey.
              </p>
              <button
                type="button"
                className="mt-8 inline-flex h-[44px] items-center justify-center gap-3 bg-black px-5 text-[15px] font-extrabold text-white transition hover:bg-[#ff4c00] sm:mt-12"
              >
                Explore
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {audience.map((item) => (
                <article
                  key={item}
                  className="flex min-h-[52px] items-center gap-3 rounded-md border border-[#d8d8d8] bg-white px-4 py-3 shadow-[0_3px_9px_rgba(0,0,0,0.05)] sm:gap-4 sm:px-5 sm:py-0"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#fff0e8] text-[#ff4c00]">
                    <CheckCircle size={16} />
                  </span>
                  <p className="text-[14px] font-extrabold leading-5 text-black sm:text-[15px]">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="text-[31px] font-extrabold leading-[1.15] text-black sm:text-[40px]">
              Ready to Write Best AI Cover Letters That
              <br className="hidden sm:block" />
              <span className="text-[#ff4c00]">Get Results?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[620px] text-[15px] font-medium leading-7 text-[#596273]">
              Join thousands of job seekers who use FlashFire to create compelling cover letters
              that increase their interview chances.
            </p>
            <button
              {...getButtonProps()}
              onClick={handleGetMeInterview}
              className="mt-9 inline-flex h-[44px] min-w-[190px] items-center justify-center rounded-md bg-[#ff4c00] px-7 text-[13px] font-extrabold text-white transition hover:bg-[#e94400]"
            >
              Get Me Interview
              <ArrowRight className="ml-1 inline" size={14} />
            </button>
          </div>
        </section>

        <section id="faq" className={faqStyles.faqSection}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>Question? We Got You Answers.</h2>
            <p>
              We get it, AI cover letter builders can sound complex. Here&apos;s everything
              explained, plain and simple.
            </p>
          </div>

          <div className={faqStyles.faqContainer}>
            {coverLetterFAQs.map((faq, index) => (
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
      </main>
      <Footer />
    </>
  );
}

function HeroMiniCard({ className }: { className: string }) {
  return (
    <div
      className={`absolute h-[38px] min-w-[178px] items-center gap-3 rounded-lg bg-white px-4 shadow-[0_14px_35px_rgba(17,24,39,0.08)] ${className}`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[#111827] text-[#ff4c00]">
        <ClipboardList size={14} />
      </span>
      <span>
        <span className="block text-[8px] font-extrabold leading-tight text-[#111827]">
          Cover Letter Builder
        </span>
        <span className="block text-[7px] font-semibold leading-tight text-[#6b7280]">
          AI-powered writing assistant
        </span>
      </span>
    </div>
  );
}

function HeroWritingCard({ className }: { className: string }) {
  return (
    <div
      className={`absolute w-[244px] rounded-lg bg-white p-3 shadow-[0_14px_35px_rgba(17,24,39,0.08)] ${className}`}
    >
      <p className="mb-3 text-[8px] font-extrabold text-[#ff4c00]">Generating your cover letter</p>
      <div className="space-y-2">
        <div className="h-3 rounded bg-[#e1e4ea]" />
        <div className="h-3 rounded bg-[#e1e4ea]" />
        <div className="h-3 rounded bg-[#e1e4ea]" />
      </div>
    </div>
  );
}

function CoverLetterVisual({ type }: { type: string }) {
  if (type === "match") {
    return (
      <div className="rounded-md border border-[#ffd8ca] bg-[#fff6f2] p-3 sm:p-4">
        <div className="rounded-md border border-[#ffd8ca] bg-white p-4 sm:p-5">
          <div className="space-y-3">
            <div className="h-3 w-full rounded bg-[#dfe3ea]" />
            <div className="h-3 w-5/6 rounded bg-[#dfe3ea]" />
            <div className="h-3 w-full rounded bg-[#dfe3ea]" />
            <div className="h-16 rounded-md bg-[#fff0e8]" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "generate") {
    return (
      <div className="rounded-md border border-[#ffd8ca] bg-[#fff6f2] p-3 sm:p-4">
        <div className="rounded-md border border-[#ffd8ca] bg-white p-4 sm:p-5">
          <div className="mb-4 h-4 w-28 rounded bg-[#dfe3ea] sm:w-36" />
          <div className="space-y-2">
            <div className="h-2 rounded bg-[#dfe3ea]" />
            <div className="h-2 w-11/12 rounded bg-[#dfe3ea]" />
            <div className="h-2 rounded bg-[#dfe3ea]" />
            <div className="h-14 rounded-md bg-[#fff0e8]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-[#ffd8ca] bg-[#fff6f2] p-3 sm:p-4">
      <div className="rounded-md border border-[#ffd8ca] bg-white p-4 sm:p-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fff0e8] text-[#ff4c00] sm:h-12 sm:w-12">
            <FileText size={24} />
          </div>
          <div className="flex-1">
            <div className="mb-3 h-3 w-28 rounded bg-[#dfe3ea]" />
            <div className="h-3 w-20 rounded bg-[#dfe3ea]" />
          </div>
        </div>
        <div className="mt-5 h-16 rounded-md bg-[#fff0e8]" />
      </div>
    </div>
  );
}
