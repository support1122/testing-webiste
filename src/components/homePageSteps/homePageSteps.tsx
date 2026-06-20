"use client";

import { useState } from "react";
import { ArrowRight, FileText, Minus, PhoneCall, Plus, Rocket } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";

const steps = [
  {
    title: "Resume Tailoring",
    detail:
      "Your resume is customized for each role with role-specific keywords and formatting recruiters love.",
    icon: FileText,
  },
  {
    title: "LinkedIn Optimization",
    detail:
      "We rewrite your LinkedIn to stand out in U.S. recruiter searches, using AI-powered keyword matching.",
    icon: FaLinkedin,
  },
  {
    title: "Smart Job Applications",
    detail:
      "We apply to 1000+ curated jobs that match your goals, location, and visa needs - no spam, just precision.",
    icon: Rocket,
  },
  {
    title: "Get Interview Calls",
    detail:
      "Start receiving interview invites as we track and optimize every application. You focus on prep, we handle the hustle.",
    icon: PhoneCall,
  },
];

export default function HomePageSteps() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault();
    trackSignupIntent("homepage_steps_cta", {
      button_location: "homepage_steps_section",
      section: "homepage_steps",
    });
    trackButtonClick("Get Started", "homepage_steps_cta", "cta", {
      button_location: "homepage_steps_section",
      section: "homepage_steps",
      destination: "/Get-Started",
    });
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", "/Get-Started");
      window.dispatchEvent(new CustomEvent("showCalendlyModal"));
    }
  };

  return (
    <section className="bg-white py-8 font-['Space_Grotesk',sans-serif] md:py-10 lg:py-12">
      <div className="bg-[#faebe4] px-5 py-16 md:px-8 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24">
        <div className="text-left lg:sticky lg:top-24">
          <h2 className="max-w-[560px] text-4xl font-extrabold leading-[1.12] text-black md:text-5xl">
            How Flashfire&apos;s AI Job Automation Platform Works in{" "}
            <span className="text-[#ff4c00]">4 Simple Steps</span>
          </h2>

          <p className="mt-5 max-w-[540px] text-lg font-medium leading-8 text-[#746f6d]">
            Flashfire simplifies job hunting using AI job application automation,
            handling everything from resume optimization to automated job
            submissions and tracking.
          </p>

          <button
            onClick={handleGetStarted}
            className="mt-12 inline-flex min-h-12 items-center justify-center bg-black px-6 text-base font-bold text-white transition-colors hover:bg-[#ff4c00] focus:outline-none focus:ring-2 focus:ring-[#ff4c00] focus:ring-offset-2 focus:ring-offset-[#faebe4]"
          >
            Get Started →
          </button>
        </div>

        <div className="space-y-4 lg:pl-8">
          {steps.map((step, index) => {
            const isActive = activeIndex === index;
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className={`overflow-hidden rounded-[5px] border border-[#ded9d6] bg-white shadow-sm transition-all duration-300 ${
                  isActive ? "bg-[#ff4c00] shadow-md" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(isActive ? -1 : index)}
                  className={`flex w-full items-center gap-4 px-4 py-4 text-left transition-colors ${
                    isActive ? "bg-[#ff4c00] text-white" : "text-black hover:bg-[#fff7f3]"
                  }`}
                  aria-expanded={isActive}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] ${
                      isActive ? "bg-white/15" : "bg-[#ffe9df]"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        isActive ? "text-white" : "text-[#ff4c00]"
                      }`}
                    />
                  </span>

                  <span className="min-w-0 flex-1 text-sm font-extrabold md:text-base">
                    Step {index + 1} - {step.title}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      isActive ? "bg-white text-[#ff4c00]" : "bg-[#ffe9df] text-[#ff4c00]"
                    }`}
                  >
                    {isActive ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </span>
                </button>

                {isActive && (
                  <div className="bg-white px-4 pb-5 pt-1 text-left md:px-6">
                    <p className="text-sm font-medium leading-6 text-[#6f747c]">{step.detail}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}
