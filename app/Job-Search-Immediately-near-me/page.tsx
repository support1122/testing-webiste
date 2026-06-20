import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import JobSearchNearMeContent from "./JobSearchNearMeContent";

export const metadata: Metadata = {
  title: "Job Search Near Me | Job Hiring Immediately Near Me - FlashFirejobs",
  description:
    "Find the best job search near me results with FlashFireJobs. Discover jobs hiring immediately near me and apply faster with AI-powered tools.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/Job-Search-Immediately-near-me",
  },
  openGraph: {
    title: "Job Search Near Me | Job Hiring Immediately Near Me - FlashFirejobs",
    description:
      "Find the best job search near me results with FlashFireJobs. Discover jobs hiring immediately near me and apply faster with AI-powered tools.",
    url: "https://www.flashfirejobs.com/Job-Search-Immediately-near-me",
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

export default function JobSearchNearMePage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <main className="mt-0">
        <JobSearchNearMeContent />
      </main>
      <Footer />
    </div>
  );
}

