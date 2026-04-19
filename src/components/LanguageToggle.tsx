"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <motion.button
      onClick={toggleLang}
      className="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium glass cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2))",
        }}
        initial={false}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="relative z-10 text-foreground">
        {lang === "en" ? "عربي" : "EN"}
      </span>
    </motion.button>
  );
}
