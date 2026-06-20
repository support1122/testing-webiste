import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import HomePagePricingPlans from "@/src/components/homePagePricingPlans/homePagePricingPlans";
import HomePageOfferLetters from "@/src/components/homePageOfferLetters/homePageOfferLetters";
import HomePageHappyUsers from "@/src/components/homePageHappyUsers/homePageHappyUsers";
import HomePageFoundersNote from "@/src/components/homePageFoundersNote/homePageFoundersNote";
import HomePageFAQ from "@/src/components/homePageFAQ/homePageFAQ";

export const metadata: Metadata = {
  title: "Pricing - Affordable Job Search Automation Plans | Flashfire CA",
  description:
    "Choose the perfect Flashfire plan for your job search. Transparent pricing with flexible options to automate your job applications and save time.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/pricing",
  },
  openGraph: {
    title: "Pricing - Affordable Job Search Automation Plans",
    description:
      "Choose the perfect Flashfire plan for your job search automation.",
    url: "https://www.flashfirejobs.com/en-ca/pricing",
    type: "website",
  },
};

export default function PricingPageCA() {
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
