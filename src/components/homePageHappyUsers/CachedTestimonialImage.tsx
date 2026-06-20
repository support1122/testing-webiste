"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface CachedTestimonialImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onClick?: () => void;
}

// Generate a low-quality placeholder data URL
const generatePlaceholder = (width: number, height: number): string => {
  if (typeof window === 'undefined') return '';
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

export default function CachedTestimonialImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  onClick,
}: CachedTestimonialImageProps) {
  const [cachedSrc, setCachedSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCached, setIsCached] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [placeholder, setPlaceholder] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
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
        rootMargin: '100px', // Start loading 100px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isMounted, priority]);

  useEffect(() => {
    if (!isMounted || !isInView || typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    let blobUrl: string | null = null;
    let isCancelled = false;

    const loadCachedImage = async () => {
      try {
        if (typeof window === 'undefined' || isCancelled) return;
        
        const { imageCache } = await import("@/src/utils/imageCache");
        
        // Convert relative paths to absolute URLs for caching
        const imageUrl = src.startsWith('/') ? `${window.location.origin}${src}` : src;
        
        // Try to get from cache first
        const cached = await imageCache.getImage(imageUrl);
        
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
          
          // Preload and cache in background (non-blocking)
          if (!isCancelled) {
            imageCache.preloadImage(imageUrl).catch(() => {
              // Silently fail preload
            });
          }
        }
      } catch (error) {
        if (!isCancelled) {
          console.warn('Failed to load cached testimonial image:', error);
          setIsCached(false);
          setIsLoading(false);
        }
      }
    };

    if (priority) {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(loadCachedImage, { timeout: 50 });
      } else {
        setTimeout(loadCachedImage, 0);
      }
    } else {
      loadCachedImage();
    }

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

  // If we have a cached blob URL, use regular img tag
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
            height: 'auto',
            objectFit: 'contain',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            display: 'block',
            cursor: onClick ? 'pointer' : 'default',
          }}
          loading={priority ? "eager" : "lazy"}
          onClick={onClick}
          onLoad={() => {
            setIsLoading(false);
            setHasError(false);
          }}
          onError={() => {
            setIsLoading(false);
            setIsCached(false);
            setHasError(true);
          }}
        />
      </div>
    );
  }

  // Check if it's an external URL (not starting with /)
  const isExternalUrl = !src.startsWith('/');
  
  // If there's an error and it's an external URL, use regular img tag as fallback
  if (hasError && isExternalUrl) {
    return (
      <div ref={imgRef} className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          onClick={onClick}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            cursor: onClick ? 'pointer' : 'default',
          }}
          onLoad={() => {
            setIsLoading(false);
            setHasError(false);
          }}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
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
        unoptimized={isExternalUrl}
        onClick={onClick}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
          cursor: onClick ? 'pointer' : 'default',
        }}
        onLoad={() => {
          setIsLoading(false);
          setHasError(false);
        }}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
}
