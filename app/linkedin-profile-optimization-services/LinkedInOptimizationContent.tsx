"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Check, Copy } from "lucide-react";
import HomePageFAQ from "@/src/components/homePageFAQ/homePageFAQ";
import styles from "@/src/components/homePageDemoCTA/homePageDemoCTA.module.css";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";

export default function LinkedInOptimizationContent() {
  const router = useRouter();
  const pathname = usePathname();
  const [emailCopied, setEmailCopied] = useState(false);
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener
    },
  });

  const handleCopyEmail = async () => {
    const email = "support@flashfirejobs.com";
    
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      
      // Reset the "Copied!" message after 2 seconds
      setTimeout(() => {
        setEmailCopied(false);
      }, 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = email;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setEmailCopied(true);
        setTimeout(() => {
          setEmailCopied(false);
        }, 2000);
      } catch (fallbackErr) {
        console.error("Failed to copy email:", fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };
  
  return (
    <div className="min-h-screen bg-white text-[#0b0b0b]">
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-[100vh] flex items-center bg-white">
        <div className="mx-auto max-w-7xl  w-full grid lg:grid-cols-2 gap-10 items-center px-6">

          {/* LEFT CONTENT */}
          <div>
            <p className="inline-block mb-3 text-sm font-semibold tracking-wider text-[#ff4c00]">
              LINKEDIN OPTIMIZATION • RECRUITER VISIBILITY
            </p>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight">
              LinkedIn Optimization Services to Optimise Your LinkedIn Profile
            </h1>

            <p className="mt-3 text-lg text-[#4b5563] max-w-xl leading-relaxed">
              Professional LinkedIn optimization services to optimise LinkedIn profile visibility. Improve reach by optimizing your LinkedIn profile for recruiters.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                {...getButtonProps()}
                onClick={() => {
                  try {
                    const utmSource = typeof window !== "undefined" && window.localStorage
                      ? localStorage.getItem("utm_source") || "WEBSITE"
                      : "WEBSITE";
                    const utmMedium = typeof window !== "undefined" && window.localStorage
                      ? localStorage.getItem("utm_medium") || "LinkedIn_Page"
                      : "LinkedIn_Page";

                    try {
                      GTagUTM({
                        eventName: "sign_up_click",
                        label: "LinkedIn_Get_Me_Interview_Button",
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
                      trackButtonClick("Get Me Interview", "linkedin_cta", "cta", {
                        button_location: "linkedin_hero_section",
                        section: "linkedin_hero"
                      });
                      trackSignupIntent("linkedin_cta", {
                        signup_source: "linkedin_hero_button",
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
                    const isOnLinkedInPage = normalizedPath === '/linkedin-profile-optimization-services' ||
                      normalizedPath === '/en-ca/linkedin-profile-optimization-services' ||
                      normalizedPath === '/Linkedin-Profile-Optimization-Services';

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

                    // If on LinkedIn page, change URL but keep page content visible
                    if (isOnLinkedInPage) {
                      if (typeof window !== 'undefined') {
                        const currentScrollY = window.scrollY;
                        sessionStorage.setItem('previousPageBeforeGetMeInterview', normalizedPath);
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
                }}
                className="bg-white border-2 border-black px-6 sm:px-8 py-3 sm:py-4 font-bold text-black text-base sm:text-lg hover:bg-[#f9e8e0] transition-colors rounded-lg inline-flex items-center justify-center"
                style={{ boxShadow: '0 4px 0 0 rgba(245, 93, 29, 1)' }}
              >
                Get Me Interview →
              </button>

              <button
                onClick={() => {
                  try {
                    trackButtonClick("How It Works", "linkedin_cta", "cta", {
                      button_location: "linkedin_hero_section",
                      section: "linkedin_hero",
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
                }}
                className="border-2 border-[#ff4c00] text-[#ff4c00] bg-transparent hover:bg-[#fff2ea] px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg transition-colors rounded-lg inline-flex items-center justify-center"
              >
                How It Works
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-[#4b5563]">
              {[
                "Works with free LinkedIn",
                "No login required",
                "Visible results in 7–14 days",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#ff4c00] rounded-full" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT VISUAL PANEL */}
          <div className="relative">

            {/* Main Card */}
            <div className="bg-[#fff6f4] border border-[#ffd7c4] rounded-3xl p-10">

              <h3 className="text-xl font-extrabold mb-6">
                What recruiters actually see
              </h3>

              <div className="space-y-5">
                <div className="flex justify-between items-center bg-white rounded-xl p-4 border border-[#f1e1d8]">
                  <span className="font-medium">Profile ranking</span>
                  <span className="font-bold text-[#ff4c00]">Top 7%</span>
                </div>

                <div className="flex justify-between items-center bg-white rounded-xl p-4 border border-[#f1e1d8]">
                  <span className="font-medium">Keyword match</span>
                  <span className="font-bold text-[#ff4c00]">92%</span>
                </div>

                <div className="flex justify-between items-center bg-white rounded-xl p-4 border border-[#f1e1d8]">
                  <span className="font-medium">Recruiter signals</span>
                  <span className="font-bold text-[#ff4c00]">Optimized</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white border border-[#f1e1d8] rounded-xl">
                <p className="text-sm text-[#4b5563]">
                  "Profiles optimized with FlashFire receive significantly more
                  recruiter messages within the first few weeks."
                </p>
              </div>
            </div>

            {/* Floating Accent */}
            <div className="absolute -top-6 -right-6 bg-[#ff4c00] text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md">
              Recruiter-ready
            </div>
          </div>

        </div>
      </section>

      {/* ================= RESULTS SECTION ================= */}
      <section className="py-24 bg-[#fff6f4]">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
            <p className="text-sm font-semibold tracking-wider text-[#ff4c00] mb-4">
              RESULTS THAT SPEAK FOR THEMSELVES
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Optimized profiles don't just look good.
              <br />
              <span className="text-[#ff4c00]">They get replies.</span>
            </h2>

            <p className="mt-6 text-lg text-[#4b5563] max-w-xl">
              FlashFire optimizes your LinkedIn profile for recruiter searches,
              keyword ranking, and conversion — so your profile shows up
              and actually gets responses.
            </p>
          </div>

          {/* RIGHT STAT GRID */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "SUCCESS RATE", value: "95%" },
              { label: "RECRUITER REPLIES", value: "2.3x" },
              { label: "VISIBILITY BOOST", value: "14 days" },
              { label: "PROFILES OPTIMIZED", value: "1,000+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-black border border-[#ffd7c4] rounded-2xl p-8"
              >
                <p className="text-xs font-semibold tracking-widest text-white">
                  {stat.label}
                </p>
                <h3 className="mt-2 text-4xl font-extrabold text-white">
                  {stat.value}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STEPS SECTION ================= */}
      <section id="how-it-works" className="py-28 bg-white">
        <div className="mx-auto max-w-7xl px-6 text-center">

          {/* HEADER */}
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            From LinkedIn profile to interview calls,
            <br />
            <span className="text-[#ff4c00]">in just 4 focused steps.</span>
          </h2>

          <p className="max-w-3xl mx-auto text-lg text-[#4b5563] mb-20">
            Recruiters don't browse randomly. They search with intent.
            FlashFire aligns your profile with exactly what they look for.
          </p>

          {/* STEPS GRID */}
          <div className="grid md:grid-cols-2 gap-10 text-left">
            {[
              {
                step: "01",
                title: "Share your LinkedIn profile",
                desc: "Paste your LinkedIn URL. No login, no permissions — we analyze only your public profile safely.",
              },
              {
                step: "02",
                title: "Optimize for recruiter searches",
                desc: "We fix headlines, keywords, experience bullets, and skills to match real recruiter search behavior.",
              },
              {
                step: "03",
                title: "Rank higher, get noticed",
                desc: "Your optimized profile starts appearing more often in recruiter searches for relevant roles.",
              },
              {
                step: "04",
                title: "Receive interview messages",
                desc: "Higher visibility + better positioning leads to genuine recruiter conversations.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-[#f9e8e0] border border-[#f1e1d8] rounded-2xl p-1 hover:-translate-y-1 hover:shadow-sm transition"
              >
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#ff4c00] text-white font-bold flex items-center justify-center">
                      {item.step}
                    </div>
                    <h4 className="text-xl font-extrabold">
                      {item.title}
                    </h4>
                  </div>

                  <p className="text-[#4b5563] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY THIS WORKS ================= */}
      <section className="py-28 bg-[#fff6f4]">
        <div className="mx-auto max-w-6xl px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-extrabold mb-14">
            Why FlashFire Works
            <br />
            <span className="text-[#ff4c00]">when others don't.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10 text-left">
            {[
              {
                title: "Recruiters search, not scroll",
                desc: "Most recruiters use keyword-based searches. If your profile doesn't match, it never appears.",
              },
              {
                title: "Ranking alone isn't enough",
                desc: "Even ranked profiles fail if the headline and experience don't convert interest into action.",
              },
              {
                title: "Generic profiles blend in",
                desc: "Profiles written for everyone fail to stand out. Specificity drives recruiter engagement.",
              },
              {
                title: "Optimized profiles get replies",
                desc: "Clear positioning + keyword alignment leads to more messages and interview calls.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-[#ff4c00] rounded-2xl p-4"
              >
                <h4 className="font-extrabold text-lg mb-3">
                  {item.title}
                </h4>
                <p className="text-[#4b5563] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <HomePageFAQ />

      {/* ================= FINAL CTA ================= */}
      <section className={styles.demoSectionOuter}>
        <div className={styles.demoSection}>
          <h5 className={styles.demoSubheading}>
            GOT FURTHER QUESTIONS? LET&rsquo;S TALK!
          </h5>

          <h2 className={styles.demoHeading}>
            BOOK A DEMO{" "}
            <span className={styles.fireIcon}>
              <Image
                src="/images/character.png"
                alt="Flashfire mascot"
                width={96}
                height={96}
                className="w-20 h-20 max-[600px]:w-16 max-[600px]:h-16"
              />
            </span>{" "}
            CALL
          </h2>

          <p className={styles.demoText}>
            We get it, <em>finding the right job isn&apos;t easy.</em> Book a quick
            chat with our founder and see how Flashfire can help you land
            interviews faster.
          </p>

          <button 
            {...getButtonProps()}
            className={styles.demoButton}
            onClick={(e) => {
              try {
                e.preventDefault();
                e.stopPropagation();
              } catch (err) {
                // Ignore cross-origin errors on event methods
              }
              try {
                const utmSource = typeof window !== "undefined" && window.localStorage
                  ? localStorage.getItem("utm_source") || "WEBSITE"
                  : "WEBSITE";
                const utmMedium = typeof window !== "undefined" && window.localStorage
                  ? localStorage.getItem("utm_medium") || "Demo_CTA_Section"
                  : "Demo_CTA_Section";
                
                try {
                  GTagUTM({
                    eventName: "sign_up_click",
                    label: "Demo_CTA_Button",
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
                  trackButtonClick("Book My Demo Call", "demo_cta", "cta", {
                    button_location: "demo_cta_button",
                    section: "demo_cta",
                    target_url: "/book-my-demo-call"
                  });
                  trackSignupIntent("demo_cta", {
                    signup_source: "demo_cta_button",
                    funnel_stage: "signup_intent",
                    target_url: "/book-my-demo-call"
                  });
                } catch (trackError) {
                  console.warn('Tracking error:', trackError);
                }
              } catch (error) {
                console.warn('Error in button click handler:', error);
              }
              
              // Dispatch custom event to force show modal
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
              }
              
              // Check current path
              const currentPath = pathname;
              const isImageTestimonialsPage = currentPath === '/testimonials' || currentPath === '/en-ca/testimonials' || currentPath === '/image-testimonials' || currentPath === '/en-ca/image-testimonials';
              const isAboutUsPage = currentPath === '/about-us' || currentPath === '/en-ca/about-us';
              const isLinkedInPage = currentPath === '/linkedin-profile-optimization-services' || currentPath === '/en-ca/linkedin-profile-optimization-services' || currentPath === '/Linkedin-Profile-Optimization-Services';
              const isAlreadyOnBookMyDemoCall = currentPath === '/book-my-demo-call' || currentPath === '/en-ca/book-my-demo-call';
              const isOnHomePage = currentPath === '/' || currentPath === '/en-ca' || currentPath === '';
              
              // If on home page, just show modal without navigating
              if (isOnHomePage) {
                // Clear any old sessionStorage values to prevent showing wrong page
                if (typeof window !== 'undefined') {
                  sessionStorage.removeItem('previousPageBeforeBookMyDemoCall');
                  sessionStorage.removeItem('preserveScrollPosition');
                }
                // Just trigger the modal, don't navigate - stay on home page
                return;
              }
              
              // If on image-testimonials page, change URL but keep page content visible
              if (isImageTestimonialsPage) {
                // Change URL to /book-my-demo-call without navigating (keep testimonials page visible)
                const targetPath = currentPath.startsWith('/en-ca') ? '/en-ca/book-my-demo-call' : '/book-my-demo-call';
                if (typeof window !== 'undefined') {
                  window.history.pushState({}, '', targetPath);
                }
                // Just trigger the modal, don't navigate
                return;
              }
              
              // If on about-us page, change URL but keep page content visible
              if (isAboutUsPage) {
                // Save the previous page path to sessionStorage
                if (typeof window !== 'undefined') {
                  sessionStorage.setItem('previousPageBeforeBookMyDemoCall', currentPath);
                }
                
                // Save current scroll position before modal opens
                const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
                if (typeof window !== 'undefined') {
                  sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
                }
                
                // Change URL to /book-my-demo-call using pushState only (don't use router to prevent scroll)
                const targetPath = currentPath.startsWith('/en-ca') ? '/en-ca/book-my-demo-call' : '/book-my-demo-call';
                if (typeof window !== 'undefined') {
                  window.history.pushState({}, '', targetPath);
                }
                
                // Dispatch custom event to force show modal FIRST
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
                }
                
                // Don't use router.replace - it causes scroll to top
                // Just change URL with pushState and show modal, page stays in place
                
                return;
              }
              
              // If on LinkedIn page, change URL but keep page content visible
              if (isLinkedInPage) {
                // Save the previous page path to sessionStorage
                if (typeof window !== 'undefined') {
                  sessionStorage.setItem('previousPageBeforeBookMyDemoCall', currentPath);
                }
                
                // Save current scroll position before modal opens
                const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
                if (typeof window !== 'undefined') {
                  sessionStorage.setItem('preserveScrollPosition', currentScrollY.toString());
                }
                
                // Change URL to /book-my-demo-call using pushState only (don't use router to prevent scroll)
                const targetPath = currentPath.startsWith('/en-ca') ? '/en-ca/book-my-demo-call' : '/book-my-demo-call';
                if (typeof window !== 'undefined') {
                  window.history.pushState({}, '', targetPath);
                }
                
                // Dispatch custom event to force show modal FIRST
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('showStrategyCallCard'));
                }
                
                // Don't use router.replace - it causes scroll to top
                // Just change URL with pushState and show modal, page stays in place
                
                return;
              }
              
              // If already on book-my-demo-call route, just show modal
              if (isAlreadyOnBookMyDemoCall) {
                // Just trigger the modal, don't navigate
                return;
              }
              
              // Navigate to /book-my-demo-call for other pages
              const targetPath = '/book-my-demo-call';
              
              // Save current scroll position to sessionStorage before navigation
              if (typeof window !== 'undefined') {
                sessionStorage.setItem('preserveScrollPosition', window.scrollY.toString());
              }
              
              router.push(targetPath);
            }}
          >
            Book My Demo Call →
          </button>

          <p className={styles.demoNote}>
            Limited slots available. Book your call now!
          </p>

          <div className={styles.demoEmailContainer}>
            <span className={styles.demoEmailLabel}>Or email us at</span>
            <div className={styles.emailCopyWrapper}>
              <input
                type="text"
                readOnly
                value="support@flashfirejobs.com"
                className={styles.emailInput}
              />
              <button
                onClick={handleCopyEmail}
                className={styles.copyButton}
                aria-label="Copy email to clipboard"
              >
                {emailCopied ? (
                  <Check className={styles.copyIcon} size={16} />
                ) : (
                  <Copy className={styles.copyIcon} size={16} />
                )}
              </button>
              {emailCopied && (
                <div className={styles.copiedTooltip}>
                  Copied
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

