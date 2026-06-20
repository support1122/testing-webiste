import { Metadata } from "next";
import InterviewBuddy from "@/src/components/interviewBuddy/interviewBuddy";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
export const metadata: Metadata = {
    title: "AI Interview Assistant for Real-Time Support",
    description:
        "Get real-time AI support during interviews with Flashfire's AI interview assistant. Receive instant answers, live transcripts, and role-specific guidance.",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.flashfirejobs.com/interview-buddy",
    },
    openGraph: {
        title: "AI Interview Assistant for Real-Time Support",
        description:
            "Get real-time AI support during interviews with Flashfire's AI interview assistant. Receive instant answers, live transcripts, and role-specific guidance.",
        url: "https://www.flashfirejobs.com/interview-buddy",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        images: ["https://www.flashfirejobs.com/images/og-image.png"],
    },
};

export default function InterviewBuddyPage() {
    return (
        <>
            <Navbar />
            <InterviewBuddy />
            <Footer />
        </>
    )
}
