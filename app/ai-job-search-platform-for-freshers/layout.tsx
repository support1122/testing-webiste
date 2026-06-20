import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Job Search Platform for Freshers | Flashfire",
  description:
    "Use Flashfire's AI job search platform for freshers to discover internships and entry-level roles that match your skills and goals.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/ai-job-search-platform-for-freshers",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

