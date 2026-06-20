"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface CachedBlogImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  itemProp?: string;
}

// Generate a low-quality placeholder data URL
const generatePlaceholder = (width: number, height: number): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Create a subtle gradient placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  return canvas.toDataURL();
};

export default function CachedBlogImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  itemProp,
}: CachedBlogImageProps) {
  const [cachedSrc, setCachedSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCached, setIsCached] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Priority images are always "in view"
  const [placeholder, setPlaceholder] = useState<string | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only set mounted after component is fully mounted
    if (typeof window !== 'undefined') {
      setIsMounted(true);
      // Generate placeholder immediately
      if (!priority) {
        setPlaceholder(generatePlaceholder(width, height));
      }
    }
  }, [width, height, priority]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!isMounted || priority || typeof window === 'undefined' || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isMounted, priority]);

  useEffect(() => {
    // Never access imageCache during SSR or before mount
    // Only load if in view (or priority)
    if (!isMounted || !isInView || typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    let blobUrl: string | null = null;
    let isCancelled = false;

    // Load cached image immediately when in view
    const loadCachedImage = async () => {
      try {
        // Double-check we're on client side
        if (typeof window === 'undefined' || isCancelled) return;
        
        // Dynamically import imageCache only on client side to avoid SSR issues
        const { imageCache } = await import("@/src/utils/imageCache");
        
        // Try to get from cache first - this is instant for cached images
        const cached = await imageCache.getImage(src);
        
        if (isCancelled) return;
        
        if (cached) {
          // Cache hit - instant display!
          setCachedSrc(cached);
          setIsCached(true);
          setIsLoading(false);
          blobUrl = cached;
        } else {
          // Cache miss - load normally
          setIsCached(false);
          // Keep loading state true until image loads
          
          // Preload and cache in background (non-blocking)
          if (!isCancelled) {
            // Start caching immediately but don't block render
            imageCache.preloadImage(src).catch(() => {
              // Silently fail preload
            });
          }
        }
      } catch (error) {
        if (!isCancelled) {
          console.warn('Failed to load cached image:', error);
          setIsCached(false);
          setIsLoading(false);
        }
      }
    };

    // For priority images, load immediately
    // For lazy images, load when in view
    if (priority) {
      // Priority: load immediately but don't block
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(loadCachedImage, { timeout: 100 });
      } else {
        setTimeout(loadCachedImage, 0);
      }
    } else {
      // Lazy: load when in view
      loadCachedImage();
    }

    // Cleanup blob URL on unmount
    return () => {
      isCancelled = true;
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [src, priority, isMounted, isInView]);

  // During SSR or before mount, show placeholder
  if (!isMounted) {
    return (
      <div
        ref={imgRef}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f3f4f6',
          backgroundImage: placeholder ? `url(${placeholder})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label={alt}
      />
    );
  }

  // Show placeholder while loading or not in view
  if (!isInView || (isLoading && !cachedSrc)) {
    return (
      <div
        ref={imgRef}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f3f4f6',
          backgroundImage: placeholder ? `url(${placeholder})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-label={alt}
      >
        {/* Subtle shimmer effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
          `
        }} />
      </div>
    );
  }

  // If we have a cached blob URL, use regular img tag (Next.js Image doesn't work well with blob URLs)
  if (isCached && cachedSrc) {
    return (
      <div ref={imgRef} className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
        <img
          src={cachedSrc}
          alt={alt}
          width={width}
          height={height}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            display: 'block',
          }}
          loading={priority ? "eager" : "lazy"}
          itemProp={itemProp}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setIsCached(false);
          }}
        />
      </div>
    );
  }

  // Otherwise use Next.js Image for optimization
  return (
    <div ref={imgRef} className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        quality={85}
        sizes={sizes}
        itemProp={itemProp}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  );
}
