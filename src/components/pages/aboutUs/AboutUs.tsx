"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import HomePageDemoCTA from "@/src/components/homePageDemoCTA/homePageDemoCTA";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { FaPlus, FaTimes } from "react-icons/fa";

export default function AboutUs() {
  const router = useRouter();
  const pathname = usePathname();
  const hasScrolledRef = useRef(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener
    },
  });

  // Scroll to top when navigating to about-us page (same pattern as pricing page)
  useEffect(() => {
    if (!hasScrolledRef.current) {
      hasScrolledRef.current = true;
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "instant" });
        }, 50);
        requestAnimationFrame(() => {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
          }, 100);
        });
      });
    }
  }, []);

  return (
    <div className="bg-[#fdf7f4] min-h-screen font-['Space_Grotesk',sans-serif] relative overflow-hidden">
    <section className="bg-[#fdf7f4] py-24 px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto text-center">

    {/* Badges */}
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {["LAND INTERVIEW IN 1 WEEK", "50 USERS LANDED JOB"].map((badge, idx) => (
        <div
          key={idx}
          className="px-4 py-1.5 border border-black text-[11px] font-semibold tracking-wide text-[#F55D1D]"
        >
          {badge}
        </div>
      ))}
    </div>

    {/* Heading */}
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-black mb-6">
      <span className="text-[#F55D1D]">
        AI Job Application Service
      </span>{" "}
      That Automates Job Search & Lands Interviews Faster
    </h1>

    {/* Subtext */}
    <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
      Flashfire is an AI job search platform built for job seekers who want to automate job applications, improve ATS visibility, and land more interviews without manual effort.
    </p>

    {/* CTA */}
    <button
      {...getButtonProps()}
      className="px-8 py-3.5 bg-[#F55D1D] text-white font-semibold text-base rounded-lg
      border border-[#F55D1D] 
      hover:bg-transparent hover:text-[#F55D1D] 
      transition-all duration-200"
      
      onClick={() => {
        const utmSource = typeof window !== "undefined"
          ? localStorage.getItem("utm_source") || "WEBSITE"
          : "WEBSITE";
        const utmMedium = typeof window !== "undefined"
          ? localStorage.getItem("utm_medium") || "About_Us_Page"
          : "About_Us_Page";
      
        try {
          GTagUTM({
            eventName: "sign_up_click",
            label: "About_Us_Get_Me_Interview_Button",
            utmParams: {
              utm_source: utmSource,
              utm_medium: utmMedium,
              utm_campaign: typeof window !== "undefined"
                ? localStorage.getItem("utm_campaign") || "Website"
                : "Website",
            },
          });
        } catch (gtagError) {
          console.warn('GTagUTM error:', gtagError);
        }
      
        try {
          trackButtonClick("Get Me Interview", "about_us_cta", "cta", {
            button_location: "about_us_hero_section",
            section: "about_us_hero"
          });
          trackSignupIntent("about_us_cta", {
            signup_source: "about_us_hero_button",
            funnel_stage: "signup_intent"
          });
        } catch (trackError) {
          console.warn('Tracking error:', trackError);
        }
      
        const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
        const normalizedPath = currentPath.split('?')[0];
        const isAboutUsPage = normalizedPath === '/about-us' || normalizedPath === '/en-ca/about-us';
        const isAlreadyOnGetMeInterview = normalizedPath === '/get-me-interview' ||
          normalizedPath === '/en-ca/get-me-interview';
      
        if (isAlreadyOnGetMeInterview) {
          const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
          }
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: 'instant' });
            requestAnimationFrame(() => {
              window.scrollTo({ top: currentScrollY, behavior: 'instant' });
              setTimeout(() => {
                window.scrollTo({ top: currentScrollY, behavior: 'instant' });
              }, 50);
            });
          });
          return;
        }
      
        if (isAboutUsPage) {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('previousPageBeforeGetMeInterview', normalizedPath);
          }
          const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
          }
          const targetPath = normalizedPath.startsWith('/en-ca') ? '/en-ca/get-me-interview' : '/get-me-interview';
          if (typeof window !== 'undefined') {
            window.history.pushState({}, '', targetPath);
          }
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
          }
          router.replace(targetPath);
          requestAnimationFrame(() => {
            window.scrollTo({ top: currentScrollY, behavior: 'instant' });
            requestAnimationFrame(() => {
              window.scrollTo({ top: currentScrollY, behavior: 'instant' });
              setTimeout(() => {
                window.scrollTo({ top: currentScrollY, behavior: 'instant' });
              }, 50);
            });
          });
          return;
        }
      
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
        }
        if (typeof window !== 'undefined') {
          const currentScrollY = window.scrollY;
          sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
        }
        const targetPath = '/get-me-interview';
        router.push(targetPath);
      }}
    >
      Get Me Interview
    </button>

  </div>
</section>

      {/* === OUR FOUNDERS SECTION === */}
      <section className="bg-[#f55d1d] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 text-white tracking-tight">
            Our Founders
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Pranjal Tripathi Card */}
            <div className="group bg-white rounded-2xl p-6 border-2 border-black/10 hover:border-black/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="mb-6 overflow-hidden rounded-xl bg-[#f9e8e0]">
                <Image
                  src="https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/pranjal_cto.png"
                  alt="Pranjal Tripathi"
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover "
                  priority
                  unoptimized
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Pranjal Tripathi</h3>
                <p className="text-[#F55D1D] font-semibold text-sm mb-4 uppercase tracking-wider">CTO, Flashfire</p>
                <p className="text-lg font-medium text-gray-600 italic leading-relaxed">
                  "Every line of code we write is to help someone hear back finally"
                </p>
              </div>
            </div>

            {/* Adit Jain Card */}
            <div className="group bg-white rounded-2xl p-6 border-2 border-black/10 hover:border-black/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ">
              <div className="mb-6 overflow-hidden rounded-xl pt-13 bg-[#f9e8e0]">
                <Image
                  src="/images/adit-jain-2.png"
                  alt="Adit Jain"
                  width={400}
                  height={400}
                  className="w-full h-72 object-cover object-[center_30%]"
                  priority
                  unoptimized
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Adit Jain</h3>
                <p className="text-[#F55D1D] font-semibold text-sm mb-4 uppercase tracking-wider">Partner, Flashfire</p>
                <p className="text-lg font-medium text-gray-600 italic leading-relaxed">
                  "I've seen brilliant people lose hope. Flashfire exists so they don't have to."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === THE STORY SECTION === */}
      <section className="bg-[#fdf7f4] py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
            {/* Left Side - Text */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-[#F55D1D] tracking-tight">
                The Story
              </h2>
              <p className="text-xl font-semibold text-gray-900 mb-6">
                To Every Job Seeker Who&apos;s Ready to Move Forward,
              </p>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  I know how exhausting the job search can be. You keep sending out applications, waiting for replies, and start to wonder if it&apos;s you. Especially in the U.S., where hundreds apply for the same role, even the most talented people begin to lose hope.
                </p>
                <p>
                  Flashfire was born from that same feeling. I watched my sister—smart, capable, and hardworking—apply to hundreds of roles and still get no response. It wasn&apos;t her fault. The system had stopped seeing people for who they are.
                </p>
                <blockquote className="font-semibold italic text-[#F55D1D] border-l-4 border-[#F55D1D] pl-6 my-8 text-lg">
                  The problem was never the people. It was the process.
                </blockquote>
                <p>
                  That&apos;s when Pranjal joined. He&apos;d been through the same struggle—brilliant, qualified, but invisible to the system. We realized the failures weren&apos;t about talent or effort. They were about a process that had stopped working for people.
                </p>
                <p>
                  Together, we started building Flashfire with belief, empathy, and persistence. What began as a way to help one person is now helping hundreds find their &apos;yes.&apos;
                </p>
              </div>
            </div>

            {/* Right Side - Character Image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-[#F55D1D] rounded-full blur-3xl opacity-20" />
                <Image
                  src="/images/character.png"
                  alt="Flashfire Character"
                  width={320}
                  height={320}
                  className="relative object-contain w-64 h-64 lg:w-80 lg:h-80 drop-shadow-2xl"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === OUR MISSION & VISION SECTION === */}
      <section className="bg-[#fdf7f4] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl border border-black/10 overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/10">
              {/* Mission Section */}
              <div className="p-8 sm:p-12">
                <div className="w-12 h-12 bg-[#F55D1D]/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#F55D1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To help job seekers land more interviews by automating applications and optimizing visibility using AI.
                </p>
              </div>

              {/* Vision Section */}
              <div className="p-8 sm:p-12">
                <div className="w-12 h-12 bg-[#F55D1D]/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#F55D1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To become the world&apos;s fastest and most intelligent job application engine, enabling anyone to apply to over 1,200 targeted roles and land interviews ten times faster all without wasting time or effort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === HOW FLASHFIRE WORKS FOR YOU SECTION === */}
      <section className="bg-[#fdf7f4] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F55D1D] mb-6 tracking-tight">
              How Our AI Job Application Service Automates Your Job Search
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Flashfire's AI job application service automates job discovery, resume optimization, and application submission to help job seekers get noticed and land interviews faster.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "AI-Powered Matching",
              "LinkedIn Profile Optimization",
              "Lightning Fast Applications",
              "Dynamic Resume Optimization",
              "Precision Targeting",
              "Dashboard & Analytics"
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 border border-black/5 hover:border-[#F55D1D]/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#F55D1D]/10 rounded-lg flex items-center justify-center group-hover:bg-[#F55D1D] transition-colors duration-300">
                    <svg className="w-5 h-5 text-[#F55D1D] group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-base font-semibold text-gray-900">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === WHO IS THIS FOR SECTION === */}
      <section className="bg-[#fdf7f4] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F55D1D] mb-6 tracking-tight uppercase">
              Who Is This For?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Flashfire's AI job application service is built for job seekers who want to stop wasting time, automate applications, and finally start getting interview responses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Active Job Seekers Applying at Scale",
                desc: "If you're applying to dozens of roles every week and still hearing nothing back, Flashfire helps you apply faster, smarter, and at scale without burning out."
              },
              {
                title: "Professionals Targeting US & Canadian Roles",
                desc: "Flashfire is optimized for North American hiring systems, ATS rules, and recruiter expectations — so your applications actually get seen."
              },
              {
                title: "Candidates Tired of Manual Applications",
                desc: "No more copying resumes, rewriting the same answers, or filling out endless forms. Flashfire automates the busywork so you can focus on interviews."
              },
              {
                title: "Job Seekers Struggling with ATS Visibility",
                desc: "If your resume never seems to pass automated systems, Flashfire uses AI-driven optimization to improve keyword alignment and visibility."
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-black/5 hover:border-[#F55D1D]/20 transition-all duration-300 hover:shadow-xl group"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#F55D1D] transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Emphasis Line */}
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-[#F55D1D]/10 rounded-full px-8 py-4">
              {/* <div className="w-2 h-2 bg-[#F55D1D] rounded-full" /> */}
              <p className="text-lg font-bold text-gray-900">
                If you're qualified, motivated, and serious about landing interviews — Flashfire is built for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === THE FLASHFIRE STORY TIMELINE SECTION === */}
      <section className="bg-[#fdf7f4] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-16">
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F55D1D] mb-4 tracking-tight uppercase">
                The Flashfire Story
              </h2>
              <div className="space-y-4 text-gray-600 max-w-2xl">
                <p className="leading-relaxed">
                  Flashfire is an AI job search platform designed to solve modern hiring challenges by automating job applications and improving candidate visibility across ATS-driven hiring systems.
                </p>
                <p className="leading-relaxed">
                  Flashfire began in April 2024 with a simple insight: most candidates lose opportunities before they&apos;re even seen. Built to match the speed and precision of modern hiring, Flashfire helps candidates apply at scale across U.S. and Canadian job markets with ATS-optimized applications.
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/images/flashfire-logo.png"
                alt="Flashfire Logo"
                width={200}
                height={200}
                className="object-contain w-32 h-32 lg:w-48 lg:h-48 opacity-80"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#F55D1D]/20" />

            <div className="space-y-8">
              {[
                { date: "April 2024", label: "Founded", desc: "Flashfire was officially founded with a mission to simplify the job application process and remove inefficiencies from large-scale job searching.", side: "left" },
                { date: "May-June 2024", label: "Platform Development", desc: "Core workflows were built to automate job discovery, resume alignment, and application submission while maintaining human oversight for relevance and accuracy.", side: "right" },
                { date: "July-Aug 2024", label: "Early Validation", desc: "Flashfire onboarded early users and validated its system by helping candidates apply to 400-1,200+ relevant job opportunities, significantly reducing manual effort and application fatigue.", side: "left" },
                { date: "Sept-Dec 2024", label: "Helping 500+ Candidates", desc: "By the end of 2024, Flashfire had helped over 500+ candidates streamline their job search, refine their application strategy, and apply to roles more efficiently.", side: "right" },
                { date: "Jan-Feb 2025", label: "USA & Canada Expansion", desc: "Flashfire expanded its services across the United States and Canada, operating with timezone-agnostic execution aligned with North American hiring cycles and ATS systems.", side: "left" },
                { date: "Mar 2025-Present", label: "Scaling with focus", desc: "Today, Flashfire continues to support candidates globally, with a strong focus on US and Canadian job applications, optimizing continuously for interview outcomes rather than vanity application counts.", side: "right" }
              ].map((item, idx) => (
                <div key={idx} className={`relative flex flex-col md:flex-row ${item.side === 'right' ? 'md:flex-row-reverse' : ''} items-center gap-8`}>
                  {/* Content */}
                  <div className={`flex-1 ${item.side === 'right' ? 'md:text-left' : 'md:text-right'}`}>
                    <div className={`bg-white rounded-2xl p-6 border border-black/5 hover:border-[#F55D1D]/20 transition-all duration-300 hover:shadow-lg inline-block ${item.side === 'right' ? 'md:ml-0' : 'md:mr-0'} max-w-lg`}>
                      <div className={`flex items-center gap-3 mb-2 ${item.side === 'right' ? 'md:justify-start' : 'md:justify-end'}`}>
                        <span className="text-[#F55D1D] font-bold text-lg">{item.date}</span>
                        <span className="text-gray-400 text-sm">•</span>
                        <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">{item.label}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-4 h-4 bg-[#F55D1D] rounded-full border-4 border-[#f9e8e0] z-10 shadow-lg flex-shrink-0" />

                  {/* Spacer for opposite side */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === FAQ SECTION === */}
      <section className="ff-faq-section">
        <div className="ff-faq-shell">
          <div className="ff-faq-header">
            <h2>
              Frequently Asked Questions
            </h2>
            <p>
              Get answers about our AI job application service.
            </p>
          </div>

          <div className="ff-faq-list">
            {[
              {
                question: "What is an AI job application service?",
                answer: "An AI job application service uses artificial intelligence to automate job applications, optimize resumes for ATS systems, and help job seekers apply to relevant roles faster and more effectively."
              },
              {
                question: "How does job application automation work?",
                answer: "Job application automation uses AI to identify relevant roles, tailor resumes, and submit applications at scale, saving time while improving interview response rates."
              },
              {
                question: "Is Flashfire an AI job search platform for US jobs?",
                answer: "Yes. Flashfire is an AI job search platform focused on automating job applications for the US and Canadian job markets with ATS-optimized workflows."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className={`ff-faq-item ${activeFaqIndex === index ? "is-active" : ""}`}
              >
                <button
                  onClick={() => setActiveFaqIndex(activeFaqIndex === index ? null : index)}
                  className="ff-faq-question"
                >
                  <h3 className="ff-faq-question-text">
                    {faq.question}
                  </h3>
                  <span className="ff-faq-icon">
                    {activeFaqIndex === index ? <FaTimes /> : <FaPlus />}
                  </span>
                </button>

                {activeFaqIndex === index && (
                  <div className="ff-faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === DEMO CTA SECTION === */}
      <HomePageDemoCTA />
    </div>
  );
}    



