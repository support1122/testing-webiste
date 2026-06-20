import { Metadata } from "next";
import AboutUs from "@/src/components/pages/aboutUs/AboutUs";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "AI Job Application Service | Job Application Automation",
  description:
    "Flashfire is an AI job application service that automates job applications, optimizes resumes, and helps job seekers land interviews faster in the US & Canada.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/about-us",
  },
  openGraph: {
    title: "AI Job Application Service | Job Application Automation",
    description:
      "Flashfire is an AI job application service that automates job applications, optimizes resumes, and helps job seekers land interviews faster in the US & Canada.",
    url: "https://www.flashfirejobs.com/about-us",
    type: "website",
  },
};

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <AboutUs />
      <Footer />
    </>
  );
}

