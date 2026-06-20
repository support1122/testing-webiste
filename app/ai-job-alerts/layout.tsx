import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Job Alerts & Smart Job Notifications | Flashfire",
  description:
    "Get AI-powered job alerts and smart notifications so you never miss high-fit roles that match your profile.",
  alternates: {
    canonical: "https://www.flashfirejobs.com/ai-job-alerts",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

