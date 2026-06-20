"use client";

import { useEffect, useState, useRef, RefObject } from "react";

interface TrailBlock {
  id: number;
  x: number;
  y: number;
  createdAt: number;
  shade: "light" | "medium" | "dark";
}

interface CursorTrailProps {
  containerRef?: RefObject<HTMLElement | null>;
}

export default function CursorTrail({ containerRef }: CursorTrailProps) {
  const [trails, setTrails] = useState<TrailBlock[]>([]);
  const trailIdRef = useRef(0);
  const lastTrailTimeRef = useRef(0);
  const shadeCycleRef = useRef<"light" | "medium" | "dark">("light");
  const containerBoundsRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

  useEffect(() => {
    const updateBounds = () => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        containerBoundsRef.current = {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        };
      } else {
        containerBoundsRef.current = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // If containerRef is provided, only track within that container
      if (containerRef) {
        updateBounds();
        const bounds = containerBoundsRef.current;
        
        if (!bounds) return;
        
        // Check if mouse is within container bounds
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        if (
          mouseX < bounds.left ||
          mouseX > bounds.left + bounds.width ||
          mouseY < bounds.top ||
          mouseY > bounds.top + bounds.height
        ) {
          // Mouse is outside container, clear trails and return
          setTrails([]);
          lastTrailTimeRef.current = 0;
          return;
        }
      }

      const now = Date.now();
      
      // Throttle to create one box at a time (every 80-100ms for fewer boxes)
      if (now - lastTrailTimeRef.current < 80) {
        return;
      }
      lastTrailTimeRef.current = now;

      // Cycle through shades: light -> medium -> dark -> light
      const shadeOrder: ("light" | "medium" | "dark")[] = ["light", "medium", "dark"];
      const currentShade = shadeCycleRef.current;
      const currentIndex = shadeOrder.indexOf(currentShade);
      shadeCycleRef.current = shadeOrder[(currentIndex + 1) % shadeOrder.length];

      // Calculate position relative to container if containerRef is provided
      let x = e.clientX;
      let y = e.clientY;
      
      if (containerRef && containerBoundsRef.current) {
        const bounds = containerBoundsRef.current;
        x = e.clientX - bounds.left;
        y = e.clientY - bounds.top;
      }

      // Create one new block
      const newBlock: TrailBlock = {
        id: trailIdRef.current++,
        x: x,
        y: y,
        createdAt: now,
        shade: currentShade,
      };

      setTrails((prev) => {
        const updated = [...prev, newBlock];
        // Keep only recent trails (last 300ms)
        const cutoff = now - 300;
        return updated.filter((trail) => trail.createdAt > cutoff);
      });
    };

    const handleMouseLeave = () => {
      setTrails([]);
      lastTrailTimeRef.current = 0;
    };

    const handleResize = () => {
      updateBounds();
    };

    // Clean up old trails periodically
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setTrails((prev) => prev.filter((trail) => now - trail.createdAt < 300));
    }, 100);

    // Initial bounds update
    updateBounds();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", updateBounds, true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateBounds, true);
      clearInterval(cleanupInterval);
    };
  }, [containerRef]);

  // Orange shades matching the image
  const getShadeColor = (shade: "light" | "medium" | "dark") => {
    switch (shade) {
      case "light":
        return {
          dark: "rgba(255, 200, 100, 0.9)", // Light peach-orange
          light: "rgba(255, 220, 150, 0.8)",
        };
      case "medium":
        return {
          dark: "rgba(255, 140, 0, 0.95)", // Medium orange
          light: "rgba(255, 160, 40, 0.9)",
        };
      case "dark":
        return {
          dark: "rgba(255, 80, 0, 1)", // Dark orange
          light: "rgba(255, 100, 20, 0.95)",
        };
    }
  };

  // If containerRef is provided, position relative to container, otherwise fixed to viewport
  const containerStyle = containerRef
    ? {
        position: "absolute" as const,
        inset: "0",
      }
    : {
        position: "fixed" as const,
        inset: "0",
      };

  return (
    <div
      className="pointer-events-none z-[9999]"
      style={containerStyle}
    >
      {trails.map((trail) => {
        const age = Date.now() - trail.createdAt;
        const fadeDuration = 300; // 0.3 seconds fade out (faster fade = fewer visible boxes)
        const opacity = Math.max(0, 1 - age / fadeDuration);
        
        if (opacity <= 0) return null;

        const colors = getShadeColor(trail.shade);
        const size = 10; // Square box size

        return (
          <div
            key={trail.id}
            className="absolute cursor-trail-block"
            style={{
              left: `${trail.x}px`,
              top: `${trail.y}px`,
              width: `${size}px`,
              height: `${size}px`,
              transform: "translate(-50%, -50%)",
              background: `linear-gradient(to top, ${colors.dark}, ${colors.light})`,
              borderRadius: "0px",
              boxShadow: `0 0 4px ${colors.dark}`,
              opacity: opacity,
              transition: "opacity 0.1s linear",
              willChange: "opacity",
            }}
          />
        );
      })}
    </div>
  );
}
