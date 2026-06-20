"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { captureUTMParams } from "@/src/utils/UTMUtils";
import GeoBlockModal from "@/src/components/modals/GeoBlockModal";
import GeoBypassSuccessModal from "@/src/components/modals/GeoBypassSuccessModal";
import SignupModal from "@/src/components/signupModal/SignupModal";
import CalendlyModal from "@/src/components/calendlyModal/CalendlyModal";
import { loadFormData } from "@/src/utils/LocalStorageUtils";
import StrategyCallCard from "@/src/components/schedule-call/StrategyCallCard";
import MeetingBookedModal from "@/src/components/meetingBooked/MeetingBookedModal";
import * as fbq from "@/lib/metaPixel";
import * as linkedin from "@/lib/linkedinInsightTag";
import { warmCalendly } from "@/src/utils/calendlyWarmup";

function ClientLogicWrapperContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [showGeoBlockModal, setShowGeoBlockModal] = useState(false);
    const [isFromIndia, setIsFromIndia] = useState(false);
    const [geoLoading, setGeoLoading] = useState(true);

    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showCalendlyModal, setShowCalendlyModal] = useState(false);
    const [showStrategyCallCard, setShowStrategyCallCard] = useState(false);
    const [showMeetingBookedModal, setShowMeetingBookedModal] = useState(false);

    useEffect(() => {
        if (typeof document === "undefined") return;
        const locked = showStrategyCallCard || showCalendlyModal;
        if (locked) {
            const scrollY = window.scrollY;
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";
        } else {
            const top = document.body.style.top;
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            if (top) {
                window.scrollTo(0, -parseInt(top));
            }
        }
        return () => {
            const top = document.body.style.top;
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            if (top) {
                window.scrollTo(0, -parseInt(top));
            }
        };
    }, [showStrategyCallCard, showCalendlyModal]);

    // Track button clicks to force show modal
    const [forceShowModal, setForceShowModal] = useState(false);
    const [forceShowCalendlyModal, setForceShowCalendlyModal] = useState(false);
    
    // Track geo-block bypass state
    const [geoBypassActive, setGeoBypassActive] = useState(false);
    const [showBypassSuccessModal, setShowBypassSuccessModal] = useState(false);
    
    // Track which route visit we're on and if modals have been dismissed
    const lastRouteWithModalRef = useRef<string | null>(null);
    const modalDismissedForRouteRef = useRef<string | null>(null);
    const pathnameRef = useRef<string>(pathname);

    // Capture UTM params on mount and when searchParams change
    useEffect(() => {
        captureUTMParams();
    }, [searchParams]);

    // Warm Calendly once so first booking click opens instantly.
    useEffect(() => {
        warmCalendly();
    }, []);

    // Update pathname ref when pathname changes
    useEffect(() => {
        pathnameRef.current = pathname;
    }, [pathname]);

    // Track Meta Pixel PageView on route changes
    useEffect(() => {
        fbq.pageview();
    }, [pathname, searchParams]);

    // Track LinkedIn Insight Tag PageView on route changes
    useEffect(() => {
        linkedin.pageview();
    }, [pathname, searchParams]);

    // Listen for button click events from anywhere in the app
    useEffect(() => {
        const handleButtonClick = () => {
            
            setForceShowModal(true);
            // Reset dismissed state so modal can show
            modalDismissedForRouteRef.current = null;
        };

        // Listen for geo-block bypass event (triggered by click-and-hold)
        const handleGeoBypass = () => {
            setGeoBypassActive(true);
            setShowGeoBlockModal(false);
            setShowBypassSuccessModal(true);
            
            // If on /book-now route, also trigger Calendly modal after bypass
            if (pathnameRef.current === '/book-now') {
                setForceShowCalendlyModal(true);
                modalDismissedForRouteRef.current = null;
            }
        };

        // Listen for bypass success modal show event
        const handleShowBypassSuccess = () => {
            setShowBypassSuccessModal(true);
        };

        // Listen for Calendly modal event
        const handleCalendlyModal = () => {
            setForceShowCalendlyModal(true);
            modalDismissedForRouteRef.current = null;
        };

        const handleStrategyCallCard = () => {
            // Skip StrategyCallCard pop-up and go directly to Calendly modal
            // The useEffect will handle geo-blocking logic
            setForceShowCalendlyModal(true);
            setShowStrategyCallCard(false);
        };

        // Listen for custom events
        window.addEventListener('showGetMeInterviewModal', handleButtonClick);
        window.addEventListener('showCalendlyModal', handleCalendlyModal);
        window.addEventListener('bypassGeoBlock', handleGeoBypass);
        window.addEventListener('showGeoBypassSuccess', handleShowBypassSuccess);
        window.addEventListener('showStrategyCallCard', handleStrategyCallCard);
        
        return () => {
            window.removeEventListener('showGetMeInterviewModal', handleButtonClick);
            window.removeEventListener('showCalendlyModal', handleCalendlyModal);
            window.removeEventListener('bypassGeoBlock', handleGeoBypass);
            window.removeEventListener('showGeoBypassSuccess', handleShowBypassSuccess);
            window.removeEventListener('showStrategyCallCard', handleStrategyCallCard);
        };
    }, [geoLoading, isFromIndia, geoBypassActive]);

    // Detect User Country (Client-side fallback logic)
    useEffect(() => {
        const detectCountry = () => {
            try {
                setGeoLoading(true);
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const language = navigator.language || navigator.languages?.[0];

                let isIndiaDetected = false;

                // Check timezone
                if (timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Calcutta')) {
                    isIndiaDetected = true;
                }

                // Check language
                if (language.startsWith('hi') || language.startsWith('bn') || language.startsWith('te') ||
                    language.startsWith('ta') || language.startsWith('gu') || language.startsWith('kn') ||
                    language.startsWith('ml') || language.startsWith('pa') || language.startsWith('or')) {
                    isIndiaDetected = true;
                }

                // Check for test param
                const params = new URLSearchParams(window.location.search);
                if (params.get('test_india') === 'true') {
                    isIndiaDetected = true;
                }

                setIsFromIndia(isIndiaDetected);
            } catch (error) {
                console.error("Geo detection failed:", error);
            } finally {
                setGeoLoading(false);
            }
        };

        detectCountry();
    }, []);

    // Handle Route-based Modals & Geo-Blocking
    useEffect(() => {
        // Check if forceShowCalendlyModal is true FIRST (button clicked from any page) - show modal without navigation
        // This allows modal to show on features/pricing/how-it-works pages while keeping that page visible
        if (forceShowCalendlyModal) {
            if (geoLoading) {
                return;
            }
            setForceShowCalendlyModal(false);
            modalDismissedForRouteRef.current = null;

            if (isFromIndia && !geoBypassActive) {
                setShowGeoBlockModal(true);
                setShowCalendlyModal(false);
                setShowSignupModal(false);
            } else {
                setShowCalendlyModal(true);
                setShowSignupModal(false);
                setShowGeoBlockModal(false);
            }

            return;
        }

        // Check if forceShowModal is true (button clicked from any page) - show modal without navigation
        // This allows modal to show on testimonials page while keeping that page visible
        if (forceShowModal) {
            if (geoLoading) {
                return;
            }
            setForceShowModal(false);
            modalDismissedForRouteRef.current = null;

            if (isFromIndia && !geoBypassActive) {
                setShowGeoBlockModal(true);
                setShowCalendlyModal(false);
                setShowSignupModal(false);
            } else {
                loadFormData();
                setShowCalendlyModal(true);
                setShowSignupModal(false);
                setShowGeoBlockModal(false);
            }

            return;
        }

        // Don't do anything else while loading geo info
        if (geoLoading) {
            return;
        }

        const isGetMeInterview = pathname === '/get-me-interview';
        const isScheduleCareerCall = pathname === '/schedule-a-free-career-call';
        const isBookMyDemoCall = pathname === '/book-my-demo-call';
        const isBookNow = pathname === '/book-now';
        const isSignup = pathname === '/signup' || pathname.includes('/signup');
        const isBookDemo = pathname === '/book-free-demo' || pathname.includes('/book-free-demo');
        const isMeetingBooked = pathname === '/meeting-booked' || pathname === '/en-ca/meeting-booked';

        // Create a unique identifier for this route visit (includes query params)
        const currentRouteKey = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

        // Handle /book-now route - show Calendly modal with geo-blocking
        if (isBookNow) {
            
            if (forceShowCalendlyModal) {
                setForceShowCalendlyModal(false);
                modalDismissedForRouteRef.current = null;
                
                // Check if user is from India - show geo-block modal instead
                if (isFromIndia && !geoBypassActive) {
                    setShowGeoBlockModal(true);
                    setShowCalendlyModal(false);
                } else {
                    lastRouteWithModalRef.current = currentRouteKey;
                    setShowCalendlyModal(true);
                }
                return;
            }
            
            if (lastRouteWithModalRef.current !== currentRouteKey) {
                modalDismissedForRouteRef.current = null;
                lastRouteWithModalRef.current = currentRouteKey;
            }
            
            const wasDismissed = modalDismissedForRouteRef.current === currentRouteKey;
            
            // Show modal if it hasn't been dismissed (works for both direct visits and button clicks)
            // This allows the modal to open when visiting /book-now directly from email links
            if (!wasDismissed) {
                // Check if user is from India - show geo-block modal instead
                if (isFromIndia && !geoBypassActive) {
                    setShowGeoBlockModal(true);
                    setShowCalendlyModal(false);
                } else {
                    setShowCalendlyModal(true);
                }
            }
            return;
        }

        // Show meeting-booked modal on its dedicated route
        if (isMeetingBooked) {
            setShowMeetingBookedModal(true);
        } else {
            setShowMeetingBookedModal(false);
        }

        // Logic for restricted actions (Signup / Booking)
        if (isGetMeInterview || isScheduleCareerCall || isBookMyDemoCall || isSignup || isBookDemo) {
            // If forceShowModal is true (button was clicked), always show modal
            if (forceShowModal) {
                setForceShowModal(false);
                modalDismissedForRouteRef.current = null;

                if (isFromIndia && !geoBypassActive) {
                    setShowGeoBlockModal(true);
                    setShowSignupModal(false);
                } else {
                    if (isGetMeInterview || isScheduleCareerCall || isBookMyDemoCall || isSignup) {
                        loadFormData();
                        setShowCalendlyModal(true);
                        setShowSignupModal(false);
                    }
                }

                return;
            }
            
            // For /get-me-interview, /schedule-a-free-career-call, and /book-my-demo-call routes: only show modal automatically if URL has query params
            // This prevents modal from showing on refresh when URL is clean (no query params)
            if ((isGetMeInterview || isScheduleCareerCall || isBookMyDemoCall) && !searchParams.toString()) {
                return;
            }
            
            // If navigating to a new route visit (different from last), reset dismissed state
            // This handles the case where user clicks button again after navigating away
            if (lastRouteWithModalRef.current !== currentRouteKey) {
                modalDismissedForRouteRef.current = null;
                lastRouteWithModalRef.current = currentRouteKey;
            }

            // Check if modal was already dismissed for this route visit
            const wasDismissed = modalDismissedForRouteRef.current === currentRouteKey;

            // Only show modal if it hasn't been dismissed for this route visit
            if (!wasDismissed) {
                if (isFromIndia && !geoBypassActive) {
                    setShowGeoBlockModal(true);
                    setShowSignupModal(false);
                } else {
                    // If not from India, show the appropriate modal for the route
                    if (isGetMeInterview || isScheduleCareerCall || isBookMyDemoCall || isSignup) {
                        loadFormData();
                        setShowCalendlyModal(true);
                        setShowSignupModal(false);
                    }
                    // Note: Booking modal logic could be added here if needed
                }
            }
        } else {
            // Don't close modals when on other routes - modals can be opened from any page via button click
            // Only reset dismissed state if modals aren't showing (they'll close themselves when user clicks close)
            // This allows modals to stay open when opened from non-modal routes like /image-testimonials
            if (!showGeoBlockModal && !showCalendlyModal && !showSignupModal) {
                modalDismissedForRouteRef.current = null;
                lastRouteWithModalRef.current = null;
            }
        }
    }, [pathname, searchParams, isFromIndia, geoLoading, geoBypassActive, forceShowModal, forceShowCalendlyModal]);

    // Handle modal close - mark as dismissed for current route and clean URL
    const handleGeoBlockModalClose = () => {
        const currentRouteKey = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        modalDismissedForRouteRef.current = currentRouteKey;
        setShowGeoBlockModal(false);
        
        // Clean URL by removing query params when on /get-me-interview, /schedule-a-free-career-call, or /book-my-demo-call
        if ((pathname === '/get-me-interview' || pathname === '/schedule-a-free-career-call' || pathname === '/book-my-demo-call') && searchParams.toString()) {
            router.replace(pathname);
        }
    };

    const handleCalendlyModalClose = () => {
        const currentRouteKey = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        modalDismissedForRouteRef.current = currentRouteKey;
        setShowCalendlyModal(false);
        
        // If we came from a specific page (features, pricing, etc.), navigate back to it
        if (typeof window !== "undefined" && (pathname === '/book-now' || pathname === '/en-ca/book-now')) {
            const previousPage = sessionStorage.getItem('previousPageBeforeBookNow');
            if (previousPage) {
                // Clear the stored previous page
                sessionStorage.removeItem('previousPageBeforeBookNow');
                
                // Navigate back to the previous page
                router.push(previousPage);
                return;
            }
        }
        
        // Clean URL by removing query params when on /book-now
        if ((pathname === '/book-now' || pathname === '/en-ca/book-now') && searchParams.toString()) {
            router.replace(pathname);
        }
    };

    const handleSignupModalClose = () => {
        const currentRouteKey = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        modalDismissedForRouteRef.current = currentRouteKey;
        setShowSignupModal(false);
        
        // Clean URL by removing query params when on /get-me-interview, /schedule-a-free-career-call, or /book-my-demo-call
        if ((pathname === '/get-me-interview' || pathname === '/schedule-a-free-career-call' || pathname === '/book-my-demo-call') && searchParams.toString()) {
            router.replace(pathname);
        }
    };


    return (
        <>
            {children}
            <GeoBlockModal
                isVisible={showGeoBlockModal}
                onClose={handleGeoBlockModalClose}
                onProvideAnyway={handleGeoBlockModalClose}
            />
            <GeoBypassSuccessModal
                isVisible={showBypassSuccessModal}
                onClose={() => setShowBypassSuccessModal(false)}
            />
            <SignupModal
                isOpen={showSignupModal}
                onClose={handleSignupModalClose}
            />
            <CalendlyModal
                isVisible={showCalendlyModal}
                onClose={handleCalendlyModalClose}
                user={(() => {
                    // Load user data from localStorage if available
                    if (typeof window !== "undefined") {
                        const savedFormData = loadFormData();
                        return {
                            fullName: savedFormData.fullName || "",
                            email: savedFormData.email || "",
                            phone: savedFormData.phone || "",
                            countryCode: savedFormData.countryCode || "",
                        };
                    }
                    return {
                        fullName: "",
                        email: "",
                        phone: "",
                        countryCode: "",
                    };
                })()}
            />
            {showStrategyCallCard && (
                <div
                    className="fixed inset-0 z-[9980] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 py-8"
                    onClick={() => setShowStrategyCallCard(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <StrategyCallCard onClose={() => setShowStrategyCallCard(false)} />
                    </div>
                </div>
            )}
            {showMeetingBookedModal && (
                <MeetingBookedModal onClose={() => setShowMeetingBookedModal(false)} />
            )}
        </>
    );
}

export default function ClientLogicWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={<>{children}</>}>
            <ClientLogicWrapperContent>{children}</ClientLogicWrapperContent>
        </Suspense>
    );
}
