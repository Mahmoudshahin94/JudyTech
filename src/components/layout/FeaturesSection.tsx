'use client';

import { motion } from 'framer-motion';
import Eyebrow from '@/components/ui/Eyebrow';
import { useLanguage } from '@/context/LanguageContext';
import { animationPresets } from '@/utils/animations';

type IconProps = { className?: string };

function IconArchitecture({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconPerformance({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  );
}

function IconDeveloper({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </svg>
  );
}

function IconDeploy({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 2 2 22h20L12 2Z" />
    </svg>
  );
}

function IconResponsive({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2" y="4" width="14" height="11" rx="1.5" />
      <rect x="15" y="9" width="7" height="11" rx="1.5" />
      <path d="M6 19h6" />
    </svg>
  );
}

function IconCustomize({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

type TKey = Parameters<ReturnType<typeof useLanguage>['t']>[0];

const FEATURES: { titleKey: TKey; descKey: TKey; Icon: (p: IconProps) => React.ReactElement }[] = [
  { titleKey: 'feature_architecture_title', descKey: 'feature_architecture_desc', Icon: IconArchitecture },
  { titleKey: 'feature_performance_title', descKey: 'feature_performance_desc', Icon: IconPerformance },
  { titleKey: 'feature_dx_title', descKey: 'feature_dx_desc', Icon: IconDeveloper },
  { titleKey: 'feature_deploy_title', descKey: 'feature_deploy_desc', Icon: IconDeploy },
  { titleKey: 'feature_responsive_title', descKey: 'feature_responsive_desc', Icon: IconResponsive },
  { titleKey: 'feature_customizable_title', descKey: 'feature_customizable_desc', Icon: IconCustomize },
];

export default function FeaturesSection() {
  const { t, dir } = useLanguage();
  const containerVariants = animationPresets.containerVariants;
  const itemVariants = animationPresets.itemVariants;

  return (
    <section id="features" className="relative overflow-hidden bg-background px-4 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl" style={{ direction: dir }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <Eyebrow label={t('features_eyebrow')} className="mb-5" />
          <h2 className="text-display-sm text-foreground">
            {t('features_title')}
          </h2>
          <p className="mt-5 text-lg text-foreground/55">{t('features_subtitle')}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/5 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {FEATURES.map(({ titleKey, descKey, Icon }, index) => (
            <motion.div
              key={titleKey}
              variants={itemVariants}
              custom={index}
              className="group relative bg-background p-8 text-start transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.08), transparent 60%)',
                }}
              />
              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 text-foreground ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:from-primary/30 group-hover:to-accent/30 group-hover:ring-white/20">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{t(titleKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/55">{t(descKey)}</p>
                <span
                  aria-hidden
                  className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-foreground/0 transition-all duration-300 group-hover:text-accent"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
