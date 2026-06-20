"use client";

import { useEffect, useState, useMemo } from "react";
import styles from "./blogsPage.module.css";
import CachedBlogImage from "./CachedBlogImage";
import {
  trackPageView,
  trackScrollDepth,
  trackTimeOnPage,
} from "@/src/utils/PostHogTracking";
import posthog from "posthog-js";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import Link from "next/link";
import { FaLinkedinIn, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { blogPosts } from "@/src/data/blogsData";
import { categoryToSlug, tagToSlug } from "@/src/utils/blogCategoryUtils";

type BlogPost = {
  id: number;
  slug?: string;
  title: string;
  excerpt?: string;
  image?: string;
  category?: string;
  categoryColor?: string;
  date?: string;
  lastUpdated?: string;
  readTime?: string;
  content?: string;
  tags?: string[];
  author?: {
    name: string;
    bio?: string;
    image?: string;
  };
};

type TableOfContentsItem = {
  title: string;
  anchor: string;
  level: number;
};

export default function BlogsPage({ post }: { post: BlogPost }) {
  const [activeSection, setActiveSection] = useState<string>("");
  const allCategories = useMemo(
    () =>
      Array.from(
        new Set(
          blogPosts
            .map((p) => p.category)
            .filter((c): c is string => Boolean(c))
        )
      ),
    []
  );
  // Tags for this post - show default tags on every blog for UI consistency
  // But filtering will only match blogs that actually have that tag in their data
  const defaultDisplayTags = [
    "Career Advice",
    "Job Search Strategy",
    "Success Stories",
    "Visa & Immigration",
    "Career Planning",
    "International Students"
  ];
  const postTags = useMemo(() => {
    // Always show default tags on every blog page for UI consistency
    // The actual filtering in blogsClient.tsx will use the blog's real tags
    return defaultDisplayTags;
  }, []);

  const overviewText = post.excerpt || "";

  // Split overview into paragraphs for first 3 blogs (deterministic, no client-side checks)
  const overviewParagraphs = useMemo(() => {
    if (!overviewText) return null;
    
    // Only split for first 3 blogs with the specific content pattern
    if (post.id <= 3 && overviewText.includes("You're not the only one")) {
      // Split into 3 paragraphs based on content structure
      const p1End = overviewText.indexOf("mental health.");
      const p2Start = overviewText.indexOf("This Flashfirejobs");
      const p3Start = overviewText.indexOf("You will also learn");
      
      // Ensure all markers are found and in correct order
      if (p1End > 0 && p2Start > p1End && p3Start > p2Start) {
        const para1 = overviewText.substring(0, p1End + "mental health.".length).trim();
        const para2 = overviewText.substring(p2Start, p3Start).trim();
        const para3 = overviewText.substring(p3Start).trim();
        
        // Return only if all paragraphs are non-empty
        if (para1 && para2 && para3) {
          return [para1, para2, para3];
        }
      }
    }
    return null;
  }, [overviewText, post.id]);

  // Process content and generate table of contents (client-side only)
  const [processedContent, setProcessedContent] = useState<string>(post?.content || "");
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);

  useEffect(() => {
    if (!post?.content || typeof window === "undefined") {
      setProcessedContent(post?.content || "");
      return;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content, "text/html");
      // Only include H2 headings (main sections), exclude H3 (sub-sections, questions)
      const headings = doc.querySelectorAll("h2");
      const toc: TableOfContentsItem[] = [];

      headings.forEach((heading, index) => {
        const text = heading.textContent || "";
        const anchor = `section-${index + 1}`;
        
        // Add ID to heading for anchor links
        heading.id = anchor;
        
        toc.push({
          title: text,
          anchor: anchor,
          level: 2,
        });
      });

      // Add Overview at the top of the TOC if overview text exists
      const finalToc =
        overviewText && overviewText.trim().length > 0
          ? [
              {
                title: "Overview",
                anchor: "overview-section",
                level: 2,
              },
              ...toc,
            ]
          : toc;

      setProcessedContent(doc.body.innerHTML);
      setTableOfContents(finalToc);
    } catch (error) {
      // Fallback to original content if parsing fails
      setProcessedContent(post.content);
      setTableOfContents([]);
    }
  }, [post?.content, overviewText]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map((item) => {
        const element = document.getElementById(item.anchor);
        return element ? { element, anchor: item.anchor } : null;
      }).filter(Boolean) as { element: HTMLElement; anchor: string }[];

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].anchor);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tableOfContents]);

  useEffect(() => {
    if (!post) return;

    // Scroll to top when blog page loads
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      scrollToTop();
      // Also scroll after a short delay to catch any late scrolls
      setTimeout(() => {
        scrollToTop();
      }, 50);
      // One more check after layout
      requestAnimationFrame(() => {
        setTimeout(() => {
          scrollToTop();
        }, 100);
      });
    });

    const startedAt = Date.now();

    try {
      posthog.capture?.("blog_view", {
        blog_id: post.id,
        blog_slug: post.slug,
        blog_title: post.title,
        blog_category: post.category,
        blog_read_time: post.readTime,
        blog_date: post.date,
        page_url: window.location.href,
      });

      trackPageView("blog_detail", undefined, {
        blog_id: post.id,
        blog_slug: post.slug,
        blog_title: post.title,
      });
    } catch {}

    const marks = new Set<number>();
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const percent = Math.min(100, Math.round((scrollTop / height) * 100));
      [25, 50, 75, 100].forEach((t) => {
        if (percent >= t && !marks.has(t)) {
          marks.add(t);
          trackScrollDepth(t, "blog_detail", { blog_slug: post.slug });
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      const timeSpentSec = Math.round((Date.now() - startedAt) / 1000);
      trackTimeOnPage(timeSpentSec, "blog_detail", { blog_slug: post.slug });
    };
  }, [post]);

  // Get related articles (same category preferred; allow more than 3 to enable scroll)
  const relatedArticles = useMemo(() => {
    const sameCategory = blogPosts.filter(
      (p) => p.category === post.category && p.id !== post.id
    );

    // If none in same category, fall back to first 3 from other categories
    if (sameCategory.length === 0) {
      return blogPosts.filter((p) => p.id !== post.id).slice(0, 3);
    }

    // Allow more than 3 to enable scrolling when needed
    return sameCategory;
  }, [post.category, post.id]);

  // Get recent posts (exclude current)
  const recentPosts = useMemo(() => {
    return blogPosts
      .filter((p) => p.id !== post.id)
      .slice(0, 5);
  }, [post.id]);

  // Get most viewed posts (exclude current and recent posts)
  const mostViewedPosts = useMemo(() => {
    const excludeIds = new Set([post.id, ...recentPosts.map(p => p.id)]);
    return blogPosts
      .filter((p) => !excludeIds.has(p.id))
      .sort((a, b) => {
        // Sort by date descending (newer first) as a proxy for "most viewed"
        const dateA = new Date(a.date || 0).getTime();
        const dateB = new Date(b.date || 0).getTime();
        return dateB - dateA;
      })
      .slice(0, 5);
  }, [post.id, recentPosts]);

  // Social sharing functions
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post.title;

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }
  };

  const scrollToSection = (anchor: string) => {
    const element = document.getElementById(anchor);
    if (element) {
      const offset = 150; // Increased offset to ensure heading is fully visible
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Helper function to convert date to ISO format (YYYY-MM-DD)
  const convertToISODate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // Return original if invalid
      return date.toISOString().split('T')[0];
    } catch {
      return dateString;
    }
  };

  // Extract FAQ questions and answers from content (client-side only to avoid hydration issues)
  const [extractFAQ, setExtractFAQ] = useState<Array<{ question: string; answer: string }>>([]);
  
  useEffect(() => {
    if (!post?.content) {
      setExtractFAQ([]);
      return;
    }
    
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content, "text/html");
      const faqItems: Array<{ question: string; answer: string }> = [];
      
      // Look for FAQ section - typically has h2 with "FAQ" and then h3 questions
      const faqSection = Array.from(doc.querySelectorAll("h2")).find(
        (h2) => h2.textContent?.toLowerCase().includes("faq")
      );
      
      if (faqSection) {
        let currentElement = faqSection.nextElementSibling;
        while (currentElement) {
          // Check if it's a question (h3 heading)
          if (currentElement.tagName === "H3") {
            const question = currentElement.textContent?.trim() || "";
            // Remove numbering if present (e.g., "1. Question" -> "Question")
            const cleanQuestion = question.replace(/^\d+\.\s*/, "");
            
            // Get the answer from the next paragraph
            const answerElement = currentElement.nextElementSibling;
            if (answerElement && answerElement.tagName === "P") {
              const answer = answerElement.textContent?.trim() || "";
              if (question && answer) {
                faqItems.push({ question: cleanQuestion, answer });
              }
            }
          }
          // Stop if we hit another h2 (next section)
          if (currentElement.tagName === "H2") break;
          currentElement = currentElement.nextElementSibling;
        }
      }
      
      setExtractFAQ(faqItems);
    } catch (error) {
      console.error("Error extracting FAQ:", error);
      setExtractFAQ([]);
    }
  }, [post?.content]);

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.flashfirejobs.com/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.image || "",
    author: {
      "@type": "Person",
      name: post.author?.name || "Arjun Sharma",
      ...(post.author?.name && {
        url: `https://www.flashfirejobs.com/author/${post.author.name.toLowerCase().replace(/\s+/g, "-")}`,
      }),
    },
    publisher: {
      "@type": "Organization",
      name: "FlashFire Jobs",
      logo: {
        "@type": "ImageObject",
        url: "https://www.flashfirejobs.com/favicon.ico",
      },
    },
    datePublished: convertToISODate(post.date || ""),
    dateModified: convertToISODate(post.lastUpdated || post.date || ""),
  };

  // Generate FAQ schema if FAQ items exist (use empty array to avoid hydration issues)
  const faqStructuredData = extractFAQ && extractFAQ.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: extractFAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } : null;

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.flashfirejobs.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.flashfirejobs.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.category,
        item: `https://www.flashfirejobs.com/blog/${categoryToSlug(post.category || "")}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: `https://www.flashfirejobs.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}
      <Navbar />
      {/* Floating Share */}
      <div className={styles.floatingShare}>
        <button
          onClick={() => handleShare("facebook")}
          className={styles.socialButton}
          aria-label="Share on Facebook"
        >
          <FaFacebookF />
        </button>
        <button
          onClick={() => handleShare("twitter")}
          className={styles.socialButton}
          aria-label="Share on Twitter"
        >
          <FaTwitter />
        </button>
        <button
          onClick={() => handleShare("linkedin")}
          className={styles.socialButton}
          aria-label="Share on LinkedIn"
        >
          <FaLinkedinIn />
        </button>
      </div>
      <div className={styles.pageWrapper}>
        <div className={styles.blogContainer}>
          {/* === BREADCRUMB === */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSeparator}> &gt; </span>
            <Link href="/blog">Blog</Link>
            <span className={styles.breadcrumbSeparator}> &gt; </span>
            <Link href={`/blog/${categoryToSlug(post.category || "")}`}>{post.category}</Link>
            <span className={styles.breadcrumbSeparator}> &gt; </span>
            <span className={styles.breadcrumbCurrent} title={post.title}>{post.title}</span>
          </nav>

          {/* === TOP SECTION WITH HERO IMAGE AND SIDEBAR === */}
          <div className={styles.topSectionWrapper}>
            <div className={styles.topSection}>
              {/* === LEFT: HERO IMAGE AND TITLE === */}
              <div className={styles.topLeftContent}>
              {/* Category chips removed per request */}
              {/* === HERO IMAGE === */}
              <div className={styles.imageWrapper}>
                <CachedBlogImage
                  src={post.image || ""}
                  alt={post.title}
                  width={1200}
                  height={630}
                  className={styles.image}
                  priority
                  itemProp="image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                />
              </div>

              {/* === TITLE === */}
              <h1 className={styles.title} itemProp="headline">{post.title}</h1>

              {/* === TAGS (clickable to filter blogs by tag) === */}
              {postTags && postTags.length > 0 && (
                <div className={styles.tagsWrapper}>
                  {postTags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/blog/tag/${tagToSlug(tag)}`}
                      className={styles.tag}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* === AUTHOR & DATE === */}
              <div className={styles.meta}>
                <div className={styles.authorInfo} itemScope itemType="https://schema.org/Person">
                  {post.author?.image && (
                    <CachedBlogImage
                      src={post.author.image}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className={styles.authorImage}
                      itemProp="image"
                      sizes="40px"
                    />
                  )}
                  <div>
                    {post.author?.name ? (
                      <Link
                        href={`/author/${post.author.name.replace(/\s+/g, "-").toLowerCase()}`}
                        className={styles.authorNameLink}
                      >
                        <div className={styles.authorName} itemProp="name">
                          By {post.author.name}
                        </div>
                      </Link>
                    ) : (
                      <div className={styles.authorName} itemProp="name">
                        By Debashri Mandal
                      </div>
                    )}
                    {post.author?.bio && (
                      <div className={styles.authorBio} itemProp="description">{post.author.bio}</div>
                    )}
                  </div>
                </div>
                <div className={styles.dateInfo}>
                  {/* <span className={styles.dateLabel}>Published:</span> */}
                  {/* <time dateTime={post.date} itemProp="datePublished">{post.date}</time> */}
                  {post.lastUpdated && post.lastUpdated !== post.date && (
                    <>
                      {/* <span className={styles.dateSeparator}>|</span> */}
                      <span className={styles.dateLabel}>Updated:</span>
                      <time dateTime={post.lastUpdated} itemProp="dateModified">{post.lastUpdated}</time>
                    </>
                  )}
                  <span className={styles.readTime}>⏱️ {post.readTime}</span>
                </div>
              </div>

              {/* === BLOG OVERVIEW === */}
              {overviewText && (
                <div id="overview-section" className={styles.overviewBox}>
                  {/* <h3 className={styles.overviewTitle}> Blog Overview</h3> */}
                  {overviewParagraphs ? (
                    <div className={styles.overviewText}>
                      <p
                        style={{ marginBottom: "0.75rem" }}
                        dangerouslySetInnerHTML={{ __html: overviewParagraphs[0] }}
                      />
                      <p
                        style={{ marginBottom: "0.75rem" }}
                        dangerouslySetInnerHTML={{ __html: overviewParagraphs[1] }}
                      />
                      <p
                        style={{ marginBottom: 0 }}
                        dangerouslySetInnerHTML={{ __html: overviewParagraphs[2] }}
                      />
                    </div>
                  ) : overviewText.includes('\n\n') ? (
                    <div className={styles.overviewText}>
                      {overviewText.split('\n\n').map((para, index, array) => (
                        <p
                          key={index}
                          style={{ marginBottom: index < array.length - 1 ? "0.75rem" : 0 }}
                          dangerouslySetInnerHTML={{ __html: para.trim() }}
                        />
                      ))}
                    </div>
                  ) : (
                    <p
                      className={styles.overviewText}
                      dangerouslySetInnerHTML={{ __html: overviewText }}
                    />
                  )}
                </div>
              )}

              {/* === TABLE OF CONTENTS === */}
              {tableOfContents.length > 0 && (
                <div className={styles.tableOfContents}>
                  <div className={styles.tocTitleWrapper}>
                    <span className={styles.tocTitleLine}></span>
                    <h3 className={styles.tocTitle}>IN THIS ARTICLE</h3>
                    <span className={styles.tocTitleLine}></span>
                  </div>
                  <ul className={styles.tocList}>
                    {tableOfContents.map((item, index) => (
                      <li
                        key={index}
                        className={`${styles.tocItem} ${
                          item.level === 3 ? styles.tocItemNested : ""
                        } ${
                          activeSection === item.anchor ? styles.tocItemActive : ""
                        }`}
                      >
                        <button
                          onClick={() => scrollToSection(item.anchor)}
                          className={styles.tocLink}
                        >
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* === RIGHT: SIDEBAR === */}
            <aside className={styles.topSidebar}>
              {/* === SOCIAL SHARE === */}
              {/* <div className={styles.sidebarSection}>
                <h4 className={styles.sidebarTitle}>Share This Article</h4>
                <div className={styles.socialShare}>
                  <button
                    onClick={() => handleShare("facebook")}
                    className={styles.socialButton}
                    aria-label="Share on Facebook"
                  >
                    <FaFacebookF />
                  </button>
                  <button
                    onClick={() => handleShare("twitter")}
                    className={styles.socialButton}
                    aria-label="Share on Twitter"
                  >
                    <FaTwitter />
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className={styles.socialButton}
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedinIn />
                  </button>
                </div>
              </div> */}

              {/* === RECENT POSTS === */}
              <div className={styles.sidebarSection}>
                <h4 className={styles.sidebarTitle}>Recent Posts</h4>
                <ul className={styles.recentPostsList}>
                  {recentPosts.map((recentPost) => (
                    <li key={recentPost.id} className={styles.recentPostItem}>
                      <Link
                        href={`/blog/${recentPost.slug}`}
                        className={styles.recentPostLink}
                      >
                        <div className={styles.recentPostImage}>
                          <CachedBlogImage
                            src={recentPost.image || ""}
                            alt={recentPost.title}
                            width={80}
                            height={60}
                            className={styles.recentPostImg}
                            sizes="80px"
                          />
                        </div>
                        <div className={styles.recentPostContent}>
                          <h5 className={styles.recentPostTitle}>
                            {recentPost.title}
                          </h5>
                          <span className={styles.recentPostDate}>
                            {recentPost.date}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* === MOST VIEWED POSTS === */}
              {mostViewedPosts.length > 0 && (
                <div className={styles.sidebarSection}>
                  <h4 className={styles.sidebarTitle}>Most Viewed Blogs</h4>
                  <ul className={styles.recentPostsList}>
                    {mostViewedPosts.map((viewedPost) => (
                      <li key={viewedPost.id} className={styles.recentPostItem}>
                        <Link
                          href={`/blog/${viewedPost.slug}`}
                          className={styles.recentPostLink}
                        >
                          <div className={styles.recentPostImage}>
                            <CachedBlogImage
                              src={viewedPost.image || ""}
                              alt={viewedPost.title}
                              width={80}
                              height={60}
                              className={styles.recentPostImg}
                              sizes="80px"
                            />
                          </div>
                          <div className={styles.recentPostContent}>
                            <h5 className={styles.recentPostTitle}>
                              {viewedPost.title}
                            </h5>
                            <span className={styles.recentPostDate}>
                              {viewedPost.date}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              </aside>
            </div>

            {/* === MAIN CONTENT === */}
            <div className={styles.mainContentWrapper}>
              {/* === ARTICLE CONTENT === */}
            <article
              className={styles.content}
              itemScope
              itemType="https://schema.org/Article"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
            </div>
          </div>

        {/* === BOTTOM SOCIAL SHARE === */}
        <div className={styles.bottomShareSection}>
          <h4 className={styles.sidebarTitle}></h4>
          <div className={styles.socialShare}>
            <button
              onClick={() => handleShare("facebook")}
              className={styles.socialButton}
              aria-label="Share on Facebook"
            >
              <FaFacebookF />
            </button>
            <button
              onClick={() => handleShare("twitter")}
              className={styles.socialButton}
              aria-label="Share on Twitter"
            >
              <FaTwitter />
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className={styles.socialButton}
              aria-label="Share on LinkedIn"
            >
              <FaLinkedinIn />
            </button>
          </div>
        </div>

          {/* === RELATED ARTICLES === */}
          {relatedArticles.length > 0 && (
            <section className={styles.relatedSection}>
              <h2 className={styles.relatedTitle}>Related Articles</h2>
              <div
                className={`${styles.relatedGrid} ${
                  relatedArticles.length > 3 ? styles.relatedGridScroll : ""
                }`}
              >
                {relatedArticles.map((relatedPost) => (
                  <article key={relatedPost.id} className={styles.relatedCard}>
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <div className={styles.relatedImage}>
                        <CachedBlogImage
                          src={relatedPost.image || ""}
                          alt={relatedPost.title}
                          width={400}
                          height={250}
                          className={styles.relatedImg}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        />
                      </div>
                      <div className={styles.relatedContent}>
                        <span className={styles.relatedCategory}>
                          {relatedPost.category}
                        </span>
                        <h3 className={styles.relatedCardTitle}>
                          {relatedPost.title}
                        </h3>
                        {relatedPost.excerpt && (
                          <p className={styles.relatedExcerpt}>
                            {relatedPost.excerpt}
                          </p>
                        )}
                        <div className={styles.relatedMeta}>
                          <span>{relatedPost.date}</span>
                          <span>•</span>
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* === CTA === */}
          <div className={styles.ctaBox}>
            <h3>Ready to accelerate your job search?</h3>
            <p>
              Join thousands of international students landing their dream jobs
              in the U.S.
            </p>
            <a
              href="https://www.flashfirejobs.com"
              target="_blank"

              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              Visit FlashFire Jobs
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

