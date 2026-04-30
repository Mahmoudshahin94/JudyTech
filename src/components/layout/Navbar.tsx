'use client';

import { useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  AnimatePresence,
} from 'framer-motion';
import AnimatedLogo from '@/components/AnimatedLogo';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';

const navLinks = [
  { key: 'nav_home', href: '#' },
  { key: 'nav_features', href: '#features' },
  { key: 'nav_showcase', href: '#showcase' },
  { key: 'nav_contact', href: '#contact' },
] as const;

export default function Navbar() {
  const { t, dir } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  const handleNavClick = (href: string) => {
    if (href !== '#') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.15]);
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 20]);

  const bgColor = useMotionTemplate`rgba(5, 5, 16, ${bgOpacity})`;
  const borderColor = useMotionTemplate`rgba(255, 255, 255, ${borderOpacity})`;
  const blur = useMotionTemplate`blur(${backdropBlur}px)`;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 px-4 md:px-6 py-4"
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
        className="mx-auto flex max-w-7xl items-center justify-between"
        style={{ direction: dir }}
      >
        <AnimatedLogo variant="navbar" />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-12 md:flex">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.key}
              href={link.href}
              className="relative text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
              whileHover={{
                y: -2,
                color: '#f1f5f9',
                filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.5))',
              }}
              onClick={() => handleNavClick(link.href)}
            >
              {t(link.key)}
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-primary to-accent"
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <LanguageToggle />

          {/* Mobile Menu Button */}
          <motion.button
            className="flex flex-col gap-1.5 md:hidden cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="block h-0.5 w-6 bg-foreground rounded"
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-foreground rounded"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-foreground rounded"
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="glass-card-premium mt-4 rounded-2xl p-6 md:hidden"
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4" style={{ direction: dir }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  className="text-base font-medium text-foreground/70 hover:text-foreground transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => {
                    handleNavClick(link.href);
                    setMobileOpen(false);
                  }}
                >
                  {t(link.key)}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
