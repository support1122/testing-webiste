import { Metadata } from "next";
export { default } from "@/app/features/interview-tips/page";

export const metadata: Metadata = {
    title: "Interview Tips - Flashfire",
    description: "Interview Tips - Flashfire",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://www.flashfirejobs.com/en-ca/features/interview-tips",
    },
    openGraph: {
        title: "Interview Tips - Flashfire",
        description: "Interview Tips - Flashfire",
        url: "https://www.flashfirejobs.com/en-ca/features/interview-tips",
        siteName: "Flashfire",
        images: [
            { url: "https://www.flashfirejobs.com/og-image.png" },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Interview Tips - Flashfire",
        description: "Interview Tips - Flashfire",
        images: [
            { url: "https://www.flashfirejobs.com/og-image.png" },
        ],
    },
}
 