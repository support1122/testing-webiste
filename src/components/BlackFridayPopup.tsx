"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function BlackFridayPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isImageTestimonialsPage = pathname === "/testimonials" || pathname === "/en-ca/testimonials" || pathname === "/image-testimonials" || pathname === "/en-ca/image-testimonials";

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    // Don't show on image testimonials page
    if (isImageTestimonialsPage) {
      return;
    }
    
    setMounted(true);
    
    // Check for test mode (URL parameter ?showPopup=true)
    const urlParams = new URLSearchParams(window.location.search);
    const forceShow = urlParams.get("showPopup") === "true";
    
    if (forceShow) {
      // Force show immediately for testing
      setIsVisible(true);
      return;
    }

    // Show popup after 5 seconds on every page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isImageTestimonialsPage]);

  const handleClose = () => {
    setIsVisible(false);
  };

  // Don't render on image testimonials page
  if (isImageTestimonialsPage) {
    return null;
  }

  // Don't render until mounted (client-side only)
  if (!mounted) {
    return null;
  }

  // Don't render if not visible
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={handleClose}
    >
      <div 
        className="relative max-w-2xl md:max-w-3xl lg:max-w-4xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Container */}
        <div className="relative w-full h-auto rounded-lg overflow-hidden shadow-2xl">
          <Image
            src="/images/spacial offer.png"
            alt="Black Friday Special Offer"
            width={800}
            height={1000}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
          
          {/* Close Button - Top Right Corner of Image */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 md:top-4 md:right-4 text-black hover:opacity-80 transition-opacity cursor-pointer z-10 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base"
            style={{
              fontFamily: 'var(--font-space-grotesk), "Space Grotesk", sans-serif',
            }}
            aria-label="Close"
          >
            × Close
          </button>
        </div>
      </div>
    </div>
  );
}

