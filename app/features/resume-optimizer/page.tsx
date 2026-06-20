"use client"

import React, { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Navbar from "@/src/components/navbar/navbar"
import Footer from "@/src/components/footer/footer"
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Target,
  Zap,
  Shield,
  Sparkles,
  BarChart,
  Mail,
  Layout,
  TrendingUp,
  Award,
} from "lucide-react"
import { FaPlus, FaTimes } from "react-icons/fa"
import styles from "@/src/components/homePageFAQ/homePageFAQ.module.css"
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking"
import { GTagUTM } from "@/src/utils/GTagUTM"
import { useGeoBypass } from "@/src/utils/useGeoBypass"
import Script from "next/script"

// Minimal UI primitives (local) to avoid missing imports
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline"
  size?: "md" | "lg"
}

const Button = ({ variant = "default", size = "md", className = "", ...props }: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1"
  const variants: Record<string, string> = {
    default: "bg-[#ff4c00] text-white hover:bg-[#e24400] focus:ring-[#ff4c00]/80",
    outline: "border border-[#ffb692] text-[#0f172a] hover:bg-[#fff2ea] focus:ring-[#ff4c00]/70",
  }
  const sizes: Record<string, string> = {
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  }
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
}

const Badge = ({
  className = "",
  children,
  variant = "primary",
}: {
  className?: string
  children: React.ReactNode
  variant?: "primary" | "secondary"
}) => {
  const styles =
    variant === "secondary"
      ? "bg-[#fff2ea] text-[#0f172a] border border-[#ffd7c4]"
      : "bg-[#ff4c00] text-white border border-[#ff4c00]"
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles} ${className}`}>
      {children}
    </span>
  )
}

const Card = ({ className = "", children }: { className?: string; children: React.ReactNode }) => {
  const baseClasses = "rounded-2xl border border-[#ffd7c4] bg-white/95 shadow-[0_10px_30px_rgba(255,76,0,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(255,76,0,0.12)]";
  const finalClassName = className ? `${baseClasses} ${className}`.trim() : baseClasses;
  return (
    <div className={finalClassName}>
      {children}
    </div>
  );
}

const CardHeader = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={`p-5 border-b border-[#ffe2d1] ${className}`}>{children}</div>
)

const CardContent = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div className={`p-5 ${className}`}>{children}</div>
)

const CardTitle = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <h3 className={`font-semibold text-lg text-[#0f172a] ${className}`}>{children}</h3>
)

const CardDescription = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <p className={`text-sm text-[#4b5563] ${className}`}>{children}</p>
)

export default function Page() {
  const [score, setScore] = useState(82)
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener
    },
  })

  const resumeOptimizerFAQs = [
    {
      question: "What is an ATS optimized resume, and why do I need one?",
      answer: " It's a resume that's formatted and keyword-optimized to pass recruiter software filters, ensuring you're not rejected automatically."
    },
    {
      question: "how does resume optimization for ATS improve my job application success?",
      answer: " It increases your visibility in recruiter searches and boosts your chances of getting shortlisted — especially when applying in bulk."
    },
    {
      question: "What is an ATS resume checker, and how does it work?",
      answer: " It scans your resume against a job description to assess keyword match, formatting, and readability for Applicant Tracking Systems."
    },
    {
      question: "Is there a resume maker for fresher beginners on FlashFireJobs?",
      answer: " Our team builds ATS-compliant resumes even for freshers, highlighting education, projects, and relevant skills with proper structure."
    },
    {
      question: "Which resume builder app is best for creating professional resumes?",
      answer: " FlashFireJobs offers a team-built resume service with AI-backed optimization — more powerful than typical drag-and-drop builders."
    },
    {
      question: "Where can I find the best ATS resume checker free online?",
      answer: " FlashFireJobs offers a free resume checker as part of our application service. You can also request a manual review."
    },
    {
      question: "Is there an ATS resume checker free tool I can use right now?",
      answer: " Users can access resume feedback and ATS alignment checks as part of their FlashFireJobs onboarding."
    },
    {
      question: "What features should I look for in the best free resume builder?",
      answer: " Look for tools that include ATS formatting, keyword optimization, PDF export, and tailored suggestions for your field."
    },
    {
      question: "Can I create a resume using a free resume builder AI?",
      answer: " FlashFire goes a step beyond by manually optimizing your resume with AI guidance and human input."
    },
    {
      question: "How does a free resume maker AI help me craft a compelling resume?",
      answer: " It identifies the right structure, skills, and job keywords, helping you build a resume that's clear, relevant, and compliant."
    },
    {
      question: "What is the best app for resume making for both freshers and experienced candidates?",
      answer: " FlashFireJobs supports both — we customize resumes for early-career, mid-level, and senior professionals, tailored to your goals."
    },
    {
      question: "Does FlashFireJobs offer an AI job board to find smart job matches?",
      answer: " We scrape jobs based on your preferences, optimize your resume, and apply on your behalf to save 150+ hours."
    },
    {
      question: "How does an AI powered job search help me find jobs faster?",
      answer: " AI filters out irrelevant roles and matches you with high-fit jobs, increasing application success and reducing manual effort."
    },
    {
      question: "What is a job search virtual assistant, and how can it simplify my job hunt?",
      answer: " It's a human-assisted AI system (like FlashFire) that manages your job hunt end-to-end, from resume to application to tracking."
    },
    {
      question: "Can FlashFireJobs auto apply to jobs and provide job application assistance to streamline my applications?",
      answer: " Our team manually applies to 1,200+ jobs on your behalf, using AI-optimized resumes, tracked in a real-time dashboard."
    }
  ]

  const handleFaqToggle = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index)
  }

  const handleGetMeInterview = () => {
    try {
      const utmSource = typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("utm_source") || "WEBSITE"
        : "WEBSITE"
      const utmMedium = typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("utm_medium") || "ATS_Page"
        : "ATS_Page"

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "ATS_Get_Me_Interview_Button",
          utmParams: {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: typeof window !== "undefined" && window.localStorage
              ? localStorage.getItem("utm_campaign") || "Website"
              : "Website",
          },
        })
      } catch (gtagError) {
        console.warn('GTagUTM error:', gtagError)
      }

      try {
        trackButtonClick("Get Me Interview", "ats_cta", "cta", {
          button_location: "ats_hero_section",
          section: "ats_hero"
        })
        trackSignupIntent("ats_cta", {
          signup_source: "ats_hero_button",
          funnel_stage: "signup_intent"
        })
      } catch (trackError) {
        console.warn('Tracking error:', trackError)
      }

      // Check current path first
      const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '')
      const normalizedPath = currentPath.split('?')[0] // Remove query params
      const isAlreadyOnGetMeInterview = normalizedPath === '/get-me-interview' ||
        normalizedPath === '/en-ca/get-me-interview'
      const isOnATSPage = normalizedPath === '/ats-optimized-resume-checker' ||
        normalizedPath === '/en-ca/ats-optimized-resume-checker' ||
        normalizedPath === '/features/resume-optimizer' ||
        normalizedPath === '/en-ca/features/resume-optimizer' ||
        normalizedPath === '/features/ats-optimizer' ||
        normalizedPath === '/en-ca/features/ats-optimizer'

      // If already on the route, save scroll position and prevent navigation
      if (isAlreadyOnGetMeInterview) {
        const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0

        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('showStrategyCallCard'))
        }

        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: 'instant' })
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: 'instant' })
            setTimeout(() => {
              window.scrollTo({ top: currentScrollY, behavior: 'instant' })
            }, 50)
          })
        })

        return
      }

      // Dispatch custom event to force show modal FIRST
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('showStrategyCallCard'))
      }

      // If on ATS features page, change URL but keep page content visible
      if (isOnATSPage) {
        const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0
        
        // Update URL for tracking without navigation
        if (typeof window !== 'undefined') {
          const targetPath = normalizedPath.startsWith('/en-ca') ? '/en-ca/get-me-interview' : '/get-me-interview'
          window.history.pushState({}, '', targetPath)
        }
        
        requestAnimationFrame(() => {
          window.scrollTo({ top: currentScrollY, behavior: 'instant' })
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: 'instant' })
            setTimeout(() => {
              window.scrollTo({ top: currentScrollY, behavior: 'instant' })
            }, 50)
          })
        })
        
        return
      }

      // Save current scroll position before navigation to preserve it
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY
        sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString())
        
        const targetPath = '/get-me-interview'
        window.history.pushState({}, '', targetPath)
      }

      // Only navigate if NOT already on the page
      const targetPath = '/get-me-interview'
      router.push(targetPath)
    } catch (error) {
      console.warn('Error in Get Me Interview handler:', error)
    }
  }

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

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "ATS Resume Optimizer",
    "image": "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/resume.png",
    "description": "ATS resume optimizer for creating an ATS-friendly resume optimized for job postings, recruiter screening systems, and higher interview success with FlashfireJobs.",
    "brand": {
      "@type": "Brand",
      "name": "FlashFire"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.flashfirejobs.com/features/ats-optimized-resume-tool",
      "priceCurrency": "USD",
      "price": "0"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "1",
      "reviewCount": "1"
    },
    "review": {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "User"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      }
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is an ATS optimized resume, and why do I need one?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ans. It's a resume that's formatted and keyword-optimized to pass recruiter software filters, ensuring you're not rejected automatically."
        }
      },
      {
        "@type": "Question",
        "name": "how does resume optimization for ATS improve my job application success?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ans. It increases your visibility in recruiter searches and boosts your chances of getting shortlisted — especially when applying in bulk."
        }
      },
      {
        "@type": "Question",
        "name": "What is an ATS resume checker, and how does it work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ans. It scans your resume against a job description to assess keyword match, formatting, and readability for Applicant Tracking Systems."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      <main className="min-h-screen bg-[#fff7f2] text-[#0f172a]">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-[#fffaf7]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,76,0,0.12),transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_65%,rgba(255,182,146,0.22),transparent_50%)]" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-18 sm:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="inline-flex">
                  <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                    <Sparkles className="size-3 mr-1" />
                    Free ATS Resume Optimizer
                  </Badge>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                    Get Your Resume <span className="text-primary">ATS-Ready</span> in Minutes
                  </h1>
                  <p className="text-lg sm:text-xl text-[#374151] text-pretty leading-relaxed">
                    We optimize your base resume for each and every role and job description, ensuring it's perfectly tailored to pass ATS filters and land more interviews.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    {...getButtonProps()}
                    onClick={handleGetMeInterview}
                    className="bg-white border-2 border-black px-6 sm:px-8 py-3 sm:py-4 font-bold text-black text-base sm:text-lg hover:bg-[#f9e8e0] transition-colors rounded-lg inline-flex items-center justify-center gap-2"
                    style={{ boxShadow: '0 4px 0 0 rgba(245, 93, 29, 1)' }}
                  >
                    Get Me Interview →
                  </button>
                  <button
                  onClick={handleHowItWorks}
                  
                    className="  border-2 border-[#ff4c00] text-[#ff4c00] bg-transparent hover:bg-[#fff2ea] px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg transition-colors rounded-lg inline-flex items-center justify-center gap-2"
                  >
                    How It Works
                  </button>
                </div>

                <div className="flex items-center gap-6 pt-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-5 text-primary" />
                    <span className="text-sm font-medium">No signup required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="size-5 text-primary" />
                    <span className="text-sm font-medium">100% secure</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Score Preview Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full translate-y-8" />
                <Card className="relative shadow-xl border-2">
                  <CardHeader className="bg-[#fff4ec] border-b border-[#ffd7c4]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <BarChart className="size-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">Resume Strength</CardTitle>
                          <CardDescription>James Steele • Product Engineer</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-[#374151] uppercase tracking-wider">Score</p>
                        <p className="text-4xl font-bold text-primary">{score}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold">ATS Compatibility</p>
                        <p className="text-sm font-medium text-primary">{score}%</p>
                      </div>
                      <div className="h-2 bg-[#ffe9dd] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-1000"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <p className="text-sm font-semibold">Passed Checks</p>
                        {["Contact Information", "Summary Section", "Work History", "Skills Listed", "Education"].map(
                          (item) => (
                            <div key={item} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="size-4 text-emerald-500 shrink-0" />
                              <span className="text-[#374151]">{item}</span>
                            </div>
                          ),
                        )}
                      </div>

                      <Card className="bg-[#fff4ec] border-[#ffd7c4]">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Improvements</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-xs text-[#374151]">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="size-3 text-amber-500 shrink-0 mt-0.5" />
                            <span>Add industry keywords</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <AlertCircle className="size-3 text-amber-500 shrink-0 mt-0.5" />
                            <span>Simplify formatting</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <AlertCircle className="size-3 text-amber-500 shrink-0 mt-0.5" />
                            <span>Quantify achievements</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                <div className="absolute -bottom-4 -left-4 hidden lg:block">
                  <Badge className="bg-primary text-primary-foreground shadow-lg px-4 py-2 text-sm">
                    <Zap className="size-3 mr-1" />
                    ATS-ready in minutes
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-18 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
                Why Job Seekers Love Our Best Free <span className="text-primary">ATS Resume Checker Tool</span>
              </h2>
              <p className="text-lg text-[#374151] max-w-2xl mx-auto text-balance">
                ATS-friendly, recruiter-ready, and focused on real improvements that get results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="group">
                <CardHeader>
                  <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Target className="size-6 text-primary" />
                  </div>
                  <CardTitle>Role-Specific Optimization</CardTitle>
                  <CardDescription>
                    We optimize your base resume for each job description, ensuring perfect alignment with role requirements and ATS systems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-[#374151]">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-primary" />
                      <span>JD-matched keywords and skills</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-primary" />
                      <span>ATS-friendly formatting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="size-4 text-primary" />
                      <span>Customized for every application</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group">
                <CardHeader>
                  <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Award className="size-6 text-primary" />
                  </div>
                  <CardTitle>Recruiter-Ready Results</CardTitle>
                  <CardDescription>
                    Clean, impactful structure that hiring managers can skim quickly while staying ATS-compliant
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-[#374151]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-primary" />
                    <span>1-page optimized format</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-primary" />
                    <span>Impactful, quantified achievements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-primary" />
                    <span>Perfect spelling & grammar</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="group">
                <CardHeader>
                  <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="size-6 text-primary" />
                  </div>
                  <CardTitle>Real Improvements That Get Results</CardTitle>
                  <CardDescription>
                    ATS-friendly, recruiter-ready, and focused on real improvements that get results
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-[#374151]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-primary" />
                    <span>Measurable improvements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-primary" />
                    <span>Keyword optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-primary" />
                    <span>Format consistency</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Checks Section */}
        <section className="py-18 sm:py-24 bg-[#fff0e6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">What Our ATS Scanner Checks</h2>
              <p className="text-lg text-[#374151] max-w-2xl mx-auto text-balance">
                Comprehensive analysis across 30+ criteria to ensure your resume passes ATS filters and impresses hiring
                managers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: FileText,
                  title: "1-Page Resume",
                  desc: "Optimized to fit on a single page, making it easy for recruiters to scan quickly and efficiently.",
                },
                {
                  icon: BarChart,
                  title: "Impactful Content",
                  desc: "Quantified achievements and measurable results that showcase your value and impact.",
                },
                {
                  icon: Target,
                  title: "ATS-Friendly Format",
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
              ].map((item, idx) => (
                <Card key={idx} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                      <item.icon className="size-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-18 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">How Our ATS Resume Optimizer Works in 5 Simple Steps</h2>
              <p className="text-lg text-[#374151] max-w-2xl mx-auto text-balance">
                Get your resume optimized for each job in five simple steps. Fast, easy, and effective.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
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
              ].map((item) => {
                if (item.step === 5) {
                  return (
                    <div key={item.step} className="md:col-span-2 flex justify-center">
                      <Card className="hover:shadow-md transition-shadow md:max-w-xl w-full">
                        <CardHeader>
                          <Badge className="w-fit mb-4">Step {item.step}</Badge>
                          <div className="flex items-start gap-4">
                            <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                              <item.icon className="size-5 text-primary" />
                            </div>
                            <div className="space-y-2">
                              <CardTitle className="text-xl">{item.title}</CardTitle>
                              <CardDescription className="leading-relaxed">{item.desc}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    </div>
                  );
                }
                return (
                  <Card 
                    key={item.step} 
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <Badge className="w-fit mb-4">Step {item.step}</Badge>
                      <div className="flex items-start gap-4">
                        <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                          <item.icon className="size-5 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                          <CardDescription className="leading-relaxed">{item.desc}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Flashfire Is More Than a Basic ATS Resume Checker */}
        <section id="why-more-than-ats-checker" className="py-18 sm:py-24 bg-[#fff9f7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance text-[#0f172a]">
                Why Flashfire Is More Than a Basic ATS Resume Checker
              </h2>
              <p className="text-lg text-[#374151] leading-relaxed text-balance">
                Flashfire isn&apos;t just an{" "}
                <span className="font-semibold text-[#ff4c00]">ATS resume checker tool</span>
                . It&apos;s a full{" "}
                <span className="font-semibold text-[#ff4c00]">AI resume optimizer</span>{" "}
                and{" "}
                <span className="font-semibold text-[#ff4c00]">ATS resume optimizer</span>{" "}
                that scans your resume, understands job requirements, and automatically optimizes content to improve ATS ranking and recruiter visibility.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className={styles.faqSection}>
          <div id="faq-header" className={styles.header}>
            <h2>Question? We Got You Answers.</h2>
            <p>
              We get it, ATS resume optimization can sound complex. Here's everything
              explained, plain and simple.
            </p>
          </div>

          <div className={styles.faqContainer}>
            {resumeOptimizerFAQs.map((faq, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${
                  activeFaqIndex === index ? styles.active : ""
                }`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => handleFaqToggle(index)}
                >
                  <span>{faq.question}</span>
                  <span className={styles.icon}>
                    {activeFaqIndex === index ? <FaTimes /> : <FaPlus />}
                  </span>
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
