import{Metadata} from "next";
import RecentJobOpenings from "@/src/components/recentJobOpenings/recentJobOpenings";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";
export const metadata: Metadata = {
    title: "Recent Job Openings - Flashfire",
    description: "Recent Job Openings - Flashfire",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.flashfirejobs.com/recent-job-openings",
    },
    openGraph: {
        title: "Recent Job Openings - Flashfire",
        description: "Recent Job Openings - Flashfire",
        url: "https://www.flashfirejobs.com/recent-job-openings",
        siteName: "Flashfire",
        images: [
            { url: "https://www.flashfirejobs.com/images/og-image.png" },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Recent Job Openings - Flashfire",
        description: "Recent Job Openings - Flashfire",
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