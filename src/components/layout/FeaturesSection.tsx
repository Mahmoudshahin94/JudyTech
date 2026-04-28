'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Badge from '@/components/ui/Badge';
import { useLanguage } from '@/context/LanguageContext';
import { animationPresets } from '@/utils/animations';

const features = [
  { icon: '🎨', key: 'feature_web' },
  { icon: '⚡', key: 'feature_system' },
  { icon: '🚀', key: 'feature_ai' },
  { icon: '✨', key: 'feature_ui' },
];

export default function FeaturesSection() {
  const { t } = useLanguage();

  const containerVariants = animationPresets.containerVariants;
  const itemVariants = animationPresets.itemVariants;

  return (
    <section className="relative py-24 px-4 bg-background overflow-hidden">
      {/* Gradient background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection animation="fade-in-up" className="text-center mb-16">
          <Badge label="✨ What We Offer" variant="primary" className="mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('features_title')}
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {t('features_subtitle')}
          </p>
        </AnimatedSection>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={feature.key} variants={itemVariants} custom={index}>
              <GlassCard
                icon={feature.icon}
                title={t(`${feature.key}_title` as any)}
                description={t(`${feature.key}_desc` as any)}
                premium
                size="md"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
