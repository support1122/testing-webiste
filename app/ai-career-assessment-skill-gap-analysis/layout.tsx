import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Career Assessment & Skill Gap Analysis Tool | Flashfire",
  description:
    "Run an AI-powered career assessment and skill gap analysis to understand your strengths, weaknesses, and best-fit roles.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/ai-career-assessment-skill-gap-analysis",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

