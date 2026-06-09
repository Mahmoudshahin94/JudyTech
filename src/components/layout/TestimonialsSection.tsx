'use client';

import { motion } from 'framer-motion';
import Eyebrow from '@/components/ui/Eyebrow';
import { useLanguage } from '@/context/LanguageContext';

type TKey = Parameters<ReturnType<typeof useLanguage>['t']>[0];

const TESTIMONIALS: { quoteKey: TKey; nameKey: TKey; roleKey: TKey }[] = [
  { quoteKey: 'testimonial_1_quote', nameKey: 'testimonial_1_name', roleKey: 'testimonial_1_role' },
  { quoteKey: 'testimonial_2_quote', nameKey: 'testimonial_2_name', roleKey: 'testimonial_2_role' },
  { quoteKey: 'testimonial_3_quote', nameKey: 'testimonial_3_name', roleKey: 'testimonial_3_role' },
];

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function QuoteMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="h-7 w-7 text-foreground/15"
    >
      <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6.83v-6.83H5.17A2 2 0 0 1 7.17 9.17V6Zm10 0A5.17 5.17 0 0 0 12 11.17V18h6.83v-6.83h-3.66A2 2 0 0 1 17.17 9.17V6Z" />
    </svg>
  );
}

export default function TestimonialsSection() {
  const { t, dir } = useLanguage();

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-background px-4 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/4 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl" style={{ direction: dir }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <Eyebrow label={t('testimonials_eyebrow')} className="mb-5" />
          <h2 className="text-display-sm text-foreground">{t('testimonials_title')}</h2>
          <p className="mt-5 text-lg text-foreground/55">{t('testimonials_subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((entry, i) => {
            const name = t(entry.nameKey);
            return (
              <motion.figure
                key={entry.quoteKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 transition-colors duration-300 hover:border-white/20"
              >
                <QuoteMark />
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground/80">
                  {t(entry.quoteKey)}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 via-secondary/40 to-accent/40 text-sm font-semibold text-foreground ring-1 ring-inset ring-white/15"
                  >
                    {initialsOf(name)}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{name}</div>
                    <div className="text-xs text-foreground/50">{t(entry.roleKey)}</div>
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
