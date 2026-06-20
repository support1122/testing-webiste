"use client";

import { useEffect, useMemo, useState } from "react";
import { us_cities, first_names, actions, products } from "../utils/PopupNotifications";

const API_KEY = "pk.9d0f80f1c9d0d19a47fe25a8d51c5f49";

export default function SalesPopup({
  isBookingFlow = false,
  isAnyModalOpen = false,
}: {
  isBookingFlow?: boolean;
  isAnyModalOpen?: boolean;
}) {
  const generateNotification = () => {
    const [city, , lat, lng] = us_cities[Math.floor(Math.random() * us_cities.length)];
    const name = first_names[Math.floor(Math.random() * first_names.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const time = `about ${Math.floor(Math.random() * 59) + 1} minutes ago`;

    const mapImg = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${lat},${lng}&zoom=12&size=300x200&format=png&maptype=streets&markers=icon:small-red-cutout|${lat},${lng}`;

    return { name, location: `${city}, USA`, action, product, time, mapImg };
  };

  const [visibleSales, setVisibleSales] = useState(false);
  const [visibleOptimizer, setVisibleOptimizer] = useState(false);
  const [visibleVisitors, setVisibleVisitors] = useState(false);
  const [current, setCurrent] = useState<{ name: string; location: string; action: string; product: string; time: string; mapImg: string } | null>(null);
  const [visitors, setVisitors] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalDetected, setIsModalDetected] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        // Check if width is less than 1024px (tablet and mobile)
        // This ensures we catch modals on smaller screens where they're more intrusive
        const width = window.innerWidth;
        setIsMobile(width < 1024);
      }
    };

    // Check immediately
    checkMobile();
    
    // Also check on resize
    window.addEventListener("resize", checkMobile);
    
    // Check on orientation change (for mobile devices)
    window.addEventListener("orientationchange", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("orientationchange", checkMobile);
    };
  }, []);

  // Detect if any modal is open by checking DOM
  useEffect(() => {
    const checkModalOpen = () => {
      if (typeof window === "undefined") {
        setIsModalDetected(false);
        return;
      }

      // Only check for modals if on mobile
      if (!isMobile) {
        setIsModalDetected(false);
        return;
      }

      let modalFound = false;

      // Method 1: Check for Calendly iframe (most reliable indicator)
      const calendlyIframe = document.querySelector('iframe[src*="calendly"]');
      if (calendlyIframe) {
        const iframeStyle = window.getComputedStyle(calendlyIframe);
        const iframeParent = calendlyIframe.closest('div');
        
        // Walk up the DOM tree to find the modal container
        let parent = calendlyIframe.parentElement;
        while (parent && parent !== document.body) {
          const parentStyle = window.getComputedStyle(parent);
          const parentZIndex = parseInt(parentStyle.zIndex || "0", 10);
          const parentDisplay = parentStyle.display;
          const parentPosition = parentStyle.position;
          
          // Check if this is the modal container (fixed position, high z-index)
          if (
            parentPosition === "fixed" &&
            parentZIndex >= 50 &&
            parentDisplay !== "none" &&
            iframeStyle.display !== "none" &&
            iframeStyle.visibility !== "hidden"
          ) {
            modalFound = true;
            break;
          }
          parent = parent.parentElement;
        }
      }

      // Method 2: Check for modal backdrop with high z-index and dark background
      const allDivs = document.querySelectorAll("div");
      for (const el of allDivs) {
        const computedStyle = window.getComputedStyle(el);
        const position = computedStyle.position;
        const zIndex = parseInt(computedStyle.zIndex || "0", 10);
        const display = computedStyle.display;
        const visibility = computedStyle.visibility;
        const opacity = parseFloat(computedStyle.opacity || "1");
        const top = computedStyle.top;
        const left = computedStyle.left;
        const right = computedStyle.right;
        const bottom = computedStyle.bottom;
        const bgColor = computedStyle.backgroundColor;

        // Check if it's a modal backdrop:
        // - position: fixed
        // - covers full screen
        // - high z-index (>= 50)
        // - visible
        // - has dark/semi-transparent background
        const isFullScreen =
          (top === "0px" || top === "0") &&
          (left === "0px" || left === "0") &&
          (right === "0px" || right === "0") &&
          (bottom === "0px" || bottom === "0");

        if (
          position === "fixed" &&
          isFullScreen &&
          zIndex >= 50 &&
          display !== "none" &&
          display !== "hidden" &&
          visibility !== "hidden" &&
          opacity > 0 &&
          (bgColor.includes("rgba(0, 0, 0") ||
            bgColor.includes("rgb(0, 0, 0") ||
            bgColor.includes("rgba(0,0,0") ||
            bgColor.includes("black"))
        ) {
          modalFound = true;
          break; // Found a modal, no need to continue
        }
      }

      // Method 3: Check for Calendly widget container (fc_frame) - high z-index indicates modal is open
      const calendlyWidget = document.querySelector('#fc_frame');
      if (calendlyWidget) {
        const widgetStyle = window.getComputedStyle(calendlyWidget);
        const widgetZIndex = parseInt(widgetStyle.zIndex || "0", 10);
        // Calendly widget has very high z-index when modal is open (21474836)
        if (widgetZIndex > 1000 && widgetStyle.display !== "none") {
          modalFound = true;
        }
      }

      // Method 4: Check for modal container with Calendly content - look for elements containing "calendly" in class/id
      const calendlyContainers = document.querySelectorAll('[class*="calendly"], [id*="calendly"]');
      for (const container of calendlyContainers) {
        const style = window.getComputedStyle(container);
        const zIndex = parseInt(style.zIndex || "0", 10);
        if (zIndex >= 50 && style.display !== "none" && style.visibility !== "hidden") {
          // Check if it's actually visible on screen (has dimensions)
          const rect = container.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            modalFound = true;
            break;
          }
        }
      }

      setIsModalDetected(modalFound);
    };

    // Check immediately and set up interval to check periodically
    checkModalOpen();
    const interval = setInterval(checkModalOpen, 200); // Check every 200ms for better responsiveness

    return () => clearInterval(interval);
  }, [isMobile]);

  // Suppress popup if: booking flow, any modal open, OR (mobile AND modal detected)
  const isSuppressed = useMemo(
    () => isBookingFlow || isAnyModalOpen || (isMobile && isModalDetected),
    [isBookingFlow, isAnyModalOpen, isMobile, isModalDetected]
  );

  // Initialize random data only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    setCurrent(generateNotification());
    setVisitors(300 + Math.floor(Math.random() * 300));
  }, []);

  useEffect(() => {
    if (isSuppressed) {
      // Immediately hide all popups when suppressed
      setVisibleSales(false);
      setVisibleOptimizer(false);
      setVisibleVisitors(false);
    }
  }, [isSuppressed]);

  useEffect(() => {
    // Don't start sequence if suppressed
    if (isSuppressed) {
      return;
    }

    let salesTimeout: NodeJS.Timeout;
    let optimizerTimeout: NodeJS.Timeout;
    let visitorsTimeout: NodeJS.Timeout;
    let optimizerHideTimeout: NodeJS.Timeout;
    let visitorsHideTimeout: NodeJS.Timeout;

    const showSequence = () => {
      // Check suppression before showing anything
      if (isSuppressed) {
        return;
      }

      setCurrent(generateNotification());
      setVisibleSales(true);
      salesTimeout = setTimeout(() => {
        if (!isSuppressed) setVisibleSales(false);
      }, 3000);

      optimizerTimeout = setTimeout(() => {
        if (!isBookingFlow && !isSuppressed) {
          setVisibleOptimizer(true);
          optimizerHideTimeout = setTimeout(() => {
            if (!isSuppressed) setVisibleOptimizer(false);
          }, 3000);
        }
      }, 11000);

      visitorsTimeout = setTimeout(() => {
        if (!isBookingFlow && !isSuppressed) {
          setVisitors(100 + Math.floor(Math.random() * 151));
          setVisibleVisitors(true);
          visitorsHideTimeout = setTimeout(() => {
            if (!isSuppressed) setVisibleVisitors(false);
          }, 3000);
        }
      }, 22000);
    };

    showSequence();
    const interval = setInterval(showSequence, 33000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(salesTimeout);
      clearTimeout(optimizerTimeout);
      clearTimeout(visitorsTimeout);
      clearTimeout(optimizerHideTimeout);
      clearTimeout(visitorsHideTimeout);
    };
  }, [isSuppressed, isBookingFlow]);

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted || !current || visitors === null) {
    return null;
  }

  return (
    <>
      {/* SALES POPUP */}
      <div
        className={`fixed bottom-6 left-6 bg-white shadow-lg border border-gray-200 rounded-lg p-3 w-80 flex items-center gap-3 transition-all duration-500 ${
          visibleSales ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 9999 }}
      >
        <img
          src={current.mapImg}
          alt="Location"
          className="w-14 h-14 rounded-md object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/56?text=Map";
          }}
        />
        <div className="flex flex-col text-sm">
          <span className="font-medium text-black">
            {current.name || "Someone"} from {current.location || "USA"}
          </span>
          <span className="text-gray-700">
            {current.action || "just bought"}{" "}
            <span className="text-gray-500 font-semibold">{current.product || "Flashfire's Plan"}</span>
          </span>
          <span className="text-gray-500 text-xs">{current.time || "recently"}</span>
        </div>
      </div>

      {/* AI OPTIMIZER POPUP – WITH Lightbulb EMOJI */}
      <div
        className={`fixed bottom-6 left-6 bg-white shadow-lg border border-gray-200 rounded-lg p-4 w-80 flex items-center gap-3 transition-all duration-500 ${
          visibleOptimizer ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 9998 }}
      >
        <div className="bg-yellow-100 text-yellow-600 rounded-full p-2 text-xl">
         💡
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-medium text-gray-800">Try our AI Optimizer</span>
          <span className="text-gray-500">Boost your resume instantly — it's free!</span>
        </div>
      </div>

      {/* VISITORS POPUP */}
      <div
        className={`fixed bottom-6 left-6 bg-white shadow-lg border border-gray-200 rounded-lg p-4 w-80 flex items-center gap-3 transition-all duration-500 ${
          visibleVisitors ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 9997 }}
      >
        <div className="rounded-full p-2 bg-green-100">
          <img src="/images/profile.png" alt="visitor" className="w-6 h-6 rounded-full object-cover" />
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-medium text-gray-800">{visitors} users online</span>
          <span className="text-gray-500">exploring FlashFireJobs right now</span>
        </div>
      </div>
    </>
  );
}



