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
  Clock,
  MousePointer2,
  Mail,
  Layout,
  TrendingUp,
  Award,
} from "lucide-react"
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking"
import { GTagUTM } from "@/src/utils/GTagUTM"
import { useGeoBypass } from "@/src/utils/useGeoBypass"

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

const Card = ({ className = "", children }: { className?: string; children: React.ReactNode }) => (
  <div
    className={`rounded-2xl border border-[#ffd7c4] bg-white/95 shadow-[0_10px_30px_rgba(255,76,0,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(255,76,0,0.12)] ${className}`}
  >
    {children}
  </div>
)

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
  const router = useRouter()
  const pathname = usePathname()
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener
    },
  })

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
        normalizedPath === '/en-ca/ats-optimized-resume-checker'

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

      // If on ATS page, change URL but keep page content visible
      if (isOnATSPage) {
        if (typeof window !== 'undefined') {
          const currentScrollY = window.scrollY
          sessionStorage.setItem('previousPageBeforeGetMeInterview', '/ats-optimized-resume-checker')
          sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString())
        }

        const targetPath = normalizedPath.startsWith('/en-ca') ? '/en-ca/get-me-interview' : '/get-me-interview'
        router.replace(targetPath)
        return
      }

      // Save current scroll position before navigation to preserve it
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY
        sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString())
      }

      // Only navigate if NOT already on the page
      const targetPath = '/get-me-interview'
      router.push(targetPath)
    } catch (error) {
      console.warn('Error in Get Me Interview handler:', error)
    }
  }

  const handleHowItWorks = () => {
    try {
      trackButtonClick("How It Works", "ats_cta", "cta", {
        button_location: "ats_hero_section",
        section: "ats_hero",
        action: "how_it_works"
      })
    } catch (trackError) {
      console.warn('Tracking error:', trackError)
    }

    // Check current path
    const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '')
    const normalizedPath = currentPath.split('?')[0]
    const isOnATSPage = normalizedPath === '/ats-optimized-resume-checker' ||
      normalizedPath === '/en-ca/ats-optimized-resume-checker'

    // If on ATS page, scroll to the "How It Works" section
    if (isOnATSPage && typeof window !== 'undefined') {
      const howItWorksSection = document.getElementById('how-it-works')
      if (howItWorksSection) {
        howItWorksSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    // Otherwise, navigate to the How It Works page
    const targetPath = normalizedPath.startsWith('/en-ca') ? '/en-ca/how-it-works' : '/how-it-works'
    router.push(targetPath)
  }

  return (
    <>
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
                    Free ATS Resume Checker
                  </Badge>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                    Get Your Resume <span className="text-primary">ATS-Ready</span> in Minutes
                  </h1>
                  <p className="text-lg sm:text-xl text-[#374151] text-pretty leading-relaxed">
                    Scan your resume against 30+ ATS criteria and get instant, actionable feedback to boost your score
                    and land more interviews.
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
                    className="border-2 border-[#ff4c00] text-[#ff4c00] bg-transparent hover:bg-[#fff2ea] px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg transition-colors rounded-lg inline-flex items-center justify-center gap-2"
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
                Why Job Seekers <span className="text-primary">Love Our Tool</span>
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
                  <CardTitle>Tailored for ATS</CardTitle>
                  <CardDescription>
                    Optimized formatting and keyword alignment that passes automated screening systems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Version Control</Badge>
                    <Badge variant="secondary">Cloud Platforms</Badge>
                    <Badge variant="secondary">RESTful APIs</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="group">
                <CardHeader>
                  <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Award className="size-6 text-primary" />
                  </div>
                  <CardTitle>Recruiter Approved</CardTitle>
                  <CardDescription>
                    Clean structure that hiring managers can skim quickly while staying ATS-compliant
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-[#374151]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-primary" />
                    <span>Clear, scannable structure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-primary" />
                    <span>ATS-safe formatting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-4 text-primary" />
                    <span>Role-aligned content</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="group">
                <CardHeader>
                  <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="size-6 text-primary" />
                  </div>
                  <CardTitle>Actionable Insights</CardTitle>
                  <CardDescription>
                    Not just a score — specific, prioritized fixes to improve clarity and impact
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
                  icon: Target,
                  title: "Customization",
                  desc: "Ensure qualifications and role-fit skills are present for the target position.",
                },
                {
                  icon: FileText,
                  title: "Spelling & Grammar",
                  desc: "Fix errors to maintain a polished, professional appearance throughout.",
                },
                {
                  icon: Layout,
                  title: "Professional Summary",
                  desc: "Snapshot your top skills and qualifications at the very beginning.",
                },
                {
                  icon: BarChart,
                  title: "Measurable Results",
                  desc: "Highlight achievements with quantifiable outcomes in work history.",
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
                { icon: Clock, title: "Optimal Length", desc: "Keep it concise and easy to skim for busy recruiters." },
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">How Our ATS Checker Works</h2>
              <p className="text-lg text-[#374151] max-w-2xl mx-auto text-balance">
                Get your resume ATS-ready in four simple steps. Fast, easy, and effective.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  step: 1,
                  icon: Upload,
                  title: "Upload Your Resume",
                  desc: "Drop your resume file from any device. We support DOC, DOCX, PDF, and TXT formats up to 5MB.",
                },
                {
                  step: 2,
                  icon: BarChart,
                  title: "Review Your Report",
                  desc: "Get instant analysis with your strength score and detailed breakdown of what works and what needs improvement.",
                },
                {
                  step: 3,
                  icon: MousePointer2,
                  title: "Apply Improvements",
                  desc: "Follow our recommended changes to boost your score. Prioritize high-impact fixes first for best results.",
                },
                {
                  step: 4,
                  icon: CheckCircle,
                  title: "Download & Apply",
                  desc: "Export your optimized, ATS-friendly resume and apply to jobs with confidence.",
                },
              ].map((item) => (
                <Card key={item.step} className="hover:shadow-md transition-shadow">
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
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
