"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { Target, Search, Filter, Zap, CheckCircle, TrendingUp } from "lucide-react";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

export default function PrecisionTargetingPage() {
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
        ? localStorage.getItem("utm_medium") || "Precision_Targeting_Page"
        : "Precision_Targeting_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Precision_Targeting_Get_Me_Interview_Button",
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
        trackButtonClick("Get Me Interview", "precision_targeting_cta", "cta", {
          button_location: "precision_targeting_hero_section",
          section: "precision_targeting_hero"
        });
        trackSignupIntent("precision_targeting_cta", {
          signup_source: "precision_targeting_hero_button",
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
      const isOnPrecisionTargetingPage = normalizedPath === '/features/precision-targeting' ||
        normalizedPath === '/en-ca/features/precision-targeting' ||
        normalizedPath === '/features/ai-job-targeting' ||
        normalizedPath === '/en-ca/features/ai-job-targeting';

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

      // If on precision targeting features page, change URL but keep page content visible
      if (isOnPrecisionTargetingPage) {
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
    "name": "AI Job Targeting",
    "image": "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/precision-targeting.png",
    "description": "Precision job targeting using AI ensures every application matches recruiter intent. Stop wasting applications and start getting interviews.",
    "brand": {
      "@type": "Brand",
      "name": "FlashFire"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://flashfirejobs.com/features/ai-job-targeting",
      "priceCurrency": "USD",
      "price": "0"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "478"
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
        <section className="relative bg-gradient-to-b from-[#fff0e6] via-[#fff7f2] to-white py-24">
  <div className="max-w-6xl mx-auto px-6 text-center">

    {/* Eyebrow */}
    <span className="inline-block mb-5 text-sm font-semibold tracking-wide text-[#ff4c00]">
      PRECISION TARGETING
    </span>

    {/* Main Heading */}
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#0b1220] mb-6">
      Apply to Jobs That <br />
      <span className="text-[#ff4c00]">Actually Match</span> Your Profile
    </h1>

    {/* Subheading */}
    <p className="text-lg md:text-xl text-[#5b6475] max-w-3xl mx-auto leading-relaxed mb-10">
      Stop wasting applications on low-fit roles. FlashFire’s AI
      targets jobs where your skills, experience, and ATS score
      give you the highest chance of interviews.
    </p>

    {/* Value Pills */}
    <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm font-medium">
      {[
        "High ATS Match",
        "Skill-Based Filtering",
        "Role Relevance Scoring",
        "Fewer Rejections",
      ].map((item) => (
        <span
          key={item}
          className="px-4 py-2 rounded-full bg-white border border-[#ffd6c4] text-[#0b1220]"
        >
          ✓ {item}
        </span>
      ))}
    </div>

    {/* CTA */}
    <div className="flex flex-col sm:flex-row justify-center gap-4">
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
  </div>
</section>
<section className="py-24 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-extrabold">
        Who Is Precision Targeting <span className="text-[#ff4c00]">For?</span>
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        { title: "International Students", desc: "Apply only to companies that sponsor or consider visa holders." },
        { title: "Career Switchers", desc: "Target roles where your transferable skills matter." },
        { title: "Experienced Professionals", desc: "Avoid junior roles and low-growth companies." },
      ].map((item, i) => (
        <div key={i} className="bg-[#fff7f2] rounded-xl p-8 border border-[#ffd6c4]">
          <h3 className="text-lg font-bold mb-3">{item.title}</h3>
          <p className="text-gray-600 text-sm">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
<section className="py-24 bg-[#fff7f2]">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16">
      Precision AI Job Targeting vs <span className="text-[#ff4c00]">Mass Applying</span>
    </h2>

    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-white rounded-2xl border border-red-200 p-8">
        <h3 className="text-xl font-bold mb-6 text-red-600">Mass Applying</h3>
        <ul className="space-y-4 text-gray-600">
          <li>❌ Low ATS match</li>
          <li>❌ High rejection rate</li>
          <li>❌ Time wasted on poor-fit roles</li>
          <li>❌ No learning or feedback loop</li>
        </ul>
      </div>

      <div className="bg-white rounded-2xl border border-[#ffd6c4] p-8">
        <h3 className="text-xl font-bold mb-6 text-[#ff4c00]">Precision Targeting</h3>
        <ul className="space-y-4 text-gray-700">
          <li>✅ High skill & ATS match</li>
          <li>✅ Better interview conversion</li>
          <li>✅ Focused, quality applications</li>
          <li>✅ Continuous optimization</li>
        </ul>
      </div>
    </div>
  </div>
</section>
{/* ================= HOW IT WORKS ================= */}
<section id="how-it-works" className="py-28 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-20">
      <span className="text-sm font-semibold tracking-wide text-[#ff4c00]">
        HOW IT WORKS
      </span>
      <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0b1220]">
        Precision targeting,
        <br />
        <span className="text-[#ff4c00]">
          done the right way
        </span>
      </h2>
      <p className="mt-6 text-lg text-[#5b6475]">
        We don’t apply everywhere.  
        We apply where you actually have a chance.
      </p>
    </div>

    {/* Steps */}
    <div className="grid md:grid-cols-2 gap-10">

      {[
        {
          step: "01",
          title: "Understand your profile",
          desc: "We analyze your resume, experience, skills, and past roles to identify where you truly fit.",
        },
        {
          step: "02",
          title: "Filter high-fit jobs",
          desc: "Jobs are filtered based on ATS score, skill match, role relevance, and hiring patterns.",
        },
        {
          step: "03",
          title: "Apply with intent",
          desc: "Applications are sent only to roles where your profile ranks competitively.",
        },
        {
          step: "04",
          title: "Improve continuously",
          desc: "Feedback, rejections, and responses are used to refine targeting every week.",
        },
      ].map((item) => (
        <div
          key={item.step}
          className="bg-[#fff7f2] border border-[#ffd6c4] rounded-2xl p-1 hover:-translate-y-1 transition"
        >
          <div className="bg-white rounded-xl p-8 h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#ff4c00] text-white font-bold flex items-center justify-center">
                {item.step}
              </div>
              <h3 className="text-xl font-extrabold text-[#0b1220]">
                {item.title}
              </h3>
            </div>
            <p className="text-[#5b6475] leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="py-32 bg-[#fff7f2] text-white relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">

    {/* ===== Section Header ===== */}
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl text-black font-extrabold mb-6">
        Real Results from <span className="text-[#ff4c00]">Precision Targeting</span>
      </h2>
      <p className="text-lg text-gray-900 max-w-3xl mx-auto">
        Our AI-driven targeting strategy focuses your effort where it matters most —
        leading to measurable improvements in interviews, efficiency, and outcomes.
      </p>
    </div>
    
    {/* ===== Stats Grid ===== */}
    <div className="grid md:grid-cols-4 gap-10">
      {[
        { value: "3×", label: "Higher Interview Rate" },
        { value: "70%", label: "Fewer Rejections" },
        { value: "90%", label: "ATS Match Accuracy" },
        { value: "10×", label: "Time Saved" },
      ].map((stat, i) => (
        <div
          key={i}
          className="bg-white/5 backdrop-blur rounded-2xl p-10 text-center border border-white/10 hover:border-[#ff4c00]/40 transition"
        >
          <p className="text-5xl font-extrabold text-[#ff4c00] mb-4">
            {stat.value}
          </p>
          <p className="text-sm md:text-base text-gray-900">
            {stat.label}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>



      </div>
      <Footer />
    </>
  );
}

