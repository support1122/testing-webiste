import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Profile Optimization for Recruiter Visibility | FlashfireJobs",
  description: "Optimize your LinkedIn profile to boost recruiter visibility. FlashFire optimizes your LinkedIn to rank higher in recruiter searches and get more interview messages.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/linkedin-profile-optimization-tool",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

