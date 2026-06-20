import { Metadata } from "next";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import JobSearch from "@/src/components/pages/jobSearch/JobSearch";

export const metadata: Metadata = {
  title: "Job Search - Find Jobs Faster With Human-Powered Automation | Flashfire",
  description:
    "Flashfire applies to relevant jobs on your behalf so you don't have to search manually. Get updates without lifting a finger.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/job-search",
  },
  openGraph: {
    title: "Job Search - Find Jobs Faster With Human-Powered Automation",
    description:
      "Flashfire applies to relevant jobs on your behalf so you don't have to search manually.",
    url: "https://www.flashfirejobs.com/job-search",
    type: "website",
  },
};

export default function JobSearchPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <main className="mt-0">
        <JobSearch />
      </main>
      <Footer />
    </div>
  );
}

