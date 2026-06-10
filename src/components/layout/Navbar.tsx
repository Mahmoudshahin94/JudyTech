'use client';

import { useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  AnimatePresence,
} from 'framer-motion';
import LogoMark3D from '@/components/3d/LogoMark3D';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';

const navLinks = [
  { key: 'nav_home', href: '#' },
  { key: 'nav_features', href: '#features' },
  { key: 'nav_how', href: '#how-it-works' },
  { key: 'nav_contact', href: '#contact' },
] as const;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navbar() {
  const { t, dir } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  const handleNavClick = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const id = href.replace('#', '');
    scrollToId(id);
  };

  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.1]);
  const backdropBlur = useTransform(scrollY, [0, 80], [0, 18]);

  const bgColor = useMotionTemplate`rgba(5, 5, 16, ${bgOpacity})`;
  const borderColor = useMotionTemplate`rgba(255, 255, 255, ${borderOpacity})`;
  const blur = useMotionTemplate`blur(${backdropBlur}px)`;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 px-4 py-3 md:px-6 md:py-4"
      style={{
        backgroundColor: bgColor,
        borderBottom: '1px solid',
        borderBottomColor: borderColor,
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const }}
    >
      <div
        className="mx-auto flex max-w-7xl items-center justify-between gap-6"
        style={{ direction: dir }}
      >
        <LogoMark3D
          ariaLabel="JudyTech home"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />

        {/* Desktop links */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.key}
              href={link.href}
              className="relative text-sm font-medium text-foreground/65 transition-colors hover:text-foreground"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i + 0.25, duration: 0.4 }}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
            >
              {t(link.key)}
              <motion.span
                className="absolute -bottom-1.5 left-0 right-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary to-accent"
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <LanguageToggle />

          {/* Desktop CTA */}
          <motion.button
            type="button"
            onClick={() => handleNavClick('#contact')}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-white/[0.08] md:inline-flex"
          >
            {t('hero_cta_primary')}
          </motion.button>

          {/* Mobile menu */}
          <motion.button
            type="button"
            aria-label="Toggle menu"
            className="flex flex-col gap-1.5 cursor-pointer md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="block h-0.5 w-6 rounded bg-foreground"
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-0.5 w-6 rounded bg-foreground"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-0.5 w-6 rounded bg-foreground"
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mt-4 rounded-2xl border border-white/10 bg-background/95 p-6 md:hidden"
            initial={{ opacity: 0, height: 0, scale: 0.98 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4" style={{ direction: dir }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  className="text-base font-medium text-foreground/75 transition-colors hover:text-foreground"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                    setMobileOpen(false);
                  }}
                >
                  {t(link.key)}
                </motion.a>
              ))}
              <motion.button
                type="button"
                onClick={() => {
                  handleNavClick('#contact');
                  setMobileOpen(false);
                }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * navLinks.length }}
                className="mt-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-foreground"
              >
                {t('hero_cta_primary')}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
