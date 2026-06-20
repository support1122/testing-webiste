import { Metadata } from "next";
import PrivacyPolicy from "@/src/components/legal/PrivacyPolicy";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Privacy Policy - How We Protect Your Data | Flashfire",
  description:
    "Read Flashfire's privacy policy to understand how we collect, use, and protect your personal information and job search data.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy - How We Protect Your Data",
    description:
      "Read Flashfire's privacy policy to understand how we protect your data.",
    url: "https://www.flashfirejobs.com/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <PrivacyPolicy />
      <Footer />
    </>
  );
}

