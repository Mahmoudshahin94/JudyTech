"use client";

import { motion } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";
import ParticleBackground from "./ParticleBackground";
import GradientText from "./GradientText";
import { useLanguage } from "@/context/LanguageContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      <ParticleBackground />

      {/* Ambient gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[150px] pointer-events-none" />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        
      >
        <motion.div variants={itemVariants} className="mb-8">
          <AnimatedLogo variant="hero" />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl font-black tracking-tight sm:text-7xl md:text-8xl"
        >
          <GradientText className="text-5xl font-black tracking-tight sm:text-7xl md:text-8xl">
            {t("hero_title")}
          </GradientText>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-slate-400 sm:text-xl"
        >
          {t("hero_subtitle")}
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10">
          <motion.a
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-4 text-base font-semibold text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button gradient background */}
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Glow effect */}
            <motion.span
              className="absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50"
              style={{
                background: "linear-gradient(135deg, #6366f1, #06b6d4)",
              }}
            />

            <span className="relative z-10">{t("hero_cta")}</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              &rarr;
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll</span>
            <div className="w-5 h-8 rounded-full border border-slate-600 flex items-start justify-center p-1">
              <motion.div
                className="w-1 h-2 rounded-full bg-slate-400"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
