import { Metadata } from "next";
import HomePage from "@/src/components/pages/home/Home";
import ScrollToSection from "@/src/utils/ui/scrollToSection";

export const metadata: Metadata = {
  title: "See Flashfire in Action - Live Demo & Product Tour | Flashfire",
  description:
    "Watch Flashfire in action. See how our AI-powered job search automation works with a live demo of our platform features.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/see-flashfire-in-action",
  },
  openGraph: {
    title: "See Flashfire in Action - Live Demo & Product Tour",
    description:
      "Watch Flashfire in action with a live demo of our platform.",
    url: "https://www.flashfirejobs.com/see-flashfire-in-action",
    type: "website",
  },
};

export default function SeeFlashfireInActionPage() {
  return (
    <>
      <HomePage />
      <ScrollToSection targetId="demo" />
    </>
  );
}

