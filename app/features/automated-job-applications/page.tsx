"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import {
  FaArrowRight,
  FaBolt,
  FaCheck,
  FaCrosshairs,
  FaExclamationTriangle,
  FaFileAlt,
  FaGlobe,
  FaPlus,
  FaRocket,
  FaTimes,
} from "react-icons/fa";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";

const stats = [
  { value: "1,200+", label: "Applications Automated" },
  { value: "75%", label: "ATS Pass Rate" },
  { value: "24/7", label: "Active Monitoring" },
  { value: "3x", label: "Faster Response" },
];

const features = [
  {
    icon: <FaFileAlt className="h-5 w-5" />,
    title: "Always First to Apply",
    desc: "Flashfire analyzes your resume against job descriptions to detect missing keywords, formatting issues, and ATS compatibility problems.",
  },
  {
    icon: <FaFileAlt className="h-5 w-5" />,
    title: "ATS-Optimized Applications",
    desc: "Flashfire analyzes your resume against job descriptions to detect missing keywords, formatting issues, and ATS compatibility problems.",
  },
  {
    icon: <FaFileAlt className="h-5 w-5" />,
    title: "Consistent Weekly Momentum",
    desc: "Flashfire analyzes your resume against job descriptions to detect missing keywords, formatting issues, and ATS compatibility problems.",
  },
];

const audienceGroups = [
  {
    title: "Active Job Seekers",
    desc: "Optimized to fit on a single page, making it easy for recruiters to scan quickly and efficiently.",
    icon: <FaFileAlt className="h-5 w-5" />,
  },
  {
    title: "High-Volume Applicants",
    desc: "Quantified achievements and measurable results that showcase your value and impact.",
    icon: <FaBolt className="h-5 w-5" />,
  },
  {
    title: "ATS-Rejected Candidates",
    desc: "Clean structure and formatting that passes automated screening systems with ease.",
    icon: <FaCrosshairs className="h-5 w-5" />,
  },
  {
    title: "Automation-First Job Seekers",
    desc: "Perfect spelling and grammar throughout, maintaining a polished, professional appearance.",
    icon: <FaFileAlt className="h-5 w-5" />,
  },
  {
    title: "International Applicants",
    desc: "Snapshot your top skills and qualifications at the very beginning.",
    icon: <FaGlobe className="h-5 w-5" />,
  },
  {
    title: "Career Changers & Recent Graduates",
    desc: "Use strong action verbs and concise language for maximum impact.",
    icon: <FaRocket className="h-5 w-5" />,
  },
];

const comparisonData = [
  {
    title: "Application Process",
    caption:
      "Manual: Repetitive, time-consuming, inconsistent | Flashfire: AI-driven job application automation at scale",
  },
  {
    title: "ATS-Friendly Resume Optimization",
    caption: "Resumes tailored to each job description with ATS-friendly keywords",
  },
  {
    title: "Time Efficiency in Job Search",
    caption: "150+ hours saved through AI-powered automation",
  },
  {
    title: "Accuracy & Attention to Detail",
    caption: "Role-matched applications reviewed by AI + humans",
  },
  {
    title: "Automated Applications",
    caption: "1,200+ smart applications sent strategically - not spam",
  },
  {
    title: "Application Tracking & Proof",
    caption: "Real-time tracking with visible proof and updates",
  },
  {
    title: "Interview Opportunity Rate",
    caption: "Higher interview conversion rates within weeks",
  },
];

const manualProblems = [
  "Hundreds of candidates apply within hours of posting",
  "ATS filters reject most resumes before humans see them",
  "Manual applications can't scale consistently",
  "There's no feedback loop to improve results",
  "Why Manual Job applications Fail?",
];

const aiSolutions = [
  "Automates job applications instantly when roles go live",
  "AI Refines Applications for Better Matching",
  "Scales applications without fatigue or burnout",
  "How AI changes the game",
  "Learns from outcomes and continuously improves",
];

const problemSolutionPairs = [
  {
    problem: "Jobs get crowded fast",
    detail: "Hundreds of candidates can apply within hours of a role going live.",
    solution: "Flashfire applies early",
    result: "AI monitors fresh openings and helps you apply when timing matters most.",
  },
  {
    problem: "ATS filters block resumes",
    detail: "Many resumes are rejected before a recruiter ever reads them.",
    solution: "Applications are ATS-ready",
    result: "Flashfire refines applications for stronger keyword and role matching.",
  },
  {
    problem: "Manual applying burns time",
    detail: "Repeating forms and tailoring every application is hard to sustain.",
    solution: "Automation keeps momentum",
    result: "You can scale applications without the fatigue of doing it all manually.",
  },
  {
    problem: "No feedback loop",
    detail: "Manual job searches often make it hard to see what is improving.",
    solution: "AI learns and improves",
    result: "Flashfire uses outcomes to continuously sharpen future applications.",
  },
];

const jobAutomationFAQs = [
  {
    question: "What is job application automation and how can it help me apply to more jobs?",
    answer:
      " Job application automation uses AI to apply to jobs automatically on your behalf. Flashfire's job application automation tool helps you automate job applications, tailor resumes for ATS systems, and apply faster than manual job searches.",
  },
  {
    question: "How does automating job applications increase my chances of landing interviews?",
    answer:
      " Automating job applications ensures speed, consistency, and keyword optimization. Flashfire's AI job application tool submits ATS-optimized applications instantly, improving visibility and interview conversion rates.",
  },
  {
    question: "Can job application automation help me land my dream job faster?",
    answer:
      " By applying to high-fit roles consistently and quickly, you're more likely to land interviews and offers in less time.",
  },
  {
    question: "How do I optimise my LinkedIn profile to improve automated job application results?",
    answer:
      " Make sure your profile matches your target job title, keywords, and skills. FlashFire's team also does this manually for you.",
  },
  {
    question: "What is an ATS resume, and why is it important for automated job applications?",
    answer:
      " An ATS resume is optimized to pass recruiter filters and software systems, which improves shortlisting odds. FlashFire tailors yours for each job.",
  },
  {
    question: "How does AI for job search integrate with job application automation tools?",
    answer:
      " Our AI scans job descriptions, extracts key requirements, and inserts them into your resume before our team submits each application.",
  },
  {
    question: "Does FlashFireJobs act as an AI job board with built-in automation features?",
    answer:
      " It combines AI resume matching + human-powered application submission, unlike traditional job boards.",
  },
  {
    question: "What are the best practices for job application automation to avoid common pitfalls?",
    answer:
      " Avoid mass-blind applications. Instead, target fresh, relevant roles with optimized resumes - which FlashFire does manually for each job.",
  },
  {
    question: "Can I customize applications while using automation?",
    answer:
      "Yes. Flashfire combines automated job applications with role-specific customization, ensuring every application is optimized without manual effort.",
  },
  {
    question: "How does automating job applications work with AI-powered job matching and alerts?",
    answer:
      " We use AI to match jobs based on your preferences, optimize your resume, then apply - while keeping you updated via WhatsApp.",
  },
];

export default function JobApplicationAutomationPage() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const { getButtonProps } = useGeoBypass({ onBypass: () => {} });

  const handleFaqToggle = (index: number) =>
    setActiveFaqIndex(activeFaqIndex === index ? null : index);

  const handleGetMeInterview = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Job_Automation_Page"
          : "Job_Automation_Page";
      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Job_Automation_Get_Me_Interview_Button",
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
        trackButtonClick("Get Me Interview", "job_automation_cta", "cta", {
          button_location: "job_automation_hero_section",
          section: "job_automation_hero",
        });
        trackSignupIntent("job_automation_cta", {
          signup_source: "job_automation_hero_button",
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
      const isOnJobAutomationPage =
        normalizedPath === "/job-application-automation" ||
        normalizedPath === "/en-ca/job-application-automation" ||
        normalizedPath === "/features/job-automation" ||
        normalizedPath === "/en-ca/features/job-automation" ||
        normalizedPath === "/features/automated-job-applications" ||
        normalizedPath === "/en-ca/features/automated-job-applications";

      if (isAlreadyOnGetMeInterview) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
        }
        requestAnimationFrame(() =>
          window.scrollTo({ top: currentScrollY, behavior: "instant" })
        );
        return;
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
      }
      if (isOnJobAutomationPage) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
        if (typeof window !== "undefined") {
          window.history.pushState(
            {},
            "",
            normalizedPath.startsWith("/en-ca")
              ? "/en-ca/get-me-interview"
              : "/get-me-interview"
          );
        }
        requestAnimationFrame(() =>
          window.scrollTo({ top: currentScrollY, behavior: "instant" })
        );
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
    name: "Automated Job Applications",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/job-automation.png",
    description:
      "Automated job applications powered by AI help you apply faster, target the right roles, and get interview calls sooner with FlashfireJobs. Check out now",
    brand: { "@type": "Brand", name: "FlashFire" },
    offers: {
      "@type": "Offer",
      url: "https://www.flashfirejobs.com/features/automated-job-applications",
      priceCurrency: "USD",
      price: "0",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "95",
    },
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flashfire Automated Job Applications",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.flashfirejobs.com/features/automated-job-applications",
    description: "Automated job applications powered by AI help you apply faster, target the right roles, and get interview calls sooner.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "95" },
  };

  const faqSchemaAutomation = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: jobAutomationFAQs.map((faq) => ({
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
      { "@type": "ListItem", position: 3, name: "Automated Job Applications", item: "https://www.flashfirejobs.com/features/automated-job-applications" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaAutomation) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="min-h-screen bg-white font-['Space_Grotesk',sans-serif] text-[#111827]">
        <section className="relative overflow-hidden bg-[#fff1eb] py-16 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-[1180px] px-5">
            <div className="relative mx-auto max-w-3xl text-center">
              <div className="mb-5 inline-flex max-w-full rounded-full bg-[#ff4c00] px-3 py-1.5 text-[10px] font-bold text-white sm:px-4 sm:text-[11px]">
                # AI-Powered Job Automation
              </div>
              <h1 className="mx-auto max-w-[760px] text-[31px] font-extrabold leading-[1.12] tracking-normal text-[#0b0b0b] sm:text-5xl lg:text-[54px]">
                Job Application Automation That Helps You Apply Faster &amp; Get
                Interviews
              </h1>
              <p className="mx-auto mt-5 max-w-[700px] text-sm font-medium leading-6 text-[#7b8191] sm:mt-7 sm:text-base sm:leading-7">
                Flashfire is an AI-powered job application automation tool that helps
                you automate job applications, optimize resumes for ATS, and apply to
                roles instantly. So you stay ahead in competitive job markets.
              </p>
              <button
                {...getButtonProps()}
                onClick={handleGetMeInterview}
                className="mt-8 inline-flex w-full max-w-[250px] items-center justify-center gap-2 border-2 border-[#111] bg-white px-6 py-3.5 text-sm font-extrabold text-[#111] shadow-[0_4px_0_#ff4c00] transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_#ff4c00] sm:mt-10 sm:w-auto sm:max-w-none sm:px-8 sm:py-4 sm:text-base"
              >
                Get Me Interview <FaArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="pointer-events-none absolute left-[6%] top-[38%] hidden w-[190px] rounded-xl border border-[#e5e7eb] bg-white p-3 shadow-sm lg:block">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-end justify-center rounded-lg border border-[#cbd5e1] px-1.5 pb-1">
                  <span className="mr-0.5 h-2 w-1 rounded bg-[#111827]" />
                  <span className="mr-0.5 h-4 w-1 rounded bg-[#111827]" />
                  <span className="h-6 w-1 rounded bg-[#111827]" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-[#111827]">
                    Resume Strength
                  </p>
                  <p className="text-[10px] font-medium text-[#7b8191]">
                    James Steele - Product Engineer
                  </p>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute left-[15%] top-[54%] hidden w-[110px] rounded-lg bg-white p-4 text-center shadow-sm md:block">
              <p className="text-[10px] font-bold uppercase text-[#7b8191]">Score</p>
              <p className="text-3xl font-extrabold leading-none text-[#ff4c00]">82</p>
              <p className="mt-1 text-[10px] font-extrabold text-[#111827]">
                ATS Compatibility
              </p>
            </div>

            <div className="pointer-events-none absolute right-[2%] top-[43%] hidden w-[300px] rounded-xl bg-white p-5 shadow-[0_22px_45px_rgba(17,24,39,0.18)] lg:block">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5c5c]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffc328]" />
                  <span className="h-3 w-3 rounded-full bg-[#19c463]" />
                </div>
                <span className="text-[10px] font-medium text-[#a0a7b5]">
                  Live Applications
                </span>
              </div>
              <div className="space-y-3">
                {[
                  "Software Engineer @ Google",
                  "Product Manager @ Meta",
                  "Data Scientist @ Netflix",
                ].map((job) => (
                  <div key={job} className="rounded-lg bg-[#f8fafc] p-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ff5a00] text-xs font-bold text-white">
                        {job.charAt(0)}
                      </span>
                      <div>
                        <p className="text-[11px] font-extrabold text-[#111827]">
                          {job}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1 text-[10px] font-bold text-[#18b85f]">
                          <FaCheck className="h-2.5 w-2.5" /> Applied 2m ago
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto grid max-w-[850px] grid-cols-2 gap-4 px-5 sm:gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-[#111] bg-white px-3 py-5 text-center shadow-[3px_4px_0_#111] sm:px-8 sm:py-7 sm:shadow-[4px_5px_0_#111]"
              >
                <p className="text-[28px] font-extrabold leading-none text-[#ff4c00] sm:text-[34px]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[9px] font-extrabold uppercase leading-tight tracking-[0.06em] text-[#7b8191] sm:mt-3 sm:text-[11px] sm:tracking-[0.08em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="bg-[#fff7f5] py-16 sm:py-24">
          <div className="mx-auto max-w-[960px] px-5">
            <SectionHeader
              badge="How It Works"
              title="Flashfire AI Job Application Automation Platform"
              description="ATS-friendly, recruiter-ready, and focused on real improvements that get results."
            />
            <div className="mt-10 grid auto-rows-fr gap-5 sm:mt-16 md:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="h-full min-w-0 overflow-hidden border border-[#111] bg-[#ff4c00] p-4 text-white shadow-[3px_3px_0_#111] sm:shadow-[4px_4px_0_#111]"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#ff4c00] sm:mb-7">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-extrabold leading-tight sm:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-white/90 sm:mt-4 sm:text-base sm:leading-7">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-[900px] px-5">
            <SectionHeader
              badge="How It Works"
              title="Manual Job Search vs Flashfire Automated Job Application System"
              description="See the difference Flashfire makes in your job search journey"
            />
            <div className="mt-10 overflow-hidden border border-[#9ca3af] bg-white sm:mt-20">
              <div className="h-9 bg-[#ff4c00] sm:h-12" />
              {comparisonData.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className={`grid grid-cols-[minmax(0,1fr)_38px_38px] items-center border-t border-[#9ca3af] px-3 py-4 sm:grid-cols-[1fr_76px_76px] sm:px-4 sm:py-5 ${
                    index % 2 === 1 ? "bg-[#fff1eb]" : "bg-white"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="break-words text-xs font-extrabold text-[#111] sm:text-base">
                      {item.title}
                    </p>
                    <p className="mt-1 break-words text-[10px] font-medium leading-tight text-[#7b8191] sm:text-xs">
                      {item.caption}
                    </p>
                  </div>
                  <FaTimes className="mx-auto h-3.5 w-3.5 text-[#ff4c00] sm:h-4 sm:w-4" />
                  <span className="mx-auto flex h-4 w-4 items-center justify-center rounded-full bg-[#18c45f] text-white sm:h-5 sm:w-5">
                    <FaCheck className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[900px] px-5">
            <SectionHeader
              badge="Built For Modern Job Seekers"
              title="Who Is This Job Application Automation Tool For?"
              description="ATS-friendly, recruiter-ready, and focused on real improvements that get results."
            />
            <div className="mt-10 grid auto-rows-fr border border-[#111] bg-white shadow-[3px_3px_0_#111] sm:mt-16 sm:grid-cols-2 sm:shadow-[4px_4px_0_#111] lg:grid-cols-3">
              {audienceGroups.map((group, index) => (
                <div
                  key={group.title}
                  className={`h-full min-w-0 overflow-hidden border-[#111] p-5 sm:p-7 ${
                    index !== audienceGroups.length - 1 ? "border-b" : ""
                  } ${index % 2 === 0 ? "sm:border-r" : "sm:border-r-0"} ${
                    index >= 4 ? "sm:border-b-0" : ""
                  } ${index < 3 ? "lg:border-b" : "lg:border-b-0"} ${
                    index % 3 !== 2 ? "lg:border-r" : "lg:border-r-0"
                  }`}
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff4c00] text-white sm:mb-6">
                    {group.icon}
                  </div>
                  <h3 className="text-base font-extrabold text-[#111827] sm:text-xl">
                    {group.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#596173] sm:mt-4 sm:text-base sm:leading-7">
                    {group.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-24">
          <div className="mx-auto max-w-[760px] px-5">
            <div className="mx-auto text-center">
              <span className="inline-flex max-w-full rounded-full border border-[#ffd0bd] bg-white px-3 py-1 text-center text-[10px] font-extrabold uppercase leading-tight text-[#ff4c00]">
                The Problem With Modern Job Search
              </span>
              <h2 className="mx-auto mt-5 max-w-[620px] text-[33px] font-extrabold leading-[1.04] tracking-normal text-[#111827] sm:mt-7 sm:text-[42px]">
                Why job hunting breaks down and how AI fixes it
              </h2>
            </div>
            <div className="mt-9 space-y-4 md:hidden">
              {problemSolutionPairs.map((item, index) => (
                <div
                  key={item.problem}
                  className="border border-[#111] bg-white shadow-[3px_3px_0_#111]"
                >
                  <div className="border-b border-[#111] bg-[#ffffff] p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase text-[#ff4c00]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ff4c00] text-xs text-white">
                        {index + 1}
                      </span>
                      Problem
                    </div>
                    <h3 className="text-xl font-extrabold leading-tight text-[#111827]">
                      {item.problem}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-6 text-[#596173]">
                      {item.detail}
                    </p>
                  </div>
                  <div className="bg-[#fff1eb] p-4">
                    <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase text-[#15803d]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#18c45f] text-white">
                        <FaCheck className="h-3.5 w-3.5" />
                      </span>
                      AI Fix
                    </div>
                    <h3 className="text-xl font-extrabold leading-tight text-[#111827]">
                      {item.solution}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-6 text-[#596173]">
                      {item.result}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 hidden border border-[#111] bg-white sm:mt-20 md:block">
              <div className="grid grid-cols-2">
                <div className="bg-[#f7f7f7] px-4 py-4 text-xs font-extrabold text-[#111] sm:px-5 sm:text-base">
                  <FaExclamationTriangle className="mr-2 inline h-4 w-4 text-[#ff4c00]" />
                  Why Manual Job applications Fail?
                </div>
                <div className="border-l border-[#111] bg-[#ff4c00] px-4 py-4 text-xs font-extrabold text-white sm:px-5 sm:text-base">
                  <FaCheck className="mr-2 inline h-4 w-4" />
                  How AI changes the game
                </div>
              </div>
              {manualProblems.map((problem, index) => {
                const solution = aiSolutions[index];

                return (
                  <div key={problem} className="grid grid-cols-2">
                    <div className="flex min-h-[82px] items-center border-t border-[#111] px-4 py-4 text-xs font-medium leading-5 text-[#555] sm:px-5 sm:py-5 sm:text-sm">
                      {problem}
                    </div>
                    <div className="flex min-h-[82px] items-center border-l border-t border-[#111] border-t-[#ff9b75] bg-[#fff1eb] px-4 py-4 text-xs font-extrabold leading-5 text-[#111] sm:px-5 sm:py-5 sm:text-sm">
                      <FaCheck className="mr-2 inline h-4 w-4 text-[#ff4c00]" />
                      {solution}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="faq" className={faqStyles.faqSection}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>Job Application Automation FAQs</h2>
            <p>
              We get it, job application automation can sound complex. Here&apos;s
              everything explained, plain and simple.
            </p>
          </div>

          <div className={faqStyles.faqContainer}>
            {jobAutomationFAQs.map((faq, index) => (
              <div
                key={faq.question}
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
      </main>
      <Footer />
    </>
  );
}

function SectionHeader({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto text-center">
      <span className="inline-flex max-w-full rounded-full border border-[#ffd0bd] bg-white px-3 py-1 text-center text-[9px] font-extrabold uppercase leading-tight text-[#ff4c00] sm:text-[10px]">
        {badge}
      </span>
      <h2 className="mx-auto mt-5 max-w-[720px] text-[28px] font-extrabold leading-[1.08] tracking-normal text-[#111827] sm:mt-7 sm:text-[50px]">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-4 max-w-[600px] text-sm font-medium leading-6 text-[#596173] sm:mt-6 sm:text-base sm:leading-7">
          {description}
        </p>
      ) : null}
    </div>
  );
}
