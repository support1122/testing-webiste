"use client";

import { useEffect } from "react";
import HomePage from "@/src/components/pages/home/Home";

export default function ScheduleCareerCallPage() {
    useEffect(() => {
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

    return <HomePage />;
}

