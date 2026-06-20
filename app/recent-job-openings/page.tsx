import{Metadata} from "next";
import RecentJobOpenings from "@/src/components/recentJobOpenings/recentJobOpenings";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
export const metadata: Metadata = {
    title: "AI Job Search Assistant & Job Application Automation Tool",
    description: "FlashFire is an AI job search assistant that automates job applications, finds relevant roles, tailors resumes, and helps job seekers apply faster.",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.flashfirejobs.com/recent-job-openings",
    },
    openGraph: {
        title: "AI Job Search Assistant & Job Application Automation Tool",
        description: "FlashFire is an AI job search assistant that automates job applications, finds relevant roles, tailors resumes, and helps job seekers apply faster.",
        url: "https://www.flashfirejobs.com/recent-job-openings",
        siteName: "Flashfire",
        images: [
            { url: "https://www.flashfirejobs.com/images/og-image.png" },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Job Search Assistant & Job Application Automation Tool",
        description: "FlashFire is an AI job search assistant that automates job applications, finds relevant roles, tailors resumes, and helps job seekers apply faster.",
        images: [
            { url: "https://www.flashfirejobs.com/images/og-image.png" },
        ],
    },
};

export default function RecentJobOpeningsPage() {
    return (
        <>
            <Navbar/>
            <RecentJobOpenings/>
            <Footer/>
        </>
    )
}
