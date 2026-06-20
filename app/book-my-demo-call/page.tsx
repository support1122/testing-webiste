"use client";

import { useEffect, useState, useLayoutEffect } from "react";
import { Metadata } from "next";
import HomePage from "@/src/components/pages/home/Home";
import AboutUs from "@/src/components/pages/aboutUs/AboutUs";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";


export default function BookMyDemoCallPage() {
    const [previousPage, setPreviousPage] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useLayoutEffect(() => {
        setIsMounted(true);
        
        const savedPreviousPage = sessionStorage.getItem('previousPageBeforeBookMyDemoCall');
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

    if (previousPage === '/about-us' || previousPage === '/en-ca/about-us') {
        return (
            <>
                <Navbar />
                <AboutUs />
                <Footer />
            </>
        );
    }

    return <HomePage />;
}

