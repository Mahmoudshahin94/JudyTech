'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedSection from '@/components/ui/AnimatedSection';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const showcaseItems = [
  {
    title: 'Interactive Design',
    description: 'Engaging 3D elements that respond to user interaction',
  },
  {
    title: 'Smooth Animations',
    description: 'Perfectly timed motions powered by GSAP ScrollTrigger',
  },
  {
    title: 'Premium UX',
    description: 'Thoughtful interactions that delight at every touchpoint',
  },
];

export default function ShowcaseSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll('.showcase-item');

    items.forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        duration: 0.8,
        ease: 'power3.out',
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-background via-background/50 to-background overflow-hidden">
      {/* Accent gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <AnimatedSection animation="fade-in-up" className="text-center mb-16">
          <Badge label="🎬 Showcase" variant="accent" className="mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              {t('showcase_title')}
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {t('showcase_subtitle')}
          </p>
        </AnimatedSection>

        {/* Showcase Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcaseItems.map((item, index) => (
            <div
              key={index}
              className="showcase-item"
            >
              <GlassCard
                premium
                size="lg"
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="text-4xl mb-4">
                    {index === 0 ? '🎨' : index === 1 ? '⚡' : '✨'}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-foreground/60">{item.description}</p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
