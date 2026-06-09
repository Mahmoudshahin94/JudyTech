'use client';

import { motion } from 'framer-motion';
import AnimatedLogo from '@/components/AnimatedLogo';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t, dir } = useLanguage();

  const quickLinks: { labelKey: Parameters<typeof t>[0]; href: string }[] = [
    { labelKey: 'nav_home', href: '#' },
    { labelKey: 'nav_features', href: '#features' },
    { labelKey: 'nav_how', href: '#how-it-works' },
    { labelKey: 'nav_contact', href: '#contact' },
  ];

  const socials = [
    { id: 'twitter', label: 'X' },
    { id: 'linkedin', label: 'in' },
    { id: 'github', label: 'GH' },
  ];

  return (
    <motion.footer
      className="relative border-t border-white/5 bg-background px-4 py-16 md:px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-7xl" style={{ direction: dir }}>
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <AnimatedLogo variant="footer" />
            <p className="max-w-xs text-sm leading-relaxed text-foreground/55">
              {t('footer_tagline')}
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/55">
              {t('footer_quick_links')}
            </h4>
            <ul className="space-y-3 text-sm text-foreground/65">
              {quickLinks.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/55">
              {t('footer_connect')}
            </h4>
            <p className="mb-4 max-w-xs text-sm leading-relaxed text-foreground/55">
              {t('footer_follow')}
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.id}
                  href="#"
                  aria-label={social.id}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-sm font-semibold text-foreground/65 transition-colors hover:border-primary/40 hover:text-accent"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-foreground/45 md:flex-row">
          <p>&copy; 2026 JudyTech. {t('footer_rights')}</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-foreground">
              {t('footer_privacy')}
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              {t('footer_terms')}
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              {t('footer_cookies')}
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
