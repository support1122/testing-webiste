"use client";

import { useEffect, useState, useLayoutEffect } from "react";
import HomePage from "@/src/components/pages/home/Home";
import AboutUs from "@/src/components/pages/aboutUs/AboutUs";
import Features from "@/src/components/pages/features/Features";
import ContactUsClient from "@/src/components/contactUs/contactUsClient";
import InterviewBuddy from "@/src/components/interviewBuddy/interviewBuddy";
import CareerAdvisor from "@/src/components/careerAdvisor/careerAdvisor";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import AICopilot from "@/src/components/AICopilot/AICopilot";
import dynamic from "next/dynamic";

const ATSPage = dynamic(() => import("@/app/features/resume-optimizer/page"), {
  ssr: false,
});

// Force fresh import to avoid Turbopack cache issues
const JobAutomationPage = dynamic(
  async () => {
    const module = await import("@/app/features/job-automation/page");
    return module;
  },
  { ssr: false }
);

const LinkedInPage = dynamic(() => import("@/app/features/linkedin-profile-optimization/page"), {
  ssr: false,
});

const JobTrackerPage = dynamic(() => import("@/app/features/job-tracker/page"), {
  ssr: false,
});

const PrecisionTargetingPage = dynamic(() => import("@/app/features/precision-targeting/page"), {
  ssr: false,
});

const DashboardAnalyticsPage = dynamic(() => import("@/app/features/dashboard-analytics/page"), {
  ssr: false,
});

const CoverLetterPage = dynamic(() => import("@/app/features/cover-letter/page"), {
  ssr: false,
});

const JobSearchPage = dynamic(() => import("@/app/job-search/page"), {
  ssr: false,
});

export default function GetMeInterviewPage() {
    const [previousPage, setPreviousPage] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useLayoutEffect(() => {
        setIsMounted(true);
        
        const savedPreviousPage = sessionStorage.getItem('previousPageBeforeGetMeInterview');
        if (savedPreviousPage) {
            setPreviousPage(savedPreviousPage);
        }
        
        const savedScrollY = sessionStorage.getItem('preserveScrollPosition');
        if (savedScrollY) {
            const scrollY = parseInt(savedScrollY, 10);
            
            window.scrollTo({ top: scrollY, behavior: 'instant' });
            
            const restoreScroll = () => {
                window.scrollTo({ top: scrollY, behavior: 'instant' });
            };
            
            requestAnimationFrame(() => {
                restoreScroll();
                requestAnimationFrame(() => {
                    restoreScroll();
                    setTimeout(() => {
                        restoreScroll();
                        sessionStorage.removeItem('preserveScrollPosition');
                    }, 100);
                });
            });
        }
    }, []);

    if (!isMounted) {
        return <HomePage />;
    }

    if (previousPage === '/AI-copilot' ||
        previousPage === '/en-ca/AI-copilot') {
        return (
            <>
                <Navbar />
                <AICopilot />
                <Footer />
            </>
        );
    }

    if (previousPage === '/about-us' || previousPage === '/en-ca/about-us') {
        return (
            <>
                <Navbar />
                <AboutUs />
                <Footer />
            </>
        );
    }

    if (previousPage === '/features' || previousPage === '/feature' || 
        previousPage === '/en-ca/features' || previousPage === '/en-ca/feature') {
        return (
            <>
                <Navbar />
                <Features />
                <Footer />
            </>
        );
    }

    if (previousPage === '/features/resume-optimizer' ||
        previousPage === '/en-ca/features/resume-optimizer' ||
        previousPage === '/features/ats-optimizer' ||
        previousPage === '/en-ca/features/ats-optimizer' ||
        previousPage === '/ats-optimized-resume-checker' || 
        previousPage === '/en-ca/ats-optimized-resume-checker') {
        return <ATSPage />;
    }

    if (previousPage === '/features/job-automation' ||
        previousPage === '/en-ca/features/job-automation' ||
        previousPage === '/job-application-automation' || 
        previousPage === '/en-ca/job-application-automation') {
        return <JobAutomationPage />;
    }

    if (previousPage === '/features/linkedin-profile-optimization' ||
        previousPage === '/en-ca/features/linkedin-profile-optimization' ||
        previousPage === '/linkedin-profile-optimization-services' || 
        previousPage === '/en-ca/linkedin-profile-optimization-services' ||
        previousPage === '/features/linkedin-profile-optimization-services' ||
        previousPage === '/en-ca/features/linkedin-profile-optimization-services') {
        return <LinkedInPage />;
    }

    if (previousPage === '/features/job-tracker' ||
        previousPage === '/en-ca/features/job-tracker') {
        return <JobTrackerPage />;
    }

    if (previousPage === '/features/precision-targeting' ||
        previousPage === '/en-ca/features/precision-targeting') {
        return <PrecisionTargetingPage />;
    }

    if (previousPage === '/features/dashboard-analytics' ||
        previousPage === '/en-ca/features/dashboard-analytics') {
        return <DashboardAnalyticsPage />;
    }

    if (previousPage === '/features/cover-letter' ||
        previousPage === '/en-ca/features/cover-letter') {
        return <CoverLetterPage />;
    }

    if (previousPage === '/job-search' ||
        previousPage === '/en-ca/job-search') {
        return <JobSearchPage />;
    }

    if (previousPage === '/contact-us' ||
        previousPage === '/en-ca/contact-us') {
        return (
            <>
                <Navbar />
                <ContactUsClient />
                <Footer />
            </>
        );
    }

    if (previousPage === '/career-advisor' ||
        previousPage === '/en-ca/career-advisor') {
        return (
            <>
                <Navbar />
                <CareerAdvisor />
                <Footer />
            </>
        );
    }

    if (previousPage === '/interview-buddy' ||
        previousPage === '/en-ca/interview-buddy') {
        return (
            <>
                <Navbar />
                <InterviewBuddy />
                <Footer />
            </>
        );
    }

    return <HomePage />;
}
