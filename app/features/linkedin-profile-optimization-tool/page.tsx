"use client";

import { useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { ArrowLeft, ArrowRight, Check, FileText } from "lucide-react";
import { FaPlus, FaTimes } from "react-icons/fa";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import HomePageDemoCTA from "@/src/components/homePageDemoCTA/homePageDemoCTA";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

export default function LinkedInOptimizationPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const stepsRef = useRef<HTMLDivElement | null>(null);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {},
  });

  const linkedinOptimizationFAQs = [
    {
      question: "What does it mean to optimise a LinkedIn profile for job search success?",
      answer: " It means structuring your profile with industry-specific keywords, achievements, and recruiter-friendly formatting to boost visibility."
    },
    {
      question: "How does optimizing your LinkedIn profile help attract recruiters?",
      answer: " Optimized profiles rank higher in LinkedIn search results, making it easier for recruiters to find and contact you."
    },
    {
      question: "What are LinkedIn optimization services, and who should use them?",
      answer: " They're expert services that rewrite and optimize your profile to increase your chances of getting hired — useful for job seekers at all levels."
    },
    {
      question: "How often should I update my LinkedIn profile for better visibility?",
      answer: " Ideally, every 2–3 months or whenever your role, skills, or job goals change. Frequent updates boost algorithm visibility too."
    },
    {
      question: "What is an ATS optimized resume, and why is it important for hiring systems?",
      answer: " It's a resume designed to pass Applicant Tracking Systems by using the right format and keywords so recruiters see it."
    },
    {
      question: "How does resume optimization for ATS improve resume shortlisting?",
      answer: " It increases match scores with job descriptions, helping your resume appear at the top of recruiter pipelines."
    },
    {
      question: "Should my LinkedIn profile match my ATS optimized resume for better results?",
      answer: " Having consistent language, roles, and keywords across both ensures higher trust, better visibility, and more interview calls."
    }
  ];

  const handleFaqToggle = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
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

  const scrollSteps = (direction: "left" | "right") => {
    stepsRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "LinkedIn Profile Optimization Tool",
    "image": "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/linkedin.png",
    "description": "LinkedIn profile optimization tool that helps recruiters find you faster. Optimize headlines, keywords, and summaries to boost profile visibility with FlashfireJobs.",
    "brand": {
      "@type": "Brand",
      "name": "FlashFire"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.flashfirejobs.com/features/linkedin-profile-optimization-tool",
      "priceCurrency": "USD",
      "price": "0"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "452"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does it mean to optimise a LinkedIn profile for job search success?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ans. It means structuring your profile with industry-specific keywords, achievements, and recruiter-friendly formatting to boost visibility."
        }
      },
      {
        "@type": "Question",
        "name": "How does optimizing your LinkedIn profile help attract recruiters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ans. Optimized profiles rank higher in LinkedIn search results, making it easier for recruiters to find and contact you."
        }
      },
      {
        "@type": "Question",
        "name": "What are LinkedIn optimization services, and who should use them?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ans. They're expert services that rewrite and optimize your profile to increase your chances of getting hired—useful for job seekers at all levels."
        }
      }
    ]
  }

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flashfire LinkedIn Profile Optimization Tool",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.flashfirejobs.com/features/linkedin-profile-optimization-tool",
    description: "LinkedIn profile optimization tool that helps recruiters find you faster. Optimize headlines, keywords, and summaries to boost profile visibility.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "452" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.flashfirejobs.com" },
      { "@type": "ListItem", position: 2, name: "Features", item: "https://www.flashfirejobs.com/feature" },
      { "@type": "ListItem", position: 3, name: "LinkedIn Profile Optimization Tool", item: "https://www.flashfirejobs.com/features/linkedin-profile-optimization-tool" },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-[#0b0b0b]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />


      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-[#fff0ea] py-14 lg:py-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-6 lg:min-h-[430px] lg:flex-row lg:justify-between">

          {/* LEFT CONTENT */}
          <div className="hidden min-h-[260px] flex-none lg:block lg:w-[22%]">
            <div className="ml-14 w-40 rounded-lg border border-[#f5d7cc] bg-white px-5 py-4 text-center text-sm font-bold text-[#596273] shadow-sm">
              Works with free LinkedIn
            </div>
            <div className="mt-9 w-48 rounded-lg border border-[#f5d7cc] bg-white px-5 py-4 text-center text-sm font-bold text-[#596273] shadow-sm">
              No login required
            </div>
            <div className="mt-9 ml-36 w-44 rounded-lg border border-[#f5d7cc] bg-white px-5 py-4 text-center text-sm font-bold text-[#596273] shadow-sm">
              Visible results in
              <br />
              7-14 days
            </div>
          </div>

          {/* CENTER CONTENT */}
          <div className="text-center lg:w-[56%]">
            <p className="mb-6 inline-flex items-center rounded-full bg-[#ff4c00] px-4 py-2 text-[11px] font-extrabold uppercase tracking-wide text-white">
              LINKEDIN OPTIMIZATION - RECRUITER VISIBILITY
            </p>

            <h1 className="text-4xl font-extrabold leading-tight text-[#111827] md:text-5xl xl:text-[58px]">
              <span className="block md:whitespace-nowrap">
                Your LinkedIn profile
              </span>
              <span className="block md:whitespace-nowrap">
                shouldn't be invisible.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#4b5563]">
              Recruiters don't scroll endlessly.
              They search. They filter. They message only the profiles that rank and convert.
              <br />
              <span className="font-semibold text-[#111]">
                FlashFire optimizes your LinkedIn to do both.
              </span>
            </p>

            <div className="mt-10 flex w-full flex-row flex-nowrap justify-center gap-3 sm:w-auto sm:gap-4">
              <button
                {...getButtonProps()}
                onClick={() => {
                  try {
                    const utmSource = typeof window !== "undefined" && window.localStorage
                      ? localStorage.getItem("utm_source") || "WEBSITE"
                      : "WEBSITE";
                    const utmMedium = typeof window !== "undefined" && window.localStorage
                      ? localStorage.getItem("utm_medium") || "LinkedIn_Page"
                      : "LinkedIn_Page";

                    try {
                      GTagUTM({
                        eventName: "sign_up_click",
                        label: "LinkedIn_Get_Me_Interview_Button",
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
                      trackButtonClick("Get Me Interview", "linkedin_cta", "cta", {
                        button_location: "linkedin_hero_section",
                        section: "linkedin_hero"
                      });
                      trackSignupIntent("linkedin_cta", {
                        signup_source: "linkedin_hero_button",
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
                    const isOnLinkedInPage = normalizedPath === '/linkedin-profile-optimization-services' ||
                      normalizedPath === '/en-ca/linkedin-profile-optimization-services' ||
                      normalizedPath === '/features/linkedin-profile-optimization-services' ||
                      normalizedPath === '/en-ca/features/linkedin-profile-optimization-services' ||
                      normalizedPath === '/features/linkedin-profile-optimization' ||
                      normalizedPath === '/en-ca/features/linkedin-profile-optimization' ||
                      normalizedPath === '/features/linkedin-profile-optimization-tool' ||
                      normalizedPath === '/en-ca/features/linkedin-profile-optimization-tool';

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

                    // If on LinkedIn features page, change URL but keep page content visible
                    if (isOnLinkedInPage) {
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
                }}
                className="flex-1 sm:flex-none h-14 whitespace-nowrap rounded-[8px] border-2 border-black bg-white px-4 text-[14px] font-black text-black transition hover:bg-[#fff8f5]"
                style={{ boxShadow: '0 4px 0 0 rgba(245, 93, 29, 1)' }}
              >
                Get Me Interview <span className="ml-2">&rarr;</span>
              </button>

              <button
                onClick={handleHowItWorks}
                className="flex-1 sm:flex-none h-14 whitespace-nowrap rounded-[8px] border-2 border-[#ff4c00] bg-transparent px-4 text-[14px] font-black text-[#ff4c00] transition hover:bg-white"
              >
                How It Works
              </button>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-6 text-sm text-[#111827] lg:hidden">
              {[
                "Works with free LinkedIn",
                "No login required",
                "Visible results in 7-14 days",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#ff4c00] rounded-full" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT VISUAL PANEL */}
          <div className="relative hidden min-h-[300px] flex-none lg:block lg:w-[26%]">

            {/* Main Card */}
            <div className="relative ml-auto mt-2 right-10 min-h-[205px] w-[260px] rounded-[14px] border border-[#ffc6b3] bg-white shadow-sm xl:w-[300px]">

              <h3 className="border-b border-[#f5d7cc] px-5 py-5 text-[15px] font-extrabold leading-tight text-[#111827]">
                What recruiters actually see
              </h3>

              <div className="space-y-3 px-5 py-4 text-[9px] xl:text-[10px]">
                <div className="flex min-h-[28px] items-center justify-between rounded-sm border border-[#f1e1d8] bg-white px-3">
                  <span className="font-medium">Profile ranking</span>
                  <span className="font-bold text-[#ff4c00]">Top 7%</span>
                </div>

                <div className="flex min-h-[28px] items-center justify-between rounded-sm border border-[#f1e1d8] bg-white px-3">
                  <span className="font-medium">Keyword match</span>
                  <span className="font-bold text-[#ff4c00]">92%</span>
                </div>

                <div className="flex min-h-[28px] items-center justify-between rounded-sm border border-[#f1e1d8] bg-white px-3">
                  <span className="font-medium">Recruiter signals</span>
                  <span className="font-bold text-[#ff4c00]">Optimized</span>
                </div>
              </div>

              <div className="absolute -bottom-18 -right-10 w-[285px] rounded-[6px] bg-[#ff4c00] px-7 py-5 text-white shadow-[0_16px_32px_rgba(255,76,0,0.24)] xl:-right-15 xl:w-[325px]">
                <p className="text-[12px] font-medium leading-snug">
                  "Profiles optimized with FlashFire receive significantly more
                  recruiter messages within the first few weeks."
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>



      {/* ================= RESULTS SECTION ================= */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight text-[#111827] md:text-4xl">
            Flashfire's LinkedIn Profile Optimization Service doesn't just look
            good-it gets replies.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#4b5563]">
            FlashFire optimizes your LinkedIn profile for recruiter searches,
            keyword ranking, and conversion -- so your profile shows up and
            actually gets responses.
          </p>

          <div className="mt-14 grid auto-rows-fr gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "1,000+", label: "PROFILES OPTIMIZED" },
              { value: "95%", label: "SUCCESS RATE" },
              { value: "14 Days", label: "VISIBILITY BOOST" },
              { value: "2.3x", label: "RECRUITER REPLIES" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex h-full min-w-0 flex-col items-center justify-center overflow-hidden border border-[#111827] bg-white px-8 py-7 text-center"
                style={{ boxShadow: "4px 4px 0 0 #111827" }}
              >
                <h3 className="text-4xl font-extrabold text-[#ff4c00]">
                  {item.value}
                </h3>
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[#6b7280]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ================= STEPS SECTION ================= */}
      <section id="how-it-works" className="overflow-hidden bg-[#fff7f4] py-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 lg:flex-row lg:items-start">
          <div className="lg:w-2/5">
            <h2 className="max-w-lg text-3xl font-extrabold leading-tight text-[#111827] md:text-4xl">
              From LinkedIn profile optimization to interview calls, in just 4
              focused steps.
            </h2>

            <p className="mt-8 max-w-lg text-base leading-relaxed text-[#4b5563]">
              Recruiters don't browse randomly. They search with intent.
              FlashFire aligns your profile with exactly what they look for.
            </p>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                aria-label="Previous step"
                onClick={() => scrollSteps("left")}
                className="flex h-12 w-12 items-center justify-center bg-black text-white transition hover:bg-[#ff4c00]"
              >
                <ArrowLeft size={24} />
              </button>
              <button
                type="button"
                aria-label="Next step"
                onClick={() => scrollSteps("right")}
                className="flex h-12 w-12 items-center justify-center bg-black text-white transition hover:bg-[#ff4c00]"
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </div>

          <div
            ref={stepsRef}
            className="hide-scrollbar flex items-stretch gap-6 overflow-x-auto pb-4 lg:w-3/5"
          >
            {[
              {
                step: "Step 1",
                title: "Shared Your LinkedIn Profile",
                desc: "Paste your LinkedIn URL. No login required -- we securely analyze your public profile.",
              },
              {
                step: "Step 2",
                title: "Recruiter Search Optimized",
                desc: "Our experts optimize headlines, keywords, skills, and experience for recruiter searches.",
              },
              {
                step: "Step 3",
                title: "Rank higher, get noticed",
                desc: "Drop your improved profile into recruiter search patterns and relevant role discovery.",
              },
              {
                step: "Step 4",
                title: "Receive interview messages",
                desc: "Better positioning helps turn profile visibility into real recruiter conversations.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex min-h-[300px] w-[min(288px,calc(100vw-3rem))] shrink-0 flex-col justify-between overflow-hidden border border-[#111827] bg-white p-6"
                style={{ boxShadow: "5px 5px 0 0 #111827" }}
              >
                <div>
                  <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff4c00] text-white">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h4 className="text-xl font-extrabold text-[#111827]">
                    {item.title}
                  </h4>
                  <p className="mt-5 leading-relaxed text-[#4b5563]">
                    {item.desc}
                  </p>
                </div>
                <span className="mt-8 inline-flex w-fit rounded-md bg-[#ff4c00] px-5 py-3 text-sm font-extrabold text-white">
                  {item.step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHO IS THIS FOR ================= */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-extrabold leading-tight text-[#111827] md:text-4xl">
              Is FlashFire's LinkedIn
              <br />
              Optimization Right for You?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#4b5563]">
              If recruiters aren't reaching out, your LinkedIn profile isn't
              working. FlashFire fixes visibility, positioning, and conversion
              -- together.
            </p>
          </div>

          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
            {[
              {
                title: "Active Job Seekers",
                desc: "Applying regularly but not getting interview callbacks",
              },
              {
                title: "Career Switchers",
                desc: "Repositioning skills for a new role or industry",
              },
              {
                title: "Mid Senior Professionals",
                desc: "Targeting better roles, pay, or companies",
              },
              {
                title: "Low Recruiter Response",
                desc: "Strong experience but no inbound messages",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="h-full min-w-0 overflow-hidden rounded-md border border-[#d1d5db] bg-white p-7 shadow-md"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff4c00] text-white">
                  <Check className="h-6 w-6" />
                </div>

                <h4 className="text-xl font-extrabold text-[#ff4c00]">
                  {item.title}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-[#6b7280]">
            We don't just rewrite profiles -- we optimize them for how
            recruiters actually search.
          </p>
        </div>
      </section>

      {/* ================= WHY THIS WORKS ================= */}
      <section className="bg-white pt-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-[#111827] md:text-4xl">
            How FlashFire Stands Out
            <br />
            Your LinkedIn Profile?
          </h2>
        </div>

        <div className="mt-16 bg-[#fff0ea] py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Recruiters search, not scroll",
                desc: "Most recruiters use keyword-based searches. If your profile doesn't match, it never appears.",
              },
              {
                title: "Ranking alone isn't enough",
                desc: "Even ranked profiles fail if the headline and experience don't convert interest into action.",
              },
              {
                title: "Generic profiles blend in",
                desc: "Profiles written for everyone fail to stand out. Specificity drives recruiter engagement.",
              },
              {
                title: "Optimized profiles get replies",
                desc: "Clear positioning + keyword alignment leads to more messages and interview calls.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#ff4c00] px-7 py-8 text-center text-white"
                style={{ boxShadow: "4px 4px 0 0 #111827" }}
              >
                <h4 className="text-xl font-extrabold">
                  {item.title}
                </h4>
                <p className="mt-8 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= FAQ ================= */}
      <section id="faq" className={faqStyles.faqSection}>
        <div id="faq-header" className={faqStyles.header}>
          <h2>Question? We Got You Answers.</h2>
          <p>
            We get it, LinkedIn optimization can sound complex. Here's everything
            explained, plain and simple.
          </p>
        </div>

        <div className={faqStyles.faqContainer}>
          {linkedinOptimizationFAQs.map((faq, index) => (
            <div
              key={index}
              className={`${faqStyles.faqItem} ${
                activeFaqIndex === index ? faqStyles.active : ""
              }`}
            >
              <button
                className={faqStyles.faqQuestion}
                onClick={() => handleFaqToggle(index)}
              >
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

      {/* ================= FINAL CTA (same as homepage) ================= */}
      <HomePageDemoCTA />
      <Footer />
    </div>
  );
}
