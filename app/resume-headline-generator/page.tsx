import { Metadata } from "next";
import ResumeHeadlineGenerator from "@/src/components/resumeTools/ResumeHeadlineGenerator";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
    title: "Resume Headline Generator – Free LinkedIn & CV Headlines | Flashfire",
    description: "Generate 5 punchy, keyword-rich resume headlines in seconds. Use them on your CV and LinkedIn profile. Free, no sign-up required.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://www.flashfirejobs.com/resume-headline-generator" },
    openGraph: {
        title: "Resume Headline Generator – Free LinkedIn & CV Headlines | Flashfire",
        description: "Free resume headline generator. Get 5 tailored headline options for your CV and LinkedIn.",
        url: "https://www.flashfirejobs.com/resume-headline-generator",
        type: "website",
    },
    twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};

export default function ResumeHeadlineGeneratorPage() {
    return (
        <>
            <Navbar />
            <ResumeHeadlineGenerator />
            <Footer />
        </>
    );
}
