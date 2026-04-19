"use client";

import { motion } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <motion.footer
      className="relative border-t border-white/5 py-12 px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      
    >
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-6">
        <AnimatedLogo variant="footer" />

        <motion.div
          className="h-px w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        <p className="text-sm text-slate-500">
          &copy; 2026 <span dir="ltr">JudyTech</span>. {t("footer_rights")}
        </p>
      </div>
    </motion.footer>
  );
}
