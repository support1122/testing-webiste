"use client";

import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
import styles from "@/src/components/homePageFAQ/homePageFAQ.module.css";
import { useState } from "react";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { trackButtonClick, trackExternalLink } from "@/src/utils/PostHogTracking";
import { WHATSAPP_SUPPORT_URL } from "@/src/utils/whatsapp";
import {
  ArrowRight,
  BriefcaseBusiness,
  Bot,
  Check,
  Clock3,
  Handshake,
  Minus,
  PhoneCall,
  Plus,
  Rocket,
  Target,
  Trophy,
  Users,
} from "lucide-react";

const stats = [
  { value: "95%", label: "Users receive interviews", icon: Users },
  { value: "300K", label: "Jobs Applied", icon: BriefcaseBusiness },
  { value: "7 -10", label: "Average Interview Calls", icon: PhoneCall },
  { value: "1 week", label: "To First Interview", icon: Clock3 },
];

const steps = [
  {
    heading: "You share your goals.",
    description:
      "Tell us what you are aiming for, your dream role, location, and experience. We learn your story so we can find the right opportunities for you.",
    whiteIcon: Users,
    orangeIcon: Target,
  },
  {
    heading: "We build your winning profile.",
    description:
      "We create ATS-optimized resumes and optimize LinkedIn profiles so your applications pass filters and rank higher in recruiter searches.",
    whiteIcon: BriefcaseBusiness,
    orangeIcon: Trophy,
  },
  {
    heading: "Flashfire AI Applies for Jobs Automatically on Your Behalf",
    description:
      "Our AI job application tool automatically submits targeted applications to 1000+ curated roles using role-specific resumes and custom answers, no spam, no mass blasting.",
    whiteIcon: Bot,
    orangeIcon: Rocket,
  },
  {
    heading: "You start getting interview calls.",
    description:
      "As applications go out, you start getting real calls from real recruiters. We track, follow up, and optimize every step so you can focus on preparing.",
    whiteIcon: PhoneCall,
    orangeIcon: Handshake,
  },
];

const differentiators = [
  "Designed for international students: visa-aware matching (OPT, CPT, STEM OPT,H-1B).",
  "Full-stack automation: form filling, custom answers, and ATS-tailored resumes.",
  "Hybrid AI + human review, so your profile is truly hire-ready.",
  "Transparent dashboard with success probabilities and recruiter response signals.",
  "Daily sourcing across boards, company pages, and unlisted recruiter roles.",
  "Built-in interview prep once calls start coming in.",
];

const personas = [
  { num: "01", title: "International Students", desc: "OPT, CPT, and STEM OPT candidates applying under strict visa timelines." },
  { num: "02", title: "U.S. & Canada Job Seekers", desc: "Candidates targeting U.S. & Canada-based roles across tech, business, and operations." },
  { num: "03", title: "Burnt-Out Applicants", desc: "People tired of filling the same forms with zero response." },
  { num: "04", title: "Results-Driven Users", desc: "Anyone looking for an AI job application tool that actually converts." },
];

const faqs = [
  {
    q: "Does Flashfire really apply for jobs automatically?",
    a: "Yes. Flashfire handles sourcing, tailoring, form filling, submission, tracking, and follow-up workflows.",
  },
  {
    q: "Will Flashfire help me get interview calls?",
    a: "That is the core goal: targeted, optimized applications that are built to convert into recruiter conversations.",
  },
  {
    q: "Does Flashfire work for OPT/CPT students?",
    a: "Yes. Flashfire is built around visa-friendly matching for OPT, CPT, STEM OPT, and H-1B paths.",
  },
  {
    q: "How fast can I expect interview calls?",
    a: "Most students begin receiving responses within 2-6 weeks, depending on their profile, target roles, and market timing.",
  },
  {
    q: "Is Flashfire an AI job application tool or a full platform?",
    a: "It is a complete platform that combines job automation, resume optimization, LinkedIn optimization, and application tracking.",
  },
];

export default function HowItWorks() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activePersona, setActivePersona] = useState<number | null>(null);

  const handleTalkToExpertClick = (buttonLocation: string) => {
    const utmSource =
      typeof window !== "undefined"
        ? localStorage.getItem("utm_source") || "WEBSITE"
        : "WEBSITE";
    const utmMedium =
      typeof window !== "undefined"
        ? localStorage.getItem("utm_medium") || `Website_How_It_Works_${buttonLocation}`
        : `Website_How_It_Works_${buttonLocation}`;
    const utmCampaign =
      typeof window !== "undefined"
        ? localStorage.getItem("utm_campaign") || "Website"
        : "Website";

    GTagUTM({
      eventName: "whatsapp_support_click",
      label: `How_It_Works_Talk_To_Expert_${buttonLocation}`,
      utmParams: { utm_source: utmSource, utm_medium: utmMedium, utm_campaign: utmCampaign },
    });

    trackButtonClick("Talk to an Expert", "how_it_works_cta", "cta", {
      button_location: `how_it_works_${buttonLocation}`,
      section: "how_it_works",
    });
    trackExternalLink(WHATSAPP_SUPPORT_URL, "Talk to an Expert", "how_it_works_cta", {
      link_type: "whatsapp_support",
      contact_method: "whatsapp",
      source: `how_it_works_${buttonLocation}`,
    });

    window.open(WHATSAPP_SUPPORT_URL, "_blank");
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <div className="min-h-screen bg-[#fff6f1] text-[#080706]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      <main className="w-full overflow-hidden pb-9 lg:pb-14">
        <section className="overflow-hidden rounded-[13px] border border-[#f5ded5] bg-white px-5 py-12 shadow-[0_18px_50px_rgba(50,26,13,0.04)] sm:px-8 md:px-12 lg:px-[54px] lg:py-[58px]">
          <div>
            <h1 className="max-w-[690px] text-[2rem] font-extrabold leading-[1.08] text-[#111827] sm:text-[2.55rem] lg:text-[3.08rem]">
              AI Job Application Software
              <br />
              That HelpsYou{" "}
              <span className="text-[#ff4c00]">Apply Automatically</span>
            </h1>
            <p className="mt-4 max-w-[710px] text-[0.95rem] font-semibold leading-6 text-[#4f596a]">
              Flashfire automates job searching, ATS-optimized resumes, and applications-helping students
              and job seekers get interview calls faster.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="min-h-[154px] rounded-[8px] border border-[#ffcdbd] bg-white px-6 py-5 shadow-[0_6px_16px_rgba(255,76,0,0.09)]"
                  >
                    <div className="flex h-[62px] w-[62px] items-center justify-center rounded-[6px] bg-[#ffe4bf] text-[#ff4c00]">
                      <Icon className="h-[27px] w-[27px]" />
                    </div>
                    <div className="mt-[21px] text-[2.15rem] font-extrabold leading-none text-[#5f6062]">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-xs font-medium leading-4 text-[#737987]">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-7 text-xs font-bold text-[#8b94a3]">
              No manual searching. No repetitive forms.
            </p>
          </div>
        </section>

        <section className="mt-16 bg-white px-4 py-12 sm:px-5 md:py-14">
          <div className="mx-auto max-w-[650px] text-center">
            <h2 className="text-[1.75rem] font-extrabold leading-[1.05] text-[#111827] sm:text-[2rem] md:text-[2.78rem]">
              How Our AI Job
              <br />
              Application Software Works
            </h2>
            <p className="mx-auto mt-3 max-w-[310px] text-[0.82rem] font-medium leading-[1.2] text-[#596273] sm:max-w-[350px] sm:text-[1.05rem] sm:leading-[1.1]">
              From profile setup to interview calls -
              <br />
              four simple steps to your dream job.
            </p>
          </div>

          <div className="mx-auto mt-9 grid max-w-[710px] gap-4 sm:mt-[64px] sm:gap-[28px]">
            {steps.map((step, index) => {
              const WhiteIcon = step.whiteIcon;
              const OrangeIcon = step.orangeIcon;
              const isEven = index % 2 === 1;

              return (
                <div
                  key={step.heading}
                  className={`grid gap-2 sm:gap-5 md:justify-center ${
                    isEven
                      ? "grid-cols-[92px_minmax(0,1fr)] md:grid-cols-[170px_345px] lg:grid-cols-[226px_460px]"
                      : "grid-cols-[minmax(0,1fr)_92px] md:grid-cols-[345px_170px] lg:grid-cols-[460px_226px]"
                  }`}
                >
                  <article
                    className={`min-h-[124px] rounded-[8px] border border-[#f3ded4] bg-white px-4 py-5 shadow-[0_10px_18px_rgba(24,24,27,0.12)] sm:min-h-[150px] sm:px-[38px] sm:py-[43px] lg:min-h-[170px] lg:px-[54px] lg:py-[56px] ${
                      isEven ? "order-2" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 sm:gap-6">
                      <div>
                        <p className="text-[0.68rem] font-semibold leading-none text-[#111827] sm:text-[0.98rem]">
                          Step {index + 1}
                        </p>
                        <h3 className="mt-1.5 max-w-[330px] text-[0.82rem] font-extrabold leading-[1.08] text-[#111827] sm:mt-2 sm:text-[1.25rem] sm:leading-[1.02] lg:text-[1.32rem]">
                          {step.heading}
                        </h3>
                      </div>
                      <WhiteIcon
                        className="h-7 w-7 shrink-0 text-[#ffe8c9] sm:h-[58px] sm:w-[58px]"
                        strokeWidth={3}
                      />
                    </div>
                    <p className="mt-3 max-w-[360px] text-[0.6rem] font-medium leading-[1.25] text-[#596273] sm:mt-5 sm:text-[0.82rem] sm:leading-[1.22]">
                      {step.description}
                    </p>
                  </article>

                  <div
                    className={`relative min-h-[124px] overflow-hidden rounded-[8px] bg-[#ff5018] p-3 text-white shadow-[0_10px_18px_rgba(255,80,24,0.18)] sm:min-h-[150px] sm:p-5 lg:min-h-[170px] ${
                      isEven ? "order-1" : ""
                    }`}
                  >
                    <OrangeIcon
                      className="absolute right-3 top-3 h-8 w-8 text-[#ffc8a6] sm:right-[22px] sm:top-[21px] sm:h-[58px] sm:w-[58px]"
                      strokeWidth={2.5}
                    />
                    <div className="absolute bottom-3 left-3 text-[2.7rem] font-extrabold leading-none tracking-[-0.03em] sm:bottom-[20px] sm:left-[20px] sm:text-[4.85rem]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white px-4 py-10 text-center sm:px-5 md:px-8 md:py-[78px]">
          <h2 className="text-[1.85rem] font-extrabold leading-tight text-[#111827] sm:text-[2.15rem] md:text-[3rem]">
            Watch Flashfire in Action
          </h2>
          <p className="mx-auto mt-4 max-w-[330px] text-[0.86rem] font-semibold leading-[1.4] text-[#596273] sm:max-w-[500px] sm:text-[1rem]">
            See how our AI handles end-to-end job applications-from sourcing to
            submission.
          </p>
          <button
            onClick={() => handleTalkToExpertClick("demo_cta")}
            className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[8px] bg-[#ff4c00] px-6 text-sm font-extrabold text-white shadow-[0_12px_20px_rgba(255,76,0,0.22)] transition hover:bg-[#e84400] focus:outline-none focus:ring-2 focus:ring-[#ff4c00] focus:ring-offset-2 sm:mt-7 sm:min-h-[54px] sm:gap-3 sm:rounded-[9px] sm:px-8 sm:text-base sm:shadow-[0_14px_24px_rgba(255,76,0,0.24)]"
          >
            Talk to an Expert
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <div className="mx-auto mt-8 max-w-[1135px] rounded-[8px] bg-[#ff5018] px-3 py-3 sm:px-6 sm:py-6 md:mt-10 md:px-[54px] md:py-[48px]">
            <div className="overflow-hidden bg-white">
              <video
                className="block aspect-video w-full object-cover"
                controls
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/ii.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-14 md:px-8 md:py-[120px]">
          <h2 className="mx-auto max-w-[360px] text-center text-[2rem] font-extrabold leading-[1.12] text-[#111827] sm:max-w-none sm:text-[2.45rem] md:text-[3.45rem]">
            Built for Results, Not Just Applications
          </h2>

          <div className="mx-auto mt-8 grid max-w-[1052px] gap-4 sm:mt-14 sm:gap-8 md:grid-cols-2">
            {differentiators.map((item) => (
              <div
                key={item}
                className="min-h-[132px] rounded-[5px] border border-[#d9d9d9] bg-white px-6 py-6 shadow-[0_6px_14px_rgba(0,0,0,0.13)] sm:min-h-[220px] sm:px-12 sm:py-10 sm:shadow-[0_8px_18px_rgba(0,0,0,0.15)]"
              >
                <div className="mb-5 flex h-8 w-8 items-center justify-center rounded-[7px] bg-[#ffe9df] text-[#ff4c00] sm:mb-8 sm:h-10 sm:w-10 sm:rounded-[8px]">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={3} />
                </div>
                <p className="text-[0.98rem] font-bold leading-[1.28] text-[#1f2a44] sm:text-[1.28rem] sm:leading-[1.25]">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => handleTalkToExpertClick("why_flashfire")}
              className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-[9px] bg-[#ff4c00] px-8 text-base font-extrabold text-white shadow-[0_14px_24px_rgba(255,76,0,0.24)] transition hover:bg-[#e84400] focus:outline-none focus:ring-2 focus:ring-[#ff4c00] focus:ring-offset-2"
            >
              Talk to an Expert
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </section>

        <section className="bg-[#fff3f1] px-5 py-[50px] md:px-12 lg:px-[60px]">
          <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="max-w-[520px] text-[2.25rem] font-extrabold leading-[1.12] text-[#111827] md:text-[3rem]">
                <span className="text-[#ff4c00]">Who</span> Is This AI Job
                Application Software For?
              </h2>
              <p className="mt-7 max-w-[530px] text-[1.05rem] font-medium leading-[1.55] text-[#777171]">
                Flashfire is designed for students and job seekers who want to{" "}
                <span className="font-extrabold text-[#111827]">
                  apply at scale, save time,
                </span>{" "}
                and finally get{" "}
                <span className="font-extrabold text-[#111827]">
                  real interview calls
                </span>{" "}
                instead of silence.
              </p>
              <p className="mt-1 max-w-[530px] text-[1.05rem] font-medium leading-[1.55] text-[#777171]">
                This isn&apos;t another job board. It&apos;s an execution engine for
                people who want outcomes.
              </p>
            </div>

            <div className="w-full space-y-[14px]">
              {personas.map((persona, index) => {
                const isActive = activePersona === index;

                return (
                  <div
                    key={persona.num}
                    className="overflow-hidden rounded-[5px] border border-[#d8d8d8] bg-white"
                  >
                    <button
                      type="button"
                      className={`flex min-h-[59px] w-full items-center gap-4 px-3 text-left transition ${
                        isActive ? "bg-[#ff5018] text-white" : "bg-white text-[#111827]"
                      }`}
                      onClick={() => setActivePersona(isActive ? null : index)}
                      aria-expanded={isActive}
                    >
                      <span
                        className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[3px] text-[1.05rem] font-extrabold ${
                          isActive ? "bg-white/20 text-white" : "bg-[#ffe9df] text-[#ff4c00]"
                        }`}
                      >
                        {persona.num}
                      </span>
                      <span className="min-w-0 flex-1 text-[0.9rem] font-extrabold">
                        {persona.title}
                      </span>
                      <span
                        className={`flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full ${
                          isActive ? "bg-white text-[#ff5018]" : "bg-[#ffe9df] text-[#ff4c00]"
                        }`}
                      >
                        {isActive ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                    {isActive && (
                      <div className="bg-white px-4 py-5">
                        <p className="text-[0.78rem] font-medium leading-[1.35] text-[#596273]">
                          {persona.desc}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="faq" className={`${styles.faqSection} !bg-white`}>
          <div className={styles.header}>
            <h2>
              Questions about applying for jobs automatically with AI
            </h2>
          </div>

          <div className={styles.faqContainer}>
            {faqs.map((faq, index) => {
              const isActive = activeFaq === index;

              return (
                <div
                  key={faq.q}
                  className={`${styles.faqItem} ${isActive ? styles.active : ""}`}
                >
                  <button
                    type="button"
                    className={styles.faqQuestion}
                    onClick={() => setActiveFaq(isActive ? null : index)}
                    aria-expanded={isActive}
                  >
                    <span>{faq.q}</span>
                    <span className={styles.icon}>
                      {isActive ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  {isActive && (
                    <div className={styles.faqAnswer}>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white px-5 py-16 text-center md:px-8">
          <div className="mx-auto max-w-[920px] rounded-[18px] border border-[#ffd3c2] bg-[#fff3ed] px-5 py-11 text-[#111827] shadow-[0_18px_40px_rgba(255,76,0,0.12)] md:px-8">
            <h2 className="mx-auto max-w-[760px] text-[1.55rem] font-extrabold leading-tight md:text-[2rem]">
              Ready to Turn Your Job Hunt Into Interview Calls?
            </h2>
            <p className="mx-auto mt-5 max-w-[520px] text-sm font-semibold leading-5 text-[#5f5a58]">
              Join thousands of students who automated their applications and
              landed their dream jobs.
            </p>
            <button
              onClick={() => handleTalkToExpertClick("bottom_cta")}
              className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[8px] bg-[#ff4c00] px-6 text-xs font-extrabold text-white shadow-[0_10px_20px_rgba(255,76,0,0.22)] transition hover:bg-[#e84400]"
            >
              Get Started Now
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <p className="mt-5 text-xs font-medium text-[#7c716d]">
              Quick onboarding. We handle the rest.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
