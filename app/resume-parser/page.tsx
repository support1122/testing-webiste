import { Metadata } from "next";
import ResumeParser from "@/src/components/resumeTools/ResumeParser";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
    title: "Resume Parser – Extract Resume Data Instantly | Flashfire",
    description: "Free online resume parser. Upload your resume and instantly extract contact details, work experience, education, and skills — see exactly what an ATS reads.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://www.flashfirejobs.com/resume-parser" },
    openGraph: {
        title: "Resume Parser – Extract Resume Data Instantly | Flashfire",
        description: "Free online resume parser. Upload your resume and extract structured data instantly.",
        url: "https://www.flashfirejobs.com/resume-parser",
        type: "website",
    },
    twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};

export default function ResumeParserPage() {
    return (
        <>
            <Navbar />
            <ResumeParser />
            <Footer />
        </>
    );
}
