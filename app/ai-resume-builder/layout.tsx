import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Resume Builder for Job Seekers | Flashfire",
  description:
    "Use Flashfire's AI resume builder to create ATS-friendly, professional resumes tailored to every job you apply for.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/ai-resume-builder",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

