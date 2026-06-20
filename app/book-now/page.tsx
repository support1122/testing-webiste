"use client";

import { useLayoutEffect, useState } from "react";
import HomePage from "@/src/components/pages/home/Home";
import Features from "@/src/components/pages/features/Features";
import HowItWorks from "@/src/components/pages/howItWorks/HowItWorks";
import PricingPageClient from "../pricing/PricingPageClient";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";

export default function BookNowPage() {
    // Start with null to match server render, then update on client
    const [previousPage, setPreviousPage] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    // Use useLayoutEffect to run synchronously before browser paint (no visible flash)
    useLayoutEffect(() => {
        // Mark as mounted (client-side only)
        setIsMounted(true);
        
        // Read previous page from sessionStorage immediately
        const savedPreviousPage = sessionStorage.getItem('previousPageBeforeBookNow');
        if (savedPreviousPage) {
            setPreviousPage(savedPreviousPage);
        }
        
        // Immediately prevent scroll to top
        const savedScrollY = sessionStorage.getItem('preserveScrollPosition');
        if (savedScrollY) {
            const scrollY = parseInt(savedScrollY, 10);
            
            // Prevent scroll immediately
            window.scrollTo({ top: scrollY, behavior: 'instant' });
            
            // Also restore after a short delay to catch any late scrolls
            const restoreScroll = () => {
                window.scrollTo({ top: scrollY, behavior: 'instant' });
            };
            
            // Try multiple times to ensure it sticks
            requestAnimationFrame(() => {
                restoreScroll();
                requestAnimationFrame(() => {
                    restoreScroll();
                    setTimeout(() => {
                        restoreScroll();
                        // Clear the saved position after restoring
                        sessionStorage.removeItem('preserveScrollPosition');
                    }, 100);
                });
            });
        }
    }, []);

    // During SSR and initial client render, show HomePage to avoid hydration mismatch
    // After mount, check for previous page and render accordingly
    if (!isMounted) {
        return <HomePage />;
    }

    // Render based on previous page (client-side only after mount)
    if (previousPage === '/features' || previousPage === '/en-ca/features') {
        return (
            <div className="bg-white text-black min-h-screen">
                <Navbar />
                <main className="mt-0">
                    <Features />
                </main>
                <Footer />
            </div>
        );
    }
    
    if (previousPage === '/how-it-works' || previousPage === '/en-ca/how-it-works') {
        return <HowItWorks />;
    }
    
    if (previousPage === '/pricing' || previousPage === '/en-ca/pricing') {
        return <PricingPageClient />;
    }
    
    if (previousPage === '/feature' || previousPage === '/en-ca/feature') {
        return <HomePage />;
    }

    // Default: show HomePage
    return <HomePage />;
}
