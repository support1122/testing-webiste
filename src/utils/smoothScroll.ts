type EasingFunction = (t: number) => number;

const easingFunctions: Record<string, EasingFunction> = {
  easeInOutCubic: (t: number): number => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  },
  
  easeOutCubic: (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  },
  
  easeInOutQuad: (t: number): number => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
};

interface SmoothScrollOptions {
  duration?: number;
  easing?: keyof typeof easingFunctions;
  offset?: number;
}

export function smoothScrollTo(
  targetPosition: number,
  options: SmoothScrollOptions = {}
): Promise<void> {
  return new Promise((resolve) => {
    const {
      duration = 800,
      easing = 'easeInOutCubic',
      offset = 0,
    } = options;

    const startPosition = window.pageYOffset || document.documentElement.scrollTop;
    const distance = targetPosition - startPosition + offset;
    const startTime = performance.now();
    const easingFn = easingFunctions[easing];

    if (Math.abs(distance) < 5) {
      window.scrollTo({
        top: targetPosition + offset,
        behavior: 'instant' as ScrollBehavior,
      });
      resolve();
      return;
    }

    function animateScroll(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = easingFn(progress);
      
      const currentPosition = startPosition + distance * easedProgress;
      
      window.scrollTo({
        top: currentPosition,
        behavior: 'instant' as ScrollBehavior,
      });

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        window.scrollTo({
          top: targetPosition + offset,
          behavior: 'instant' as ScrollBehavior,
        });
        resolve();
      }
    }

    requestAnimationFrame(animateScroll);
  });
}

export function smoothScrollToElement(
  element: HTMLElement | string,
  options: SmoothScrollOptions = {}
): Promise<void> {
  const targetElement =
    typeof element === 'string'
      ? document.getElementById(element)
      : element;

  if (!targetElement) {
    return Promise.resolve();
  }

  const stickyNavbar =
    document.querySelector('.sticky.top-0') ||
    document.querySelector('nav') ||
    document.querySelector('[class*="nav"]');
  const navbarHeight = stickyNavbar
    ? stickyNavbar.getBoundingClientRect().height
    : 0;

  const rect = targetElement.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const elementTop = rect.top + scrollTop;
  const offset = navbarHeight + 20;
  const targetPosition = Math.max(0, elementTop - offset);

  return smoothScrollTo(targetPosition, {
    ...options,
    offset: 0,
  });
}

let currentAnimationFrame: number | null = null;

export function cancelSmoothScroll() {
  if (currentAnimationFrame !== null) {
    cancelAnimationFrame(currentAnimationFrame);
    currentAnimationFrame = null;
  }
}

