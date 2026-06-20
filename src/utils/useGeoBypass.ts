"use client";

import { useState, useRef, useCallback } from 'react';

interface UseGeoBypassOptions {
  onBypass: () => void;
  holdDuration?: number; // in milliseconds, default 5000 (5 seconds)
}

/**
 * Hook to handle click-and-hold bypass for geo-blocked buttons
 * When user holds a button for 5 seconds, it bypasses the geo-block
 */
export function useGeoBypass({ onBypass, holdDuration = 5000 }: UseGeoBypassOptions) {
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const startHold = useCallback(() => {
    setIsHolding(true);
    setHoldProgress(0);
    startTimeRef.current = Date.now();

    // Update progress every 50ms for smooth animation
    progressIntervalRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Date.now() - startTimeRef.current;
        const progress = Math.min((elapsed / holdDuration) * 100, 100);
        setHoldProgress(progress);
      }
    }, 50);

    // Trigger bypass after hold duration
    holdTimerRef.current = setTimeout(() => {
      // Dispatch custom event to bypass geo-block
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('bypassGeoBlock'));
      }
      onBypass();
      setIsHolding(false);
      setHoldProgress(0);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }, holdDuration);
  }, [onBypass, holdDuration]);

  const stopHold = useCallback(() => {
    setIsHolding(false);
    setHoldProgress(0);
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    startTimeRef.current = null;
  }, []);

  const getButtonProps = useCallback(() => {
    return {
      onMouseDown: startHold,
      onMouseUp: stopHold,
      onMouseLeave: stopHold,
      onTouchStart: startHold,
      onTouchEnd: stopHold,
      onTouchCancel: stopHold,
    };
  }, [startHold, stopHold]);

  return {
    isHolding,
    holdProgress,
    getButtonProps,
    startHold,
    stopHold,
  };
}

