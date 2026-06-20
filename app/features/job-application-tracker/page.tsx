"use client";

import React, { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardList,
  FileText,
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

export default function JobTrackerPage() {
  const router = useRouter();
  const pathname = usePathname();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener.
    },
  });

  const jobTrackerFAQs = [
    {
      question: "What is a job application tracker?",
      answer:
        "A job application tracker helps you track job applications, interviews, and recruiter interactions in one place. FlashFire's job application tracker replaces spreadsheets with a smarter, centralized dashboard.",
    },
    {
      question: "How does a job search tracker help you get more interviews?",
      answer:
        "A job search tracker shows which applications lead to interviews and which don't. FlashFire helps you track job applications, analyze results, and optimize your job search strategy.",
    },
    {
      question: "Is FlashFire better than using spreadsheets to track job applications?",
      answer:
        "Yes. FlashFire is a dedicated job tracking tool that automates tracking, recruiter management, and insights, features spreadsheets can't provide.",
    },
  ];

  const standOutCards = [
    {
      icon: Sparkles,
      title: "One-Click Job Import",
      copy:
        "Instantly save jobs from LinkedIn, Indeed, and company sites using our Chrome extension - no spreadsheets needed.",
    },
    {
      icon: Target,
      title: "Job Search Insights",
      copy:
        "Understand how your applications perform using actionable insights from your job search tracker, including interviews, rejections, and offers.",
    },
    {
      icon: Zap,
      title: "Advanced CRM Tools",
      copy:
        "Manage recruiters, notes, documents, and skills using a centralized job tracking tool built to support complex job searches.",
    },
  ];

  const workflowCards = [
    {
      title: "Save jobs instantly",
      copy: "Save jobs from LinkedIn, Indeed, or company websites with a single click using FlashFire.",
    },
    {
      title: "Organize by status",
      copy:
        "Categorize jobs as Wishlist, Applied, Interview, or Offer so nothing slips through.",
    },
    {
      title: "Track Job Application Progress",
      copy:
        "Track how many job applications convert into interviews and offers using FlashFire's built-in job application tracker.",
    },
    {
      title: "Manage recruiters",
      copy: "Store recruiter contacts, notes, and follow-ups linked to each application.",
    },
  ];

  const audienceItems = [
    "Active job seekers applying to multiple roles",
    "Professionals tired of tracking jobs in spreadsheets",
    "Candidates managing interviews across multiple companies",
    "Anyone looking for a smarter job tracking tool",
  ];

  const useSteps = [
    {
      eyebrow: "SAVE JOBS",
      title: "Save Jobs Effortlessly",
      copy:
        "Use the browser extension to save job postings directly from any website. No spreadsheets, no copying links.",
      visual: "source",
      reverse: false,
    },
    {
      eyebrow: "ORGANIZE APPLICATIONS",
      title: "Organize Your Applications",
      copy:
        "Label and categorize saved applications with statuses, tags, and notes so your job search stays structured.",
      visual: "board",
      reverse: true,
    },
    {
      eyebrow: "JOB INSIGHTS",
      title: "Analyze Your Progress",
      copy:
        "Track trends, see conversion from applied to interview to offer, and improve what's working to land interviews faster.",
      visual: "chart",
      reverse: false,
    },
    {
      eyebrow: "TRACK CONTACTS",
      title: "Manage Contacts and Interviews",
      copy:
        "Store recruiter details, referrals, and interview notes for every application so you're always ready.",
      visual: "contacts",
      reverse: true,
    },
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
          ? localStorage.getItem("utm_medium") || "Job_Tracker_Page"
          : "Job_Tracker_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Job_Tracker_Get_Me_Interview_Button",
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
        trackButtonClick("Get Me Interview", "job_tracker_cta", "cta", {
          button_location: "job_tracker_hero_section",
          section: "job_tracker_hero",
        });
        trackSignupIntent("job_tracker_cta", {
          signup_source: "job_tracker_hero_button",
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
      const isOnJobTrackerPage =
        normalizedPath === "/features/job-tracker" ||
        normalizedPath === "/en-ca/features/job-tracker" ||
        normalizedPath === "/features/job-application-tracker" ||
        normalizedPath === "/en-ca/features/job-application-tracker";

      if (isAlreadyOnGetMeInterview) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;

        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
        }

        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: "instant" });
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: "instant" });
            setTimeout(() => {
              window.scrollTo({ top: currentScrollY, behavior: "instant" });
            }, 50);
          });
        });

        return;
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
      }

      if (isOnJobTrackerPage) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;

        if (typeof window !== "undefined") {
          const targetPath = normalizedPath.startsWith("/en-ca")
            ? "/en-ca/get-me-interview"
            : "/get-me-interview";
          window.history.pushState({}, "", targetPath);
        }

        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: "instant" });
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: "instant" });
            setTimeout(() => {
              window.scrollTo({ top: currentScrollY, behavior: "instant" });
            }, 50);
          });
        });

        return;
      }

      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        sessionStorage.setItem("preserveScrollPosition", currentScrollY.toString());
        window.history.pushState({}, "", "/get-me-interview");
      }

      router.push("/get-me-interview");
    } catch (error) {
      console.warn("Error in Get Me Interview handler:", error);
    }
  };

  const handleHowItWorks = () => {
    const section = document.getElementById("how-it-works");
    if (!section) return;

    const yOffset = -80;
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const scrollWorkflow = (direction: "left" | "right") => {
    const node = carouselRef.current;
    if (!node) return;

    node.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: "Job Application Tracker",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/job-tracker.png",
    description:
      "Job application tracker that helps you monitor, manage, and follow up on every application in one place. Stay organized and never miss updates-try Flashfire free.",
    brand: {
      "@type": "Brand",
      name: "FlashFireJobs",
    },
    offers: {
      "@type": "Offer",
      url: "https://www.flashfirejobs.com/features/job-application-tracker",
      priceCurrency: "USD",
      price: "0",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "55",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Navbar />
      <main className="min-h-screen overflow-x-hidden bg-white text-[#111827]">
        <section className="relative bg-[#fff3ee] px-4 py-12 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1420px] items-center gap-7 xl:grid-cols-[260px_minmax(0,1fr)_320px] xl:gap-6">
            <div className="order-2 grid gap-2 sm:grid-cols-3 xl:order-1 xl:block xl:space-y-24">
              <HeroPill label="Track recruiters & contacts" />
              <HeroPill className="xl:ml-12" label="Centralized job tracking" />
              <HeroPill label="Actionable job insights" />
            </div>

            <div className="order-1 min-w-0 text-center xl:order-2">
              {/* <button
                {...getButtonProps()}
                onClick={handleGetMeInterview}
                className="mb-5 inline-flex items-center rounded-full bg-[#ff4c00] px-4 py-2 text-[11px] font-bold uppercase tracking-normal text-white transition hover:bg-[#e94400]"
              >
                # Cover Letter Builder
              </button> */}
              <h1 className="mx-auto max-w-[820px] text-[30px] font-extrabold leading-[1.12] tracking-normal text-[#111827] sm:text-[44px] lg:text-[47px]">
                Job Application Tracker to Track
                <br className="hidden sm:block" />
                and Manage Your Job Search
              </h1>
              <p className="mx-auto mt-5 max-w-[720px] text-[15px] font-medium leading-7 text-[#596273] sm:text-[17px] sm:leading-8">
                FlashFire is a powerful job application tracker that helps you track job applications,
                <br className="hidden sm:block" />
                organize your job search, and manage interviews in one centralized
                <br className="hidden sm:block" />
                dashboard without
                spreadsheets.
              </p>
            </div>

            <div className="order-3">
              <TrackerMockup onAdd={handleGetMeInterview} />
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[1000px]">
            <div className="mx-auto max-w-[660px] text-center">
              <h2 className="text-[31px] font-extrabold leading-[1.08] tracking-normal text-[#111827] sm:text-[42px]">
                What Makes FlashFire&apos;s Job ApplicationTracker Stand Out?
              </h2>
              <p className="mx-auto mt-5 max-w-[650px] text-[17px] font-medium leading-8 text-[#596273]">
                FlashFire is more than a basic spreadsheet alternative, it&apos;s a modern job tracking
                tool designed to help you track job applications, recruiters, and interviews in one
                place..
              </p>
            </div>

            <div className="mt-14 grid auto-rows-fr gap-5 md:grid-cols-3">
              {standOutCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.title}
                    className="h-full min-h-[198px] min-w-0 overflow-hidden border border-black bg-[#ff4c00] p-6 text-white shadow-[5px_5px_0_0_rgba(0,0,0,0.65)]"
                  >
                    <span className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#ff4c00]">
                      <Icon size={23} strokeWidth={2.3} />
                    </span>
                    <h3 className="text-[20px] font-extrabold leading-tight">{card.title}</h3>
                    <p className="mt-4 text-[15px] font-medium leading-7 text-white/90">{card.copy}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#fff6f3] px-4 py-20 sm:py-24 lg:py-28">
          <div className="mx-auto grid max-w-[1220px] gap-12 lg:grid-cols-[420px_1fr] lg:items-start">
            <div className="lg:pl-10">
              <h2 className="max-w-[390px] text-[34px] font-extrabold leading-[1.34] tracking-normal text-[#111827] sm:text-[43px]">
                A Smarter Way to Track Job Applications and Manage Your Job Search
              </h2>
              <p className="mt-6 max-w-[430px] text-[18px] font-medium leading-8 text-[#596273]">
                From saving jobs to tracking interviews - everything stays organized in one place.
              </p>
              <div className="mt-12 flex gap-4">
                <button
                  type="button"
                  aria-label="Previous workflow card"
                  onClick={() => scrollWorkflow("left")}
                  className="flex h-12 w-12 items-center justify-center bg-black text-white transition hover:bg-[#ff4c00]"
                >
                  <ArrowLeft size={24} />
                </button>
                <button
                  type="button"
                  aria-label="Next workflow card"
                  onClick={() => scrollWorkflow("right")}
                  className="flex h-12 w-12 items-center justify-center bg-black text-white transition hover:bg-[#ff4c00]"
                >
                  <ArrowRight size={24} />
                </button>
              </div>
            </div>

            <div
              ref={carouselRef}
              className="hide-scrollbar flex snap-x items-stretch gap-8 overflow-x-auto scroll-smooth pb-2"
            >
              {workflowCards.map((card) => (
                <article
                  key={card.title}
                  className="min-h-[205px] w-[min(330px,calc(100vw-3rem))] shrink-0 snap-start overflow-hidden border border-black bg-white p-8 shadow-[5px_5px_0_0_rgba(0,0,0,0.75)] sm:w-[360px]"
                >
                  <span className="mb-10 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff4c00] text-white">
                    <FileText size={24} />
                  </span>
                  <h3 className="text-[22px] font-extrabold leading-tight text-[#111827]">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-[16px] font-medium leading-7 text-[#596273]">{card.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[920px]">
            <div className="mx-auto max-w-[760px] text-center">
              <h2 className="text-[32px] font-extrabold leading-[1.08] tracking-normal text-[#111827] sm:text-[42px]">
                Who Is This Job Application Tracker For?
              </h2>
              <p className="mx-auto mt-6 max-w-[760px] text-[15px] font-medium leading-7 text-[#6b7280]">
                FlashFire&apos;s job application tracker is built for job seekers who want to track job
                applications, manage recruiter conversations, and stay organized throughout their job
                search..
              </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-[740px] auto-rows-fr gap-3 sm:grid-cols-2">
              {audienceItems.map((item) => (
                <article
                  key={item}
                  className="h-full min-h-[118px] min-w-0 overflow-hidden rounded-md border border-[#e0e0e0] bg-white px-7 py-6 shadow-[0_8px_22px_rgba(0,0,0,0.10)]"
                >
                  <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#ff4c00] text-white">
                    <Check size={24} strokeWidth={3} />
                  </span>
                  <p className="text-[19px] font-bold leading-7 text-[#ff4c00]">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-white px-4 py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[1040px]">
            <h2 className="mb-10 text-center text-[31px] font-extrabold leading-[1.08] text-[#111827] sm:mb-14 sm:text-[46px]">
              How to Use FlashFire&apos;s
              <br />
              Job Application Tracker
            </h2>

            <div className="space-y-8 sm:space-y-12">
              {useSteps.map((step) => (
                <article
                  key={step.title}
                  className="grid min-h-[270px] min-w-0 items-center gap-7 border border-black bg-white p-4 shadow-[4px_4px_0_0_rgba(0,0,0,0.65)] sm:grid-cols-2 sm:gap-12 sm:p-9 sm:shadow-[5px_5px_0_0_rgba(0,0,0,0.65)] lg:p-12"
                >
                  <div className={`min-w-0 ${step.reverse ? "sm:order-2" : ""}`}>
                    <p className="text-[12px] font-extrabold uppercase tracking-normal text-[#ff4c00]">
                      {step.eyebrow}
                    </p>
                    <h3 className="mt-4 text-[23px] font-extrabold leading-tight text-[#ff4c00] sm:mt-5 sm:text-[28px]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[15px] font-semibold leading-7 text-black sm:mt-4 sm:text-[17px] sm:leading-8">{step.copy}</p>
                  </div>
                  <div className={`min-w-0 ${step.reverse ? "sm:order-1" : ""}`}>
                    <StepVisual type={step.visual} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className={faqStyles.faqSection}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>Question? We Got You Answers.</h2>
            <p>
              We get it, job application tracking can sound complex. Here&apos;s everything explained,
              plain and simple.
            </p>
          </div>

          <div className={faqStyles.faqContainer}>
            {jobTrackerFAQs.map((faq, index) => (
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

function HeroPill({ className = "", label }: { className?: string; label: string }) {
  return (
    <div
      className={`flex min-h-[48px] items-center gap-3 rounded-lg border border-[#f4d9d1] bg-white px-3 text-[12px] font-bold text-[#111827] shadow-[0_14px_35px_rgba(17,24,39,0.08)] sm:min-h-[52px] sm:gap-4 sm:px-4 sm:text-[13px] ${className}`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#111827] text-[#ff4c00]">
        <ClipboardList size={17} />
      </span>
      {label}
    </div>
  );
}

function TrackerMockup({ onAdd }: { onAdd: () => void }) {
  const columns = [
    { title: "Wishlist", count: 10 },
    { title: "Applied", count: 5 },
    { title: "Interview", count: 2 },
  ];

  return (
    <div className="mx-auto w-full max-w-[330px] rounded-lg bg-white p-3 shadow-[0_18px_45px_rgba(0,0,0,0.10)] sm:max-w-[360px] sm:p-4 lg:w-[330px]">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-[12px] font-extrabold text-[#111827]">My job search</h3>
          <p className="text-[9px] font-semibold text-[#7a8290]">Track everything in one place</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-md bg-[#ff4c00] px-3 py-2 text-[9px] font-bold text-white transition hover:bg-[#e94400]"
        >
          Add More
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {columns.map((column) => (
          <div
            key={column.title}
            className="min-w-0 rounded-md border border-[#ffd8ca] bg-[#fff0e8] p-2 sm:p-3"
          >
            <div className="mb-3 flex justify-between gap-1 text-[7px] font-extrabold text-[#111827] sm:text-[8px]">
              <span className="truncate">{column.title}</span>
              <span>{column.count}</span>
            </div>
            <div className="space-y-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-7 rounded-sm border border-[#ffd8ca] bg-white" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepVisual({ type }: { type: string }) {
  if (type === "source") {
    return (
      <div className="min-w-0 rounded-[22px] border border-[#ffd8ca] bg-[#fff6f2] p-3 shadow-[0_8px_24px_rgba(255,76,0,0.08)] sm:rounded-[28px] sm:p-5">
        <div className="flex min-w-0 flex-col gap-4 rounded-[18px] border border-[#ffd8ca] bg-white p-4 shadow-[0_8px_18px_rgba(0,0,0,0.06)] sm:flex-row sm:gap-5 sm:p-5">
          <div className="grid grid-cols-2 gap-2 sm:block sm:w-[34%] sm:space-y-3">
            {["LinkedIn", "Wellfound", "Google", "Indeed"].map((item) => (
              <div
                key={item}
                className="rounded-full border border-[#ffd8ca] bg-[#fff0e8] px-3 py-2 text-center text-[11px] font-extrabold text-black sm:px-4 sm:py-2.5 sm:text-left sm:text-[12px]"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="min-w-0 flex-1 rounded-[16px] border border-[#ffd8ca] bg-white p-5">
            <div className="mb-3 h-4 w-28 max-w-full rounded bg-[#dfe3ea]" />
            <div className="mb-7 h-4 w-44 max-w-full rounded bg-[#dfe3ea]" />
            <div className="h-20 rounded-lg border border-[#ffd8ca] bg-[#fff0e8]" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "board") {
    return (
      <div className="min-w-0 rounded-md border border-[#ffd8ca] bg-[#fff6f2] p-3 sm:p-5">
        <div className="grid min-w-0 grid-cols-3 gap-2 rounded-md border border-[#ffd8ca] bg-white p-3 sm:gap-3 sm:p-4">
          {["Wish", "Apply", "Int"].map((item) => (
            <div key={item} className="min-w-0 rounded bg-[#fff0e8] p-2 sm:p-3">
              <div className="mb-3 text-[9px] font-extrabold">{item}</div>
              <div className="space-y-2">
                {[1, 2, 3].map((row) => (
                  <div key={row} className="h-7 rounded-sm bg-white" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "chart") {
    return (
      <div className="min-w-0 rounded-md border border-[#ffd8ca] bg-[#fff6f2] p-3 sm:p-6">
        <div className="rounded-xl bg-white p-4 sm:p-5">
          <p className="mb-5 text-[11px] font-extrabold">Job Search Summary</p>
          {["Applied", "Interview", "Accepted", "Rejected"].map((item, index) => (
            <div key={item} className="mb-3 flex items-center gap-2 text-[9px] font-bold sm:gap-3 sm:text-[10px]">
              <span className="w-16 sm:w-20">{item}</span>
              <span
                className={`h-3 rounded bg-[#ff4c00]/20 ${
                  index === 0
                    ? "w-[90px] sm:w-[118px]"
                    : index === 1
                      ? "w-[76px] sm:w-[100px]"
                      : index === 2
                        ? "w-[62px] sm:w-[82px]"
                        : "w-[48px] sm:w-[64px]"
                }`}
              />
              <span>{index === 0 ? 50 : index === 1 ? 8 : index === 2 ? 2 : 15}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[22px] border border-[#ffd8ca] bg-[#fff6f2] p-3 shadow-[0_8px_24px_rgba(255,76,0,0.08)] sm:rounded-[28px] sm:p-5">
      <div className="flex flex-col gap-4 rounded-[18px] border border-[#ffd8ca] bg-white p-4 shadow-[0_8px_18px_rgba(0,0,0,0.06)] sm:flex-row sm:gap-5 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:block sm:w-[34%] sm:space-y-3">
          {["Notes", "Contacts", "Docs", "History"].map((item) => (
            <div
              key={item}
              className="rounded-full border border-[#ffd8ca] bg-[#fff0e8] px-3 py-2 text-center text-[11px] font-extrabold text-black sm:px-4 sm:py-2.5 sm:text-left sm:text-[12px]"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex-1 rounded-[16px] border border-[#ffd8ca] bg-white p-5">
          <p className="mb-4 text-[15px] font-extrabold text-black">Manage Contact</p>
          <div className="mb-4 h-12 rounded-lg bg-[#f0f1f4]" />
          <div className="h-20 rounded-lg border border-[#ffd8ca] bg-[#fff0e8]" />
        </div>
      </div>
    </div>
  );
}
