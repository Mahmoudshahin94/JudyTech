'use client';

import { useEffect, useRef, useState } from 'react';

export interface UseInViewOptions {
  threshold?: number | number[];
  margin?: string;
  once?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        setHasBeenInView(true);

        if (options.once) {
          observer.unobserve(entry.target);
        }
      } else if (!options.once) {
        setIsInView(false);
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.margin || '0px',
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return {
    ref,
    isInView,
    hasBeenInView,
  };
}
