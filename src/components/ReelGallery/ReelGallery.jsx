"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGeoBypass } from "@/src/utils/useGeoBypass";
import { Play, X, ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react";

const reels = [
    {
        id: 1,
        url: "https://res.cloudinary.com/dcrj8p79e/video/upload/v1769255994/reel1_il5icu.mp4",
       
    },
    {
        id: 2,
        url: "https://res.cloudinary.com/dcrj8p79e/video/upload/v1769256004/reel2_cv2a7g.mp4",
       
    },
    {
        id: 3,
        url: "https://res.cloudinary.com/dcrj8p79e/video/upload/v1769426768/reel4_bpeots.mp4",
        
    },
];

export default function ReelGallery() {
    const [playingId, setPlayingId] = useState(null);
    const [popupDismissed, setPopupDismissed] = useState(false);
    const [popupCollapsed, setPopupCollapsed] = useState(false);
    const [expandedPopupId, setExpandedPopupId] = useState(null);
    const videoRefs = useRef({});
    const cardRefs = useRef({});
    const popupVideoRefs = useRef({});
    const expandedVideoRef = useRef(null);
    const popupRef = useRef(null);
    const pathname = usePathname();
    const safePathname = pathname || (typeof window !== "undefined" ? window.location.pathname : "") || "";

    const { getButtonProps } = useGeoBypass({
        onBypass: () => {
            if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("showCalendlyModal"));
            }
        },
    });

    const handleBookDemoClick = () => {
        if (typeof window === "undefined") return;
        sessionStorage.setItem("previousPageBeforeBookADemo", safePathname);
        const scrollY = window.scrollY || window.pageYOffset || 0;
        sessionStorage.setItem("preserveScrollPosition", scrollY.toString());
        window.dispatchEvent(new CustomEvent("showCalendlyModal"));
    };

    // Pause when clicking outside active card (ignore clicks inside popup)
    useEffect(() => {
        const handleGlobalClick = (e) => {
            if (!playingId) return;
            if (popupRef.current && popupRef.current.contains(e.target)) return;

            const activeCard = cardRefs.current[playingId];
            if (activeCard && !activeCard.contains(e.target)) {
                const video = videoRefs.current[playingId];
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
                setPlayingId(null);
            }
        };

        document.addEventListener("pointerdown", handleGlobalClick);
        return () =>
            document.removeEventListener("pointerdown", handleGlobalClick);
    }, [playingId]);

    // Auto-play muted popup previews when visible (not when expanded or collapsed)
    useEffect(() => {
        if (popupDismissed || expandedPopupId || popupCollapsed) {
            // Pause all previews when collapsed
            if (popupCollapsed) {
                reels.forEach((r) => {
                    const ref = popupVideoRefs.current[`popup-${r.id}`];
                    if (ref) {
                        ref.pause();
                        ref.currentTime = 0;
                    }
                });
            }
            return;
        }
        const timers = reels.map((r) => {
            const ref = popupVideoRefs.current[`popup-${r.id}`];
            if (!ref) return null;
            const t = setTimeout(() => {
                ref.play().catch(() => { });
            }, 300 + r.id * 100);
            return t;
        });
        return () => timers.forEach((t) => t != null && clearTimeout(t));
    }, [popupDismissed, expandedPopupId, popupCollapsed]);

    // Play expanded video when opened
    useEffect(() => {
        if (!expandedPopupId) return;
        reels.forEach((r) => {
            const ref = popupVideoRefs.current[`popup-${r.id}`];
            if (ref) {
                ref.pause();
                ref.currentTime = 0;
            }
        });
        const t = setTimeout(() => {
            const v = expandedVideoRef.current;
            if (v) v.play().catch(() => { });
        }, 100);
        return () => clearTimeout(t);
    }, [expandedPopupId]);

    const handlePlay = (id, fromPopup = false) => {
        if (fromPopup) {
            setExpandedPopupId(id);
            return;
        }
        if (playingId && playingId !== id) {
            const prevVideo = videoRefs.current[playingId];
            if (prevVideo) {
                prevVideo.pause();
                prevVideo.currentTime = 0;
            }
        }
        setPlayingId(id);
        requestAnimationFrame(() => {
            const video = videoRefs.current[id];
            if (video) video.play();
        });
    };

    const collapsePopup = () => {
        const v = expandedVideoRef.current;
        if (v) {
            v.pause();
            v.currentTime = 0;
        }
        setExpandedPopupId(null);
    };

    const handleCollapse = () => {
        // Pause expanded video if playing
        if (expandedPopupId) {
            const v = expandedVideoRef.current;
            if (v) {
                v.pause();
                v.currentTime = 0;
            }
            setExpandedPopupId(null);
        }
        setPopupCollapsed(true);
    };

    return (
        <section className="relative ">
            {/* <div className="max-w-7xl mx-auto px-6"> */}
                {/* <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">
            Watch Real Success Stories
          </h2>
          <p className="text-gray-600">
            See how real users are landing interviews using Flashfire.
          </p>
        </div> */}

                {/*  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reels.map((reel) => {
            const isPlaying = playingId === reel.id;

            return (
              <div
                key={reel.id}
                ref={(el) => (cardRefs.current[reel.id] = el)}
                className="relative rounded-xl overflow-hidden shadow-lg bg-black h-[30rem]"
              >
                {!isPlaying ? (
                  <>
                    {/* Thumbnail */}
                {/* <video
                      src={reel.url}
                      preload="metadata"
                      muted
                      playsInline
                      className="w-full h-full object-cover pointer-events-none"
                    /> */}

                {/* Play Overlay */}
                {/* <button
                      onClick={() => handlePlay(reel.id)}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition"
                    >
                      <div className="bg-white/90 p-3 rounded-full">
                        <Play className="w-6 h-6 text-black" />
                      </div>
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2 text-white text-sm bg-gradient-to-t from-black/80 to-transparent">
                      {reel.title}
                    </div>
                  </>
                ) : (
                  <video
                    ref={(el) => (videoRefs.current[reel.id] = el)}
                    src={reel.url}
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            );
          })} 
        </div>
      </div> */}

                {/* Corner popup: three small videos / expanded big view */}
                {!popupDismissed && (
                    <>
                        {popupCollapsed ? (
                            <button
                                onClick={() => setPopupCollapsed(false)}
                                className="fixed bottom-20 right-4 sm:bottom-[7rem] sm:right-7 z-[70] p-3 sm:p-4 bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 hover:bg-gray-50 transition-colors"
                                aria-label="Expand reels"
                            >
                                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                            </button>
                        ) : (
                            <div
                                ref={popupRef}
                                className={`fixed bottom-20 right-4 sm:bottom-[6rem] sm:right-7 z-[70] flex flex-col gap-2 p-3 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 transition-all duration-300 ${expandedPopupId ? "max-w-[calc(100vw-2rem)] sm:max-w-[320px] w-[min(320px,calc(100vw-2rem))] sm:w-[min(320px,calc(100vw-3rem))]" : "max-w-[calc(100vw-2rem)] sm:max-w-[240px]"}`}
                            >
                                <div className="flex items-center justify-between mb-1 px-1">
                                    {expandedPopupId ? (
                                        <>
                                            <button
                                                onClick={collapsePopup}
                                                className="flex items-center gap-1.5 py-1 pr-2 rounded-lg hover:bg-gray-100 text-gray-700 text-sm font-medium"
                                                aria-label="Back"
                                            >
                                                <ArrowLeft className="w-4 h-4" />
                                                Back
                                            </button>
                                            <button
                                                onClick={handleCollapse}
                                                className="p-0.5 rounded-full hover:bg-gray-100 text-gray-500"
                                                aria-label="Collapse"
                                            >
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-xs font-semibold text-gray-700">Land Interviews Faster</span>
                                            <button
                                                onClick={handleCollapse}
                                                className="p-0.5 rounded-full hover:bg-gray-100 text-gray-500"
                                                aria-label="Collapse"
                                            >
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            </button>
                                        </>
                                    )}
                                </div>

                        {expandedPopupId ? (
                            <div className="flex flex-col gap-2">
                                {reels
                                    .filter((r) => r.id === expandedPopupId)
                                    .map((reel) => (
                                        <div key={reel.id} className="rounded-xl overflow-hidden bg-black">
                                            <video
                                                ref={expandedVideoRef}
                                                src={reel.url}
                                                controls
                                                controlsList="nodownload"
                                                playsInline
                                                className="w-full aspect-[9/16] max-h-[20rem] object-cover"
                                            />
                                            
                                                <Link
                                                    href="/book-a-demo"
                                                    {...getButtonProps()}
                                                    onClick={handleBookDemoClick}
                                                    className="mt-2 block w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-[#ff4c00] hover:bg-[#ff5a0f] transition-colors cursor-pointer"
                                                >
                                                    Book a Demo
                                                </Link>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-row gap-2 justify-center">
                                    {reels.map((reel) => (
                                        <button
                                            key={reel.id}
                                            onClick={() => handlePlay(reel.id, true)}
                                            className="relative rounded-xl overflow-hidden aspect-[9/16] w-14 flex-shrink-0 bg-black group"
                                        >
                                            <video
                                                ref={(el) => (popupVideoRefs.current[`popup-${reel.id}`] = el)}
                                                src={reel.url}
                                                muted
                                                loop
                                                playsInline
                                                preload="metadata"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition">
                                                <div className="bg-white/90 p-1 rounded-full opacity-80 group-hover:opacity-100">
                                                    <Play className="w-2.5 h-2.5 text-black fill-black" />
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <Link
                                    href="/book-a-demo"
                                    {...getButtonProps()}
                                    onClick={handleBookDemoClick}
                                    className="block w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-[#ff4c00] hover:bg-[#ff5a0f] transition-colors cursor-pointer"
                                >
                                    Book a Demo
                                </Link>
                            </>
                        )}
                            </div>
                        )}
                    </>
                )}
        </section>
    );
}
