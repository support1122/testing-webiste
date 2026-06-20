"use client"

import { memo, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type { IconType } from "react-icons"
import {
  FaBolt,
  FaBrain,
  FaBullseye,
  FaChartBar,
  FaFileAlt,
  FaLinkedin,
  FaPlus,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa"
import { Bot, BriefcaseBusiness, Phone, Rocket, Users } from "lucide-react"
import { questionsData } from "@/src/data/questionsData"
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css"
import FlashfireLogo from "@/src/components/FlashfireLogo"
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking"

type FeatureItem = {
  title: string
  description: string
  icon: IconType
  href: string
}

const features: FeatureItem[] = [
  {
    title: "AI-Powered Matching",
    description:
      "For each and every application, your base resume is automatically optimized to the job description with ATS-friendly keywords and skills.",
    icon: FaBrain,
    href: "/features/automated-job-applications",
  },
  {
    title: "Dynamic Resume Optimization",
    description:
      "We build your base resume from scratch and tailor it for each job, making it ATS-friendly and recruiter-visible.we also provide you with a personalized job strategy for US & Canada roles.",
    icon: FaFileAlt,
    href: "/features/ats-resume-optimizer",
  },
  {
    title: "LinkedIn Profile Optimization",
    description:
      "We professionally optimize your LinkedIn profile to boost recruiter visibility and align with your job search goals.it also includes a personalized job strategy for US & Canada roles.",
    icon: FaLinkedin,
    href: "/features/linkedin-profile-optimization-tool",
  },
  {
    title: "Precision Targeting",
    description:
      "We only apply to jobs that fit your pay, location, company size, and career goals - and only to jobs posted in the last 24-48 hours.",
    icon: FaBullseye,
    href: "/features/ai-job-targeting",
  },
  {
    title: "Lightning Fast Applications",
    description:
      "A dedicated team of 4-5 people handles your job hunt, applying to 1200+ roles in 6-7 weeks. We'll keep you posted with every update in a WhatsApp group made just for you.",
    icon: FaBolt,
    href: "/features/job-application-tracker",
  },
  {
    title: "Dashboard & Analytics",
    description:
      "Access a personalized dashboard to track applications, monitor success rates, and get real-time insights to improve your job search strategy.",
    icon: FaChartBar,
    href: "/features/dashboard-analytics",
  },
]

const steps = [
  {
    id: 1,
    subtitle: "You share your goals.",
    description:
      "Tell us what you are aiming for, your dream role, location, and experience. We learn your story so we can find the right opportunities for you.",
    image: "/images/step1.png",
    icon: Users,
  },
  {
    id: 2,
    subtitle: "We build your winning profile.",
    description:
      "We create ATS-optimized resumes and optimize LinkedIn profiles so your applications pass filters and rank higher in recruiter searches.",
    image: "/images/step2.png",
    icon: BriefcaseBusiness,
  },
  {
    id: 3,
    subtitle: "Flashfire AI Applies for Jobs Automatically on Your Behalf",
    description:
      "Our AI job application tool automatically submits targeted applications to 1000+ curated roles using role-specific resumes and custom answers.",
    image: "/images/step3.png",
    icon: Bot,
  },
  {
    id: 4,
    subtitle: "You start getting interview calls.",
    description:
      "As applications go out, you start getting real calls from real recruiters. We track, follow up, and optimize every step so you can focus on preparing.",
    image: "/images/step4.png",
    icon: Phone,
  },
]

const personas = [
  {
    title: "International Students",
    desc: "Students and new graduates who need a faster way to reach relevant companies without spending every night filling out forms.",
  },
  {
    title: "U.S. & Canada Job Seekers",
    desc: "Candidates targeting U.S. & Canada-based roles across tech, business, and operations.",
  },
  {
    title: "Burnt-Out Applicants",
    desc: "Job seekers tired of manual applications, repeated resume edits, and low response rates.",
  },
  {
    title: "Results-Driven Users",
    desc: "People who want a focused job application system built around interview calls, not vanity activity.",
  },
]

function Features() {
  const pathname = usePathname()
  const router = useRouter()
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [activePersona, setActivePersona] = useState<number | null>(null)

  const isCanadaContext = pathname.startsWith("/en-ca")
  const prefix = isCanadaContext ? "/en-ca" : ""

  const getHref = (href: string) => {
    if (href.startsWith("http")) return href
    return `${prefix}${href}`
  }

  const faqData = useMemo(() => questionsData.slice(0, 6), [])

  const handleFaqToggle = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = "919817349846"
    const message = encodeURIComponent(
      "Hi! I'm interested in Flashfire's AI-powered job search automation. Can you help me get started?",
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const handleGetStarted = () => {
    try {
      trackButtonClick("Get Started Today", "features_cta", "cta", {
        button_location: "features_footer_section",
        section: "features_footer",
      })
      trackSignupIntent("features_cta", {
        signup_source: "features_footer_button",
        funnel_stage: "signup_intent",
      })
    } catch (trackError) {
      console.error("Tracking error:", trackError)
    }

    const currentPath = pathname || (typeof window !== "undefined" ? window.location.pathname : "")
    const normalizedPath = currentPath.split("?")[0]
    const isOnFeatures =
      normalizedPath === "/feature" ||
      normalizedPath === "/features" ||
      normalizedPath === "/en-ca/feature" ||
      normalizedPath === "/en-ca/features"
    const isAlreadyOnGetMeInterview =
      normalizedPath === "/get-me-interview" || normalizedPath === "/en-ca/get-me-interview"

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

    if (isOnFeatures) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("previousPageBeforeGetMeInterview", "/features")
        sessionStorage.setItem("preserveScrollPosition", window.scrollY.toString())
      }

      const targetPath = normalizedPath.startsWith("/en-ca")
        ? "/en-ca/get-me-interview"
        : "/get-me-interview"
      router.replace(targetPath)
      return
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem("preserveScrollPosition", window.scrollY.toString())
    }

    router.push("/get-me-interview")
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.flashfirejobs.com/#organization",
    name: "Flashfirejobs",
    url: "https://www.flashfirejobs.com/",
    logo: "https://www.flashfirejobs.com/favicon.ico",
    description:
      "Flashfire is an AI-powered job search platform helping candidates get interview calls faster through intelligent job matching and automation.",
    sameAs: [
      "https://www.instagram.com/flashfirejobs/",
      "https://www.youtube.com/@flashfireindia",
      "https://www.linkedin.com/company/flashfire-pvt-ltd/",
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why Are We The Best Job Hunting Site To Find Opportunities Quickly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because we don't just show jobs, we apply to them for you. You skip browsing, resume editing, and forms. We do it all.",
        },
      },
      {
        "@type": "Question",
        name: "How Does AI Job Search Improve My Chances Of Finding Relevant Positions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our AI scans thousands of listings and matches them to your profile. It also optimizes your resume with keywords hiring managers and ATS systems are looking for.",
        },
      },
      {
        "@type": "Question",
        name: "Can AI Job Application Tools Help Me Apply For Jobs Faster?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AI job application tools automate form filling, resume tailoring, and submission, letting you apply to hundreds of jobs in the time it takes to manually apply to one.",
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="relative isolate overflow-hidden border-b border-black/5 bg-white px-4 py-12 font-['Space_Grotesk',sans-serif] sm:px-6 md:py-24 lg:px-8">
        <Image
          src="/images/step1.png"
          alt=""
          width={360}
          height={360}
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.08] md:h-[360px] md:w-[360px]"
          priority
        />
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#fff0e9] px-4 py-2 text-xs font-extrabold text-[#ff4c00]">
            <Rocket className="h-3.5 w-3.5" />
            AI-Powered Job Automation Platform
          </span>
          <div className="mx-auto mt-8 max-w-5xl text-center">
            <h1 className="text-3xl font-black leading-tight tracking-normal text-black sm:text-4xl md:text-6xl">
              AI-Powered Job Search & Job Search Automation That Gets Interviews
            </h1>
            <p className="mx-auto mt-6 max-w-4xl text-base font-medium leading-7 text-[#384154] md:mt-7 md:text-xl">
              Flashfire is an AI-powered job search platform that automates your entire job search, from resume optimization to intelligent job applications-helping job seekers apply smarter and get interview calls faster.
            </p>
            <button
              onClick={handleGetStarted}
              className="mt-8 rounded-md bg-[#ff4c00] px-8 py-4 text-sm font-extrabold text-white shadow-[0_4px_0_black] transition hover:-translate-y-0.5 hover:bg-black"
            >
              Get Me Interview {"->"}
            </button>
          </div>
        </div>
      </header>

      <div className="font-['Space_Grotesk',sans-serif]">
        <section id="feature" className="bg-white px-4 py-14 sm:px-6 md:py-24 lg:px-8">
          <header className="mx-auto mb-14 max-w-4xl text-center">
            <h2 className="text-3xl font-black leading-tight tracking-normal text-black sm:text-4xl md:text-5xl">
              Why Choose Flashfire AI Powered Job Search Tools?
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-7 text-[#384154] md:text-lg">
              Flashfire combines an AI-powered job search with intelligent job search automation to help you apply only to the most relevant roles and convert applications into real interview calls.
            </p>
          </header>

          <div className="mx-auto grid max-w-6xl auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 md:gap-7">
            {features.map((feature) => {
              const IconComponent = feature.icon
              return (
                <Link
                  key={feature.title}
                  href={getHref(feature.href)}
                  className="group block h-full rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4c00] focus-visible:ring-offset-2"
                >
                  <article className="grid h-full min-h-[184px] grid-cols-[56px_minmax(0,1fr)] items-center gap-4 rounded-md border border-black/15 bg-white p-5 text-left shadow-[0_8px_20px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ff4c00] sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-5 sm:p-6">
                    <div className="flex items-center justify-center text-[#ff4c00]">
                      <IconComponent className="text-4xl sm:text-5xl" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-black leading-tight text-[#ff4c00] sm:mb-3 sm:text-xl">
                        {feature.title}
                      </h3>
                      <p className="text-sm font-medium leading-6 text-[#4b5565]">
                        {feature.description}
                      </p>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="bg-white px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-black leading-tight tracking-normal text-[#172031] sm:text-4xl md:text-5xl md:leading-none">
              How Our AI Job Application Software Works
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-center text-sm font-medium leading-5 text-[#677083]">
              From profile setup to interview calls - four simple steps to your dream job.
            </p>

            <div className="mx-auto mt-10 grid max-w-[660px] grid-cols-[0.52fr_1fr_0.52fr] gap-3 sm:mt-12 sm:gap-5 min-[641px]:grid-cols-[210px_minmax(0,1fr)_210px]">
              {steps.map((step, index) => {
                const isTextLeft = index % 2 === 0
                const number = String(step.id).padStart(2, "0")
                const StepIcon = step.icon
                const textCard = (
                  <article className="relative col-span-2 flex min-h-[148px] flex-col justify-center rounded-lg bg-[#ff551c] p-4 pr-12 text-white shadow-[0_10px_18px_rgba(255,76,0,0.18)] sm:min-h-[172px] sm:p-8 sm:pr-24">
                    <StepIcon className="absolute right-4 top-4 h-7 w-7 text-white sm:right-8 sm:top-7 sm:h-12 sm:w-12" strokeWidth={2.6} />
                    <p className="text-xs font-bold">Step {step.id}</p>
                    <h3 className="mt-1 text-sm font-black leading-tight sm:text-xl">{step.subtitle}</h3>
                    <p className="mt-3 text-[10px] font-medium leading-4 text-white/95 sm:mt-4 sm:text-xs sm:leading-5">
                      {step.description}
                    </p>
                  </article>
                )
                const visualCard = (
                  <article className="relative flex min-h-[148px] flex-col justify-between rounded-lg border border-[#ffd8c8] bg-white p-4 shadow-[0_8px_18px_rgba(0,0,0,0.06)] sm:min-h-[172px] sm:p-5">
                    <Image
                      src={step.image}
                      alt=""
                      width={76}
                      height={76}
                      className="ml-auto h-11 w-11 object-contain sm:h-16 sm:w-16"
                    />
                    <span className="text-4xl font-black leading-none text-[#ff551c] sm:text-6xl">
                      {number}
                    </span>
                  </article>
                )

                return (
                  <div key={step.id} className="contents">
                    {isTextLeft ? (
                      <>
                        {textCard}
                        {visualCard}
                      </>
                    ) : (
                      <>
                        {visualCard}
                        {textCard}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#fff5f1] px-4 py-14 sm:px-6 md:px-12 md:py-16">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <h2 className="max-w-md text-3xl font-black leading-tight text-[#111827] sm:text-4xl md:text-5xl">
                <span className="text-[#ff4c00]">Who</span> Is This AI Job Application Software For?
              </h2>
              <p className="mt-5 max-w-lg text-sm font-medium leading-7 text-black/60 sm:text-base">
                Flashfire is designed for students and job seekers who want to apply at scale, save time, and finally get real interview calls instead of silence.
                This isn&apos;t another job board. It&apos;s an execution engine for people who want outcomes.
              </p>
            </div>

            <div className="space-y-4">
              {personas.map((item, index) => {
                const isActive = activePersona === index
                return (
                  <div
                    key={item.title}
                    className={`overflow-hidden rounded border transition ${
                      isActive
                        ? "border-[#ff4c00] bg-[#ff551c] text-white"
                        : "border-black/10 bg-white text-[#111827]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActivePersona(isActive ? null : index)}
                      className="flex w-full items-center gap-3 px-3 py-3 text-left sm:gap-4"
                      aria-expanded={isActive}
                    >
                      <span
                        className={`grid h-8 w-8 place-items-center rounded-sm text-lg font-black ${
                          isActive ? "bg-white/15 text-white" : "bg-[#fff0e9] text-[#ff4c00]"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 text-sm font-black leading-tight">{item.title}</span>
                      <span
                        className={`grid h-5 w-5 place-items-center rounded-full text-sm font-black ${
                          isActive ? "bg-white text-[#ff4c00]" : "bg-[#ffe0d4] text-[#ff4c00]"
                        }`}
                      >
                        {isActive ? "-" : "+"}
                      </span>
                    </button>
                    {isActive && (
                      <p className="border-t border-[#ffd4c4] bg-white px-4 py-4 text-xs font-medium leading-5 text-black/55">
                        {item.desc}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div className="h-14 bg-white md:h-32" aria-hidden="true" />

        <section id="faq" className={`${faqStyles.faqSection} relative z-10 bg-[#f9e8e0] py-16`}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>Question? We Got You Answers.</h2>
            <p>
              We get it, AI job search can sound complex. Here&apos;s everything explained, plain and simple.
            </p>
          </div>

          <div className={`${faqStyles.faqContainer} text-left !rounded-none`}>
            {faqData.map((faq, index) => (
              <div
                key={faq.question}
                className={`${faqStyles.faqItem} ${activeFaq === index ? faqStyles.active : ""}`}
              >
                <button className={faqStyles.faqQuestion} onClick={() => handleFaqToggle(index)}>
                  <span>{faq.question}</span>
                  <span className={faqStyles.icon}>
                    {activeFaq === index ? <FaTimes /> : <FaPlus />}
                  </span>
                </button>

                {activeFaq === index && (
                  <div className={`${faqStyles.faqAnswer} text-left`}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 flex justify-center px-4 py-12 sm:px-6 md:mb-20 md:py-16 lg:px-8">
          <div className="mx-auto flex w-full max-w-[80rem] items-stretch justify-between gap-4 overflow-hidden border border-[#f1e4df] bg-[rgba(251,240,235,1)] p-3 max-[1024px]:flex-col max-[1024px]:items-center max-[1024px]:p-8 max-[768px]:p-6 max-[480px]:p-5">
            <div className="relative flex flex-1 flex-col justify-center overflow-hidden bg-white p-8 text-left max-[1024px]:p-6 max-[1024px]:text-center max-[768px]:p-5">
              <h3 className="mb-3 text-[1.6rem] font-bold text-[#111] max-[480px]:text-[1.2rem]">
                Still Confused?
              </h3>
              <p className="mb-5 text-[1rem] font-bold leading-[1.5] text-[#333] max-[480px]:text-[0.9rem]">
                Feel free to post your queries <br /> over our WhatsApp Support.
              </p>
              <button
                type="button"
                className="relative z-10 w-fit cursor-pointer rounded-[0.5rem] border-0 border-b-[3px] border-b-black bg-[#ff4c00] px-[1.6rem] py-[0.9rem] font-semibold text-white shadow-[0_0.2rem_0_#000] transition-all duration-300 hover:border-b-[5px] hover:bg-[#e24300] max-[1024px]:mx-auto"
                onClick={handleWhatsAppClick}
              >
                Connect on WhatsApp
              </button>
              <div className="pointer-events-none absolute right-[-8rem] top-1/2 -translate-y-1/2 text-[18rem] text-[rgba(251,240,235,1)] opacity-90 max-[1024px]:hidden">
                <FaWhatsapp />
              </div>
            </div>

            <div className="relative flex flex-[1.3] items-center overflow-hidden bg-black p-8 max-[1024px]:mt-6 max-[1024px]:w-full max-[1024px]:text-center max-[768px]:flex-col max-[768px]:items-center max-[768px]:p-6">
              <div className="relative z-10 flex w-[65%] flex-col items-start justify-start text-left max-[1024px]:w-full max-[1024px]:items-center max-[1024px]:text-center">
                <p className="mb-3 text-[0.75rem] font-semibold text-[#fffaf8]">
                  HELPING 560+ JOB SEEKERS
                </p>
                <blockquote className="mb-4 text-[1.6rem] font-bold italic leading-tight text-[#eee] max-[1024px]:text-[1.2rem] max-[768px]:text-[1rem]">
                  &quot;I&apos;ve seen brilliant people lose hope. Flashfire exists so they
                  don&apos;t have to.&quot;
                </blockquote>
                <div className="flex items-center justify-start gap-4 text-left max-[1024px]:justify-center max-[1024px]:text-center">
                  <div>
                    <p className="text-[0.95rem] font-semibold text-white">Adit Jain</p>
                    <p className="text-[0.8rem] text-[#aaa]">Partner</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FlashfireLogo
                      variant="white"
                      width={24}
                      height={24}
                      className="brightness-100"
                    />
                    <p className="font-semibold text-white">Flashfire</p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-4 flex w-[34%] items-start justify-center overflow-hidden max-[1024px]:relative max-[1024px]:inset-auto max-[1024px]:mx-auto max-[1024px]:mt-5 max-[1024px]:h-[360px] max-[1024px]:w-full max-[1024px]:items-start max-[1024px]:justify-center max-[480px]:h-[320px]">
                <Image
                  src="https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/adit-jain.png"
                  alt="Adit Jain"
                  width={260}
                  height={480}
                  className="mx-auto h-[140%] w-auto max-w-none -translate-y-16 object-contain object-top brightness-100 contrast-105 max-[1024px]:h-[165%] max-[1024px]:max-w-none max-[1024px]:-translate-y-28 max-[480px]:h-[185%] max-[480px]:-translate-y-24"
                  loading="lazy"
                  unoptimized
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <div className="relative mt-8 overflow-visible px-4 pb-16 md:mt-16 md:pb-20">
          <div className="relative z-10 mx-auto mt-10 max-w-4xl text-center md:mt-16">
            <h2 className="mb-4 text-3xl font-bold text-[#ff4c00] sm:text-4xl md:text-5xl">
              Ready to move from applying to interviewing?
            </h2>
            <p className="mb-8 text-base text-gray-700 md:text-xl">
              Flashfire bridges the gap with smart automation.
            </p>
            <button
              type="button"
              onClick={handleGetStarted}
              className="rounded-lg border-l border-r border-t border-black border-b-[#ff4c00] bg-white px-8 py-4 text-lg font-semibold text-black shadow-[0_3px_0_#000] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_0_#000]"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Features)
