import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Remote Job Search Platform | Flashfire",
  description:
    "Discover remote jobs across US, Canada, and global markets with Flashfire's AI-powered remote job search platform.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/ai-remote-job-search-platform",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

