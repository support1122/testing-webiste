"use client";

import Image from "next/image";
import { ArrowUpRight, Check, Search, FileText, Send, ShieldCheck, Zap, Eye, Lock, Briefcase, Code2, Repeat, Battery } from "lucide-react";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { FaPlus, FaTimes } from "react-icons/fa";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import { useEffect, useState } from "react";


export default function RecentJobOpenings() {
    const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
    const { getButtonProps } = useGeoBypass({
        onBypass: () => {
            // handled globally
        },
    });
    const handleFaqToggle = (index: number) => {
        setActiveFaqIndex(activeFaqIndex === index ? null : index);
      };

    const pushCustomUrl = (path?: string) => {
        if (typeof window === "undefined" || !path) return;
        const isCanada = window.location.pathname.startsWith("/en-ca");
        const normalized = path.startsWith("/en-ca")
            ? path
            : isCanada ? `/en-ca${path}` : path;
        window.history.pushState({}, "", normalized);
    };

    const handleCTAClick = (label: string, location: string, targetPath?: string) => {
        const getLocal = (key: string, fallback: string) =>
            typeof window !== "undefined" ? localStorage.getItem(key) || fallback : fallback;

        const utmSource = getLocal("utm_source", "WEBSITE");
        const utmMedium = getLocal("utm_medium", "Recent_Job_Openings_Page");
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
            section: "recent_job_openings",
        });

        trackSignupIntent(`${location}_cta`, {
            signup_source: location,
            funnel_stage: "signup_intent",
        });

        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("showStrategyCallCard"));
        }

        pushCustomUrl(targetPath);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="bg-white pt-16 md:pt-24 lg:pt-32 pb-12 md:pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* LEFT: VISUAL STACK */}
                        <div className="relative flex justify-center order-2 lg:order-1">
                            {/* Background card */}
                            <div className="absolute -top-6 -left-4 w-[90%] h-[95%] rounded-2xl lg:rounded-3xl bg-[rgba(251,240,235,1)]" />

                            {/* Main image */}
                            <div className="relative z-10 rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl w-full max-w-[400px] lg:max-w-none">
                                <Image
                                    src="/images/heroResultImage.jpg"
                                    alt="FlashFire applying to jobs"
                                    width={420}
                                    height={520}
                                    className="object-cover w-full h-auto"
                                    priority
                                />
                            </div>

                            {/* Floating job cards */}
                            <div className="absolute z-20 left-0 top-12 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                                    <Check className="h-4 w-4 text-[#ff4c00]" />
                                </div>
                                <div>
                                    <div className="font-semibold text-slate-900 text-sm">Data Analyst</div>
                                    <div className="text-slate-600 text-xs">Applied</div>
                                </div>
                            </div>

                            <div className="absolute z-20 left-[-10px] top-36 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                                    <Check className="h-4 w-4 text-[#ff4c00]" />
                                </div>
                                <div>
                                    <div className="font-semibold text-slate-900 text-sm">Software Engineer</div>
                                    <div className="text-slate-600 text-xs">Applied</div>
                                </div>
                            </div>

                            <div className="absolute z-20 left-4 bottom-20 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                                    <Check className="h-4 w-4 text-[#ff4c00]" />
                                </div>
                                <div>
                                    <div className="font-semibold text-slate-900 text-sm">Product Manager</div>
                                    <div className="text-slate-600 text-xs">Applied</div>
                                </div>
                            </div>

                            <div className="absolute z-20 left-0 top-64 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-[#ff4c00]/10 flex items-center justify-center flex-shrink-0">
                                    <Check className="h-4 w-4 text-[#ff4c00]" />
                                </div>
                                <div>
                                    <div className="font-semibold text-slate-900 text-sm">Marketing Manager</div>
                                    <div className="text-slate-600 text-xs">Applied</div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: CONTENT */}
                        <div className="text-center lg:text-left order-1 lg:order-2">
                            <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-[rgba(251,240,235,1)] text-[#ff4c00] mb-6">
                                AI Job Search Assistant
                            </span>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                                AI Job Search Assistant That Automates Job Applications for You
                            </h1>

                            <p className="text-base md:text-lg text-slate-700 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                FlashFire is an AI job search assistant and job application automation software that finds relevant roles, tailors your resume, and automatically submits applications to help you apply faster.
                            </p>

                            <button
                                {...getButtonProps()}
                                onClick={() => handleCTAClick("Get Started", "recent_jobs_hero", "/recent-job-openings/Get-started")}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#ff4c00] text-white rounded-xl font-semibold hover:bg-[#e64500] shadow-md text-base"
                            >
                                Get Started
                                <ArrowUpRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-[rgba(251,240,235,1)] py-16 md:py-24 lg:py-32">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Heading */}
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6">
                            How Our AI Job Application Automation Software Works
                        </h2>
                        <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                            FlashFire automates your entire job search — from finding roles to submitting applications — without compromising quality.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center bg-white rounded-2xl p-8 shadow-sm border border-[#ff4c00]/10">
                            <div className="h-14 w-14 rounded-2xl bg-[rgba(251,240,235,1)] flex items-center justify-center mb-6">
                                <Search className="h-7 w-7 text-[#ff4c00]" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                Finds relevant jobs
                            </h3>
                            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                                FlashFire acts as an AI job finder that scans thousands of listings daily to match your skills, experience, and preferences.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center bg-white rounded-2xl p-8 shadow-sm border border-[#ff4c00]/10">
                            <div className="h-14 w-14 rounded-2xl bg-[rgba(251,240,235,1)] flex items-center justify-center mb-6">
                                <FileText className="h-7 w-7 text-[#ff4c00]" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                Tailors your resume
                            </h3>
                            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                                Our AI career assistant customizes every application with optimized keywords to improve ATS matching and recruiter visibility.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center bg-white rounded-2xl p-8 shadow-sm border border-[#ff4c00]/10">
                            <div className="h-14 w-14 rounded-2xl bg-[rgba(251,240,235,1)] flex items-center justify-center mb-6">
                                <Send className="h-7 w-7 text-[#ff4c00]" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                Applies automatically
                            </h3>
                            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                                Our job application automation software submits applications daily, helping you scale job searches without manual effort.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Target Users Section */}
            <section className="relative bg-[#fff5f0] py-16 md:py-24 lg:py-32 overflow-hidden">
                {/* ambient background */}
                <div className="absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-[#ff4c00]/10 blur-[140px]" />
                <div className="absolute -bottom-40 -left-40 h-[480px] w-[480px] rounded-full bg-[#ff4c00]/10 blur-[140px]" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* HEADER */}
                    <div className="max-w-3xl mb-16">
                        <span className="text-sm font-semibold tracking-wide text-[#ff4c00] uppercase mb-3 block">
                            Target Users
                        </span>
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
                            Built for serious job seekers
                        </h2>
                        <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                            FlashFire is designed for people who care about speed, accuracy, and real hiring results.
                        </p>
                    </div>

                    {/* CONTENT */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {[
                            {
                                icon: Briefcase,
                                title: "Active job seekers",
                                desc: "Candidates applying consistently and losing hours to repetitive workflows."
                            },
                            {
                                icon: Code2,
                                title: "Technology professionals",
                                desc: "Engineers and developers targeting high-quality roles efficiently."
                            },
                            {
                                icon: Repeat,
                                title: "Career switchers",
                                desc: "Professionals moving between domains needing ATS-optimized applications."
                            },
                            {
                                icon: Battery,
                                title: "Burned-out candidates",
                                desc: "Job seekers exhausted by slow, manual, and error-prone processes."
                            }
                        ].map(({ icon: Icon, title, desc }, idx) => (
                            <div
                                key={idx}
                                className="group relative rounded-2xl bg-white/80 border border-[#ff4c00]/20 p-6 lg:p-8 hover:shadow-lg hover:shadow-[#ff4c00]/5 hover:border-[#ff4c00]/40"
                            >
                                <div className="flex gap-5 items-start">
                                    {/* ICON */}
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff6b2b] to-[#ff4c00] shadow-lg shadow-[#ff4c00]/20 flex-shrink-0">
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>

                                    {/* TEXT */}
                                    <div className="min-w-0">
                                        <h3 className="text-lg lg:text-xl font-semibold text-slate-900 mb-2">
                                            {title}
                                        </h3>
                                        <p className="text-sm lg:text-base text-slate-700 leading-relaxed">
                                            {desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust & Safety Section */}
            <section className="bg-white py-16 md:py-24 lg:py-32">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* LEFT: TEXT */}
                        <div>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6">
                                Built for trust, safety, and results
                            </h2>

                            <p className="text-base md:text-lg text-slate-700 mb-10 leading-relaxed">
                                FlashFire works as a secure job search AI tool designed to automate applications without risking privacy or professionalism.
                            </p>

                            <div className="space-y-8">
                                {/* Point 1 */}
                                <div className="flex gap-5">
                                    <div className="h-12 w-12 rounded-xl bg-[rgba(251,240,235,1)] flex items-center justify-center flex-shrink-0">
                                        <ShieldCheck className="h-6 w-6 text-[#ff4c00]" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-lg font-semibold text-slate-900 mb-1">
                                            Safe & controlled applications
                                        </h4>
                                        <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                                            FlashFire only applies to roles aligned with your profile and preferences. You stay in full control.
                                        </p>
                                    </div>
                                </div>

                                {/* Point 2 */}
                                <div className="flex gap-5">
                                    <div className="h-12 w-12 rounded-xl bg-[rgba(251,240,235,1)] flex items-center justify-center flex-shrink-0">
                                        <Eye className="h-6 w-6 text-[#ff4c00]" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-lg font-semibold text-slate-900 mb-1">
                                            Transparent tracking
                                        </h4>
                                        <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                                            See exactly where your applications are sent and track progress from one clean dashboard.
                                        </p>
                                    </div>
                                </div>

                                {/* Point 3 */}
                                <div className="flex gap-5">
                                    <div className="h-12 w-12 rounded-xl bg-[rgba(251,240,235,1)] flex items-center justify-center flex-shrink-0">
                                        <Zap className="h-6 w-6 text-[#ff4c00]" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-lg font-semibold text-slate-900 mb-1">
                                            Built for speed & scale
                                        </h4>
                                        <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                                            Apply to significantly more roles without burnout or manual effort.
                                        </p>
                                    </div>
                                </div>

                                {/* Point 4 */}
                                <div className="flex gap-5">
                                    <div className="h-12 w-12 rounded-xl bg-[rgba(251,240,235,1)] flex items-center justify-center flex-shrink-0">
                                        <Lock className="h-6 w-6 text-[#ff4c00]" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-lg font-semibold text-slate-900 mb-1">
                                            Privacy-first by design
                                        </h4>
                                        <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                                            Your data is encrypted and never shared beyond job applications.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: VISUAL */}
                        <div className="bg-[rgba(251,240,235,1)] rounded-2xl lg:rounded-3xl p-8 lg:p-12 shadow-sm flex items-center justify-center">
                            <Image
                                src="/images/recentJobOpening.png"
                                alt="Recent Job Openings"
                                width={520}
                                height={420}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Automation Section */}
            <section className="py-16 md:py-24 lg:py-32 bg-[rgba(251,240,235,1)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        {/* LEFT */}
                        <div>
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                                Why automation beats manual job applications
                            </h2>

                            <p className="text-base md:text-lg text-slate-700 mb-10 leading-relaxed max-w-xl">
                                Manual applications limit how many opportunities you can reach. FlashFire removes that limit — without compromising quality.
                            </p>

                            <div className="space-y-8">
                                {[
                                    {
                                        title: "Apply 10× faster",
                                        desc: "Reach more companies daily without increasing effort.",
                                    },
                                    {
                                        title: "ATS-optimized every time",
                                        desc: "Each application is tailored to pass automated filters.",
                                    },
                                    {
                                        title: "Consistent quality",
                                        desc: "No missed fields, no rushed mistakes, no burnout.",
                                    },
                                    {
                                        title: "Works while you sleep",
                                        desc: "FlashFire applies continuously in the background.",
                                    },
                                ].map((item) => (
                                    <div key={item.title} className="flex gap-5">
                                        <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                                            <Zap className="h-6 w-6 text-[#ff4c00]" />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-lg font-semibold text-slate-900 mb-1">
                                                {item.title}
                                            </h4>
                                            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT – DECISION CARD */}
                        <div className="relative">
                            <div className="absolute -top-6 -right-6 w-full h-full rounded-2xl lg:rounded-3xl bg-[#ff4c00]/20" />
                            <div className="relative bg-white rounded-2xl lg:rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-100">
                                <h3 className="text-xl font-semibold text-slate-900 mb-8">
                                    Manual vs AI-powered applications
                                </h3>

                                <div className="space-y-4 text-base text-slate-700 mb-8">
                                    <div className="flex items-center gap-3">
                                        <span className="text-red-500 font-bold text-lg">✕</span>
                                        <span>Manual: Slow and repetitive</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-red-500 font-bold text-lg">✕</span>
                                        <span>Manual: Limited daily reach</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-red-500 font-bold text-lg">✕</span>
                                        <span>Manual: Inconsistent quality</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <span className="text-green-600 font-bold text-lg">✓</span>
                                        <span className="font-semibold text-slate-900">
                                            AI-powered: Fast, scalable, ATS-ready
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 lg:py-32 bg-[#fff6f1]">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6">
                        Ready to stop applying manually?
                    </h2>

                    <p className="text-base md:text-lg text-slate-700 mb-10 leading-relaxed">
                        Let FlashFire handle job applications while you focus on preparing for interviews.
                    </p>

                    <button
                        {...getButtonProps()}
                        onClick={() => handleCTAClick("Start with FlashFire", "recent_jobs_bottom", "/recent-job-openings/Start-with-Flashfire")}
                        className="inline-flex items-center gap-2 px-10 py-5 bg-[#ff4c00] text-white rounded-xl font-semibold hover:bg-[#e64500] shadow-md text-base"
                    >
                        Start with FlashFire
                    </button>
                </div>
            </section>

            {/* FAQ Section */}
            <section  className={faqStyles.faqSection}>
            <div id="faq-header" className={faqStyles.header}>
                <h2>Frequently Asked Questions</h2>
                <p>
                Get answers about our AI job search assistant and job application automation.
                </p>
            </div>

            <div className={faqStyles.faqContainer}>
                {[
                {
                    question: "What is an AI job search assistant?",
                    answer:
                    "An AI job search assistant helps automate job discovery, resume optimization, and application submission to improve efficiency and interview opportunities.",
                },
                {
                    question: "How does job application automation software work?",
                    answer:
                    "Job application automation software scans listings, matches relevant roles, customizes applications, and submits them automatically based on your preferences.",
                },
                {
                    question: "Is FlashFire an AI career assistant?",
                    answer:
                    "Yes. FlashFire functions as an AI career assistant by helping you find jobs, optimize resumes, track applications, and prepare for interviews.",
                },
                ].map((faq, index) => (
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
        </>
    );
}