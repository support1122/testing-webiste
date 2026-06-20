import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import BlogsClient from "@/src/components/blogs/blogsClient";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { slugToTag } from "@/src/utils/blogCategoryUtils";
import { blogPosts } from "@/src/data/blogsData";

export const dynamicParams = true;

type Props = {
  params: Promise<{
    tagSlug: string;
  }>;
};

// Generate static params for all unique tags
export async function generateStaticParams() {
  const allTags = new Set<string>();
  blogPosts.forEach((post) => {
    if (post && post.tags && post.tags.length > 0) {
      post.tags.forEach((tag) => {
        if (tag) allTags.add(tag);
      });
    }
    // Also add category as tag
    if (post.category) {
      allTags.add(post.category);
    }
  });

  return Array.from(allTags).map((tag) => ({
    tagSlug: tag
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
  }));
}

// Generate metadata for tag pages
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { tagSlug } = resolvedParams;
  const tag = slugToTag(tagSlug);

  return {
    title: `${tag} - Blog Tags | Flashfire`,
    description: `Explore blog posts tagged with ${tag} on Flashfire Blog.`,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://www.flashfirejobs.com/blog/tag/${tagSlug}`,
    },
    openGraph: {
      title: `${tag} - Flashfire Blog`,
      description: `Explore blog posts tagged with ${tag}.`,
      url: `https://www.flashfirejobs.com/blog/tag/${tagSlug}`,
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
      title: `${tag} - Flashfire Blog`,
      description: `Explore blog posts tagged with ${tag}.`,
      images: ["https://www.flashfirejobs.com/images/og-image.png"],
    },
  };
}

export default async function BlogTagPage({ params }: Props) {
  const resolvedParams = await params;
  const { tagSlug } = resolvedParams;

  // Validate params
  if (!tagSlug || tagSlug === "undefined") {
    return notFound();
  }

  return (
    <>
      <Navbar />
      <Suspense fallback={<div style={{ padding: "6rem 2rem", textAlign: "center" }}>Loading blogs...</div>}>
        <BlogsClient tagSlug={tagSlug} />
      </Suspense>
      <Footer />
    </>
  );
}

