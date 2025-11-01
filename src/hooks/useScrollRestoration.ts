import { useEffect, useRef } from 'react';

export const useScrollRestoration = (shouldRestore: boolean, scrollPosition: number, dependency: unknown[]) => {
  const hasRestoredRef = useRef(false);

  useEffect(() => {
    if (shouldRestore && scrollPosition > 0 && !hasRestoredRef.current) {
      // Wait for the next tick to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'instant' as ScrollBehavior
        });
        hasRestoredRef.current = true;
      }, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [shouldRestore, scrollPosition, ...dependency]);

  // Reset the restoration flag when dependencies change significantly
  useEffect(() => {
    if (!shouldRestore) {
      hasRestoredRef.current = false;
    }
  }, [shouldRestore]);

  return hasRestoredRef.current;
};

export const useScrollCapture = (onScrollCapture: (position: number) => void) => {
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          onScrollCapture(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onScrollCapture]);
};