"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import HomePagePricingPlans from "@/src/components/homePagePricingPlans/homePagePricingPlans";
import HomePageOfferLetters from "@/src/components/homePageOfferLetters/homePageOfferLetters";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import HomePageFoundersNote from "@/src/components/homePageFoundersNote/homePageFoundersNote";
import HomePageFAQ from "@/src/components/homePageFAQ/homePageFAQ";

export default function PricingPageClient() {
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    // Only scroll to top on initial mount (when navigating TO pricing page from another page)
    // Re-clicks are handled by navbar which prevents navigation
    if (!hasScrolledRef.current) {
      hasScrolledRef.current = true;
      
      // Scroll to top when navigating to pricing page
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        
        // Also scroll after a short delay to catch any late scrolls from browser restoration
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "instant" });
        }, 50);
        
        // One more check after layout
        requestAnimationFrame(() => {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
          }, 100);
        });
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <HomePagePricingPlans />
      <HomePageOfferLetters
        heading="60+ Offer letters received"
        enableLoopControls
        buttonOnlyScroll
      />
      <div className="mt-[55px] md:mt-[70px]">
        <HomePageHappyUsers variant="pricing" />
      </div>
      <HomePageHappyUsers variant="pricingVideos" />
      <HomePageFoundersNote variant="pricing" />
      <HomePageFAQ />
      <Footer />
    </>
  );
}
