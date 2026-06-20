"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { ALL_REVIEW_IMAGES } from "./homePageHappyUsers";
import CachedTestimonialImage from "./CachedTestimonialImage";
import HomePageMilestones from "@/src/components/homePageMilestones/homePageMilestones";
import HomePageDemoCTA from "@/src/components/homePageDemoCTA/homePageDemoCTA";

const videos = [
  {
    videoUrl: "https://www.youtube.com/embed/p41OvikonKo",
    name: "Anjali Shah",
    company: "Skyworks Solutions, Inc.",
    linkedinUrl: "https://www.linkedin.com/in/anjalishah6198/",
    profileImage: "https://res.cloudinary.com/drcka8x04/image/upload/f_auto,q_auto:good,w_800,c_limit,dpr_auto/v1766552896/website_thumbnails-19_imnzdt.jpg",
    smallProfileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/anjali.jpeg",
  },
  {
    videoUrl: "https://www.youtube.com/embed/nYEO8K0q38c",
    name: "Rijul Jain",
    company: "Wise",
    linkedinUrl: "https://www.linkedin.com/in/-rijuljain-/",
    profileImage: "https://res.cloudinary.com/drcka8x04/image/upload/f_auto,q_auto:good,w_800,c_limit,dpr_auto/v1766552897/website_thumbnails-20_bxnl2z.jpg",
    smallProfileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/rijul.jpg"
  },
  {
    videoUrl: "https://www.youtube.com/embed/p9kzhLHjJuI",
    name: "Aryan Gupta",
    company: "IBM",
    linkedinUrl: "#",
    profileImage: "https://res.cloudinary.com/drcka8x04/image/upload/f_auto,q_auto:good,w_800,c_limit,dpr_auto/v1766552895/website_thumbnails-18_j1ormv.jpg",
    smallProfileImage: "https://pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev/aryan.jpg"
  },
];

export default function HappyUsersGalleryPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Only load first 12 images immediately (above the fold)
  const INITIAL_LOAD_COUNT = 12;

  useEffect(() => {
    // Load first batch immediately
    const initialSet = new Set<number>();
    for (let i = 0; i < Math.min(INITIAL_LOAD_COUNT, ALL_REVIEW_IMAGES.length); i++) {
      initialSet.add(i);
    }
    setVisibleImages(initialSet);
  }, []);

  // Intersection Observer for lazy loading - limits concurrent loads to prevent hang
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            if (!visibleImages.has(index)) {
              // Use requestIdleCallback to avoid blocking main thread
              if ('requestIdleCallback' in window) {
                (window as any).requestIdleCallback(() => {
                  setVisibleImages(prev => new Set(prev).add(index));
                }, { timeout: 100 });
              } else {
                setTimeout(() => {
                  setVisibleImages(prev => new Set(prev).add(index));
                }, 50);
              }
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: '200px', // Start loading 200px before image enters viewport
        threshold: 0.01
      }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      imageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [visibleImages]);

  const handlePlay = (index: number) => {
    setPlayingIndex(index);
  };

  const handleImageClick = (index: number) => {
    setImageLoading(true);
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
    setImageLoading(false);
  };

  // Close modal on ESC key press
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImageIndex !== null) {
        setSelectedImageIndex(null);
      }
    };

    if (selectedImageIndex !== null) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedImageIndex]);

  return (
    <div className="font-['Space_Grotesk',sans-serif]">
      {/* Image Testimonials Section */}
      <section className="bg-[#F55E1D] py-24 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="mb-6 text-5xl  font-bold text-white">
            All Happy User&rsquo;s Testimonials
          </h1>
          <p className="mb-6 text-base md:text-lg text-white">
            We've helped hundreds get there — and there's absolutely no reason you won't be next.
          </p>

          <div className="columns-4 gap-4 max-w-[1100px] mx-auto max-[1200px]:columns-4 max-[900px]:columns-3 max-[600px]:columns-2 max-[400px]:columns-1">
            {ALL_REVIEW_IMAGES.map((imageSrc, i) => {
              const isEager = i < INITIAL_LOAD_COUNT;
              
              return (
                <div
                  key={i}
                  ref={(el) => {
                    imageRefs.current[i] = el;
                  }}
                  data-index={i}
                  className="inline-block w-full mb-4 [break-inside:avoid] rounded-[0.6rem] overflow-hidden bg-[#fffaf8] shadow-[0_3px_10px_rgba(0,0,0,0.25)] cursor-pointer hover:shadow-[0_5px_15px_rgba(0,0,0,0.35)] transition-all duration-300"
                  onClick={() => handleImageClick(i)}
                >
                  <CachedTestimonialImage
                    src={imageSrc}
                    alt={`Flashfire user review ${i + 1}`}
                    width={400}
                    height={600}
                    className="w-full h-auto object-contain block rounded-[0.4rem]"
                    priority={isEager}
                    sizes="(max-width: 400px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    onClick={() => handleImageClick(i)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Modal/Lightbox */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-200 z-10"
            aria-label="Close image"
          >
            ✕
          </button>
          <div
            className="relative max-w-[90vw] max-h-[90vh] w-auto h-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
            <Image
              src={ALL_REVIEW_IMAGES[selectedImageIndex]}
              alt={`Flashfire user review ${selectedImageIndex + 1}`}
              width={1200}
              height={1800}
              className={`max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              style={{ width: "auto", height: "auto" }}
              onLoad={() => setImageLoading(false)}
              priority
              quality={90}
            />
          </div>
        </div>
      )}

      {/* Video Testimonials Section */}
      <section className="bg-[#f9c0a9] py-24 px-8 pb-20 text-center w-full max-[768px]:py-16 max-[768px]:px-4">
        {/* <h2 className="text-4xl font-bold mb-12 text-black max-[768px]:text-3xl">
          Video Testimonials
        </h2> */}
        <div className="flex justify-center items-stretch flex-nowrap gap-6 w-full max-[768px]:flex-col max-[768px]:items-center max-[768px]:gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
              className="relative w-80 h-[32rem] rounded-none overflow-hidden bg-[#fffaf8] p-2 shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-all duration-300 flex-shrink-0 hover:shadow-[0_14px_28px_rgba(0,0,0,0.3)] max-[768px]:w-full max-[768px]:max-w-[30rem] max-[768px]:h-[calc(100vh-8rem)] max-[480px]:max-w-full"
            >
              <div className="relative w-full h-full rounded-none overflow-hidden">
                {/* YouTube Video Embed - Show when playing */}
                {playingIndex === index && (
                  <>
                    <iframe
                      id={`userVideo-${index}`}
                      src={`${video.videoUrl}?autoplay=1&rel=0`}
                      className="w-full h-full object-cover block rounded-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    />
                    {/* Close Button */}
                    <button
                      onClick={() => setPlayingIndex(null)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 z-30"
                      aria-label="Close video"
                    >
                      ✕
                    </button>
                  </>
                )}

                {/* Thumbnail Image Overlay - Show when video is not playing */}
                {playingIndex !== index && (
                  <>
                    <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                      <CachedTestimonialImage
                        src={video.profileImage}
                        alt={`${video.name} - Click to play video`}
                        width={800}
                        height={1280}
                        className="w-full h-full object-cover rounded-none cursor-pointer"
                        onClick={() => handlePlay(index)}
                        priority
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    </div>
                    {/* Play Button Overlay */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] rounded-full bg-black/60 text-white text-[2rem] font-bold flex justify-center items-center cursor-pointer transition-all duration-250 backdrop-blur-[2px] hover:bg-black/75 hover:scale-105 z-10"
                      onClick={() => handlePlay(index)}
                    >
                      ▶
                    </div>
                  </>
                )}

                {/* User Info - Always visible, overlaid on video */}
                <div className="absolute bottom-2 left-2 right-2 h-[5.5rem] bg-black border border-[#ff4c00] text-white text-left py-3 px-4 flex items-center z-20">
                  <div className="flex items-center gap-3 w-full h-full">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/50">
                      <Image
                        src={(video as any).smallProfileImage || video.profileImage}
                        alt={video.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover rounded-full"
                        unoptimized
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <p className="text-xl font-semibold m-0 text-white leading-tight truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {video.name}
                      </p>
                      <p className="text-sm m-0 text-white/90 leading-tight mt-0.5 truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {video.company}
                      </p>
                    </div>
                    <a
                      href={video.linkedinUrl !== "#" ? video.linkedinUrl : "#"}
                      target={video.linkedinUrl !== "#" ? "_blank" : undefined}
                      rel={
                        video.linkedinUrl !== "#"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={`flex-shrink-0 w-6 h-6 bg-white rounded flex items-center justify-center transition-colors ${
                        video.linkedinUrl !== "#"
                          ? "hover:bg-[#ff4c00] cursor-pointer"
                          : "cursor-default opacity-50"
                      }`}
                      aria-label="LinkedIn Profile"
                      onClick={(e) => {
                        if (video.linkedinUrl === "#") {
                          e.preventDefault();
                        }
                      }}
                    >
                      <svg
                        className="w-4 h-4 text-black"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones Section */}
      <section className="bg-white">
        <HomePageMilestones />
      </section>

      {/* Demo CTA Section - At the end */}
      <section className="bg-white">
        <HomePageDemoCTA />
      </section>
    </div>
  );
}


