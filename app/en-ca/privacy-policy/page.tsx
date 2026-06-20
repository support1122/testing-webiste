import { Metadata } from "next";
import PrivacyPolicy from "@/src/components/legal/PrivacyPolicy";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Privacy Policy - How Flashfire Protects Your Data",
  description:
    "Read Flashfire's privacy policy to learn how we collect, use, and protect your personal data throughout the job search automation process.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy - How Flashfire Protects Your Data",
    description:
      "Read Flashfire's privacy policy to learn how we collect, use, and protect your personal data.",
    url: "https://www.flashfirejobs.com/en-ca/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyPageCA() {
  return (
    <>
      <Navbar />
      <PrivacyPolicy />
      <Footer />
    </>
  );
}

