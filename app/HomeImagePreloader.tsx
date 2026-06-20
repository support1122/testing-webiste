"use client";

import { useEffect } from "react";

// Video profile images from homepage - base URLs (will be optimized)
const VIDEO_PROFILE_IMAGES = [
  {
    profileImage: "https://res.cloudinary.com/drcka8x04/image/upload/f_auto,q_auto:good,w_800,c_limit,dpr_auto/v1766552896/website_thumbnails-19_imnzdt.jpg",
    smallProfileImage: "https://res.cloudinary.com/drcka8x04/image/upload/c_thumb,g_face,w_100,h_100,f_auto,q_auto:good/v1766552896/website_thumbnails-19_imnzdt.jpg"
  },
  {
    profileImage: "https://res.cloudinary.com/drcka8x04/image/upload/f_auto,q_auto:good,w_800,c_limit,dpr_auto/v1766552897/website_thumbnails-20_bxnl2z.jpg",
    smallProfileImage: "https://res.cloudinary.com/drcka8x04/image/upload/c_thumb,g_face,w_100,h_100,f_auto,q_auto:good/v1766552897/website_thumbnails-20_bxnl2z.jpg"
  },
  {
    profileImage: "https://res.cloudinary.com/drcka8x04/image/upload/f_auto,q_auto:good,w_800,c_limit,dpr_auto/v1766552895/website_thumbnails-18_j1ormv.jpg",
    smallProfileImage: "https://res.cloudinary.com/drcka8x04/image/upload/c_thumb,g_face,w_100,h_100,f_auto,q_auto:good/v1766552895/website_thumbnails-18_j1ormv.jpg"
  },
];

const optimizeCloudinaryUrl = (url: string, width: number = 1200) => {
  if (url.includes('res.cloudinary.com')) {
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      // Extract just the image path (everything after the last slash in parts[1])
      const pathParts = parts[1].split('/');
      const imagePath = pathParts[pathParts.length - 1];
      // Reconstruct with optimized parameters
      return `${parts[0]}/upload/f_auto,q_auto:best,w_${width},c_limit,dpr_auto/${imagePath}`;
    }
  }
  return url;
};

export default function HomeImagePreloader() {
  useEffect(() => {
    // Preconnect to Cloudinary for faster image loading
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://res.cloudinary.com';
    document.head.appendChild(preconnect);

    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = 'https://res.cloudinary.com';
    document.head.appendChild(dnsPrefetch);

    // Preload video profile images immediately for instant display
    // Use same optimization as component to ensure cache hits
    VIDEO_PROFILE_IMAGES.forEach((video) => {
      const profileImageUrl = optimizeCloudinaryUrl(video.profileImage, 800);
      const smallProfileImageUrl = optimizeCloudinaryUrl(video.smallProfileImage, 100);
      
      // Preload large profile images
      const profileLink = document.createElement('link');
      profileLink.rel = 'preload';
      profileLink.as = 'image';
      profileLink.href = profileImageUrl;
      profileLink.crossOrigin = 'anonymous';
      document.head.appendChild(profileLink);

      // Preload small profile images
      const smallProfileLink = document.createElement('link');
      smallProfileLink.rel = 'preload';
      smallProfileLink.as = 'image';
      smallProfileLink.href = smallProfileImageUrl;
      smallProfileLink.crossOrigin = 'anonymous';
      document.head.appendChild(smallProfileLink);

      // Also preload actual images to browser cache for instant display
      const profileImg = new window.Image();
      profileImg.src = profileImageUrl;
      profileImg.loading = 'eager';

      const smallProfileImg = new window.Image();
      smallProfileImg.src = smallProfileImageUrl;
      smallProfileImg.loading = 'eager';
    });

    return () => {
      // Cleanup is handled automatically by browser
    };
  }, []);

  return null; // This component doesn't render anything
}

