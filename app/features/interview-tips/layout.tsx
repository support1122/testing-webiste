import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Interview Practice Tool for Mock Interviews & Feedback",
  description: "Practice mock interviews with FlashFire's AI interview tool. Get instant feedback, improve answers, and prepare confidently for real interviews.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/features/interview-tips",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
