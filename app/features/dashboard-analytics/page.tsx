"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

export default function DashboardAnalyticsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [activeDesignedForIndex, setActiveDesignedForIndex] = useState<number | null>(null);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener.
    },
  });

  const dashboardAnalyticsFAQs = [
    {
      question: "What is job search analytics?",
      answer:
        "Job search analytics helps you analyze job application data such as response rates, interview conversions, and company performance. FlashFire's job search analytics dashboard turns this data into actionable insights.",
    },
    {
      question: "How does job application tracking improve interview rates?",
      answer:
        "Job application tracking helps you see which roles and companies respond best. FlashFire combines job application tracking with analytics to help you focus on what works and improve interview rates.",
    },
    {
      question: "Is a job search dashboard better than using spreadsheets?",
      answer:
        "Yes. A job search dashboard automatically tracks applications, analyzes performance, and surfaces insights that spreadsheets can't provide.",
    },
  ];

  const benefits = [
    {
      title: "Application Performance",
      desc:
        "Monitor job application tracking metrics, including how many applications you submit and how many receive responses.",
    },
    {
      title: "Interview Conversion",
      desc:
        "Understand interview conversion rates using job search analytics to see which job applications lead to interviews and offers.",
    },
    {
      title: "Company & Role Insights",
      desc: "See which roles, companies, and industries respond best to you.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Track Job Applications",
      desc:
        "Track job applications, responses, and interview activity using a centralized job search dashboard.",
    },
    {
      number: "02",
      title: "ATS-Friendly Formatting",
      desc: "Identify patterns across interviews, rejections, and company types.",
    },
    {
      number: "03",
      title: "Optimize",
      desc: "Refine targeting, resume versions, and role selection using insights.",
    },
    {
      number: "04",
      title: "Improve",
      desc: "Increase interview rate and reduce rejections with each iteration.",
    },
  ];

  const audience = [
    "High-volume job applicants",
    "International candidates tracking visa-friendly companies",
    "Professionals optimizing job search strategy",
    "Data-driven job seekers",
  ];

  const analyticsUsers = [
    {
      title: "High-Volume Applicants",
      desc: "Understand what's working when applying at scale.",
    },
    {
      title: "International Candidates",
      desc: "Track visa-friendly companies and interview trends.",
    },
    {
      title: "Career Optimizers",
      desc: "Continuously improve strategy using real data.",
    },
  ];

  const designedFor = [
    {
      number: "01",
      title: "High-Volume Applicants",
      desc: "See which application sources, companies, and role types produce the strongest response rates.",
    },
    {
      number: "02",
      title: "International Candidates",
      desc: "Track visa-friendly companies, regions, and interview success patterns in one place.",
    },
    {
      number: "03",
      title: "Optimization-Focused Professionals",
      desc: "Use analytics to refine targeting, resume versions, and follow-up strategy.",
    },
    {
      number: "04",
      title: "Data-Driven Job Seekers",
      desc: "Replace guessing with clear signals about what converts and what does not.",
    },
  ];

  const handleFaqToggle = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const handleDesignedForToggle = (index: number) => {
    setActiveDesignedForIndex(activeDesignedForIndex === index ? null : index);
  };

  const handleGetMeInterview = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Dashboard_Analytics_Page"
          : "Dashboard_Analytics_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Dashboard_Analytics_Get_Me_Interview_Button",
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
        trackButtonClick("Get Me Interview", "dashboard_analytics_cta", "cta", {
          button_location: "dashboard_analytics_hero_section",
          section: "dashboard_analytics_hero",
        });
        trackSignupIntent("dashboard_analytics_cta", {
          signup_source: "dashboard_analytics_hero_button",
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
      const isOnDashboardAnalyticsPage =
        normalizedPath === "/features/dashboard-analytics" ||
        normalizedPath === "/en-ca/features/dashboard-analytics";

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

      if (isOnDashboardAnalyticsPage) {
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

  const handleHowItWorks = () => {
    const section = document.getElementById("how-it-works");
    if (!section) return;
    const yOffset = -80;
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flashfire Job Search Analytics Dashboard",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.flashfirejobs.com/features/dashboard-analytics",
    description: "Use FlashFire's job search analytics dashboard to track job applications, response rates, and interview conversions. Optimize your job search with data.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "62" },
  };

  const faqSchemaDashboard = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dashboardAnalyticsFAQs.map((faq) => ({
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
      { "@type": "ListItem", position: 3, name: "Dashboard & Analytics", item: "https://www.flashfirejobs.com/features/dashboard-analytics" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaDashboard) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="min-h-screen overflow-x-hidden bg-white text-[#111827]">
        <section className="relative bg-[#fff3ee] px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-[1180px] text-center">
            <span className="mb-7 inline-flex rounded-full bg-[#ff4c00] px-4 py-1.5 text-[9px] font-extrabold uppercase text-white">
              Dashboard & Analytics
            </span>
            <h1 className="mx-auto max-w-[850px] text-[36px] font-extrabold leading-[1.14] tracking-normal text-[#111827] sm:text-[54px] sm:leading-[1.14]">
                Job Search Analytics Dashboard
              for Smarter Job Application Tracking
            </h1>
            <p className="mx-auto mt-6 max-w-[650px] text-[17px] font-medium leading-8 text-[#596273]">
              FlashFire&apos;s job search analytics dashboard helps you track job applications,
              analyze response rates, and monitor interview conversions so you can optimize your
              job search using real data.
            </p>

            <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                {...getButtonProps()}
                onClick={handleGetMeInterview}
                className="inline-flex h-[50px] w-full max-w-[292px] items-center justify-center gap-2 rounded-md border-2 border-black bg-white px-7 text-[14px] font-extrabold text-black transition hover:bg-[#ffe8dd] sm:w-auto sm:min-w-[180px]"
                style={{ boxShadow: "0 4px 0 0 #ff4c00" }}
              >
                Get Me Interview
                <ArrowRight size={14} />
              </button>
              <button
                type="button"
                onClick={handleHowItWorks}
                className="inline-flex min-h-[50px] w-full max-w-[292px] items-center justify-center rounded-md border-2 border-[#ff4c00] bg-transparent px-4 py-3 text-center text-[14px] font-extrabold leading-6 text-[#ff4c00] transition hover:bg-white sm:h-[50px] sm:max-w-full sm:min-w-[365px] sm:px-7 sm:py-0"
              >
                How Our Job Search Analytics Dashboard Works
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-[1040px]">
            <div className="mb-16 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.1] text-[#111827] sm:text-[46px]">
                Everything You Need to Track
              </h2>
              <p className="mx-auto mt-8 max-w-[720px] text-[19px] font-medium leading-8 text-[#596273]">
                FlashFire combines job application tracking and job search analytics to give you a
                complete view of your job search performance, from applications to interviews.
              </p>
            </div>

            <div className="grid auto-rows-fr gap-6 md:grid-cols-3">
              {benefits.map((item) => (
                <article
                  key={item.title}
                  className="h-full min-h-[185px] min-w-0 overflow-hidden rounded-[4px] border border-[#d8d8d8] bg-white p-6 shadow-[0_10px_24px_rgba(17,24,39,0.12)] sm:p-7"
                >
                  <h3 className="text-[16px] font-extrabold leading-tight text-[#111827]">{item.title}</h3>
                  <p className="mt-5 text-[14px] font-medium leading-7 text-[#596273]">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[1080px]">
            <div className="mb-12 text-center">
              <h2 className="text-[31px] font-extrabold leading-[1.12] text-[#111827] sm:text-[40px] sm:leading-tight">
                How Our Job Search Analytics Dashboard
                <br className="hidden sm:block" />
                Improves Job Application Results
              </h2>
              <p className="mx-auto mt-4 max-w-[560px] text-[15px] font-medium leading-7 text-[#596273]">
                Turn raw application data into clear insights that help you refine strategy,
                reduce waste, and land interviews faster.
              </p>
            </div>

            <div className="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <article
                  key={step.title}
                  className="h-full min-h-[170px] min-w-0 overflow-hidden border border-black bg-[#ff4c00] p-4 text-white shadow-[4px_4px_0_0_rgba(0,0,0,0.75)] sm:p-5"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-[12px] font-extrabold text-[#ff4c00]">
                    {step.number}
                  </span>
                  <h3 className="mt-5 text-[15px] font-extrabold leading-tight">{step.title}</h3>
                  <p className="mt-4 text-[13px] font-medium leading-6 text-white/90">{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-[820px]">
            <div className="mb-8 text-center sm:mb-9">
              <h2 className="text-[30px] font-extrabold leading-[1.08] text-[#111827] sm:text-[36px]">
                Who Is This Job Search Analytics
                <br className="hidden sm:block" />
                Dashboard For
              </h2>
              <p className="mx-auto mt-5 max-w-[430px] text-[11px] font-medium leading-5 text-[#7a8290]">
                FlashFire&apos;s job search analytics dashboard is built for job seekers who want
                deeper visibility into their job application tracking and measurable improvements
                in interview outcomes.
              </p>
            </div>

            <div className="grid auto-rows-fr gap-2 sm:grid-cols-2">
              {audience.map((item) => (
                <article
                  key={item}
                  className="flex h-[146px] min-w-0 flex-col overflow-hidden rounded-[4px] border border-[#d8d8d8] bg-white px-6 py-6 shadow-[0_8px_18px_rgba(17,24,39,0.12)] sm:h-[146px] sm:px-7"
                >
                  <span className="mb-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff4c00] text-white">
                    <CheckCircle size={19} strokeWidth={3} />
                  </span>
                  <p className="text-[15px] font-extrabold leading-6 text-[#ff4c00]">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[880px]">
            <h2 className="mb-12 text-center text-[30px] font-extrabold leading-tight text-[#111827] sm:text-[32px]">
              Who Benefits Most From Analytics?
            </h2>
            <div className="grid border border-[#111827] bg-white shadow-[4px_4px_0_#111827] md:grid-cols-3">
              {analyticsUsers.map((item, index) => (
                <article
                  key={item.title}
                  className={`min-h-[105px] p-4 ${index !== analyticsUsers.length - 1 ? "border-b border-[#111827] md:border-b-0 md:border-r" : ""}`}
                >
                  <h3 className="text-[14px] font-extrabold leading-tight text-[#111827]">{item.title}</h3>
                  <p className="mt-3 text-[13px] font-medium leading-6 text-[#596273]">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fff3ee] px-4 py-16 sm:py-24">
          <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[420px_1fr] lg:items-start">
            <div>
              <h2 className="max-w-[390px] text-[32px] font-extrabold leading-[1.35] tracking-normal text-[#111827] sm:text-[36px]">
                Designed for Job Seekers Who Want Measurable Progress?
              </h2>
              <p className="mt-7 max-w-[390px] text-[13px] font-medium leading-6 text-[#7a8290]">
                FlashFire&apos;s job search analytics dashboard is built for candidates who want
                visibility into their job application tracking and real improvement in interview
                outcomes.
              </p>
              <p className="mt-6 max-w-[390px] text-[13px] font-medium leading-6 text-[#7a8290]">
                Instead of guessing, you see clear signals - what converts, what doesn&apos;t, and
                where to focus next.
              </p>
            </div>

            <div className="space-y-3">
              {designedFor.map((item, index) => {
                const isOpen = activeDesignedForIndex === index;

                return (
                  <article
                    key={item.number}
                    className="overflow-hidden rounded-[4px] border border-[#d8d8d8] bg-white"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => handleDesignedForToggle(index)}
                      className={`flex min-h-[48px] w-full items-center justify-between gap-4 px-3 text-left sm:px-4 ${
                        isOpen ? "bg-[#ff4c00] text-white" : "text-[#111827]"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] text-[20px] font-extrabold ${
                            isOpen ? "bg-white/25 text-white" : "bg-[#ffe5dc] text-[#ff4c00]"
                          }`}
                        >
                          {item.number}
                        </span>
                        <span className="text-[13px] font-extrabold leading-tight sm:text-[14px]">
                          {item.title}
                        </span>
                      </span>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[20px] leading-none ${
                          isOpen ? "bg-white text-[#ff4c00]" : "bg-[#ffe5dc] text-[#ff4c00]"
                        }`}
                      >
                        {isOpen ? "-" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <p className="px-4 py-5 text-[12px] font-medium leading-6 text-[#7a8290]">
                        {item.desc}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="text-[31px] font-extrabold leading-[1.15] text-black sm:text-[42px]">
              Ready to Use Job Search Analytics That
              <br className="hidden sm:block" />
              <span className="text-[#ff4c00]">Get Results?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[620px] text-[15px] font-medium leading-7 text-[#596273]">
              Join job seekers who use FlashFire to track applications, understand patterns,
              and increase their interview chances.
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
              We get it, job search analytics can sound complex. Here&apos;s everything explained,
              plain and simple.
            </p>
          </div>

          <div className={faqStyles.faqContainer}>
            {dashboardAnalyticsFAQs.map((faq, index) => (
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
