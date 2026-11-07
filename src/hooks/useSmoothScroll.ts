import { useEffect } from 'react';

/**
 * Custom momentum smooth scroll engine that provides silky-smooth,
 * calibrated deceleration and a slightly slower, more deliberate scroll pace.
 */
export function useSmoothScroll(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let isRunning = false;
    let rafId: number | null = null;

    // Slower scroll multiplier (0.68 makes wheel scrolling ~32% slower, more deliberate)
    const SCROLL_SPEED = 0.68;
    // Dampening lerp factor (0.08 creates a silky momentum deceleration)
    const LERP_FACTOR = 0.08;

    const onWheel = (e: WheelEvent) => {
      // Don't intercept if user is scrolling inside an open modal or drawer
      const target = e.target as HTMLElement | null;
      if (target?.closest?.('.overflow-y-auto, .overflow-y-scroll, textarea, select')) {
        const scrollable = target.closest('.overflow-y-auto, .overflow-y-scroll') as HTMLElement | null;
        if (scrollable && scrollable.scrollHeight > scrollable.clientHeight) {
          return;
        }
      }

      // Don't intercept if body scroll is locked
      if (document.body.style.overflow === 'hidden') return;

      e.preventDefault();

      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

      // Normalize delta across mice and platforms
      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        delta *= 32;
      } else if (e.deltaMode === 2) {
        delta *= window.innerHeight;
      }

      // Apply slower speed factor
      targetY += delta * SCROLL_SPEED;
      targetY = Math.max(0, Math.min(targetY, maxScroll));

      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(render);
      }
    };

    const render = () => {
      const diff = targetY - currentY;
      if (Math.abs(diff) > 0.4) {
        currentY += diff * LERP_FACTOR;
        window.scrollTo(0, Math.round(currentY));
        rafId = requestAnimationFrame(render);
      } else {
        currentY = targetY;
        window.scrollTo(0, currentY);
        isRunning = false;
      }
    };

    const onNativeScroll = () => {
      if (!isRunning) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onNativeScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onNativeScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled]);
}

