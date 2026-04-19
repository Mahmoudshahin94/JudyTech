"use client";

import { motion } from "framer-motion";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function GradientText({
  children,
  className = "",
  delay = 0,
}: GradientTextProps) {
  return (
    <motion.span
      className={`gradient-text ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.span>
  );
}
