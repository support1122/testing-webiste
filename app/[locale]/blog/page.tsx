import { Metadata } from "next";
import { Suspense } from "react";
import BlogsClient from "@/src/components/blogs/blogsClient";
import Footer from "@/src/components/footer/footer";
import Navbar from "@/src/components/navbar/navbar";

interface LocaleBlogPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: LocaleBlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isCanada = locale === "en-ca";
  
  return {
    title: isCanada 
      ? "Blog - Career Tips, Job Search Advice & Industry Insights | Flashfire (Canada)"
      : "Blog - Career Tips, Job Search Advice & Industry Insights | Flashfire",
    description:
      "Discover expert career tips, job search strategies, resume writing guides, and industry insights to accelerate your job search success.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/blog"
        : "https://www.flashfirejobs.com/blog",
    },
    openGraph: {
      title: "Blog - Career Tips & Job Search Advice",
      description:
        "Discover expert career tips, job search strategies, and industry insights.",
      url: isCanada 
        ? "https://www.flashfirejobs.com/en-ca/blog"
        : "https://www.flashfirejobs.com/blog",
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
}

export default async function LocaleBlogPage({ params }: LocaleBlogPageProps) {
  await params; // Await params even if not used
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

