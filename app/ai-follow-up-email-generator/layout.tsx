import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Follow-Up Email Generator for Job Applications | Flashfire",
  description:
    "Generate professional, timely follow-up emails for job applications and interviews using Flashfire's AI follow-up email generator.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/ai-follow-up-email-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

