'use client';

import React, { ReactNode, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in-up' | 'scale-up' | 'parallax' | 'slide-left' | 'slide-right' | 'fade-in';
  delay?: number;
  duration?: number;
  staggerChildren?: boolean;
  useGSAP?: boolean;
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fade-in-up',
  delay = 0,
  duration = 0.6,
  staggerChildren = false,
  useGSAP = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!useGSAP || !ref.current) return;

    const element = ref.current;

    // GSAP ScrollTrigger animation
    const animationConfig: Record<string, any> = {
      'fade-in-up': {
        y: 40,
        opacity: 0,
        duration: 0.8,
      },
      'scale-up': {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
      },
      'parallax': {
        y: 60,
        opacity: 0,
      },
      'slide-left': {
        x: -50,
        opacity: 0,
        duration: 0.8,
      },
      'slide-right': {
        x: 50,
        opacity: 0,
        duration: 0.8,
      },
      'fade-in': {
        opacity: 0,
        duration: 0.6,
      },
    };

    const config = animationConfig[animation] || animationConfig['fade-in-up'];

    // Set initial state
    gsap.set(element, config);

    // Create animation
    gsap.to(element, {
      ...config,
      y: animation === 'parallax' ? 0 : config.y === undefined ? 0 : 0,
      x: config.x === undefined ? 0 : 0,
      opacity: 1,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [animation, useGSAP]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        staggerChildren: staggerChildren ? 0.1 : 0,
      },
    },
  };

  if (useGSAP) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '0px 0px -100px 0px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
