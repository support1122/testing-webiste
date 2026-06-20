import { Metadata } from "next";
import OfferAndSalary from "@/src/components/offerAndSalary/offerAndSalary";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

export const metadata: Metadata = {
    title: "Negotiate Salary Offer With a Proven Strategy | Flashfire",
    description: "Flashfire helps you negotiate salary offers using a proven salary negotiation strategy backed by market data, scripts, and offer analysis.",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.flashfirejobs.com/offer-and-salary",
    },
    openGraph: {
        title: "Negotiate Salary Offer With a Proven Strategy | Flashfire",
        description: "Flashfire helps you negotiate salary offers using a proven salary negotiation strategy backed by market data, scripts, and offer analysis.",
        url: "https://www.flashfirejobs.com/offer-and-salary",
        siteName: "Flashfire",
        images: [
            { url: "https://www.flashfirejobs.com/og-image.png" },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Negotiate Salary Offer With a Proven Strategy | Flashfire",
        description: "Flashfire helps you negotiate salary offers using a proven salary negotiation strategy backed by market data, scripts, and offer analysis.",
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
