"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { FileText, CheckCircle, Zap, Sparkles, Target, TrendingUp } from "lucide-react";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

export default function CoverLetterPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener
    },
  });

  const handleGetMeInterview = () => {
    try {
      const utmSource = typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("utm_source") || "WEBSITE"
        : "WEBSITE";
      const utmMedium = typeof window !== "undefined" && window.localStorage
        ? localStorage.getItem("utm_medium") || "Cover_Letter_Page"
        : "Cover_Letter_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Cover_Letter_Get_Me_Interview_Button",
          utmParams: {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: typeof window !== "undefined" && window.localStorage
              ? localStorage.getItem("utm_campaign") || "Website"
              : "Website",
          },
        });
      } catch (gtagError) {
        console.warn('GTagUTM error:', gtagError);
      }

      try {
        trackButtonClick("Get Me Interview", "cover_letter_cta", "cta", {
          button_location: "cover_letter_hero_section",
          section: "cover_letter_hero"
        });
        trackSignupIntent("cover_letter_cta", {
          signup_source: "cover_letter_hero_button",
          funnel_stage: "signup_intent"
        });
      } catch (trackError) {
        console.warn('Tracking error:', trackError);
      }

      // Check current path first
      const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
      const normalizedPath = currentPath.split('?')[0];
      const isAlreadyOnGetMeInterview = normalizedPath === '/get-me-interview' ||
        normalizedPath === '/en-ca/get-me-interview';
      const isOnCoverLetterPage = normalizedPath === '/features/cover-letter' ||
        normalizedPath === '/en-ca/features/cover-letter' ||
        normalizedPath === '/features/ai-cover-letter-generator' ||
        normalizedPath === '/en-ca/features/ai-cover-letter-generator';

      // If already on the route, save scroll position and prevent navigation
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

      // Dispatch custom event to force show modal FIRST
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
      }

      // If on cover letter features page, change URL but keep page content visible
      if (isOnCoverLetterPage) {
        const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

        // Update URL for tracking without navigation
        if (typeof window !== 'undefined') {
          const targetPath = normalizedPath.startsWith('/en-ca') ? '/en-ca/get-me-interview' : '/get-me-interview';
          window.history.pushState({}, '', targetPath);
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

      // Save current scroll position before navigation to preserve it
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());

        const targetPath = '/get-me-interview';
        window.history.pushState({}, '', targetPath);
      }

      // Only navigate if NOT already on the page
      const targetPath = '/get-me-interview';
      router.push(targetPath);
    } catch (error) {
      console.warn('Error in Get Me Interview handler:', error);
    }
  };



  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "AI Cover Letter Generator",
    "image": "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/cover-letter.png",
    "description": "AI cover letter generator built to create custom cover letters for every job. Use Flashfire's free cover letter generator and stand out faster.",
    "brand": {
      "@type": "Brand",
      "name": "FlashFire"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://flashfirejobs.com/features/ai-cover-letter-generator",
      "priceCurrency": "USD",
      "price": "0"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "68"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Navbar />
      <div className="bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-20 items-center">
            {/* ================= LEFT ================= */}
            <div>
              {/* Eyebrow */}
              <span className="inline-block mb-5 text-sm font-semibold tracking-wide text-[#ff4c00]">
                COVER LETTER BUILDER
              </span>

              {/* Headline */}
              <h1 className="text-[44px] md:text-[54px] xl:text-[64px] font-extrabold leading-[1.05] text-[#0b1220]">
                Write Compelling Cover <br />
                <span className="text-[#ff4c00]">Letters</span> That Get <br />
                You Noticed
              </h1>

              {/* Subtext */}
              <p className="mt-7 text-lg text-[#5b6475] max-w-xl leading-relaxed">
                Create personalized, ATS-optimized cover letters tailored to each job application.
                Our AI-powered builder helps you craft compelling narratives that highlight your
                unique value and increase your interview chances.
              </p>

              {/* Feature bullets */}
              <div className="mt-10 grid sm:grid-cols-2 gap-y-5 gap-x-8 text-[15px] font-medium text-[#0b1220]">
                {[
                  "AI-powered content generation",
                  "ATS-optimized formatting",
                  "Job-specific customization",
                  "Professional templates",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-[#ff4c00] text-[#ff4c00] flex items-center justify-center text-sm">
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
                <button
                  {...getButtonProps()}
                  onClick={handleGetMeInterview}
                  className="bg-white border-2 border-black px-6 sm:px-8 py-3 sm:py-4 font-bold text-black text-base sm:text-lg hover:bg-[#f9e8e0] transition-colors rounded-lg inline-flex items-center justify-center gap-2"
                  style={{ boxShadow: '0 4px 0 0 rgba(245, 93, 29, 1)' }}
                >
                  Get Me Interview →
                </button>

              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="relative">
              {/* Soft background blob */}
              <div className="absolute -top-10 -right-10 w-[520px] h-[520px] bg-[#fff1ea] rounded-[48px]" />

              {/* Cover Letter Card */}
              <div className="relative bg-white rounded-2xl border border-[#ffd6c4] shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#fff1ea] rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#ff4c00]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0b1220]">
                        Cover Letter Builder
                      </h4>
                      <p className="text-xs text-[#5b6475]">
                        AI-powered writing assistant
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Preview */}
                <div className="space-y-4">
                  <div className="bg-[#fff1ea] rounded-xl p-4 border border-[#ffd6c4]">
                    <div className="h-3 w-32 bg-gray-200 rounded mb-3" />
                    <div className="h-2 w-full bg-gray-200 rounded mb-2" />
                    <div className="h-2 w-3/4 bg-gray-200 rounded mb-3" />
                    <div className="h-2 w-full bg-gray-200 rounded mb-2" />
                    <div className="h-2 w-5/6 bg-gray-200 rounded" />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#5b6475]">
                    <Sparkles className="w-4 h-4 text-[#ff4c00]" />
                    <span>AI-optimized for ATS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-[#f9fcff] py-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* ================= HEADING ================= */}
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#0b1220]">
                Why FlashFire's Cover Letter <br />
                <span className="text-[#ff4c00]">Builder Stands Out</span>
              </h2>
            </div>

            {/* ================= CARDS ================= */}
            <div className="grid md:grid-cols-3 gap-10 items-stretch">
              {/* ===== CARD 1 ===== */}
              <div className="bg-white border border-[#ffd6c4] rounded-2xl shadow-sm p-8 flex flex-col h-full">
                {/* Visual */}
                <div className="h-48 bg-[#fff6f1] rounded-xl border border-[#ffd6c4] p-6 mb-8 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 text-[#ff4c00] mx-auto mb-3" />
                    <span className="text-sm font-semibold text-[#0b1220]">
                      AI-Powered
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0b1220] mb-3">
                  Smart Content Generation
                </h3>
                <p className="text-[#5b6475] text-sm leading-relaxed mt-auto">
                  Our AI analyzes job descriptions and your resume to generate
                  personalized cover letters that highlight relevant skills and experiences.
                </p>
              </div>

              {/* ===== CARD 2 ===== */}
              <div className="bg-white border border-[#ffd6c4] rounded-2xl shadow-sm p-8 flex flex-col h-full">
                {/* Visual */}
                <div className="h-48 bg-[#fff6f1] rounded-xl border border-[#ffd6c4] p-6 mb-8 flex items-center justify-center">
                  <div className="text-center">
                    <Target className="w-12 h-12 text-[#ff4c00] mx-auto mb-3" />
                    <span className="text-sm font-semibold text-[#0b1220]">
                      ATS-Optimized
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0b1220] mb-3">
                  ATS-Friendly Formatting
                </h3>
                <p className="text-[#5b6475] text-sm leading-relaxed mt-auto">
                  Every cover letter is formatted to pass ATS screening systems,
                  ensuring your application reaches human recruiters.
                </p>
              </div>

              {/* ===== CARD 3 ===== */}
              <div className="bg-white border border-[#ffd6c4] rounded-2xl shadow-sm p-8 flex flex-col h-full">
                {/* Visual */}
                <div className="h-48 bg-[#fff6f1] rounded-xl border border-[#ffd6c4] p-6 mb-8 flex items-center justify-center">
                  <div className="text-center">
                    <Zap className="w-12 h-12 text-[#ff4c00] mx-auto mb-3" />
                    <span className="text-sm font-semibold text-[#0b1220]">
                      Quick & Easy
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0b1220] mb-3">
                  Save Time & Effort
                </h3>
                <p className="text-[#5b6475] text-sm leading-relaxed mt-auto">
                  Generate professional cover letters in minutes instead of hours.
                  Customize templates and reuse content across applications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* ===== Heading ===== */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#0b1220]">
                How to Generate Your Perfect <br />
                <span className="text-[#ff4c00]">Cover Letter</span>
              </h2>
            </div>

            <div className="space-y-20">
              {/* ================= ROW 1 ================= */}
              <div className="grid lg:grid-cols-2 gap-14 items-center">
                {/* Left text */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#ff4c00] mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#ff4c00]" />
                    UPLOAD RESUME
                  </div>

                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#0b1220] leading-tight">
                    Start with Your <span className="text-[#ff4c00]">Resume</span>
                  </h3>

                  <p className="mt-4 text-[#5b6475] leading-relaxed max-w-lg">
                    Upload your resume and let our AI extract your key skills,
                    experiences, and achievements to build your cover letter foundation.
                  </p>
                </div>

                {/* Right visual */}
                <div className="relative">
                  <div className="rounded-[28px] bg-gradient-to-br from-[#fff1ea] to-[#fff8f4] border border-[#ffd6c4] p-8">
                    <div className="bg-white rounded-2xl border border-[#ffd6c4] shadow-sm p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-[#fff1ea] rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-[#ff4c00]" />
                        </div>
                        <div className="flex-1">
                          <div className="h-3 w-32 bg-gray-200 rounded mb-2" />
                          <div className="h-2 w-24 bg-gray-200 rounded" />
                        </div>
                      </div>
                      <div className="h-16 bg-[#fff1ea] rounded-lg border border-[#ffd6c4]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= ROW 2 ================= */}
              <div className="grid lg:grid-cols-2 gap-14 items-center">
                {/* Left visual */}
                <div className="relative order-2 lg:order-1">
                  <div className="rounded-[28px] bg-gradient-to-br from-[#fff7f2] to-[#fff1ea] border border-[#ffd6c4] p-8">
                    <div className="bg-white rounded-2xl border border-[#ffd6c4] shadow-sm p-6">
                      <div className="space-y-3">
                        <div className="h-3 w-full bg-gray-200 rounded" />
                        <div className="h-3 w-5/6 bg-gray-200 rounded" />
                        <div className="h-3 w-full bg-gray-200 rounded" />
                        <div className="h-3 w-4/5 bg-gray-200 rounded" />
                        <div className="h-3 w-full bg-gray-200 rounded" />
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-xs text-[#5b6475]">
                        <Sparkles className="w-4 h-4 text-[#ff4c00]" />
                        <span>AI analyzing job description...</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right text */}
                <div className="order-1 lg:order-2">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#ff4c00] mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#ff4c00]" />
                    MATCH JOB DESCRIPTION
                  </div>

                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#0b1220] leading-tight">
                    AI Matches Job <span className="text-[#ff4c00]">Requirements</span>
                  </h3>

                  <p className="mt-4 text-[#5b6475] leading-relaxed max-w-lg">
                    Paste the job description and our AI identifies key requirements,
                    keywords, and skills to tailor your cover letter accordingly.
                  </p>
                </div>
              </div>

              {/* ================= ROW 3 ================= */}
              <div className="grid lg:grid-cols-2 gap-14 items-center">
                {/* Left text */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#ff4c00] mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#ff4c00]" />
                    GENERATE & CUSTOMIZE
                  </div>

                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#0b1220] leading-tight">
                    Generate & <span className="text-[#ff4c00]">Refine</span>
                  </h3>

                  <p className="mt-4 text-[#5b6475] leading-relaxed max-w-lg">
                    Get a professionally written cover letter in seconds.
                    Edit, customize, and refine until it perfectly represents your voice and value.
                  </p>
                </div>

                {/* Right visual */}
                <div className="relative">
                  <div className="rounded-[28px] bg-gradient-to-br from-[#fff1ea] to-[#fff8f4] border border-[#ffd6c4] p-8">
                    <div className="bg-white rounded-2xl border border-[#ffd6c4] shadow-sm p-6">
                      <div className="text-sm font-semibold text-[#0b1220] mb-4">
                        Cover Letter Preview
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-full bg-gray-200 rounded" />
                        <div className="h-2 w-11/12 bg-gray-200 rounded" />
                        <div className="h-2 w-full bg-gray-200 rounded" />
                        <div className="h-2 w-10/12 bg-gray-200 rounded" />
                        <div className="h-2 w-full bg-gray-200 rounded" />
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-xs text-[#5b6475]">ATS-optimized</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-[#f9fafb]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Who Is This AI Cover Letter Builder For?
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Flashfire’s AI cover letter builder is built for job seekers who want
                high-quality, ATS-friendly cover letters without spending hours rewriting
                the same content for every role.
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Apply Faster Without Compromising Quality
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Generate tailored, job-specific cover letters in minutes.
                  Every letter is structured to align with recruiter expectations
                  and modern ATS systems.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Personalization at Scale
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Whether you’re applying to 5 roles or 50, Flashfire adapts your
                  experience and skills to match each job—without sounding generic.
                </p>
              </div>

            </div>

            {/* Ideal For List */}
            <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Ideal For
              </h3>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <li>• Active job seekers applying across platforms</li>
                <li>• Freshers and early-career professionals</li>
                <li>• Mid–senior candidates targeting multiple roles</li>
                <li>• Candidates facing repeated ATS rejections</li>
                <li>• Anyone seeking a faster, smarter cover letter workflow</li>
              </ul>
            </div>

          </div>
        </section>


        {/* CTA Section */}
        <section className="py-32 bg-[#fff1ea] text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl text-black font-extrabold mb-6">
                Ready to Write Best AI Cover Letters That <span className="text-[#ff4c00]">Get Results?</span>
              </h2>
              <p className="text-lg text-gray-900 max-w-3xl mx-auto mb-10">
                Join thousands of job seekers who use FlashFire to create compelling
                cover letters that increase their interview chances.
              </p>
              <button
                {...getButtonProps()}
                onClick={handleGetMeInterview}
                className="bg-[#ff4c00] hover:bg-[#e24400] text-white px-8 py-4 font-bold text-lg rounded-lg transition-colors inline-flex items-center justify-center gap-2"
              >
                Get Me Interview →
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

