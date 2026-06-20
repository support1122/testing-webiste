"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { trackButtonClick, trackSignupIntent } from "@/src/utils/PostHogTracking";
import { GTagUTM } from "@/src/utils/GTagUTM";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { FaPlus, FaTimes } from "react-icons/fa";
import faqStyles from "@/src/components/homePageFAQ/homePageFAQ.module.css";

export default function JobApplicationAutomationPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const router = useRouter();
  const pathname = usePathname();
  const { getButtonProps } = useGeoBypass({
    onBypass: () => {
      // Bypass will be handled by the event listener
    },
  });

  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const jobAutomationFAQs = [
    {
      question: "What is job application automation and how can it help me apply to more jobs?",
      answer: " Job application automation lets a system handle the repetitive tasks of applying, allowing you to reach 1,000+ jobs fast without spending hours daily."
    },
    {
      question: "How does automating job applications increase my chances of landing interviews?",
      answer: " It lets you apply to more roles quickly, with resumes tailored to each one — increasing visibility to recruiters and Applicant Tracking Systems (ATS)."
    },
    {
      question: "Can job application automation help me land my dream job faster?",
      answer: " By applying to high-fit roles consistently and quickly, you're more likely to land interviews and offers in less time."
    },
    {
      question: "How do I optimise my LinkedIn profile to improve automated job application results?",
      answer: " Make sure your profile matches your target job title, keywords, and skills. FlashFire's team also does this manually for you."
    },
    {
      question: "What is an ATS resume, and why is it important for automated job applications?",
      answer: " An ATS resume is optimized to pass recruiter filters and software systems, which improves shortlisting odds. FlashFire tailors yours for each job."
    },
    {
      question: "How does AI for job search integrate with job application automation tools?",
      answer: " Our AI scans job descriptions, extracts key requirements, and inserts them into your resume before our team submits each application."
    },
    {
      question: "Does FlashFireJobs act as an AI job board with built-in automation features?",
      answer: " It combines AI resume matching + human-powered application submission, unlike traditional job boards."
    },
    {
      question: "What are the best practices for job application automation to avoid common pitfalls?",
      answer: " Avoid mass-blind applications. Instead, target fresh, relevant roles with optimized resumes — which FlashFire does manually for each job."
    },
    {
      question: "Can I use job application automation while still customizing applications for each job?",
      answer: " Every application on FlashFire is resume-optimized per job, and our cover letter is generalized for broad relevance."
    },
    {
      question: "How does automating job applications work with AI-powered job matching and alerts?",
      answer: " We use AI to match jobs based on your preferences, optimize your resume, then apply — while keeping you updated via WhatsApp."
    }
  ];

  const handleFaqToggle = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

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
        normalizedPath === '/en-ca/job-application-automation' ||
        normalizedPath === '/features/job-automation' ||
        normalizedPath === '/en-ca/features/job-automation' ||
        normalizedPath === '/features/automated-job-applications' ||
        normalizedPath === '/en-ca/features/automated-job-applications';

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

      // If on job automation features page, change URL but keep page content visible
      if (isOnJobAutomationPage) {
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

  

  // Prevent hydration mismatch by ensuring client-only rendering
  if (!isMounted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white text-[#0f172a] font-['Space_Grotesk',sans-serif]">
          <section className="min-h-[100vh] flex items-center bg-[#fff6f4]">
            <div className="mx-auto max-w-6xl px-6 text-center">
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-[#0b0b0b] leading-tight">
                You're not competing with people.
                <br />
                <span className="text-[#ff4c00]">You're competing with AI.</span>
              </h1>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Automated Job Applications",
    "image": "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/job-automation.png",
    "description": "Automated job applications powered by AI help you apply faster, target the right roles, and get interview calls sooner with FlashfireJobs. Check out now",
    "brand": {
      "@type": "Brand",
      "name": "FlashFire"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.flashfirejobs.com/features/automated-job-applications",
      "priceCurrency": "USD",
      "price": "0"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "95"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is job application automation and how can it help me apply to more jobs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ans. Job application automation lets a system handle the repetitive tasks of applying, allowing you to reach 1,000+ jobs fast without spending hours daily."
        }
      },
      {
        "@type": "Question",
        "name": "How does automating job applications increase my chances of landing interviews?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ans. It lets you apply to more roles quickly, with resumes tailored to each one — increasing visibility to recruiters and Applicant Tracking Systems (ATS)."
        }
      },
      {
        "@type": "Question",
        "name": "Can job application automation help me land my dream job faster?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ans. By applying to high-fit roles consistently and quickly, you're more likely to land interviews and offers in less time."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-white text-[#0f172a] font-['Space_Grotesk',sans-serif]">
        {/* Hero */}
        <section className="min-h-[95vh] -mt-20 flex items-center bg-[#fff6f4]">
          <div className="mx-auto max-w-6xl px-6 text-center">

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-[#0b0b0b] leading-tight">
              You're not competing with people.
              <br />
              <span className="text-[#ff4c00]">You're competing with AI.</span>
            </h1>

            <p className="mt-6 text-lg text-[#6b7280] max-w-3xl mx-auto">
              Roles get hundreds of applications in minutes.
              AI applies first, tailors better, and never gets tired.
              Flashfire keeps you ahead.
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
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0b0b0b]">
                Flashfire AI Job Automation Platform, Working 24/7 for You
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


        {/* ================= BEFORE/AFTER COMPARISON ================= */}
        <section className="py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0b0b0b] mb-4">
                Manual Job Search vs Flashfire Automated Job Application System
              </h2>
              <p className="text-lg text-[#6b7280] max-w-2xl mx-auto">
                See the difference Flashfire makes in your job search journey
              </p>
            </div>
            <div className="w-full overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <div className="max-w-6xl mx-auto bg-white rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 md:py-5 px-2 md:px-6 text-left text-[10px] sm:text-xs md:text-sm font-medium text-gray-600 w-[50%] sm:w-auto" />
                      <th className="py-2 md:py-5 px-1.5 md:px-6 text-center text-[9px] sm:text-xs md:text-lg font-semibold text-[#ff4c00] border-l border-gray-200 whitespace-nowrap">
                        <span className="hidden sm:inline">Before FLASHFIRE</span>
                        <span className="sm:hidden">Before</span>
                      </th>
                      <th className="py-2 md:py-5 px-1.5 md:px-6 text-center text-[9px] sm:text-xs md:text-lg font-semibold text-green-600 border-l border-gray-200 whitespace-nowrap">
                        <span className="hidden sm:inline">After FLASHFIRE</span>
                        <span className="sm:hidden">After</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        title: "ATS-Friendly Resume Optimization",
                        caption: "Resumes tailored to each job description with ATS-friendly keywords",
                      },
                      {
                        title: "Time Efficiency in Job Search",
                        caption: "150+ hours saved through AI-powered automation",
                      },
                      {
                        title: "Accuracy & Attention to Detail",
                        caption: "Role-matched applications reviewed by AI + humans",
                      },
                      {
                        title: "Automated Applications",
                        caption: "1,200+ smart applications sent strategically — not spam",
                      },
                      {
                        title: "Application Tracking & Proof",
                        caption: "Real-time tracking with visible proof and updates",
                      },
                      {
                        title: "Interview Opportunity Rate",
                        caption: "Higher interview conversion rates within weeks",
                      },
                    ].map((item, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="py-2 md:py-5 px-2 md:px-6">
                          <div className="text-[11px] sm:text-sm md:text-base font-semibold text-gray-900 leading-tight">
                            {item.title}
                          </div>
                          <div className="mt-0.5 sm:mt-1 text-[9px] sm:text-xs md:text-sm text-gray-500 leading-snug">
                            {item.caption}
                          </div>
                        </td>
                        <td className="py-2 md:py-5 px-1.5 md:px-6 text-center border-l border-gray-200">
                          <svg className="text-[#ff4c00] text-sm sm:text-lg md:text-xl mx-auto w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </td>
                        <td className="py-2 md:py-5 px-1.5 md:px-6 text-center border-l border-gray-200">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mx-auto rounded-full bg-green-600 flex items-center justify-center">
                            <svg className="text-white text-[8px] sm:text-xs md:text-sm w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 md:mt-12 text-center max-w-3xl mx-auto px-4">
                <p className="text-xs sm:text-sm md:text-base sm:text-lg font-semibold text-gray-900">
                  Stop applying blindly. Start getting interviews strategically.
                </p>
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

      <h2 className="text-4xl md:text-5xl font-extrabold text-[#0b0b0b]">
        Why job hunting breaks down
        <br />
        <span className="text-[#ff4c00]">and how AI fixes it</span>
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
            "Manual applications can’t scale consistently",
            "There’s no feedback loop to improve results",
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

        {/* FAQ Section */}
        <section id="faq" className={faqStyles.faqSection}>
          <div id="faq-header" className={faqStyles.header}>
            <h2>Question? We Got You Answers.</h2>
            <p>
              We get it, job application automation can sound complex. Here's everything
              explained, plain and simple.
            </p>
          </div>

          <div className={faqStyles.faqContainer}>
            {jobAutomationFAQs.map((faq, index) => (
              <div
                key={index}
                className={`${faqStyles.faqItem} ${
                  activeFaqIndex === index ? faqStyles.active : ""
                }`}
              >
                <button
                  className={faqStyles.faqQuestion}
                  onClick={() => handleFaqToggle(index)}
                >
                  <span>{faq.question}</span>
                  <span className={faqStyles.icon}>
                    {activeFaqIndex === index ? <FaTimes /> : <FaPlus />}
                  </span>
                </button>

                {activeFaqIndex === index && (
                  <div className={faqStyles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

