'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Badge from '@/components/ui/Badge';
import { useLanguage } from '@/context/LanguageContext';
import { animationPresets } from '@/utils/animations';

export default function CTASection() {
  const { t } = useLanguage();

  const containerVariants = animationPresets.containerVariants;
  const itemVariants = animationPresets.itemVariants;

  return (
    <section className="relative py-24 px-4 bg-background overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 opacity-30" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <AnimatedSection animation="scale-up" useGSAP={false}>
          <motion.div
            className="glass-card-premium rounded-2xl p-12 md:p-16 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <Badge label="🚀 Ready?" variant="primary" className="mx-auto" />
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t('cta_title')}
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto"
            >
              {t('cta_subtitle')}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <AnimatedButton
                variant="primary"
                size="lg"
                shimmer
                className="px-10"
              >
                {t('cta_button')}
              </AnimatedButton>
            </motion.div>

            {/* Trust Badge */}
            <motion.p
              variants={itemVariants}
              className="mt-10 text-sm text-foreground/50"
            >
              ✓ Trusted by leading brands worldwide
            </motion.p>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
