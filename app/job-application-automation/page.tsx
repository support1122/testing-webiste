"use client";

import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

export default function JobApplicationAutomationPage() {
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
        ? localStorage.getItem("utm_medium") || "Job_Automation_Page"
        : "Job_Automation_Page";

      try {
        GTagUTM({
          eventName: "sign_up_click",
          label: "Job_Automation_Get_Me_Interview_Button",
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
        trackButtonClick("Get Me Interview", "job_automation_cta", "cta", {
          button_location: "job_automation_hero_section",
          section: "job_automation_hero"
        });
        trackSignupIntent("job_automation_cta", {
          signup_source: "job_automation_hero_button",
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
      const isOnJobAutomationPage = normalizedPath === '/job-application-automation' ||
        normalizedPath === '/en-ca/job-application-automation';

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

      // If on job automation page, change URL but keep page content visible
      if (isOnJobAutomationPage) {
        if (typeof window !== 'undefined') {
          const currentScrollY = window.scrollY;
          sessionStorage.setItem('previousPageBeforeGetMeInterview', '/job-application-automation');
          sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
        }

        const targetPath = normalizedPath.startsWith('/en-ca') ? '/en-ca/get-me-interview' : '/get-me-interview';
        router.replace(targetPath);
        return;
      }

      // Save current scroll position before navigation to preserve it
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
      }

      // Only navigate if NOT already on the page
      const targetPath = '/get-me-interview';
      router.push(targetPath);
    } catch (error) {
      console.warn('Error in Get Me Interview handler:', error);
    }
  };

  const handleHowItWorks = () => {
    try {
      trackButtonClick("How It Works", "job_automation_cta", "cta", {
        button_location: "job_automation_hero_section",
        section: "job_automation_hero",
        action: "how_it_works"
      });
    } catch (trackError) {
      console.warn('Tracking error:', trackError);
    }

    // Scroll to the "How It Works" section on the same page
    if (typeof window !== 'undefined') {
      const howItWorksSection = document.getElementById('how-it-works');
      if (howItWorksSection) {
        howItWorksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    // Fallback: Navigate to the How It Works page if section not found
    const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
    const normalizedPath = currentPath.split('?')[0];
    const targetPath = normalizedPath.startsWith('/en-ca') ? '/en-ca/how-it-works' : '/how-it-works';
    router.push(targetPath);
  };
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-[#0f172a] font-['Space_Grotesk',sans-serif]">
        {/* Hero */}
        <section className="min-h-[100vh] flex items-center bg-[#fff6f4]">
          <div className="mx-auto max-w-6xl px-6 text-center">

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-[#0b0b0b] leading-tight">
              You're not competing with people.
              <br />
              <span className="text-[#ff4c00]">You're competing with AI.</span>
            </h1>

            <p className="mt-6 text-lg text-[#6b7280] max-w-3xl mx-auto">
              Roles get hundreds of applications in minutes.
              AI applies first, tailors better, and never gets tired.
              Your AI Job Hunter keeps you ahead.
            </p>

            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <button
                {...getButtonProps()}
                onClick={handleGetMeInterview}
                className="bg-white border-2 border-black px-6 sm:px-8 py-3 sm:py-4 font-bold text-black text-base sm:text-lg hover:bg-[#f9e8e0] transition-colors rounded-lg inline-flex items-center justify-center"
                style={{ boxShadow: '0 4px 0 0 rgba(245, 93, 29, 1)' }}
              >
                Get Me Interview →
              </button>
              <button
                onClick={handleHowItWorks}
                className="border-2 border-[#ff4c00] text-[#ff4c00] bg-transparent hover:bg-[#fff2ea] px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg transition-colors rounded-lg inline-flex items-center justify-center"
              >
                How It Works
              </button>
            </div>

            <div className="mt-14 grid md:grid-cols-3 gap-6">
              {[
                "First to apply wins",
                "ATS filters reject 75%",
                "Speed beats volume",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-black border-2 border-white rounded-lg px-6 py-4 font-semibold text-white"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= AI JOB HUNTER IN ACTION ================= */}
        <section id="how-it-works" className="py-28 bg-[#fff6f4]">
          <div className="mx-auto max-w-7xl px-6">

            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b0b0b]">
                Your AI Job Hunter,
                <br />
                <span className="text-[#ff4c00]">working 24/7 for you.</span>
              </h2>
              <p className="mt-4 text-lg text-[#6b7280] max-w-3xl mx-auto">
                While others manually apply and wait, your AI scans, applies,
                and optimizes continuously — without burnout.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Always First to Apply",
                  desc: "Applies within minutes of a role going live, giving you a first-mover advantage.",
                },
                {
                  title: "ATS-Optimized Applications",
                  desc: "Each application is tailored with role-specific keywords to beat ATS filters.",
                },
                {
                  title: "Consistent Weekly Momentum",
                  desc: "Keeps applications flowing so interview chances compound every week.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-[#ffd7c4] rounded-2xl p-8 shadow-sm hover:shadow-md transition"
                >
                  <div className="w-10 h-1.5 bg-[#ff4c00] rounded-full mb-4" />
                  <h3 className="text-xl font-bold text-[#0b0b0b] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#6b7280] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Get 10x more interviews */}
        {/* ================= MANUAL VS AI ================= */}
        <section className="py-28 bg-white">
          <div className="mx-auto max-w-6xl px-6">

            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16">
              Manual job search
              <br />
              <span className="text-[#ff4c00]">vs your AI Job Hunter</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-10">

              {/* MANUAL */}
              <div className="border border-[#e5e7eb] rounded-2xl p-8 bg-[#fafafa]">
                <h3 className="text-lg font-bold mb-6 text-[#0b0b0b]">
                  Traditional Job Search
                </h3>
                <ul className="space-y-4 text-[#6b7280]">
                  <li>• 10–15 applications per week</li>
                  <li>• Repetitive resume edits</li>
                  <li>• Missed early job postings</li>
                  <li>• No visibility into what works</li>
                </ul>
              </div>

              {/* AI */}
              <div className="border border-[#ffd7c4] rounded-2xl p-8 bg-[#fff6f4]">
                <h3 className="text-lg font-bold mb-6 text-[#0b0b0b]">
                  AI Job Hunter
                </h3>
                <ul className="space-y-4 text-[#374151] font-medium">
                  <li>• 30–50 targeted applications per week</li>
                  <li>• ATS-ready customization per role</li>
                  <li>• Applies as soon as roles open</li>
                  <li>• Continuous optimization loop</li>
                </ul>
              </div>

            </div>
          </div>
        </section>
        {/* ================= WHY JOB HUNTING BREAKS ================= */}
      
      <section className="py-32 bg-[#fff6f4]">
        <div className="mx-auto max-w-7xl px-6">

          {/* SECTION HEADER */}
          <div className="text-center mb-20">
            <span className="inline-block mb-4 text-sm font-semibold tracking-wider text-[#ff4c00]">
              THE PROBLEM WITH MODERN JOB SEARCH
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b0b0b]">
              Why job hunting breaks down
              <br />
              <span className="text-[#ff4c00]">— and how AI fixes it</span>
            </h2>

            <p className="mt-6 max-w-3xl mx-auto text-lg text-[#6b7280]">
              Effort alone no longer wins interviews.
              The market now rewards speed, relevance, and scale.
            </p>
          </div>

          {/* COMPARISON GRID */}
          <div className="relative grid lg:grid-cols-2 gap-16 items-start">

            {/* VERTICAL DIVIDER (desktop only) */}
            <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-[#ffd7c4]" />

            {/* LEFT — WHY IT FAILS */}
            <div>
              <h3 className="text-xl font-extrabold text-[#0b0b0b] mb-8">
                Why traditional job hunting fails
              </h3>

              <div className="space-y-5">
                {[
                  "Hundreds of candidates apply within hours of posting",
                  "ATS filters reject most resumes before humans see them",
                  "Manual applications can't scale consistently",
                  "There's no feedback loop to improve results",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 bg-white border border-[#e5e7eb] rounded-xl p-5"
                  >
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#9ca3af]" />
                    <p className="text-[#374151] font-medium leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — AI SOLUTION */}
            <div>
              <h3 className="text-xl font-extrabold text-[#0b0b0b] mb-8">
                How AI changes the game
              </h3>

              <div className="space-y-5">
                {[
                  "Applies instantly when roles go live",
                  "Optimizes each application for ATS + recruiter keywords",
                  "Scales applications without fatigue or burnout",
                  "Learns from outcomes and continuously improves",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 bg-white border border-[#ffd7c4] rounded-xl p-5"
                  >
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ff4c00]" />
                    <p className="text-[#374151] font-medium leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


      </main>
      <Footer />
    </>
  );
}
