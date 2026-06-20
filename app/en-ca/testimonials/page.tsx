import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import HappyUsersGalleryPage from "@/src/components/homePageHappyUsers/HappyUsersGalleryPage";

export const metadata: Metadata = {
  title: "Success Stories & Testimonials | Flashfire",
  description:
    "See real success stories from job seekers who landed their dream jobs with Flashfire. Read testimonials from professionals who automated their job search and saved 150+ hours.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/testimonials",
  },
  openGraph: {
    title: "Success Stories & Testimonials | Flashfire",
    description:
      "See real success stories from job seekers who landed their dream jobs with Flashfire.",
    url: "https://www.flashfirejobs.com/en-ca/testimonials",
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

export default function TestimonialsPageCA() {
  return (
    <>
      <Navbar />
      <HappyUsersGalleryPage />
      <Footer />
    </>
  );
}

