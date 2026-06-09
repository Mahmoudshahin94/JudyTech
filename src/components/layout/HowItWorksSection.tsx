'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Eyebrow from '@/components/ui/Eyebrow';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

type TKey = Parameters<ReturnType<typeof useLanguage>['t']>[0];

const STEPS: { number: string; titleKey: TKey; descKey: TKey }[] = [
  { number: '01', titleKey: 'hiw_step1_title', descKey: 'hiw_step1_desc' },
  { number: '02', titleKey: 'hiw_step2_title', descKey: 'hiw_step2_desc' },
  { number: '03', titleKey: 'hiw_step3_title', descKey: 'hiw_step3_desc' },
];

export default function HowItWorksSection() {
  const { t, dir } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !progressRef.current) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      gsap.set(progressRef.current, { scaleX: 1 });
      return;
    }

    gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' });

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      end: 'bottom 40%',
      scrub: 0.6,
      onUpdate: (self) => {
        gsap.to(progressRef.current, {
          scaleX: self.progress,
          duration: 0.1,
          overwrite: 'auto',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-background px-4 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl" style={{ direction: dir }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <Eyebrow label={t('process_eyebrow')} className="mb-5" />
          <h2 className="text-display-sm text-foreground">{t('hiw_title')}</h2>
          <p className="mt-5 text-lg text-foreground/55">{t('hiw_subtitle')}</p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Connector line + progress */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-12 hidden md:block"
          >
            <div className="relative h-px bg-white/10">
              <div
                ref={progressRef}
                className="absolute inset-0 h-px origin-left bg-gradient-to-r from-primary via-secondary to-accent rtl:origin-right"
              />
            </div>
          </div>

          <ol className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                <div className="relative z-10 mb-6 inline-flex h-24 items-end">
                  <span className="bg-gradient-to-br from-primary via-secondary to-accent bg-clip-text text-7xl font-bold leading-none tracking-tight text-transparent md:text-8xl">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground md:text-2xl">
                  {t(step.titleKey)}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/55 md:text-base">
                  {t(step.descKey)}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
