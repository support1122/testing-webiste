import { Metadata } from "next";
import ResumeParserSoftware from "@/src/components/resumeTools/ResumeParserSoftware";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
    title: "Resume Parser Software – Free Online CV Parser | Flashfire",
    description: "Free resume parser software that extracts contact info, work experience, education, and skills from any resume. No sign-up required. See exactly what an ATS reads from your CV.",
    robots: { index: true, follow: true },
    alternates: { canonical: "https://www.flashfirejobs.com/resume-parser-software" },
    openGraph: {
        title: "Resume Parser Software – Free Online CV Parser | Flashfire",
        description: "Free resume parser software. Extract structured data from any resume instantly.",
        url: "https://www.flashfirejobs.com/resume-parser-software",
        type: "website",
    },
    twitter: { card: "summary_large_image", images: ["https://www.flashfirejobs.com/images/og-image.png"] },
};

export default function ResumeParserSoftwarePage() {
    return (
        <>
            <Navbar />
            <ResumeParserSoftware />
            <Footer />
        </>
    );
}
