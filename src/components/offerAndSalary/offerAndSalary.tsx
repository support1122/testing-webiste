"use client";

import {
    Award,
    DollarSign,
    Shield,
    ThumbsUpIcon,
    TrendingUp,
    UsersIcon,
    AlertTriangle,
    BarChart3,
    MessageCircle,
    Check,
    ArrowRight,
    Sparkles
} from "lucide-react";
import Image from "next/image";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";

export default function SalaryNegotiationUI() {
    const { getButtonProps } = useGeoBypass({
        onBypass: () => {
            // handled globally
        }
    });

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
        const utmMedium = getLocal("utm_medium", "Offer_Salary_Page");
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
            section: "offer_and_salary",
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
        <div className="bg-[rgba(251,240,235,1)] text-slate-900 pt-[120px] md:pt-[100px] overflow-x-hidden">

            {/* ====== HERO SECTION ====== */}
            <section className="relative pt-10 pb-20 md:pt-0 md:pb-24 bg-[rgba(251,240,235,1)]">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#ff4c00]/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#ff4c00]/5 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-white border border-[#ff4c00]/20 text-[#ff4c00] shadow-sm mb-6 animate-fade-in">
                        <Sparkles className="w-4 h-4" />
                        Offer & Salary Negotiation Advisor
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                        Negotiate your job offer with{" "}
                        <span className="text-[#ff4c00] relative">
                            confidence
                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#ff4c00]/20" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7509 3.49998 106.25 -3.50003 198 6.99997" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
                        </span>
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        FlashFire analyzes your offer, compares it with market data, and helps
                        you negotiate professionally — without awkward conversations.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            {...getButtonProps()}
                            onClick={() => handleCTAClick("Analyze My Offer", "offer_salary_hero", "/offer-and-salary-negotiation-advisor/analyze-my-offer")}
                            className="group px-8 py-4 rounded-2xl bg-[#ff4c00] shadow-[0_4px_14px_rgba(255,76,0,0.4)] text-white text-lg font-semibold hover:bg-[#e64500] hover:shadow-[0_6px_20px_rgba(255,76,0,0.5)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center">
                            Analyze My Offer
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      
                    </div>
                </div>
            </section>

            {/* ====== INSIGHT SECTION ====== */}
            <section className="py-20 md:py-24 bg-white relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                            Most candidates don't negotiate — and lose money
                        </h2>
                        <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                            Salary negotiation isn't about being aggressive. It's about being informed,
                            prepared, and professional.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            {
                                icon: AlertTriangle,
                                title: "Offers are rarely final",
                                desc: "Most companies expect negotiation. Candidates who ask professionally often receive better compensation without risking the offer.",
                            },
                            {
                                icon: BarChart3,
                                title: "Market data changes everything",
                                desc: "Knowing how similar roles are paid gives you confidence and removes guesswork from the conversation.",
                            },
                            {
                                icon: MessageCircle,
                                title: "The right words matter",
                                desc: "How you ask is as important as what you ask. Clear, respectful language improves outcomes.",
                            },
                        ].map(({ icon: Icon, title, desc }, index) => (
                            <div
                                key={title}
                                className="group relative flex flex-col rounded-2xl border border-[#ff4c00]/20 bg-gradient-to-br from-[rgba(251,240,235,1)] to-white p-8 hover:shadow-xl hover:border-[#ff4c00]/40 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff4c00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl"></div>
                                
                                <div className="h-14 w-14 rounded-2xl bg-[#ff4c00]/10 flex items-center justify-center mb-5 group-hover:bg-[#ff4c00]/20 transition-colors">
                                    <Icon className="h-7 w-7 text-[#ff4c00]" strokeWidth={2} />
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    {title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed flex-grow">
                                    {desc}
                                </p>
                                
                                <div className="mt-6 pt-6 border-t border-[#ff4c00]/10">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-[#ff4c00]">
                                        <span className="w-8 h-8 rounded-full bg-[#ff4c00]/10 flex items-center justify-center text-xs font-bold">
                                            0{index + 1}
                                        </span>
                                        Key Insight
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== BENEFITS GRID ====== */}
            <section className="py-20 md:py-24 px-4 sm:px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#ff4c00]/10 text-[#ff4c00] mb-4">
                            Features
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                            What You Get With FlashFire
                        </h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Actionable insights, negotiation scripts and confidence boosters that matter.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: TrendingUp,
                                title: "Market Salary Insights",
                                desc: "Know where your offer stands in the real world with our market salary insights.",
                            },
                            {
                                icon: Shield,
                                title: "Confident Strategy",
                                desc: "Approach negotiations with clarity and calm with our confident strategy.",
                            },
                            {
                                icon: UsersIcon,
                                title: "Role-specific Scripts",
                                desc: "Negotiation messages tailored to your role with our role-specific scripts.",
                            },
                            {
                                icon: Award,
                                title: "Maximize Compensation",
                                desc: "Don't miss equity, bonuses, or perks with our maximize compensation strategy.",
                            },
                            {
                                icon: ThumbsUpIcon,
                                title: "Acceptance Probability",
                                desc: "Know how likely your counter-offer will be accepted with our acceptance probability analysis.",
                            },
                            {
                                icon: DollarSign,
                                title: "Total Compensation Breakdown",
                                desc: "Understand every dollar in your offer package with our total compensation breakdown.",
                            },
                        ].map(({ icon: Icon, title, desc }, index) => (
                            <div
                                key={title}
                                className="group relative rounded-2xl p-6 bg-[rgba(251,240,235,1)] border border-[#ff4c00]/10 hover:border-[#ff4c00]/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff4c00]/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500"></div>
                                
                                <div className="relative">
                                    <div className="p-3 rounded-xl bg-white shadow-sm w-fit mb-4 group-hover:shadow-md transition-shadow">
                                        <Icon className="h-6 w-6 text-[#ff4c00]" strokeWidth={2} />
                                    </div>
                                    <h4 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-[#ff4c00] transition-colors">
                                        {title}
                                    </h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHO SHOULD USE THIS STRATEGY ===== */}
            <section className="bg-[rgba(251,240,235,1)] py-20 md:py-24 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/50 to-transparent"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* LEFT: CONTENT */}
                        <div>
                            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-full bg-white border border-[#ff4c00]/20 text-[#ff4c00] shadow-sm mb-6">
                                <Shield className="w-4 h-4" />
                                Salary Negotiation Strategy
                            </span>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                                Who Should Use This{" "}
                                <span className="text-[#ff4c00]">Strategy?</span>
                            </h2>

                            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                                FlashFire's salary negotiation strategy is built for professionals who want
                                to negotiate confidently, avoid leaving money on the table, and secure
                                compensation that truly reflects their value — without sounding pushy or risky.
                            </p>

                            <p className="mt-4 text-slate-600 leading-relaxed">
                                Whether you're negotiating base pay, bonuses, equity, or benefits, FlashFire
                                helps you approach the conversation with clarity, data, and confidence.
                            </p>

                            <button
                                {...getButtonProps()}
                                onClick={() => handleCTAClick("Get Started", "offer_salary_who_should", "/offer-and-salary-negotiation-advisor/analyze-my-offer")}
                                className="mt-8 group px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
                                Get Started Now
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* RIGHT: USE CASES */}
                        <div className="rounded-3xl border border-[#ff4c00]/20 bg-white p-8 shadow-xl">
                            <div className="space-y-6">
                                {[
                                    {
                                        title: "Candidates with a New Job Offer",
                                        desc: "Understand whether your offer is competitive and how to counter professionally."
                                    },
                                    {
                                        title: "Professionals Switching Roles or Industries",
                                        desc: "Navigate unfamiliar pay ranges and negotiate from a position of knowledge."
                                    },
                                    {
                                        title: "Candidates Unsure How to Negotiate Pay",
                                        desc: "Get step-by-step guidance and scripts that remove hesitation and anxiety."
                                    },
                                    {
                                        title: "Job Seekers Negotiating Bonuses, Equity, or Benefits",
                                        desc: "See the full compensation picture — not just base salary."
                                    },
                                ].map((item, index) => (
                                    <div key={item.title} className="flex gap-4 items-start group">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-[#ff4c00]/10 flex items-center justify-center group-hover:bg-[#ff4c00] transition-colors duration-300">
                                            <Check className="h-5 w-5 text-[#ff4c00] group-hover:text-white transition-colors" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-900 text-lg mb-1">
                                                {item.title}
                                            </h4>
                                            <p className="text-slate-600 text-sm leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== STRATEGIC GUIDANCE SECTION ====== */}
            <section className="bg-white py-20 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* LEFT: TEXT */}
                        <div className="order-2 lg:order-1">
                            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#ff4c00]/10 text-[#ff4c00] mb-4">
                                Guidance
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
                                Strategic Salary Negotiation{" "}
                                <span className="text-[#ff4c00]">Guidance</span>
                            </h2>

                            <ul className="space-y-5">
                                {[
                                    "Receive personalized strategies tailored to your role and industry",
                                    "Learn how to clearly articulate your value to justify higher compensation",
                                    "Get guidance on the right timing to negotiate for maximum impact",
                                ].map((text, index) => (
                                    <li key={text} className="flex items-start gap-4 group">
                                        <span className="flex-shrink-0 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff4c00] shadow-lg shadow-[#ff4c00]/30">
                                            <Check className="h-4 w-4 text-white" strokeWidth={3} />
                                        </span>
                                        <span className="text-lg text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">{text}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 p-6 rounded-2xl bg-[rgba(251,240,235,1)] border border-[#ff4c00]/20">
                                <p className="text-sm font-semibold text-[#ff4c00] mb-2">Pro Tip</p>
                                <p className="text-slate-700 text-sm leading-relaxed">
                                    The best negotiations happen when you're prepared with data. Our AI analyzes thousands of similar offers to give you the upper hand.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT: ILLUSTRATION */}
                        <div className="order-1 lg:order-2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#ff4c00]/20 to-transparent rounded-3xl transform rotate-3"></div>
                                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
                                    <img
                                        src="/images/offer&salary1.png"
                                        alt="Salary negotiation guidance"
                                        className="w-full h-auto rounded-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== COMPREHENSIVE ANALYSIS SECTION ====== */}
            <section className="bg-[rgba(251,240,235,1)] py-20 md:py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* LEFT: ILLUSTRATION */}
                        <div>
                            <div className="relative">
                                <div className="absolute -inset-4 bg-white/50 rounded-3xl transform -rotate-2"></div>
                                <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-[#ff4c00]/10">
                                    <img
                                        src="/images/offer&salary2.png"
                                        alt="Offer analysis"
                                        className="w-full h-auto rounded-2xl"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: TEXT */}
                        <div>
                            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-white border border-[#ff4c00]/20 text-[#ff4c00] mb-4">
                                Analysis
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
                                Comprehensive Offer{" "}
                                <span className="text-[#ff4c00]">Analysis</span>
                            </h2>

                            <ul className="space-y-5">
                                {[
                                    "Compare your offer against industry benchmarks and market standards",
                                    "Understand the full value of your compensation, including bonuses and benefits",
                                    "Identify key leverage points to negotiate a stronger offer",
                                ].map((text) => (
                                    <li key={text} className="flex items-start gap-4 group">
                                        <span className="flex-shrink-0 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff4c00] shadow-lg shadow-[#ff4c00]/30">
                                            <Check className="h-4 w-4 text-white" strokeWidth={3} />
                                        </span>
                                        <span className="text-lg text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">{text}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                {...getButtonProps()}
                                onClick={() => handleCTAClick("Analyze Offer", "offer_salary_analysis", "/offer-and-salary-negotiation-advisor/analyze-my-offer")}
                                className="mt-8 px-8 py-4 rounded-2xl bg-[#ff4c00] shadow-[0_4px_14px_rgba(255,76,0,0.4)] text-white text-lg font-semibold hover:bg-[#e64500] hover:shadow-[0_6px_20px_rgba(255,76,0,0.5)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group">
                                Analyze Your Offer
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ====== FINAL CTA SECTION ====== */}
            <section className="bg-white py-20 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <div className="rounded-3xl bg-gradient-to-br from-[rgba(251,240,235,1)] to-white border border-[#ff4c00]/20 p-8 md:p-12 shadow-xl">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                            Ready to maximize your offer?
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                            Join thousands of professionals who have successfully negotiated higher salaries using FlashFire's data-driven approach.
                        </p>
                        <button
                            {...getButtonProps()}
                            onClick={() => handleCTAClick("Start Now", "offer_salary_final_cta", "/offer-and-salary-negotiation-advisor/analyze-my-offer")}
                            className="px-10 py-5 rounded-2xl bg-[#ff4c00] shadow-[0_4px_20px_rgba(255,76,0,0.4)] text-white text-xl font-bold hover:bg-[#e64500] hover:shadow-[0_8px_30px_rgba(255,76,0,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 mx-auto group">
                            Start Negotiating Smarter
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="mt-4 text-sm text-slate-500">Free analysis • Takes 2 minutes • No risk</p>
                    </div>
                </div>
            </section>

        </div>
    );
}