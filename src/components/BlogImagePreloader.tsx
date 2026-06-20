"use client";

import { useEffect, useRef } from "react";
import { blogPosts } from "@/src/data/blogsData";

export default function BlogImagePreloader() {
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Only run once per session
    if (typeof window === 'undefined' || hasStartedRef.current) return;
    hasStartedRef.current = true;

    const preloadBlogImages = async () => {
      // Extract all unique blog image URLs (post-level only).
      // Author objects in blogsData currently don't include images, so we
      // intentionally do not access author.image here to keep types safe.
      const blogImageUrls = Array.from(
        new Set(
          blogPosts
            .map((post) => post.image)
            .filter((img): img is string => !!img)
        )
      );

      if (blogImageUrls.length === 0) return;

      try {
        const { imageCache } = await import("@/src/utils/imageCache");
        
        // Prioritize: Load first 6 images immediately (likely to be viewed first)
        const priorityImages = blogImageUrls.slice(0, 6);
        const remainingImages = blogImageUrls.slice(6);

        // Start preloading priority images immediately (non-blocking)
        if (priorityImages.length > 0) {
          // Use requestIdleCallback with shorter timeout for priority images
          const loadPriority = () => {
            imageCache.preloadImages(priorityImages, 3).catch(() => {
              // Silently fail
            });
          };

          if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(loadPriority, { timeout: 500 });
          } else {
            setTimeout(loadPriority, 100);
          }
        }

        // Load remaining images after a delay, in smaller batches
        if (remainingImages.length > 0) {
          const loadRemaining = () => {
            imageCache.preloadImages(remainingImages, 2).catch(() => {
              // Silently fail
            });
          };

          // Wait for page to be interactive before loading remaining
          if (document.readyState === 'complete') {
            // Use requestIdleCallback for remaining images
            const runOnIdle = (callback: () => void) => {
              if ('requestIdleCallback' in window) {
                (window as any).requestIdleCallback(callback, { timeout: 2000 });
              } else {
                setTimeout(callback, 1000);
              }
            };
            runOnIdle(loadRemaining);
          } else {
            window.addEventListener('load', () => {
              const runOnIdle = (callback: () => void) => {
                if ('requestIdleCallback' in window) {
                  (window as any).requestIdleCallback(callback, { timeout: 2000 });
                } else {
                  setTimeout(callback, 1000);
                }
              };
              runOnIdle(loadRemaining);
            }, { once: true });
          }
        }
      } catch (error) {
        console.warn('Failed to preload blog images:', error);
      }
    };

    // Start immediately - don't wait for page load
    // This allows images to start caching as soon as possible
    if (document.readyState === 'loading') {
      // If still loading, wait for DOMContentLoaded
      document.addEventListener('DOMContentLoaded', preloadBlogImages, { once: true });
    } else {
      // Already loaded or interactive
      preloadBlogImages();
    }
  }, []);

  return null; // This component doesn't render anything
}
