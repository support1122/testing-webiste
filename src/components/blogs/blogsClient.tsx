"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./blogs.module.css";
import BlogCard from "./blogCard";
import { blogPosts } from "@/src/data/blogsData";
import { FaSearch } from "react-icons/fa";
import { categoryToSlug, slugToCategory, tagToSlug, slugToTag } from "@/src/utils/blogCategoryUtils";

type BlogsClientProps = {
  categorySlug?: string;
  tagSlug?: string;
};


type BlogPostWithOptionalMeta = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  lastUpdated?: string;
  readTime: string;
  category: string;
  tags?: string[];
  author: {
    name: string;
    bio: string;
  };
  image: string;
  categoryColor: string;
  content: string;
};

// Function to generate default tags based on category and content
function getDefaultTags(category: string, title: string, excerpt: string): string[] {
  const categoryTags: Record<string, string[]> = {
    "Career Advice": ["Career Tips", "Job Search", "Professional Development"],
    "Job Search Strategy": ["Job Search", "Career Strategy", "Job Hunting"],
    "Success Stories": ["Success Stories", "Career Growth", "Job Search"],
  };

  // Extract keywords from title and excerpt to determine relevant tags
  const content = (title + " " + excerpt).toLowerCase();
  const relevantTags: string[] = [];

  // Add tags based on content analysis
  if (content.includes("resume") || content.includes("cv") || content.includes("curriculum vitae")) {
    relevantTags.push("Resume Writing");
  }
  if (content.includes("ats") || content.includes("applicant tracking") || content.includes("keyword")) {
    relevantTags.push("ATS Optimization");
  }
  if (content.includes("interview") || content.includes("interviewing")) {
    relevantTags.push("Interview Preparation");
  }
  if (content.includes("job search") || content.includes("job hunting") || content.includes("applying")) {
    relevantTags.push("Job Search");
  }
  if (content.includes("career") || content.includes("professional") || content.includes("growth")) {
    relevantTags.push("Career Tips");
  }

  // Add category-specific tags
  const categorySpecificTags = categoryTags[category] || ["Career Tips", "Job Search"];
  
  // Merge and remove duplicates
  const allTags = [...new Set([...relevantTags, ...categorySpecificTags])];
  return allTags.length > 0 ? allTags : ["Career Tips", "Job Search"]; // Fallback if no tags found
}

// Lazy computation of blogs with tags - only compute when needed
let blogsWithTagsCache: BlogPostWithOptionalMeta[] | null = null;

function getBlogsWithTags(): BlogPostWithOptionalMeta[] {
  if (blogsWithTagsCache) {
    return blogsWithTagsCache;
  }
  
  // Compute only once and cache
  const baseBlogs = blogPosts as unknown as BlogPostWithOptionalMeta[];

  blogsWithTagsCache = baseBlogs.map((blog) => {
    const existingTags = blog.tags && blog.tags.length > 0 ? blog.tags : [];
    
    // Always include the blog's category as a tag for filtering
    const categoryTag = blog.category ? [blog.category] : [];
    
    // Merge existing tags with category tag
    const mergedTags = [...new Set([...existingTags, ...categoryTag])];
    
    // If blog already had tags, return with category added
    if (existingTags.length > 0) {
      return {
        ...blog,
        tags: mergedTags,
      };
    }
    
    // If blog has no tags, generate relevant tags based on content
    const defaultTags = getDefaultTags(blog.category, blog.title, blog.excerpt || "");
    // Merge generated tags with category tag
    const allTags = [...new Set([...defaultTags, ...categoryTag])];
    return {
      ...blog,
      tags: allTags,
    };
  });
  
  return blogsWithTagsCache;
}

export default function BlogsClient({ categorySlug, tagSlug }: BlogsClientProps = {}) {
  const searchParams = useSearchParams();
  const tagParam = searchParams.get("tag");
  const categoryParam = searchParams.get("category");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Decode and normalize tag from URL (prioritize tagSlug prop over query param)
  const decodedTag = useMemo(() => {
    if (tagSlug) {
      return slugToTag(tagSlug);
    }
    if (!tagParam) return "";
    return decodeURIComponent(tagParam.replace(/\+/g, " ")).trim();
  }, [tagSlug, tagParam]);

  // Decode and normalize category from URL (prioritize categorySlug prop over query param)
  const decodedCategory = useMemo(() => {
    if (categorySlug) {
      return slugToCategory(categorySlug);
    }
    if (!categoryParam) return "";
    try {
      const decoded = decodeURIComponent(categoryParam.replace(/\+/g, "%20"));
      const slug = decoded.toLowerCase().trim();
      return slugToCategory(slug);
    } catch (error) {
      return categoryParam.toLowerCase().trim();
    }
  }, [categorySlug, categoryParam]);

  // Lazy load blogs with tags
  const blogsWithTags = useMemo(() => getBlogsWithTags(), []);

  // All unique categories for chip display
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    blogsWithTags.forEach((blog) => {
      if (blog.category) {
        set.add(blog.category);
      }
    });
    return Array.from(set);
  }, [blogsWithTags]);

  // Helper function to parse date string (e.g., "Jan 15, 2025") to Date object
  const parseDate = (dateString: string): Date => {
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        // Return very old date for invalid dates (will appear at bottom)
        return new Date(0);
      }
      return date;
    } catch {
      // Fallback to very old date for invalid dates (will appear at bottom)
      return new Date(0);
    }
  };

  // Filter and sort blogs by date (newest first) - optimized for performance
  const filteredBlogs = useMemo(() => {
    const normalizedCategory = decodedCategory.toLowerCase().trim();
    const normalizedTag = decodedTag.toLowerCase().trim();
    const normalizedSearch = searchQuery.toLowerCase().trim();

    // Early return if no filters
    if (!normalizedCategory && !normalizedTag && !normalizedSearch) {
      // Just sort all blogs - no filtering needed
      return [...blogsWithTags].sort((a, b) => {
        const dateA = parseDate(a.lastUpdated || a.date);
        const dateB = parseDate(b.lastUpdated || b.date);
        return dateB.getTime() - dateA.getTime();
      });
    }

    // Priority: category filter, then tag filter, else all
    let base = blogsWithTags;

    if (normalizedCategory) {
      base = base.filter((blog) =>
        blog.category.toLowerCase() === normalizedCategory // Exact match
      );
    } else if (normalizedTag) {
      base = base.filter((blog) => {
        if (!blog.tags || blog.tags.length === 0) return false;
        return blog.tags.some((tag) => {
          if (!tag) return false;
          const normalizedBlogTag = tag.toLowerCase().trim();
          // Exact match for precise filtering
          return normalizedBlogTag === normalizedTag;
        });
      });
    }

    if (normalizedSearch) {
      // Split search query into individual words for better matching
      const searchWords = normalizedSearch.split(/\s+/).filter(word => word.length > 0);
      
      base = base.filter((blog) => {
        const blogTitle = blog.title.toLowerCase();
        const blogExcerpt = (blog.excerpt || "").toLowerCase();
        const blogCategory = blog.category.toLowerCase();
        const blogTags = (blog.tags || []).map(tag => tag ? tag.toLowerCase() : "").filter(tag => tag.length > 0);
        
        // Check if any search word matches in any of the fields
        return searchWords.some(word => {
          // Search in title (most important for "blog names")
          if (blogTitle.includes(word)) return true;
          
          // Search in excerpt
          if (blogExcerpt.includes(word)) return true;
          
          // Search in category
          if (blogCategory.includes(word)) return true;
          
          // Search in tags
          if (blogTags.some(tag => tag.includes(word))) return true;
          
          return false;
        });
      });
    }

    // Sort by date (newest first) - use lastUpdated if available, otherwise use date
    // This ensures the latest blogs appear at the top of the list
    const sorted = [...base].sort((a, b) => {
      const dateA = parseDate(a.lastUpdated || a.date);
      const dateB = parseDate(b.lastUpdated || b.date);
      // Descending order: newest dates first (larger timestamp - smaller timestamp)
      return dateB.getTime() - dateA.getTime();
    });

    return sorted;
  }, [decodedCategory, decodedTag, searchQuery, blogsWithTags]);

  // Scroll to header title when category or tag changes
  useEffect(() => {
    const scrollToHeader = () => {
      const headerElement = document.querySelector(`.${styles.header}`);
      if (headerElement) {
        const stickyNavbar = document.querySelector('.sticky.top-0') || 
                            document.querySelector('nav');
        const navbarHeight = stickyNavbar ? stickyNavbar.getBoundingClientRect().height : 0;
        const headerRect = headerElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const headerTop = headerRect.top + scrollTop;
        const offset = navbarHeight + 20; // Add extra 20px padding
        const targetScroll = Math.max(0, headerTop - offset);
        window.scrollTo({ top: targetScroll, behavior: 'instant' });
      } else {
        // Fallback to top if header not found
        const stickyNavbar = document.querySelector('.sticky.top-0') || 
                            document.querySelector('nav');
        const navbarHeight = stickyNavbar ? stickyNavbar.getBoundingClientRect().height : 0;
        const offset = navbarHeight + 20;
        window.scrollTo({ top: offset, behavior: 'instant' });
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      scrollToHeader();
      // Also scroll after a short delay to catch any late scrolls
      setTimeout(() => {
        scrollToHeader();
      }, 50);
    });
  }, [decodedCategory, decodedTag]);

  return (
    <section className={styles.blogsSection}>
      <header className={styles.header}>
        <h2>
          {decodedTag 
            ? `Blogs tagged: ${decodedTag}` 
            : decodedCategory 
            ? `Blogs in ${decodedCategory}` 
            : "Insights That Spark Career Growth."}
        </h2>
        <p>
          {decodedTag || decodedCategory ? (
            <>
              Showing {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? 's' : ''} 
              {decodedTag && ` tagged with "${decodedTag}"`}
              {decodedCategory && ` in "${decodedCategory}"`}
            </>
          ) : (
            <>
              Learn how to outsmart hiring systems, stand out to recruiters, and
              stay ahead with{" "}
              <span className={styles.highlight}>Flashfire's expert-backed</span>{" "}
              tips.
            </>
          )}
        </p>
      </header>

      {/* Search Bar */}
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBar}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search our blogs..."
            className={styles.searchInput}
            aria-label="Search blogs"
          />
          <button
            type="button"
            className={styles.searchButton}
            aria-label="Search"
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Category chips */}
      {allCategories.length > 0 && (
        <div className={styles.categoryChips}>
          <Link
            href="/blog"
            className={`${styles.categoryChip} ${
              !decodedCategory && !decodedTag ? styles.categoryChipActive : ""
            }`}
          >
            All Blogs
          </Link>
          {allCategories.map((cat) => {
            const isActive =
              decodedCategory &&
              decodedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <Link
                key={cat}
                href={`/blog/${categoryToSlug(cat)}`}
                className={`${styles.categoryChip} ${
                  isActive ? styles.categoryChipActive : ""
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      )}

      {filteredBlogs.length > 0 ? (
        <div className={styles.blogGrid}>
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        (decodedTag || decodedCategory || searchQuery) && (
          <div className={styles.noResults}>
            <p>
              {decodedTag && `No blogs found for tag: `}
              {decodedCategory && `No blogs found for category: `}
              {searchQuery && !decodedTag && !decodedCategory && `No blogs found for search: `}
              <strong>
                {decodedTag || decodedCategory || searchQuery}
              </strong>
            </p>
            <Link href="/blog" className={styles.clearFilterLink}>
              View all blogs
            </Link>
          </div>
        )
      )}
    </section>
  );
}
