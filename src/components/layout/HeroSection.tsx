'use client';

import { motion } from 'framer-motion';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { useLanguage } from '@/context/LanguageContext';

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function HeroSection() {
  const { t, dir } = useLanguage();

  const metrics = [
    { value: t('hero_metric_1_value'), label: t('hero_metric_1_label') },
    { value: t('hero_metric_2_value'), label: t('hero_metric_2_label') },
    { value: t('hero_metric_3_value'), label: t('hero_metric_3_label') },
  ];

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-background pt-28 pb-24 md:pt-36 md:pb-32"
    >
      {/* Ambient gradient + grid backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/4 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 h-[420px] w-[420px] rounded-full bg-secondary/15 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
      </div>

      <div
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 text-center"
        style={{ direction: dir }}
      >
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-eyebrow mb-8"
        >
          {t('hero_badge')}
        </motion.span>

        {/* Display headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1], delay: 0.15 }}
          className="text-display max-w-4xl text-foreground"
        >
          <span className="gradient-text">{t('hero_title')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-foreground/65 sm:text-xl"
        >
          {t('hero_subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <AnimatedButton
            variant="primary"
            size="lg"
            shimmer
            glass3d
            onClick={() => scrollToId('contact')}
          >
            {t('hero_cta_primary')}
          </AnimatedButton>
          <AnimatedButton
            variant="outline"
            size="lg"
            onClick={() => scrollToId('features')}
          >
            {t('hero_cta_secondary')}
          </AnimatedButton>
        </motion.div>

        {/* Inline metrics strip */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 grid w-full max-w-2xl grid-cols-3 gap-6 border-t border-white/5 pt-8"
        >
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-1">
              <dt className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
                {m.value}
              </dt>
              <dd className="text-xs font-medium uppercase tracking-wider text-foreground/45">
                {m.label}
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* Scroll cue */}
        <motion.button
          type="button"
          onClick={() => scrollToId('proof')}
          aria-label={t('scroll_explore')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="group mt-16 inline-flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground/40 transition-colors hover:text-foreground/70"
        >
          <span>{t('scroll_explore')}</span>
          <motion.span
            aria-hidden
            className="flex h-8 w-5 items-start justify-center rounded-full border border-foreground/20"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="mt-1.5 h-1.5 w-1 rounded-full bg-foreground/60" />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
