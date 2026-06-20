"use client";

import { useEffect } from "react";
import { ALL_REVIEW_IMAGES } from "@/src/components/homePageHappyUsers/homePageHappyUsers";

export default function ImagePreloader() {
  useEffect(() => {
    const criticalImages = ALL_REVIEW_IMAGES.slice(0, 12);
    criticalImages.forEach((imageSrc) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = imageSrc;
      link.setAttribute('fetchpriority', 'high');
      document.head.appendChild(link);
    });

    const remainingImages = ALL_REVIEW_IMAGES.slice(12);
    remainingImages.forEach((imageSrc, index) => {
      setTimeout(() => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'image';
        link.href = imageSrc;
        document.head.appendChild(link);
      }, index * 50); // 50ms delay between each prefetch
    });
  }, []);

  return null; // This component doesn't render anything
}

