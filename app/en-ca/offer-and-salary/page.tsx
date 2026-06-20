import { Metadata } from "next";
import OfferAndSalary from "@/src/components/offerAndSalary/offerAndSalary";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
    title: "Offer & Salary - Flashfire",
    description: "Offer & Salary - Flashfire",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.flashfirejobs.com/offer-and-salary",
    },
    openGraph: {
        title: "Offer & Salary - Flashfire",
        description: "Offer & Salary - Flashfire",
        url: "https://www.flashfirejobs.com/offer-and-salary",
        siteName: "Flashfire",
        images: [
            { url: "https://www.flashfirejobs.com/og-image.png" },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Offer & Salary - Flashfire",
        description: "Offer & Salary - Flashfire",
        images: [
            { url: "https://www.flashfirejobs.com/og-image.png" },
        ],
    },
}

export default function OfferAndSalaryPage() {
    return (
        <>
            <Navbar/>
            <OfferAndSalary/>
            <Footer/>
        </>
    )
}