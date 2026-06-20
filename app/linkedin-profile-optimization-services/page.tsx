import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import LinkedInOptimizationContent from "./LinkedInOptimizationContent"; // ✅ FIXED PATH

export const metadata: Metadata = {
  title: "LinkedIn Optimization Services | Optimize Your LinkedIn Profile",
  description:
    "Professional LinkedIn optimization services to optimise LinkedIn profile visibility. Improve reach by optimizing your LinkedIn profile for recruiters.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/Linkedin-Profile-Optimization-Services",
  },
  openGraph: {
    title: "LinkedIn Optimization Services | Optimize Your LinkedIn Profile",
    description:
      "Professional LinkedIn optimization services to optimise LinkedIn profile visibility. Improve reach by optimizing your LinkedIn profile for recruiters.",
    url: "https://www.flashfirejobs.com/Linkedin-Profile-Optimization-Services",
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

export default function LinkedInOptimizationPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <main className="mt-0">
        <LinkedInOptimizationContent />
      </main>
      <Footer />
    </div>
  );
}
