import { Metadata } from "next";
import CareerAdvisor from "@/src/components/careerAdvisor/careerAdvisor";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
export const metadata: Metadata = {
    title: "AI Career Advisor & Career Guidance Platform",
    description:
        "FlashFire is an AI-powered career guidance platform that offers personalized role clarity, skill roadmaps, resume insights, and career planning support.",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.flashfirejobs.com/career-advisor",
    },
    openGraph: {
        title: "AI Career Advisor & Career Guidance Platform",
        description:
            "FlashFire is an AI-powered career guidance platform that offers personalized role clarity, skill roadmaps, resume insights, and career planning support.",
        url: "https://www.flashfirejobs.com/career-advisor",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        images: ["https://www.flashfirejobs.com/images/og-image.png"],
    },
};

export default function CareerAdvisorPage() {
    return (
        <>
            <Navbar />
            <CareerAdvisor />
            <Footer />
        </>
    );
}
