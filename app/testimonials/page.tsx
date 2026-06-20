import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import HappyUsersGalleryPage from "@/src/components/homePageHappyUsers/HappyUsersGalleryPage";
import TestimonialImagePreloader from "@/src/components/homePageHappyUsers/TestimonialImagePreloader";

export const metadata: Metadata = {
  title: "Success Stories & Testimonials | Flashfire",
  description:
    "See real success stories from job seekers who landed their dream jobs with Flashfire. Read testimonials from professionals who automated their job search and saved 150+ hours.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/testimonials",
  },
  openGraph: {
    title: "Success Stories & Testimonials | Flashfire",
    description:
      "See real success stories from job seekers who landed their dream jobs with Flashfire.",
    url: "https://www.flashfirejobs.com/testimonials",
    type: "website",
    images: [
      {
        url: "https://www.flashfirejobs.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "FLASHFIRE Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

// Force static generation - no dynamic content, cache forever
export const dynamic = 'force-static';
export const revalidate = false; // Never revalidate - page is static

export default function TestimonialsPage() {
  const reviewSchema = {
    "@context": "https://schema.org/",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": "Aman Guleria"
    },
    "itemReviewed": {
      "@type": "Product",
      "name": "AI Job Search Platform"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5"
    },
    "name": "Best AI Powered Job Searching Platform",
    "reviewBody": "Flashfire guided me through my entire application process with precision and efficiency. The platform's comprehensive approach — from resume optimization to automated applications — made everything seamless. The real-time updates and tracking kept me informed throughout. I landed interviews at Barclays within 10 days, and the structured process made all the difference!",
    "datePublished": "2025-05-11",
    "publisher": {
      "@type": "Organization",
      "name": "FlashFire"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <TestimonialImagePreloader />
      <Navbar />
      <HappyUsersGalleryPage />
      <Footer />
    </>
  );
}

