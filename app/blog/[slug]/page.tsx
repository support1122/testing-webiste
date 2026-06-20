import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Suspense } from "react";
import { blogPosts } from "@/src/data/blogsData";
import BlogsPage from "@/src/components/blogs/blogsPage";
import BlogsClient from "@/src/components/blogs/blogsClient";
import Navbar from "@/src/components/navbar/navbar";
import Footer from "@/src/components/footer/footer";
import { slugToCategory, getAllCategorySlugs } from "@/src/utils/blogCategoryUtils";

export const dynamicParams = true;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Generate static params for all blog posts and categories
export async function generateStaticParams() {
  const blogSlugs = blogPosts
    .filter((post): post is NonNullable<typeof post> => !!post && !!post.slug && post.slug !== "undefined")
    .map((post) => ({
      slug: post.slug,
    }));
  
  const categorySlugs = getAllCategorySlugs().map((categorySlug) => ({
    slug: categorySlug,
  }));
  
  return [...blogSlugs, ...categorySlugs];
}

// Generate metadata for blog posts and categories
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  // Check if it's a blog post
  const post = blogPosts.find((p) => p && p.slug === slug);
  if (post) {
  // Meta title overrides per slug
  const metaTitleMap: Record<string, string> = {
    // ATS & Resume
    "how-to-optimize-resume-for-ats": "How to Optimize a Resume for ATS | ATS Resume Optimization",
    "check-if-resume-is-ats-friendly": "How to Check If Your Resume Is ATS Friendly",
    "how-to-beat-ats-systems": "How to Beat ATS Systems & Get Your Resume Shortlisted",
    "best-file-format-for-resume": "Best File Format for Resume: ATS-Friendly Options Explained",
    "ai-resume-optimization-tools": "Best AI Resume Optimization Tools in 2026",
    "best-ai-tools-for-resume-writing": "Best AI Resume Writing Tools in 2026",
    // Job Search
    "how-to-search-for-a-new-job": "How to Search for a New Job: The Best Way to Find One Fast",
    "how-to-automate-job-applications": "How to Automate Job Applications in 2026",
    "best-ai-job-application-tools": "Best AI Job Application Tools in 2026",
    "ai-job-search-tools": "Best AI Job Search Tools in USA for 2026",
    "job-search-hacks": "Job Search Hacks: Smart Tips to Get Hired Faster",
    "job-search-tips": "Job Search Tips: Proven Ways to Get Hired Faster",
    "best-websites-for-job-search": "Best Websites for Job Search: Top Sites to Get Hired",
    "best-job-search-apps": "Best Job Search Apps in USA for 2026",
    "apps-like-indeed": "Best Job Search Apps Like Indeed in 2026",
    "best-job-search-strategies-opt-students": "Best Job Search Strategy for OPT Students USA",
    // LinkedIn
    "linkedin-profile-attractive-to-recruiters": "How to Make Your LinkedIn Profile Attractive to Recruiters",
    "optimize-linkedin-profile": "How to Optimize Your LinkedIn Profile for Better Visibility",
    // AI Tools
    "can-you-use-ai-for-job-applications": "Can You Use AI for Job Applications in 2026?",
    // Software Engineering
    "highest-paying-software-engineering-jobs": "Highest Paying Software Engineering Jobs 2026",
    "how-to-get-a-job-as-a-software-engineer": "How to Get a Job as a Software Engineer in 2026",
    "software-engineer-career-outlook": "Software Engineer Career Outlook in USA 2026",
    "software-engineer-duties-roles-responsibilities": "Software Engineer Duties & Responsibilities Guide",
    "best-job-boards-for-software-engineers": "Best Job Boards for Software Engineers in USA",
    "highest-paying-coding-jobs": "Highest Paying Coding Jobs in USA 2026",
    // Career & Salary
    "best-paying-jobs-in-the-us": "Best Paying Jobs in USA for 2026",
    "best-paying-tech-jobs": "Best Paying Tech Jobs in USA for 2026",
    "highest-paying-ai-jobs": "Highest Paying AI Jobs in USA for 2026",
    "highest-paying-remote-jobs": "Highest Paying Remote Jobs in USA (2026)",
    "jobs-with-high-salary": "Top High Salary Jobs in USA for 2026",
    "best-careers-for-the-future": "Best Future Careers in USA for 2026",
    "future-jobs-in-demand-2030": "Future Jobs in Demand in USA by 2030",
    // Career Guidance
    "find-job-after-graduation": "How to Find a Job After Graduation in 2026",
    "how-to-change-careers": "How to Change Careers Successfully | Step-by-Step Guide",
    "how-to-get-a-job-in-digital-marketing": "How to Get a Job in Digital Marketing (2026 Guide)",
    // Engineering Roles
    "devops-engineer-job-responsibilities": "DevOps Engineer Job Responsibilities & Job Profile",
    "cloud-engineer-duties-job-description": "Cloud Engineer Duties & Job Description Guide",
    "full-stack-developer-responsibilities": "Full Stack Developer Roles and Responsibilities",
    // Job Platforms & Reviews
    "is-indeed-reliable": "Is Indeed Reliable for Jobs in USA?",
    "is-indeed-a-good-place-to-find-jobs": "Is Indeed Good for Finding Jobs in USA?",
    "indeed-vs-glassdoor": "Indeed vs Glassdoor: Best Job Site in USA?",
    "is-clearancejobs-legit": "Is ClearanceJobs Legit in USA? Review 2026",
    "is-jobright-ai-legit": "Is Jobright.ai Legit? Review for USA Job Seekers",
    "flexjobs-cost-pricing-plans": "FlexJobs Cost & Pricing Review for 2026",
    "best-us-job-portals-for-international-students": "Best USA Job Portals for International Students",
    // International Students & Visa
    "us-job-market-for-international-students": "USA Job Market for International Students 2026",
    "opt-jobs-in-usa": "OPT Jobs in USA for International Students 2026",
    "companies-that-sponsor-h1b-visas": "Top H1B Visa Sponsoring Companies in USA (2026)",
    "visa-sponsored-jobs-in-usa": "Visa Sponsored Jobs in USA: 2026 Guide",
    "h1b-salary": "H1B Salary Guide USA: Pay Trends for 2026",
    "h1b-cap-exempt-jobs": "H1B Cap-Exempt Jobs in USA: 2026 Guide",
    "opt-h1b-jobs-future": "OPT & H1B Job Future in USA for 2026",
    "when-do-summer-internships-start": "When Do Summer Internships Start in USA 2026?",
    "summa-cum-laude-vs-magna-cum-laude": "Summa vs Magna Cum Laude: GPA & Honors Guide",
    // Why job hunting
    "why-is-it-so-hard-to-find-a-job-in-us": "Why Is It Hard to Find Jobs in USA in 2026?",
    // Interview & Application
    "what-to-wear-for-zoom-interview": "What to Wear for a Zoom Interview (2026 Guide)",
    "how-to-follow-up-on-job-application": "How to Follow Up on a Job Application (2026 Guide)",
    "remote-job-vs-office-job": "Remote Job vs Office Job: Pros, Cons & Key Differences",
    "how-to-get-a-job-quickly": "How to Get a Job Quickly (Even in a Competitive Market)",
    "what-is-hidden-job-market": "What Is the Hidden Job Market? How It Works in 2026",
  };
  const metaTitle = post.slug ? (metaTitleMap[post.slug] ?? post.title) : post.title;
  
  return {
    title: metaTitle,
    description: post.excerpt,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://www.flashfirejobs.com/blog/${post.slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: post.excerpt,
      url: `https://www.flashfirejobs.com/blog/${post.slug}`,
      type: "article",
      images: post.image
        ? [
            {
              url: post.image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [
            {
              url: "https://www.flashfirejobs.com/images/og-image.png",
              width: 1200,
              height: 630,
              alt: "FLASHFIRE Logo",
            },
          ],
      publishedTime: post.date,
      authors: ["Flashfire"],
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: post.excerpt,
      images: post.image ? [post.image] : ["https://www.flashfirejobs.com/images/og-image.png"],
      },
    };
  }

  // Check if it's a category
  const category = slugToCategory(slug);
  if (category && category !== slug) {
    return {
      title: `${category} - Blog | Flashfire`,
      description: `Explore ${category} articles, tips, and insights on Flashfire Blog.`,
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://www.flashfirejobs.com/blog/${slug}`,
      },
      openGraph: {
        title: `${category} - Flashfire Blog`,
        description: `Explore ${category} articles, tips, and insights.`,
        url: `https://www.flashfirejobs.com/blog/${slug}`,
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
        title: `${category} - Flashfire Blog`,
        description: `Explore ${category} articles, tips, and insights.`,
        images: ["https://www.flashfirejobs.com/images/og-image.png"],
      },
    };
  }

  // Not found
  return {
    title: "Page Not Found | Flashfire",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function BlogSlugPage({ params }: Props) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  // Validate params
  if (!slug || slug === "undefined") {
    return notFound();
  }

  // Check if it's a blog post
  const post = blogPosts.find((p) => p && p.slug === slug);
  if (post) {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      image: post.image || "https://www.flashfirejobs.com/images/og-image.png",
      datePublished: post.date,
      dateModified: post.lastUpdated || post.date,
      author: {
        "@type": "Person",
        name: post.author?.name || "Flashfire",
        description: post.author?.bio || "Career expert at Flashfire helping job seekers land their dream roles.",
        url: post.author?.name
          ? `https://www.flashfirejobs.com/author/${post.author.name.toLowerCase().replace(/\s+/g, "-")}`
          : "https://www.flashfirejobs.com",
      },
      publisher: {
        "@type": "Organization",
        name: "Flashfire",
        logo: { "@type": "ImageObject", url: "https://www.flashfirejobs.com/images/og-image.png" },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.flashfirejobs.com/blog/${post.slug}` },
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.flashfirejobs.com" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.flashfirejobs.com/blog" },
        ...(post.category
          ? [{ "@type": "ListItem", position: 3, name: post.category, item: `https://www.flashfirejobs.com/blog/${post.category.toLowerCase().replace(/\s+/g, "-")}` }]
          : []),
        { "@type": "ListItem", position: post.category ? 4 : 3, name: post.title, item: `https://www.flashfirejobs.com/blog/${post.slug}` },
      ],
    };

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <BlogsPage post={post} />
      </>
    );
  }

  // Check if it's a category
  const category = slugToCategory(slug);
  if (category && category !== slug) {
    // It's a category, show filtered blog list
    return (
      <>
        <Navbar />
        <Suspense fallback={<div style={{ padding: "6rem 2rem", textAlign: "center" }}>Loading blogs...</div>}>
          <BlogsClient categorySlug={slug} />
        </Suspense>
        <Footer />
      </>
    );
  }

  // Not found
  return notFound();
}
