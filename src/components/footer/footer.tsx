"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import { smoothScrollToElement } from "@/src/utils/smoothScroll";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const isCanadaContext = pathname.startsWith("/en-ca");
  const prefix = isCanadaContext ? "/en-ca" : "";

  const getHref = (href: string) => {
    if (href.startsWith("http")) return href;
    // Ensure no hash fragments are added to feature URLs
    const cleanHref = href.split('#')[0];
    return `${prefix}${cleanHref}`;
  };

  const handleFAQClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const isHome =
      pathname === "/" || pathname === "/en-ca" || pathname === `${prefix}/`;

    if (isHome) {
      setTimeout(() => {
        smoothScrollToElement("faq", {
          duration: 800,
          easing: "easeInOutCubic",
        });
      }, 100);
    } else {
      router.push(getHref("/"));
      setTimeout(() => {
        const tryScroll = (count = 0) => {
          if (document.getElementById("faq")) {
            smoothScrollToElement("faq", {
              duration: 800,
              easing: "easeInOutCubic",
            });
          } else if (count < 10) {
            setTimeout(() => tryScroll(count + 1), 200);
          }
        };
        tryScroll();
      }, 300);
    }
  };

  const linkClass =
    "text-white text-[0.82rem] underline underline-offset-4 hover:opacity-80 transition max-[480px]:text-[0.8rem]";

  return (
    <footer className="bg-[#f55d1d] text-white px-6 pt-12 pb-6 max-[768px]:px-6 max-[480px]:px-4">

      {/* TOP SECTION: LOGO + LINKS (SAME ROW) */}
      <div className="flex flex-col max-[768px]:flex-col justify-between border-b border-white pb-8 mb-6 max-[768px]:pb-6 max-[768px]:mb-4">

        {/* LOGO BLOCK */}
        <div className="flex items-center gap-3 mb-8 max-[768px]:mb-6 max-[768px]:justify-center max-[480px]:mb-4">
        <img
          src="/images/flashfire-logo-white.png"
          alt="Flashfire Logo"
            className="w-10 h-10 object-contain max-[480px]:w-8 max-[480px]:h-8"
        />
          <span className="text-lg font-bold tracking-wide max-[480px]:text-base">
            FLASHFIRE
          </span>
      </div>

          {/* LINKS GRID */}
          <div
            style={{ gridTemplateColumns: "repeat(6, minmax(0, 1fr))" }}
            className="
              grid gap-x-4 gap-y-10
              max-[1280px]:grid-cols-3
              max-[768px]:grid-cols-2 max-[768px]:gap-y-8
              max-[480px]:grid-cols-1 max-[480px]:gap-6
            "
          >
            {/* QUICK ACCESS */}
            <div className="max-[480px]:mb-2">
              <h4 className="mb-3 text-sm font-bold tracking-widest text-[#fff7f4] max-[480px]:mb-2 max-[480px]:text-xs">
                QUICK ACCESS
              </h4>
              <div className="flex flex-col gap-1.5 max-[480px]:gap-1">
                <Link href={getHref("/job-search")} className={linkClass}>Job Search</Link>
                <Link href={getHref("/features")} className={linkClass}>Features</Link>
                <Link href={getHref("/testimonials")} className={linkClass}>Testimonials</Link>
                <Link href={getHref("/pricing")} className={linkClass}>Pricing</Link>
                <Link href={getHref("/faq")} className={linkClass} onClick={handleFAQClick}>FAQ</Link>
                <Link href={getHref("/blog")} className={linkClass}>Blog</Link>
                <Link href={getHref("/about-us")} className={linkClass}>About Us</Link>
                <Link href={getHref("/contact-us")} className={linkClass}>Contact Us</Link>
              </div>
            </div>

            {/* PRODUCT */}
            <div className="max-[480px]:mb-2">
              <h4 className="mb-3 text-sm font-bold tracking-widest text-[#fff7f4] max-[480px]:mb-2 max-[480px]:text-xs">
                PRODUCT
              </h4>
              <div className="flex flex-col gap-1.5 max-[480px]:gap-1">
                <Link href={getHref("/features/ats-resume-optimizer")} className={linkClass}>
                  Resume Optimizer
                </Link>
                <Link href={getHref("/features/automated-job-applications")} className={linkClass}>
                  Job Automation
                </Link>
                <Link
                  href={getHref("/features/linkedin-profile-optimization-tool")}
                  className={linkClass}
                >
                  LinkedIn Optimization
                </Link>
                <Link href={getHref("/features/job-application-tracker")} className={linkClass}>
                  Job Tracker
                </Link>
                <Link href={getHref("/features/ai-cover-letter-generator")} className={linkClass}>
                  Cover Letter Builder
                </Link>
                <Link href={getHref("/features/ai-job-targeting")} className={linkClass}>
                  Precision Targeting
                </Link>
                <Link href={getHref("/features/dashboard-analytics")} className={linkClass}>
                  Dashboard &amp; Analytics
                </Link>
                <Link href={getHref("/offer-and-salary")} className={linkClass}>
                  Offer &amp; Salary Negotiation Skills
                </Link>
                <Link href={getHref("/recent-job-openings")} className={linkClass}>
                  Recent Job Openings
                </Link>
              </div>
            </div>

            {/* AI CAREER TOOLS */}
            <div className="max-[480px]:mb-2">
              <h4 className="mb-3 text-sm font-bold tracking-widest text-[#fff7f4] max-[480px]:mb-2 max-[480px]:text-xs">
                AI CAREER TOOLS
              </h4>
              <div className="flex flex-col gap-1.5 max-[480px]:gap-1">
                <Link href={getHref("/career-advisor")} className={linkClass}>
                  Career Advisor
                </Link>
                <Link href={getHref("/interview-buddy")} className={linkClass}>
                  Interview Buddy
                </Link>
                <Link href={getHref("/AI-copilot")} className={linkClass}>
                  AI Copilot
                </Link>
                <Link href={getHref("/ai-resume-builder")} className={linkClass}>
                  AI Resume Builder
                </Link>
                <Link href={getHref("/ai-job-matching-platform")} className={linkClass}>
                  AI Job Matching
                </Link>
                <Link href={getHref("/ai-job-alerts")} className={linkClass}>
                  AI Job Alerts
                </Link>
                <Link href={getHref("/job-application-status-tracker")} className={linkClass}>
                  Job Status Tracker
                </Link>
                <Link href={getHref("/ai-follow-up-email-generator")} className={linkClass}>
                  AI Follow-Up Emails
                </Link>
                <Link href={getHref("/ai-job-search-platform-for-freshers")} className={linkClass}>
                  AI Job Search for Freshers
                </Link>
                <Link href={getHref("/ai-remote-job-search-platform")} className={linkClass}>
                  AI Remote Job Search
                </Link>
                <Link href={getHref("/ai-career-assessment-skill-gap-analysis")} className={linkClass}>
                  AI Career Assessment
                </Link>
              </div>
            </div>


            {/* TOOLS */}
            <div className="max-[480px]:mb-2">
              <h4 className="mb-3 text-sm font-bold tracking-widest text-[#fff7f4] max-[480px]:mb-2 max-[480px]:text-xs">
                TOOLS
              </h4>
              <div className="flex flex-col gap-1.5 max-[480px]:gap-1">
                <Link href={getHref("/salary-calculator")} className={linkClass}>
                  Salary Calculator
                </Link>
                <Link href={getHref("/gross-pay-calculator")} className={linkClass}>
                  Gross Pay Calculator
                </Link>
                <Link href={getHref("/take-home-pay-calculator")} className={linkClass}>
                  Take Home Pay Calculator
                </Link>
                <Link href={getHref("/hourly-to-salary-calculator")} className={linkClass}>
                  Hourly to Salary Calculator
                </Link>
                <Link href={getHref("/after-tax-income-calculator")} className={linkClass}>
                  After Tax Income Calculator
                </Link>
                <Link href={getHref("/salary-comparison")} className={linkClass}>
                  Salary Comparison
                </Link>
                <Link href={getHref("/salary-estimator")} className={linkClass}>
                  Salary Estimator
                </Link>
                <Link href={getHref("/ai-interview-answer-generator")} className={linkClass}>
                  AI Interview Answer Generator
                </Link>
              </div>
            </div>

            {/* RESUME TOOLS */}
            <div className="max-[480px]:mb-2">
              <h4 className="mb-3 text-sm font-bold tracking-widest text-[#fff7f4] max-[480px]:mb-2 max-[480px]:text-xs">
                RESUME TOOLS
              </h4>
              <div className="flex flex-col gap-1.5 max-[480px]:gap-1">
                <Link href={getHref("/ats-score-checker")} className={linkClass}>ATS Score Checker</Link>
                <Link href={getHref("/resume-parser")} className={linkClass}>Resume Parser</Link>
                <Link href={getHref("/cv-keyword-scanner")} className={linkClass}>CV Keyword Scanner</Link>
                <Link href={getHref("/resume-bullet-point-generator")} className={linkClass}>Resume Bullet Generator</Link>
                <Link href={getHref("/resume-parser-software")} className={linkClass}>Resume Parser Software</Link>
                <Link href={getHref("/ai-resume-summary-generator")} className={linkClass}>AI Resume Summary</Link>
                <Link href={getHref("/resume-headline-generator")} className={linkClass}>Resume Headline Generator</Link>
              </div>
            </div>

            {/* COMPANY */}
            <div className="max-[480px]:mb-2">
              <h4 className="mb-3 text-sm font-bold tracking-widest text-[#fff7f4] max-[480px]:mb-2 max-[480px]:text-xs">
                COMPANY
              </h4>
              <div className="flex flex-col gap-1.5 max-[480px]:gap-1">
                <Link href={getHref("/refund-policy")} className={linkClass} target="_blank">
                  Refund Policy
                </Link>
                <Link href={getHref("/privacy-policy")} className={linkClass} target="_blank">
                  Privacy Policy
                </Link>
                <Link href={getHref("/payment-policy")} className={linkClass} target="_blank">
                  Payment Policy
                </Link>
                <Link href={getHref("/terms-of-service")} className={linkClass} target="_blank">
                  Terms of Service
                </Link>
              </div>
            </div>

        </div>

          {/* FOLLOW US — sits below the grid, not inside it */}
          <div className="mt-8">
            <h4 className="mb-3 text-sm font-bold tracking-widest text-[#fff7f4] max-[480px]:text-xs">
              FOLLOW US
            </h4>
            <div className="flex items-center gap-3 max-[480px]:gap-4">
              <Link href="https://www.linkedin.com/company/flashfire-pvt-ltd/" target="_blank" className="text-xl hover:scale-110 transition max-[480px]:text-lg">
                <FaLinkedinIn />
              </Link>
              <Link href="https://www.instagram.com/flashfirejobs/" target="_blank" className="text-xl hover:scale-110 transition max-[480px]:text-lg">
                <FaInstagram />
              </Link>
              <Link href="https://www.youtube.com/@flashfireindia" target="_blank" className="text-xl hover:scale-110 transition max-[480px]:text-lg">
                <FaYoutube />
              </Link>
            </div>
          </div>
      </div>

      {/* BOTTOM */}
      <div className="flex justify-between text-sm opacity-90 max-[768px]:flex-col max-[768px]:gap-2 max-[768px]:items-center max-[480px]:text-xs max-[480px]:text-center">
        <p className="max-[480px]:mb-1">© Flashfire 2025. All Rights Reserved.</p>
        <p>Flashfire Pvt. Ltd.</p>
      </div>

    </footer>
  );
}
