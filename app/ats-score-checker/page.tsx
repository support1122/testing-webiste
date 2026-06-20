import { Metadata } from "next";
import ATSScoreChecker from "@/src/components/resumeTools/ATSScoreChecker";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
    title: "ATS Score Checker – Free Resume ATS Scanner | Flashfire",
    description: "Check your resume's ATS score for free. Upload your resume and get an instant ATS compatibility score, keyword analysis, and actionable tips to pass applicant tracking systems.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://www.flashfirejobs.com/ats-score-checker" },
    openGraph: {
        title: "ATS Score Checker – Free Resume ATS Scanner | Flashfire",
        description: "Check your resume's ATS score for free. Get instant feedback on keyword density, formatting, and structure.",
        url: "https://www.flashfirejobs.com/ats-score-checker",
        type: "website",
    },
    twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};

export default function ATSScoreCheckerPage() {
    return (
        <>
            <Navbar />
            <ATSScoreChecker />
            <Footer />
        </>
    );
}
