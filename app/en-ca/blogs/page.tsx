import { Metadata } from "next";
import { Suspense } from "react";
import BlogsClient from "@/src/components/blogs/blogsClient";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

// Force static generation for better performance
export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: "Blog - Career Tips, Job Search Advice & Industry Insights | Flashfire (Canada)",
  description:
    "Discover expert career tips, job search strategies, resume writing guides, and industry insights to accelerate your job search success.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/en-ca/blogs",
  },
  openGraph: {
    title: "Blog - Career Tips & Job Search Advice",
    description:
      "Discover expert career tips, job search strategies, and industry insights.",
    url: "https://www.flashfirejobs.com/en-ca/blogs",
    type: "website",
    images: [
      {
        url: "https://www.flashfirejobs.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "FLASHFIRE Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.flashfirejobs.com/images/og-image.png"],
  },
};

export default function BlogsPageCA() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div style={{ padding: "6rem 2rem", textAlign: "center" }}>Loading blogs...</div>}>
        <BlogsClient />
      </Suspense>
      <Footer />
    </>
  );
}

