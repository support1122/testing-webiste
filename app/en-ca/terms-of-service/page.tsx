import { Metadata } from "next";
import TermsOfService from "@/src/components/legal/TermsOfService";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Terms of Service - Flashfire User Agreement",
  description:
    "Read Flashfire's terms of service to understand the terms and conditions for using our job search automation platform.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service - Flashfire User Agreement",
    description:
      "Read Flashfire's terms of service and user agreement.",
    url: "https://www.flashfirejobs.com/en-ca/terms-of-service",
    type: "website",
  },
};

export default function TermsOfServicePageCA() {
  return (
    <>
      <Navbar />
      <TermsOfService />
      <Footer />
    </>
  );
}

