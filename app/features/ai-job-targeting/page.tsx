"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Check,
  CheckCircle,
  Filter,
  Search,
  Shield,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

export default function PrecisionTargetingPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { getButtonProps } = useGeoBypass({ onBypass: () => {} });

  const handleGetMeInterview = () => {
    try {
      const utmSource =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
      const utmMedium =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("utm_medium") || "Precision_Targeting_Page"
          : "Precision_Targeting_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Precision_Targeting_Get_Me_Interview_Button",
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
        trackButtonClick("Get Me Interview", "precision_targeting_cta", "cta", {
          button_location: "precision_targeting_hero_section",
          section: "precision_targeting_hero",
        });
        trackSignupIntent("precision_targeting_cta", {
          signup_source: "precision_targeting_hero_button",
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
      const isOnPrecisionTargetingPage =
        normalizedPath === "/features/precision-targeting" ||
        normalizedPath === "/en-ca/features/precision-targeting" ||
        normalizedPath === "/features/ai-job-targeting" ||
        normalizedPath === "/en-ca/features/ai-job-targeting";

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

      if (isOnPrecisionTargetingPage) {
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

  const targetAudience = [
    {
      title: "International Students",
      desc: "Apply only to companies that sponsor or consider visa holders.",
      icon: Users,
    },
    {
      title: "Career Switchers",
      desc: "Target roles where your transferable skills matter.",
      icon: Briefcase,
    },
    {
      title: "Experienced Professionals",
      desc: "Avoid junior roles and low-growth companies.",
      icon: Trophy,
    },
  ];

  const howItWorksSteps = [
    {
      title: "Understand your profile",
      desc: "We analyze your resume, experience, skills, and past roles to identify where you truly fit.",
      icon: Search,
    },
    {
      title: "Filter high-fit jobs",
      desc: "Jobs are filtered based on ATS score, skill match, role relevance, and hiring patterns.",
      icon: Filter,
    },
    {
      title: "Apply with intent",
      desc: "Applications are sent only to roles where your profile ranks competitively.",
      icon: Target,
    },
    {
      title: "Improve continuously",
      desc: "Feedback, rejections, and responses are used to refine targeting every week.",
      icon: BarChart3,
    },
  ];

  const stats = [
    { value: "70%", label: "FEWER REJECTIONS" },
    { value: "90%", label: "ATS MATCH ACCURACY" },
    { value: "10x", label: "TIME SAVED" },
    { value: "3x", label: "HIGHER INTERVIEW RATE" },
  ];

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: "AI Job Targeting",
    image: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/job-tracker.png",
    description:
      "Precision job targeting using AI ensures every application matches recruiter intent. Stop wasting applications and start getting interviews.",
    brand: { "@type": "Brand", name: "FlashFire" },
    offers: {
      "@type": "Offer",
      url: "https://flashfirejobs.com/features/ai-job-targeting",
      priceCurrency: "USD",
      price: "0",
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "478" },
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Flashfire AI Job Targeting",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.flashfirejobs.com/features/ai-job-targeting",
    description: "Precision job targeting using AI ensures every application matches recruiter intent. Stop wasting applications and start getting interviews.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "478" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.flashfirejobs.com" },
      { "@type": "ListItem", position: 2, name: "Features", item: "https://www.flashfirejobs.com/feature" },
      { "@type": "ListItem", position: 3, name: "AI Job Targeting", item: "https://www.flashfirejobs.com/features/ai-job-targeting" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="min-h-screen overflow-x-hidden bg-white text-[#111827]">
        <section className="relative min-h-[510px] bg-[#fff3ee] px-4 pt-[92px]">
          <div className="mx-auto max-w-[1180px]">
            <HeroFloatingPill className="left-[122px] top-[155px] hidden lg:flex" label="Works with free LinkedIn" />
            <HeroFloatingPill className="left-[52px] top-[219px] hidden lg:flex" label="No login required" />
            <HeroFloatingPill className="right-[92px] top-[207px] hidden lg:flex" label="Works with free LinkedIn" />
            <HeroFloatingPill className="right-[181px] top-[270px] hidden lg:flex" label="No login required" />

            <div className="mx-auto max-w-[640px] text-center">
              <span className="mb-6 inline-flex rounded-full bg-[#ff4c00] px-6 py-1.5 text-[10px] font-extrabold text-white">
                Precision Targeting
              </span>
              <h1 className="text-[34px] font-extrabold leading-[1.15] tracking-normal text-[#111827] sm:text-[42px]">
                Apply to Jobs That
                <br className="hidden sm:block" />
                Actually Match Your Profile.
              </h1>
              <p className="mx-auto mt-6 max-w-[520px] text-[15px] font-medium leading-7 text-[#596273]">
                Stop wasting applications on low-fit roles. <strong>FlashFire&apos;s AI</strong>
                <br className="hidden sm:block" />
                <strong>targets jobs</strong> where your skills, experience, and <strong>ATS score</strong>
                <br className="hidden sm:block" />
                <strong>give you</strong> the <strong>highest chance of interviews.</strong>
              </p>

              <div className="mt-8 flex flex-row  items-center justify-center gap-4">
                <button
                  {...getButtonProps()}
                  onClick={handleGetMeInterview}
                  className="inline-flex h-[42px] min-w-[148px] items-center justify-center gap-2 rounded-md border-2 border-black bg-white px-6 text-[12px] font-extrabold text-black transition hover:bg-[#ffe8dd]"
                  style={{ boxShadow: "0 4px 0 0 #ff4c00" }}
                >
                  Get Me Interview
                  <ArrowRight size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleHowItWorks}
                  className="inline-flex h-[42px] min-w-[112px] items-center justify-center rounded-md border-2 border-[#ff4c00] bg-transparent px-6 text-[12px] font-extrabold text-[#ff4c00] transition hover:bg-white"
                >
                  How It Works
                </button>
              </div>

              <div className="mt-7 flex items-center justify-center gap-6 text-[10px] font-semibold text-[#111827]">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle size={14} />
                  No signup required
                </span>
                <span className="inline-flex items-center gap-2">
                  <Shield size={14} />
                  100% secure
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[860px]">
            <div className="mb-14 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.08] text-[#111827] sm:text-[42px]">
                Precision AI Job Targeting
                <br />
                vs Mass Applying
              </h2>
              <p className="mt-5 text-[16px] font-medium text-[#6b7280]">
                See why targeted applications outperform spray-and-pray approaches
              </p>
            </div>

            <div className="grid border border-black md:grid-cols-2">
              <div>
                <div className="flex h-[54px] items-center gap-3 border-b border-black bg-[#f0f0f0] px-5 text-[15px] font-extrabold text-[#111827]">
                  <Zap size={16} fill="#ff4c00" className="text-[#ff4c00]" />
                  Mass Applying
                </div>
                {[
                  "Low ATS match",
                  "High rejection rate",
                  "Time wasted on poor-fit roles",
                  "No learning or feedback loop",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex h-[54px] items-center border-b border-black px-5 text-[16px] font-medium text-[#6b7280] last:border-b-0 md:last:border-b"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="border-t border-black md:border-l md:border-t-0">
                <div className="flex h-[54px] items-center gap-3 bg-[#ff4c00] px-5 text-[15px] font-extrabold text-white">
                  <Check size={16} strokeWidth={3} />
                  Precision Targeting
                </div>
                {[
                  "High skill & ATS match",
                  "Better interview conversion",
                  "Focused, quality applications",
                  "Continuous optimization",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex h-[54px] items-center gap-3 border-b border-[#ff9a78] bg-[#fff3ee] px-5 text-[16px] font-semibold text-[#111827] last:border-b-0"
                  >
                    <Check size={18} strokeWidth={3} className="text-[#ff4c00]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[900px]">
            <h2 className="mb-14 text-center text-[34px] font-extrabold leading-[1.08] text-[#111827] sm:text-[42px]">
              Who Is Precision Targeting For?
            </h2>
            <div className="grid auto-rows-fr gap-6 md:grid-cols-3">
              {targetAudience.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="h-full min-h-[160px] min-w-0 overflow-hidden rounded-md border border-[#d5d5d5] bg-white p-7 shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
                  >
                    <span className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-[#ff4c00] text-white">
                      <Icon size={21} />
                    </span>
                    <h3 className="text-[16px] font-extrabold text-[#111827]">{item.title}</h3>
                    <p className="mt-4 text-[13px] font-medium leading-6 text-[#6b7280]">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-white px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[760px]">
            <div className="mb-12 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.08] text-[#111827] sm:text-[42px]">
                Precision targeting, done right
              </h2>
              <p className="mt-6 text-[15px] font-medium text-[#6b7280]">
                We don&apos;t apply everywhere. We apply where you actually have a chance.
              </p>
            </div>

            <div className="grid auto-rows-fr gap-5 md:grid-cols-2">
              {howItWorksSteps.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="h-full min-h-[135px] min-w-0 overflow-hidden rounded-md border border-[#d5d5d5] bg-white px-7 py-6 shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
                  >
                    <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-[#ff4c00] text-white">
                      <Icon size={22} />
                    </span>
                    <h3 className="text-[19px] font-extrabold leading-tight text-[#ff4c00]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13px] font-medium leading-5 text-[#6b7280]">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-[960px]">
            <div className="mb-14 text-center">
              <h2 className="text-[34px] font-extrabold leading-[1.08] text-[#111827] sm:text-[42px]">
                Real Results from Precision Targeting
              </h2>
              <p className="mt-6 text-[16px] font-medium text-[#6b7280]">
                Our AI-driven targeting strategy focuses your effort where it matters most
              </p>
            </div>
            <div className="grid auto-rows-fr gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className="flex h-full min-w-0 flex-col items-center justify-center overflow-hidden border border-black bg-white px-8 py-7 text-center shadow-[4px_4px_0_0_rgba(0,0,0,0.85)]"
                >
                  <p className="text-[36px] font-extrabold leading-none text-[#ff4c00]">{stat.value}</p>
                  <p className="mt-4 text-[10px] font-extrabold uppercase text-[#6b7280]">{stat.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fff3ee] px-4 py-20">
          <div className="mx-auto max-w-[760px] text-center">
            <h2 className="text-[34px] font-extrabold leading-tight text-[#111827]">
              Ready to Target Smarter?
            </h2>
            <p className="mx-auto mt-5 max-w-[600px] text-[16px] font-medium leading-7 text-[#596273]">
              Join thousands of job seekers who stopped mass applying and started getting interviews.
            </p>
            <button
              {...getButtonProps()}
              onClick={handleGetMeInterview}
              className="mt-8 inline-flex h-[52px] items-center justify-center gap-2 rounded-md border-2 border-black bg-white px-8 text-[15px] font-extrabold text-black transition hover:bg-[#ffe8dd]"
              style={{ boxShadow: "0 4px 0 0 #ff4c00" }}
            >
              Get Me Interview
              <ArrowRight size={17} />
            </button>
            <p className="mt-5 text-[13px] font-medium text-[#6b7280]">
              No credit card required. Setup in 5 minutes.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function HeroFloatingPill({ className, label }: { className: string; label: string }) {
  return (
    <div
      className={`absolute h-[38px] w-[140px] items-center justify-center rounded-lg bg-white text-center text-[10px] font-extrabold leading-none text-[#596273] shadow-[0_14px_35px_rgba(17,24,39,0.08)] ${className}`}
    >
      {label}
    </div>
  );
}
