"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./AuthorProfile.module.css";
import BlogCard from "./blogCard";

type Author = {
  name: string;
  bio?: string;
  image?: string;
};

type BlogPost = {
  id: number;
  slug?: string;
  title: string;
  excerpt?: string;
  date?: string;
  readTime?: string;
  category?: string;
  image?: string;
  author?: Author;
};

type AuthorProfileProps = {
  author: Author;
  posts: BlogPost[];
};

export default function AuthorProfile({ author, posts }: AuthorProfileProps) {
  // Generate author slug for URL
  const authorSlug = author.name.replace(/\s+/g, "-").toLowerCase();
  const authorHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll down slightly after page load to ensure full title is visible
    const scrollToAuthorHeader = () => {
      if (authorHeaderRef.current) {
        const headerTop = authorHeaderRef.current.getBoundingClientRect().top;
        const scrollOffset = 100; // Adjust this value to control how much to scroll down
        const targetScroll = window.scrollY + headerTop - scrollOffset;
        window.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
      }
    };

    // Small delay to ensure page is fully rendered
    setTimeout(scrollToAuthorHeader, 100);
  }, []);

  return (
    <div className={styles.authorPageWrapper}>
      <div className={styles.authorContainer}>
        {/* === AUTHOR PROFILE CARD === */}
        <div className={styles.authorCard}>
          {/* === TOP SECTION WITH PROFILE === */}
          <div ref={authorHeaderRef} className={styles.authorHeader}>
            <div className={styles.authorImageWrapper}>
              {author.image ? (
                <Image
                  src={author.image}
                  alt={author.name}
                  width={120}
                  height={120}
                  className={styles.authorImage}
                />
              ) : (
                <div className={styles.authorImagePlaceholder}>
                  {author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
              )}
            </div>
            <div className={styles.authorHeaderInfo}>
              <h1 className={styles.authorName}>{author.name}</h1>
              <p className={styles.authorTitle}>Content Writer</p>
            </div>
          </div>

          {/* === ABOUT SECTION === */}
          <div className={styles.authorAbout}>
            <h2 className={styles.aboutTitle}>About</h2>
            <p className={styles.aboutText}>
              {author.bio || `Expert content writer sharing insights and expertise.`}
            </p>
            <p className={styles.aboutText}>
              Strong education professional with expertise in career development and job search strategies. 
              Specialized knowledge in helping international students and professionals navigate the U.S. job market.
            </p>
            <p className={styles.aboutText}>
              Experienced career advisor with a demonstrated history of working with job seekers, 
              international students, and professionals across various industries. Skilled in resume optimization, 
              interview preparation, and strategic career planning.
            </p>
            <p className={styles.aboutText}>
              Published {posts.length} {posts.length === 1 ? 'article' : 'articles'} on Flashfire Blog, 
              sharing practical insights and proven strategies to help job seekers succeed in their career journey.
            </p>
          </div>
        </div>

        {/* === AUTHOR'S ARTICLES === */}
        <div className={styles.articlesSection}>
          <h2 className={styles.articlesTitle}>
            Articles by {author.name}
          </h2>
          <div className={styles.articlesGrid}>
            {posts.filter((post) => post.slug).map((post) => (
              <BlogCard key={post.id} blog={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

