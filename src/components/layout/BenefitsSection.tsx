'use client';

import { motion } from 'framer-motion';
import Eyebrow from '@/components/ui/Eyebrow';
import { useLanguage } from '@/context/LanguageContext';

type TKey = Parameters<ReturnType<typeof useLanguage>['t']>[0];

const BENEFITS: { titleKey: TKey; descKey: TKey }[] = [
  { titleKey: 'benefit_1_title', descKey: 'benefit_1_desc' },
  { titleKey: 'benefit_2_title', descKey: 'benefit_2_desc' },
  { titleKey: 'benefit_3_title', descKey: 'benefit_3_desc' },
  { titleKey: 'benefit_4_title', descKey: 'benefit_4_desc' },
];

export default function BenefitsSection() {
  const { t, dir } = useLanguage();

  return (
    <section
      id="benefits"
      className="relative overflow-hidden bg-background px-4 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl" style={{ direction: dir }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <Eyebrow label={t('benefits_eyebrow')} className="mb-5" />
          <h2 className="text-display-sm text-foreground">{t('benefits_title')}</h2>
          <p className="mt-5 text-lg text-foreground/55">{t('benefits_subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.titleKey}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative pl-6 rtl:pl-0 rtl:pr-6"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-primary via-secondary to-accent opacity-50 transition-opacity duration-300 group-hover:opacity-100 rtl:left-auto rtl:right-0"
              />
              <h3 className="text-xl font-semibold text-foreground md:text-2xl">
                {t(benefit.titleKey)}
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-foreground/60">
                {t(benefit.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
