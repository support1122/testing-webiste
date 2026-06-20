"use client";

import { useEffect, useRef } from "react";
import { ALL_REVIEW_IMAGES } from "./homePageHappyUsers";

// Video profile images
const VIDEO_PROFILE_IMAGES = [
  "https://res.cloudinary.com/drcka8x04/image/upload/f_auto,q_auto:good,w_800,c_limit,dpr_auto/v1766552896/website_thumbnails-19_imnzdt.jpg",
  "https://res.cloudinary.com/drcka8x04/image/upload/f_auto,q_auto:good,w_800,c_limit,dpr_auto/v1766552897/website_thumbnails-20_bxnl2z.jpg",
  "https://res.cloudinary.com/drcka8x04/image/upload/f_auto,q_auto:good,w_800,c_limit,dpr_auto/v1766552895/website_thumbnails-18_j1ormv.jpg",
];

const VIDEO_SMALL_PROFILE_IMAGES = [
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/anjali.jpeg",
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/rijul.jpg",
  "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aryan.jpg",
];

export default function TestimonialImagePreloader() {
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || hasStartedRef.current) return;
    hasStartedRef.current = true;

    const preloadTestimonialImages = async () => {
      try {
        const { imageCache } = await import("@/src/utils/imageCache");
        
        // Convert relative paths to absolute URLs
        const reviewImageUrls = ALL_REVIEW_IMAGES.map(img => 
          img.startsWith('/') ? `${window.location.origin}${img}` : img
        );
        
        // Combine all testimonial images
        const allTestimonialImages = [
          ...reviewImageUrls,
          ...VIDEO_PROFILE_IMAGES,
          ...VIDEO_SMALL_PROFILE_IMAGES,
        ];

        if (allTestimonialImages.length === 0) return;

        // Prioritize: Load first 12 images immediately (above the fold)
        const priorityImages = allTestimonialImages.slice(0, 12);
        const remainingImages = allTestimonialImages.slice(12);

        // Start preloading priority images immediately
        if (priorityImages.length > 0) {
          const loadPriority = () => {
            imageCache.preloadImages(priorityImages, 4).catch(() => {
              // Silently fail
            });
          };

          if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(loadPriority, { timeout: 200 });
          } else {
            setTimeout(loadPriority, 50);
          }
        }

        // Load remaining images after page is interactive
        if (remainingImages.length > 0) {
          const loadRemaining = () => {
            imageCache.preloadImages(remainingImages, 3).catch(() => {
              // Silently fail
            });
          };

          if (document.readyState === 'complete') {
            const runOnIdle = (callback: () => void) => {
              if ('requestIdleCallback' in window) {
                (window as any).requestIdleCallback(callback, { timeout: 1500 });
              } else {
                setTimeout(callback, 500);
              }
            };
            runOnIdle(loadRemaining);
          } else {
            window.addEventListener('load', () => {
              const runOnIdle = (callback: () => void) => {
                if ('requestIdleCallback' in window) {
                  (window as any).requestIdleCallback(callback, { timeout: 1500 });
                } else {
                  setTimeout(callback, 500);
                }
              };
              runOnIdle(loadRemaining);
            }, { once: true });
          }
        }
      } catch (error) {
        console.warn('Failed to preload testimonial images:', error);
      }
    };

    // Start immediately
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', preloadTestimonialImages, { once: true });
    } else {
      preloadTestimonialImages();
    }
  }, []);

  return null;
}
