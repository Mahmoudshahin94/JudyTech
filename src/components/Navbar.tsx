"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
  { key: "nav_home", href: "#hero" },
  { key: "nav_features", href: "#features" },
  { key: "nav_showcase", href: "#showcase" },
  { key: "nav_contact", href: "#contact" },
] as const;

export default function Navbar() {
  const { t, dir } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.08]);
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 24]);

  const bgColor = useMotionTemplate`rgba(5, 5, 16, ${bgOpacity})`;
  const borderColor = useMotionTemplate`rgba(255, 255, 255, ${borderOpacity})`;
  const blur = useMotionTemplate`blur(${backdropBlur}px)`;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
      style={{
        backgroundColor: bgColor,
        borderBottom: `1px solid`,
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

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.key}
              href={link.href}
              className="relative text-sm font-medium text-slate-300 transition-colors hover:text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
              whileHover={{ y: -2 }}
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

          {/* Mobile menu button */}
          <motion.button
            className="flex flex-col gap-1.5 md:hidden cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="block h-0.5 w-6 bg-white rounded"
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-white rounded"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-0.5 w-6 bg-white rounded"
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="glass-strong mt-4 rounded-2xl p-6 md:hidden"
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4" style={{ direction: dir }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  className="text-base font-medium text-slate-300 hover:text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => setMobileOpen(false)}
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
