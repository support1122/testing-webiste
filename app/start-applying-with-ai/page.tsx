"use client"
import { useEffect } from "react";
import { Search, FileCheck, Send, MapPin, Briefcase, TrendingUp, ArrowRight, } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { trackButtonClick, trackExternalLink } from "@/src/utils/PostHogTracking";
import { WHATSAPP_SUPPORT_URL } from "@/src/utils/whatsapp";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";


const dispatchCustomEvent = (eventName: string) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(eventName));
  }
};

export default function AICopilot() {
  const router = useRouter();
  const pathname = usePathname();
  const prefix = pathname.startsWith("/en-ca") ? "/en-ca" : "";
  useEffect(() => {
    const timer = setTimeout(() => {
      const cta = document.getElementById("cta-section");
      if (cta) {
        cta.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300); // small delay so page renders first
  
    return () => clearTimeout(timer);
  }, []);

  const handleStartApplyingClick = (target: "modal" | "cta" = "modal") => {
    const currentScrollY =
      typeof window !== "undefined" ? window.scrollY : undefined;

    trackButtonClick("Start Applying with AI", "ai_copilot_section", "cta", {
      section: "ai_copilot",
    });
    dispatchCustomEvent("showCalendlyModal");

    if (typeof window !== "undefined") {
      const origin =
        pathname && pathname !== `${prefix}/AI-copilot`
          ? pathname
          : `${prefix}/AI-copilot`;
      sessionStorage.setItem("previousPageBeforeGetMeInterview", origin);
      if (currentScrollY !== undefined) {
        sessionStorage.setItem(
          "preserveScrollPosition",
          currentScrollY.toString()
        );
      }
    }
   
      
    // Change URL without actual navigation
    const newUrl =
      target === "modal"
        ? `${prefix}/AI-copilot/get-me-interview`
        : `${prefix}/AI-copilot/Start-applying-with-AI`;
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", newUrl);
    }
  };

  const handleTalkToExpertClick = () => {
    trackButtonClick("Talk to an Expert", "ai_copilot_section", "secondary", {
      section: "ai_copilot",
    });
    trackExternalLink(WHATSAPP_SUPPORT_URL, "Talk to an Expert", "ai_copilot_section", {
      link_type: "whatsapp_support",
      component: "ai_copilot",
    });
    if (typeof window !== "undefined") {
      window.open(WHATSAPP_SUPPORT_URL, "_blank");
    }
  };

  return (
    <>
    <Navbar/>
      <section className="w-full bg-white">
        <div className="max-w-[1280px] mx-auto px-6 pt-32 pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

            {/* LEFT CONTENT */}
            <div className="max-w-[560px]">
              <p className="text-sm font-semibold text-[#ff4c00] mb-4 uppercase tracking-wide">
                AI-powered job automation
              </p>

              <h1 className="text-[4rem] leading-[1.05] font-extrabold text-black">
                Apply Smarter. <br />
                Apply Faster. <br />
                Get Interviews.
              </h1>

              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                FlashFire uses AI to find relevant jobs, tailor your resume,
                and apply daily on your behalf — without spam or shortcuts.
              </p>

              <div className="mt-10 flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => handleStartApplyingClick("modal")}
                  className="bg-[#ff4c00] text-white px-6 sm:px-5 py-3 sm:py-4 shadow-[0_3px_0_black] rounded-xl text-lg font-semibold hover:scale-105 transition"
                >
                  Get me interview
                </button>

                <button
                  type="button"
                  onClick={handleTalkToExpertClick}
                  className="text-orange-500 bg-orange-500/10 font-medium py-4 px-6 hover:underline border border-orange-500/20 rounded-xl text-lg font-semibold transition"
                >
                  Talk to an Expert
                  <div className="text-orange-500 hover:text-orange-600" />
                </button>
              </div>
            </div>

            {/* RIGHT AI FLOW CARD */}
            <div className="flex justify-center">
              <div className="w-full max-w-[440px] bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">

                {/* Header */}
                <div className="px-6 py-5 border-b bg-gray-50">
                  <h3 className="text-base font-semibold text-black">
                    Your Job Applications — On Autopilot
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Runs daily without manual effort
                  </p>
                </div>

                {/* Context Row */}
                <div className="px-6 py-4 border-b flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Briefcase size={16} />
                    <span>Data Analyst</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin size={16} />
                    <span>USA</span>
                  </div>
                </div>

                {/* Status List */}
                <div className="px-6 py-6 space-y-5">

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#fff0e8] flex items-center justify-center">
                      <Search className="text-[#ff4c00]" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">
                        Searching relevant jobs
                      </p>
                      <p className="text-xs text-gray-500">
                        Based on your profile & preferences
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#fff0e8] flex items-center justify-center">
                      <FileCheck className="text-[#ff4c00]" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">
                        Resume optimized
                      </p>
                      <p className="text-xs text-gray-500">
                        ATS-friendly for each job
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#fff0e8] flex items-center justify-center">
                      <Send className="text-[#ff4c00]" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">
                        Applications submitted
                      </p>
                      <p className="text-xs text-gray-500">
                        Safely & automatically
                      </p>
                    </div>
                  </div>

                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-[#fffaf6] border-t text-sm text-gray-600">
                  ✔ New applications sent every day
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="w-full bg-white py-28">
        <div className="max-w-[1200px] mx-auto px-6">

          {/* Heading */}
          <div className="text-center max-w-[760px] mx-auto">
            <h2 className="text-[3.4rem] font-extrabold text-black leading-tight">
              How <span className="text-[#ff4c00]">FlashFire</span> Works
            </h2>

            <p className="mt-5 text-lg text-gray-600">
              One simple setup. After that, FlashFire applies to jobs for you
              automatically — every day.
            </p>
          </div>

          {/* Steps */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* STEP 1 */}
            <div className="rounded-3xl bg-[#fff7f3] p-10 ring-1 ring-[#ff4c00]/30">
              <div className="text-[#ff4c00] text-sm font-semibold mb-4">
                STEP 1
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">
                Define your job preferences
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Choose roles, locations, experience level, and preferences using
                simple filters.
              </p>
            </div>

            {/* STEP 2 */}
            <div className="rounded-3xl bg-[#fff7f3] p-10 ring-1 ring-[#ff4c00]/30">
              <div className="text-[#ff4c00] text-sm font-semibold mb-4">
                STEP 2
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">
                Upload your resume once
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Upload your resume and answer a few screening questions just one
                time.
              </p>
            </div>

            {/* STEP 3 – SUBTLE HIGHLIGHT */}
            <div className="rounded-3xl bg-[#fff7f3] p-10 ring-1 ring-[#ff4c00]/30">
              <div className="text-[#ff4c00] text-sm font-semibold mb-4">
                STEP 3
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">
              FlashFire teams up with you to apply every day
              </h3>
              <p className="text-gray-700 leading-relaxed">
                FlashFire finds new relevant jobs daily, optimizes your resume,
                and applies automatically on your behalf.
              </p>
            </div>

          </div>
        </div>
      </section>
      {/* Why Use FlashFire Section */}
      <section className="w-full bg-white py-28">
        <div className="max-w-[1200px] mx-auto px-6">

          {/* Header */}
          <div className="text-center max-w-[760px] mx-auto">
            <h2 className="text-[3.4rem] font-extrabold text-black">
              Why Use <span className="text-[#ff4c00]">FlashFire?</span>
            </h2>
            <p className="mt-5 text-lg text-gray-600">
              AI-powered job applications that save time, increase reach,
              and help you land more interviews.
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-24 space-y-28">

            {/* ROW 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-black mb-4">
                  Get More Interviews
                </h3>
                <div className="w-14 h-[3px] bg-[#ff4c00] mb-6" />
                <p className="text-gray-600 leading-relaxed max-w-[520px]">
                  Most people need to apply to dozens of jobs to get a single
                  interview. FlashFire applies consistently every day to increase
                  your chances.
                </p>
              </div>

              <div className="bg-[#fafafa] rounded-3xl p-4 flex justify-center">
                <Image
                  src="/images/AIcopilot1.png"
                  alt="Get more interviews"
                  width={320}
                  height={320}
                  className="object-contain"
                />
              </div>
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="bg-[#fafafa] rounded-3xl p-4 flex justify-center">
                <Image
                  src="/images/AIcopilot2.png"
                  alt="Get more interviews"
                  width={320}
                  height={320}
                  className="object-contain"
                />
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-black mb-4">
                  Never Miss an Opportunity
                </h3>
                <div className="w-14 h-[3px] bg-[#ff4c00] mb-6" />
                <p className="text-gray-600 leading-relaxed max-w-[520px]">
                  FlashFire tracks new job postings daily so you never apply late
                  or miss newly opened roles.
                </p>
              </div>
            </div>

            {/* ROW 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-black mb-4">
                  Auto-Apply to the Right Jobs
                </h3>
                <div className="w-14 h-[3px] bg-[#ff4c00] mb-6" />
                <p className="text-gray-600 leading-relaxed max-w-[520px]">
                  Apply only to roles that match your profile. FlashFire tailors
                  your resume automatically for every job.
                </p>
              </div>

              <div className="bg-[#fafafa] rounded-3xl p-4 flex justify-center">
                <Image
                  src="/images/AIcopilot3.png"
                  alt="Get more interviews"
                  width={320}
                  height={320}
                  className="object-contain"
                />
              </div>
            </div>

            {/* ROW 4 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="bg-[#fafafa] rounded-3xl p-4 flex justify-center">
                <Image
                  src="/images/AIcopilot4.png"
                  alt="Get more interviews"
                  width={320}
                  height={320}
                  className="object-contain"
                />
              </div>

              <div>
                  <h3 className="text-3xl md:text-4xl font-semibold text-black mb-4">
                  Save Hours Every Week
                </h3>
                <div className="w-14 h-[3px] bg-[#ff4c00] mb-6" />
                <p className="text-gray-600 leading-relaxed max-w-[520px]">
                  Stop wasting hours on repetitive applications. FlashFire handles
                  the work so you can focus on interviews and preparation.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      <HomePageHappyUsers />
      {/* CTA SECTION */}
      <section 
      id="cta-section"className="w-full bg-white py-28">
      <div className="max-w-[1200px] mx-auto px-6">

        <div className="
          relative
          rounded-[48px]
          bg-[#f9e8e0]
          px-10
          py-20
          text-center
          shadow-sm
        ">
          {/* Headline */}
          <h2 className="text-[2.6rem] md:text-[3rem] font-extrabold text-black">
            Ready to Automate Your Job Applications?
          </h2>

          {/* CTA Button */}
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => handleStartApplyingClick("cta")}
              className="
                inline-flex
                items-center
                gap-3
                bg-[#ff4c00]
                text-white
                px-10
                py-4
                rounded-full
                text-lg
                font-semibold
                shadow-[0_3px_0_black]
                hover:scale-105
                transition
              "
            >
              Start Applying with AI
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </section>
    <Footer/>
    </>
  );
}
