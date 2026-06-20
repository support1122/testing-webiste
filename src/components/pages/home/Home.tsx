"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/src/components/footer/footer";
import HeroSection from "@/src/components/heroSection/heroSection";
import HomePageCareerCTA from "@/src/components/homePageCareerCTA/homePageCareerCTA";
import HomePageDemoCTA from "@/src/components/homePageDemoCTA/homePageDemoCTA";
import HomePageFAQ from "@/src/components/homePageFAQ/homePageFAQ";
import HomePageFoundersNote from "@/src/components/homePageFoundersNote/homePageFoundersNote";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import HomePageMilestones from "@/src/components/homePageMilestones/homePageMilestones";
import HomePageOfferLetters from "@/src/components/homePageOfferLetters/homePageOfferLetters";
import HomePagePTNote from "@/src/components/homePagePTNote/homePagePTNote";
import HomePageResultStats from "@/src/components/homePageResultStats/homePageResultStats";
import HomePageStatsCards from "@/src/components/homePageStatsCards/homePageStatsCards";
import HomePageSteps from "@/src/components/homePageSteps/homePageSteps";
import HomePageJobMatchingSection from "@/src/components/homePageJobMatchingSection/homePageJobMatchingSection";
import HomePageVideo from "@/src/components/homePageVideo/homePageVideo";
import HomePageWhyChooseFF from "@/src/components/homePageWhyChooseFF/homePageWhyChooseFF";
import Navbar from "@/src/components/navbar/navbar";
import SalesPopUp from "@/src/components/SalesPopUp";
import HomePageBeforeAfter from "../../homePageBeforeAfter/homePageBeforeAfter";

const Home = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top when navigating to homepage (handles back button and direct navigation)
    const isHomePage = pathname === "/" || pathname === "/en-ca";
    
    if (isHomePage) {
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
  }, [pathname]);

  return (
    <>
      <Navbar />
      <HeroSection />
      <HomePageStatsCards />
      <HomePageSteps /> {/* using useState, so client */}
      <HomePageJobMatchingSection />
      <HomePageCareerCTA />
      <HomePageBeforeAfter />
      <HomePageResultStats />
     
      <HomePageOfferLetters
        heading="60+ Offer letters received"
        enableLoopControls
        buttonOnlyScroll
      />
     
      <HomePageMilestones /> 
      <HomePageVideo />
      
     
     
      <HomePageWhyChooseFF /> 
      <HomePageHappyUsers />
      <HomePageFoundersNote variant="pricing" />

      {/* using useState, so client */}
     
       {/* using useState, so client */}
      {/* AJ section not so good */}
      
      <HomePagePTNote /> {/* PT section not so good */}
     
      <HomePageFAQ />
      <HomePageDemoCTA />
      <Footer />
      
      {/* <SalesPopUp /> */}
    </>
  );
};

export default Home;
