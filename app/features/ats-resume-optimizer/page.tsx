"use client"

import React, { useRef, useState } from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import Navbar from "@/src/components/navbar/navbar"
import Footer from "@/src/components/footer/footer"
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart,
  CheckCircle,
  FileCheck2,
  FileText,
  Layout,
  Mail,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  Zap,
} from "lucide-react"
import { FaPlus, FaTimes } from "react-icons/fa"
import styles from "@/src/components/homePageFAQ/homePageFAQ.module.css"
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking"
import { GTagUTM } from "@/src/utils/GTagUTM"
import { useGeoBypass } from "@/src/utils/useGeoBypass"

const ORANGE = "#ff4c00"

const IconBox = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div
    className={`flex size-8 items-center justify-center rounded-[8px] ${
      light ? "bg-white text-[#ff4c00]" : "bg-[#ff4c00] text-white"
    }`}
  >
    {children}
  </div>
)

const SectionHeader = ({
  title,
  description,
  className = "",
}: {
  title: React.ReactNode
  description: React.ReactNode
  className?: string
}) => (
  <div className={`mx-auto max-w-[720px] text-center ${className}`}>
    <h2 className="text-[30px] font-black leading-[0.96] tracking-normal text-[#10182c] sm:text-[40px]">
      {title}
    </h2>
    <p className="mx-auto mt-4 max-w-[590px] text-[14px] font-medium leading-6 text-[#566070]">{description}</p>
  </div>
)

const CheckLine = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center gap-3 text-[14px] font-medium text-[#566070]">
    <CheckCircle className="size-4 shrink-0 text-[#ff4c00]" />
    <span>{children}</span>
  </li>
)

const FeatureImagePreview = ({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width: number
  height: number
}) => (
  <div className="flex h-full min-h-[230px] items-center rounded-[8px] border border-[#ffd8ca] bg-[#fff7f3] p-3 shadow-[0_14px_26px_rgba(255,76,0,0.06)] sm:p-4">
    <div className="w-full overflow-hidden rounded-[6px] border border-[#eadbd4] bg-white">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full object-contain"
        sizes="(min-width: 768px) 430px, calc(100vw - 72px)"
      />
    </div>
  </div>
)

export default function Page() {
  const score = 82
  const stepsRef = useRef<HTMLDivElement | null>(null)
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener.
    },
  })

  const resumeOptimizerFAQs = [
    {
      question: "What is an ATS resume optimizer?",
      answer:
        "An ATS resume optimizer improves your resume's compatibility with Applicant Tracking Systems by optimizing keywords, formatting, and structure. Flashfire uses AI resume optimization to help your resume pass automated screening and reach recruiters.",
    },
    {
      question: "How does a resume scanner for ATS work?",
      answer:
        "A resume scanner for ATS compares your resume against job descriptions, checks keyword alignment, and flags formatting issues that could block ATS parsing. Flashfire's ATS resume checker tool performs this scan instantly using AI.",
    },
    {
      question: "Is Flashfire a free ATS resume checker?",
      answer:
        "Yes. Flashfire offers a free ATS resume checker that scans your resume, identifies optimization gaps, and provides actionable recommendations before you apply.",
    },
    {
      question: "What's the difference between an ATS resume checker and an AI resume optimizer?",
      answer:
        "An ATS resume checker identifies issues, while an AI resume optimizer fixes them. Flashfire combines both scanning your resume for ATS compatibility and automatically optimizing it using AI.",
    },
    {
      question: "What is an ATS optimized resume, and why do I need one?",
      answer:
        " It's a resume that's formatted and keyword-optimized to pass recruiter software filters, ensuring you're not rejected automatically.",
    },
    {
      question: "how does resume optimization for ATS improve my job application success?",
      answer:
        " It increases your visibility in recruiter searches and boosts your chances of getting shortlisted - especially when applying in bulk.",
    },
    {
      question: "What is an ATS resume checker, and how does it work?",
      answer:
        " It scans your resume against a job description to assess keyword match, formatting, and readability for Applicant Tracking Systems.",
    },
    {
      question: "Is there a resume maker for fresher beginners on FlashFireJobs?",
      answer:
        " Our team builds ATS-compliant resumes even for freshers, highlighting education, projects, and relevant skills with proper structure.",
    },
    {
      question: "Which resume builder app is best for creating professional resumes?",
      answer:
        " FlashFireJobs offers a team-built resume service with AI-backed optimization - more powerful than typical drag-and-drop builders.",
    },
    {
      question: "Where can I find the best ATS resume checker free online?",
      answer: " FlashFireJobs offers a free resume checker as part of our application service. You can also request a manual review.",
    },
    {
      question: "Is there an ATS resume checker free tool I can use right now?",
      answer: " Users can access resume feedback and ATS alignment checks as part of their FlashFireJobs onboarding.",
    },
    {
      question: "What features should I look for in the best free resume builder?",
      answer: " Look for tools that include ATS formatting, keyword optimization, PDF export, and tailored suggestions for your field.",
    },
    {
      question: "Can I create a resume using a free resume builder AI?",
      answer: " FlashFire goes a step beyond by manually optimizing your resume with AI guidance and human input.",
    },
    {
      question: "How does a free resume maker AI help me craft a compelling resume?",
      answer:
        " It identifies the right structure, skills, and job keywords, helping you build a resume that's clear, relevant, and compliant.",
    },
    {
      question: "What is the best app for resume making for both freshers and experienced candidates?",
      answer:
        " FlashFireJobs supports both - we customize resumes for early-career, mid-level, and senior professionals, tailored to your goals.",
    },
    {
      question: "Does FlashFireJobs offer an AI job board to find smart job matches?",
      answer:
        " We scrape jobs based on your preferences, optimize your resume, and apply on your behalf to save 150+ hours.",
    },
    {
      question: "How does an AI powered job search help me find jobs faster?",
      answer:
        " AI filters out irrelevant roles and matches you with high-fit jobs, increasing application success and reducing manual effort.",
    },
    {
      question: "What is a job search virtual assistant, and how can it simplify my job hunt?",
      answer:
        " It's a human-assisted AI system (like FlashFire) that manages your job hunt end-to-end, from resume to application to tracking.",
    },
    {
      question: "Can FlashFireJobs auto apply to jobs and provide job application assistance to streamline my applications?",
      answer:
        " Our team manually applies to 1,200+ jobs on your behalf, using AI-optimized resumes, tracked in a real-time dashboard.",
    },
  ]

  const featureCards = [
    {
      icon: Target,
      title: "Role-Specific Optimization",
      desc: "We optimize your base resume for each job description, ensuring perfect alignment with role requirements and ATS systems",
      checks: ["JD-matched keywords and skills", "ATS-friendly formatting", "Customized for every application"],
      image: {
        src: "/images/resumeOpt1.png",
        alt: "Flashfire resume optimizer job attachment step showing a resume match score against a job posting",
        width: 1723,
        height: 856,
      },
    },
    {
      icon: Award,
      title: "Recruiter-Ready Results",
      desc: "Clean, impactful structure that hiring managers can skim quickly while staying ATS-compliant",
      checks: ["1-page optimized format", "Impactful, quantified achievements", "Perfect spelling & grammar"],
      image: {
        src: "/images/resumeOpti2.png",
        alt: "Optimized resume preview with download and print instruction controls",
        width: 1335,
        height: 741,
      },
      flip: true,
    },
    {
      icon: TrendingUp,
      title: "Real Improvements That Get Results",
      desc: "ATS-friendly, recruiter-ready, and focused on real improvements that get results",
      checks: ["Measurable improvements", "Keyword optimization", "Format consistency"],
      image: {
        src: "/images/resumeOpt3.png",
        alt: "Resume optimization changes comparison showing old and optimized summary text",
        width: 1255,
        height: 739,
      },
    },
  ]

  const analysisItems = [
    {
      icon: FileText,
      title: "1 Page Resume",
      desc: "Optimized to fit on a single page, making it easy for recruiters to scan quickly and efficiently.",
    },
    {
      icon: BarChart,
      title: "Impact-ful Content",
      desc: "Quantified achievements and measurable results that showcase your value and impact.",
    },
    {
      icon: Target,
      title: "ATS Friendly Format",
      desc: "Clean structure and formatting that passes automated screening systems with ease.",
    },
    {
      icon: FileText,
      title: "Spelling & Grammar",
      desc: "Perfect spelling and grammar throughout, maintaining a polished, professional appearance.",
    },
    {
      icon: Layout,
      title: "Professional Summary",
      desc: "Snapshot your top skills and qualifications at the very beginning.",
    },
    {
      icon: Sparkles,
      title: "Word Choice",
      desc: "Use strong action verbs and concise language for maximum impact.",
    },
    {
      icon: Layout,
      title: "Formatting",
      desc: "ATS-friendly layout that properly extracts and organizes details.",
    },
    {
      icon: Mail,
      title: "Contact Information",
      desc: "Clear, complete contact details that pass all ATS checks.",
    },
    {
      icon: CheckCircle,
      title: "Comprehensiveness",
      desc: "Covers summary, skills, experience, and education coherently.",
    },
  ]

  const steps = [
    {
      step: 1,
      icon: Upload,
      title: "Upload Your Resume",
      desc: "Drop your resume file from any device. We support DOC, DOCX, PDF, and TXT formats up to 5MB.",
    },
    {
      step: 2,
      icon: FileText,
      title: "Copy & Paste Job Description",
      desc: "Paste the job description for the role you're applying to. Our system will analyze requirements and keywords.",
    },
    {
      step: 3,
      icon: Zap,
      title: "Optimization",
      desc: "Our AI optimizes your resume by aligning keywords, skills, and formatting to match the job description perfectly.",
    },
    {
      step: 4,
      icon: BarChart,
      title: "View the Changes",
      desc: "Review the optimized version with highlighted improvements and see how your resume matches the job requirements.",
    },
    {
      step: 5,
      icon: CheckCircle,
      title: "Download",
      desc: "Download your optimized, ATS-friendly resume and apply to jobs with confidence.",
    },
  ]

  const valueCards = [
    {
      title: "Smart ATS Scanning",
      desc: "Flashfire analyzes your resume against job descriptions to detect missing keywords, formatting issues, and ATS compatibility problems.",
    },
    {
      title: "AI-Based Resume Optimization",
      desc: "Instead of generic suggestions, Flashfire uses AI to recommend role-specific improvements that boost ATS ranking and recruiter relevance.",
    },
    {
      title: "Built for Recruiter Visibility",
      desc: "Optimizations are designed to balance ATS requirements with human readability so your resume works for both systems and people.",
    },
  ]

  const handleFaqToggle = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index)
  }

  const handleGetMeInterview = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage ? localStorage.getItem("utm_source") || "WEBSITE" : "WEBSITE"
      const utmMedium =
        typeof window !== "undefined" && window.localStorage ? localStorage.getItem("utm_medium") || "ATS_Page" : "ATS_Page"

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "ATS_Get_Me_Interview_Button",
          utmParams: {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign:
              typeof window !== "undefined" && window.localStorage
                ? localStorage.getItem("utm_campaign") || "Website"
                : "Website",
          },
        })
      } catch (gtagError) {
        console.warn("GTagUTM error:", gtagError)
      }

      try {
        trackButtonClick("Get Me Interview", "ats_cta", "cta", {
          button_location: "ats_hero_section",
          section: "ats_hero",
        })
        trackSignupIntent("ats_cta", {
          signup_source: "ats_hero_button",
          funnel_stage: "signup_intent",
        })
      } catch (trackError) {
        console.warn("Tracking error:", trackError)
      }

      const currentPath = pathname || (typeof window !== "undefined" ? window.location.pathname : "")
      const normalizedPath = currentPath.split("?")[0]
      const isAlreadyOnGetMeInterview =
        normalizedPath === "/get-me-interview" || normalizedPath === "/en-ca/get-me-interview"
      const isOnATSPage =
        normalizedPath === "/ats-optimized-resume-checker" ||
        normalizedPath === "/en-ca/ats-optimized-resume-checker" ||
        normalizedPath === "/features/resume-optimizer" ||
        normalizedPath === "/en-ca/features/resume-optimizer" ||
        normalizedPath === "/features/ats-optimizer" ||
        normalizedPath === "/en-ca/features/ats-optimizer" ||
        normalizedPath === "/features/ats-resume-optimizer" ||
        normalizedPath === "/en-ca/features/ats-resume-optimizer"

      if (isAlreadyOnGetMeInterview) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0

        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("showStrategyCallCard"))
        }

        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: "instant" })
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: "instant" })
            setTimeout(() => {
              window.scrollTo({ top: currentScrollY, behavior: "instant" })
            }, 50)
          })
        })

        return
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("showStrategyCallCard"))
      }

      if (isOnATSPage) {
        const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0

        if (typeof window !== "undefined") {
          const targetPath = normalizedPath.startsWith("/en-ca") ? "/en-ca/get-me-interview" : "/get-me-interview"
          window.history.pushState({}, "", targetPath)
        }

        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: "instant" })
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: "instant" })
            setTimeout(() => {
              window.scrollTo({ top: currentScrollY, behavior: "instant" })
            }, 50)
          })
        })

        return
      }

      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY
        sessionStorage.setItem("preserveScrollPosition", currentScrollY.toString())
        window.history.pushState({}, "", "/get-me-interview")
      }

      router.push("/get-me-interview")
    } catch (error) {
      console.warn("Error in Get Me Interview handler:", error)
    }
  }

  const handleHowItWorks = () => {
    const section = document.getElementById("how-it-works")
    if (!section) return

    const yOffset = -80
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  const scrollSteps = (direction: "left" | "right") => {
    stepsRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    })
  }

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: "ATS Resume Optimizer",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/resume.png",
    description:
      "ATS resume optimizer for creating an ATS-friendly resume optimized for job postings, recruiter screening systems, and higher interview success with FlashfireJobs.",
    brand: {
      "@type": "Brand",
      name: "FlashFire",
    },
    offers: {
      "@type": "Offer",
      url: "https://www.flashfirejobs.com/features/ats-optimized-resume-tool",
      priceCurrency: "USD",
      price: "0",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "1",
      reviewCount: "1",
    },
    review: {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "User",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an ATS optimized resume, and why do I need one?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ans. It's a resume that's formatted and keyword-optimized to pass recruiter software filters, ensuring you're not rejected automatically.",
        },
      },
      {
        "@type": "Question",
        name: "how does resume optimization for ATS improve my job application success?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ans. It increases your visibility in recruiter searches and boosts your chances of getting shortlisted - especially when applying in bulk.",
        },
      },
      {
        "@type": "Question",
        name: "What is an ATS resume checker, and how does it work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ans. It scans your resume against a job description to assess keyword match, formatting, and readability for Applicant Tracking Systems.",
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="min-h-screen bg-white text-[#10182c]">
        <section className="relative overflow-hidden bg-[#fff1eb]">
          <div className="mx-auto grid min-h-[520px] max-w-[1280px] place-items-center px-5 py-20 sm:py-24 lg:min-h-[650px]">
            <div className="relative w-full">
              <div className="relative z-10 mx-auto max-w-[620px] text-center">
                <span className="inline-flex items-center rounded-full bg-[#ff4c00] px-4 py-1.5 text-[11px] font-bold text-white">
                  <Sparkles className="mr-1.5 size-3" />
                  Free ATS Resume Optimizer
                </span>
                <h1 className="mt-7 text-[40px] font-black leading-[1.03] tracking-normal text-[#10182c] sm:text-[58px]">
                  ATS Resume Optimizer That Helps You Pass ATS Screening
                </h1>
                <p className="mx-auto mt-6 max-w-[600px] text-[17px] font-medium leading-8 text-[#566070]">
                  Flashfire is an AI resume optimizer and resume scanner for ATS that analyzes your resume against job
                  descriptions, identifies ATS issues, and improves keyword matching to increase shortlisting chances.
                </p>

                <div className="mt-10 flex flex-row items-center justify-center gap-3 sm:flex-row">
                <button
                {...getButtonProps()}
                onClick={handleGetMeInterview}
                className="flex-1 sm:flex-none h-14 whitespace-nowrap rounded-[8px] border-2 border-black bg-white px-4 text-[14px] font-black text-black transition hover:bg-[#fff8f5]"
                style={{ boxShadow: `0 4px 0 0 ${ORANGE}` }}
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

                <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-[13px] font-bold text-[#10182c]">
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle className="size-4" />
                    No signup required
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Shield className="size-4" />
                    100% secure
                  </span>
                </div>
              </div>

              <div className="mx-auto mt-12 grid max-w-[640px] gap-4 sm:grid-cols-2 xl:mt-0 xl:block xl:max-w-none">
                <div className="rounded-[8px] border border-[#ffd8ca] bg-white p-4 shadow-[0_18px_30px_rgba(255,76,0,0.09)] xl:absolute xl:left-0 xl:top-24 xl:w-[220px] 2xl:left-2 2xl:w-[245px]">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-[8px] border border-[#10182c]">
                      <BarChart className="size-5" />
                    </div>
                    <div>
                      <p className="text-[12px] font-black">Resume Strength</p>
                      <p className="text-[11px] font-medium text-[#566070]">James Steele - Product Engineer</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[8px] border border-[#ffd8ca] bg-white px-9 py-5 text-center shadow-[0_18px_30px_rgba(255,76,0,0.09)] xl:absolute xl:left-16 xl:top-64 xl:w-[155px] 2xl:left-28 2xl:top-60 2xl:w-[160px]">
                  <p className="text-[10px] font-black uppercase text-[#566070]">Score</p>
                  <p className="text-[38px] font-black leading-none text-[#ff4c00]">{score}</p>
                  <p className="mt-2 text-[12px] font-black">ATS Compatibility</p>
                </div>

                <div className="rounded-[8px] border border-[#ffd8ca] bg-white p-5 shadow-[0_18px_30px_rgba(255,76,0,0.09)] xl:absolute xl:right-0 xl:top-4 xl:w-[225px] 2xl:right-4 2xl:w-[240px]">
                  <p className="mb-4 border-b border-[#f0e3dd] pb-3 text-[12px] font-black">Passed Checks</p>
                  <div className="space-y-3 text-[12px] font-medium text-[#566070]">
                    {["Contact Information", "Summary Section", "Work History", "Skills Listed", "Education"].map((item) => (
                      <p key={item} className="flex items-center gap-2">
                        <CheckCircle className="size-3.5 text-emerald-500" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="rounded-[8px] border border-[#ffd8ca] bg-white p-5 shadow-[0_18px_30px_rgba(255,76,0,0.09)] xl:absolute xl:right-[-34px] xl:top-[210px] xl:z-20 xl:w-[225px] 2xl:right-[-42px] 2xl:top-[220px] 2xl:w-[235px]">
                  <p className="mb-4 border-b border-[#f0e3dd] pb-3 text-[12px] font-black">Improvements</p>
                  <div className="space-y-3 text-[12px] font-medium text-[#566070]">
                    {["Add industry keywords", "Simplify formatting", "Quantify achievements"].map((item) => (
                      <p key={item} className="flex items-center gap-2">
                        <AlertCircle className="size-3.5 text-[#ff9a26]" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-white px-5 py-16 sm:py-24">
          <SectionHeader
            title={
              <>
                Why Job Seekers Trust Our Free ATS Resume Checker & AI Resume Optimizer
              </>
            }
            description="ATS-friendly, recruiter-ready, and focused on real improvements that get results."
            className="mb-20"
          />

          <div className="mx-auto grid max-w-[960px] auto-rows-fr gap-14">
            {featureCards.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="grid h-full min-w-0 gap-8 overflow-hidden border border-[#101820]/70 bg-white p-8 shadow-[4px_4px_0_#111] sm:p-10 md:grid-cols-2 md:items-center"
                >
                  <div className={`${item.flip ? "md:order-2" : ""}`}>
                    <IconBox>
                      <Icon className="size-4" />
                    </IconBox>
                    <h3 className="mt-5 text-[22px] font-black leading-tight text-[#ff4c00]">{item.title}</h3>
                    <p className="mt-4 text-[15px] font-bold leading-7 text-black">{item.desc}</p>
                    <ul className="mt-8 space-y-4 rounded-[6px] bg-[#fff7f3] p-5">
                      {item.checks.map((check) => (
                        <CheckLine key={check}>{check}</CheckLine>
                      ))}
                    </ul>
                  </div>
                  <FeatureImagePreview
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                  />
                </div>
              )
            })}
          </div>
        </section>

        <section className="bg-white px-5 py-16 sm:py-24">
          <SectionHeader
            title="What Our ATS Resume Checker Tool & Resume Scanner Analyzes"
            description="Comprehensive analysis across 30+ criteria to ensure your resume passes ATS filters and impresses hiring managers."
            className="mb-14"
          />

          <div className="mx-auto grid max-w-[820px] auto-rows-fr border border-[#101820]/70 bg-white shadow-[3px_3px_0_#111] sm:grid-cols-2 lg:grid-cols-3">
            {analysisItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex h-full min-h-[180px] min-w-0 flex-col overflow-hidden border-b border-r border-[#101820]/60 p-6 last:border-b-0 sm:[&:nth-last-child(-n+1)]:border-b-0 lg:h-[190px] lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0">
                  <IconBox>
                    <Icon className="size-4" />
                  </IconBox>
                  <h3 className="mt-5 text-[17px] font-black leading-tight text-[#10182c]">{item.title}</h3>
                  <p className="mt-3 text-[13px] font-medium leading-6 text-[#566070]">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section id="how-it-works" className="overflow-hidden bg-[#fff7f4] px-5 py-16 sm:py-24">
          <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[350px_1fr] lg:items-start">
            <div>
              <h2 className="text-[36px] font-black leading-[0.96] tracking-normal text-[#10182c] sm:text-[46px]">
                How Our ATS Resume Optimizer & AI Resume Scanner Works in 5 Simple Steps
              </h2>
              <p className="mt-7 text-[14px] font-medium leading-6 text-[#566070]">
                Flashfire acts as an ATS resume scanner by analyzing your resume against job descriptions, detecting ATS
                compatibility issues, and optimizing your content with AI resume optimization techniques.
              </p>
              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => scrollSteps("left")}
                  aria-label="Previous step"
                  className="flex h-12 w-12 items-center justify-center bg-black text-white transition hover:bg-[#ff4c00]"
                >
                  <ArrowLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollSteps("right")}
                  aria-label="Next step"
                  className="flex h-12 w-12 items-center justify-center bg-black text-white transition hover:bg-[#ff4c00]"
                >
                  <ArrowRight size={24} />
                </button>
              </div>
            </div>

            <div ref={stepsRef} className="hide-scrollbar flex items-stretch gap-6 overflow-x-auto pb-3">
              {steps.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.step}
                    className="flex min-h-[300px] w-[min(280px,calc(100vw-3rem))] shrink-0 flex-col overflow-hidden border border-[#101820]/70 bg-white p-7 shadow-[4px_4px_0_#111]"
                  >
                    <IconBox>
                      <Icon className="size-4" />
                    </IconBox>
                    <h3 className="mt-10 text-[17px] font-black leading-tight text-[#10182c]">{item.title}</h3>
                    <p className="mt-4 text-[13px] font-medium leading-6 text-[#566070]">{item.desc}</p>
                    <span className="mt-auto inline-flex w-fit rounded-[4px] bg-[#ff4c00] px-4 py-2 text-[12px] font-black text-white">
                      Step {item.step}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section id="why-more-than-ats-checker" className="bg-white pt-16 sm:pt-24">
          <SectionHeader
            title="Why Flashfire Is More Than a Basic ATS Resume Checker"
            description="Flashfire isn't just an ATS resume checker tool. It's a complete AI resume optimizer built to help your resume perform better with both ATS systems and real recruiters."
            className="px-5 pb-12"
          />

          <div className="bg-[#ffe7dc] px-5 py-14">
            <div className="mx-auto grid max-w-[880px] gap-5 md:grid-cols-3">
              {valueCards.map((item) => (
                <div key={item.title} className="border border-[#101820]/70 bg-[#ff4c00] p-5 text-white shadow-[4px_4px_0_#111]">
                  <IconBox light>
                    <FileCheck2 className="size-4" />
                  </IconBox>
                  <h3 className="mt-6 text-[16px] font-black">{item.title}</h3>
                  <p className="mt-4 text-[13px] font-medium leading-6 text-white/90">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-3xl px-5 py-14 text-center">
            <p className="text-[15px] font-medium leading-7 text-[#566070]">
              With Flashfire, you don&apos;t just check your resume - you actively improve it using{" "}
              <span className="font-black text-[#ff4c00]">AI-powered ATS optimization</span> designed for real-world
              hiring.
            </p>
          </div>
        </section>

        <section id="faq" className={styles.faqSection}>
          <div id="faq-header" className={styles.header}>
            <h2>FAQs About Our ATS Resume Checker, Resume Scanner & Optimization Tool</h2>
            <p>We get it, ATS resume optimization can sound complex. Here&apos;s everything explained, plain and simple.</p>
          </div>

          <div className={styles.faqContainer}>
            {resumeOptimizerFAQs.map((faq, index) => (
              <div key={index} className={`${styles.faqItem} ${activeFaqIndex === index ? styles.active : ""}`}>
                <button className={styles.faqQuestion} onClick={() => handleFaqToggle(index)}>
                  <span>{faq.question}</span>
                  <span className={styles.icon}>{activeFaqIndex === index ? <FaTimes /> : <FaPlus />}</span>
                </button>

                {activeFaqIndex === index && (
                  <div className={styles.faqAnswer}>
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
  )
}
