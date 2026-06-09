'use client';

import { motion } from 'framer-motion';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Eyebrow from '@/components/ui/Eyebrow';
import { useLanguage } from '@/context/LanguageContext';

export default function CTASection() {
  const { t, dir } = useLanguage();

  const handleClick = () => {
    const target = document.getElementById('contact');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-background px-4 py-28 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[640px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/15 via-secondary/10 to-accent/15 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
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
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
        style={{ direction: dir }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <Eyebrow label={t('cta_eyebrow')} className="mb-6" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-display max-w-3xl"
        >
          <span className="gradient-text">{t('cta_title')}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-foreground/65 md:text-xl"
        >
          {t('cta_subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10"
        >
          <AnimatedButton
            variant="primary"
            size="lg"
            shimmer
            glass3d
            className="px-10"
            onClick={handleClick}
          >
            {t('cta_button')}
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}
