import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Precision Job Targeting for Faster Interview Calls | FlashFire",
  description: "Apply to jobs that actually match your profile. FlashFire's AI targets jobs where your skills, experience, and ATS score give you the highest chance of interviews.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/ai-job-targeting",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

