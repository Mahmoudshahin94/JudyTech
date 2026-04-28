'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollAnimationConfig {
  trigger?: HTMLElement | string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  animation?: Record<string, any>;
  onEnter?: () => void;
  onLeave?: () => void;
}

export function useScrollAnimation(config: ScrollAnimationConfig) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const {
      trigger = ref.current,
      start = 'top 80%',
      end = 'center center',
      scrub = false,
      markers = false,
      animation = {},
      onEnter,
      onLeave,
    } = config;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
        markers,
        onEnter: onEnter,
        onLeave: onLeave,
      },
    });

    timeline.to(ref.current, animation);

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === trigger) t.kill();
      });
    };
  }, [config]);

  return ref;
}
