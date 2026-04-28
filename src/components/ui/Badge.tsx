'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  label: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

const variantClasses = {
  primary: 'bg-primary/20 text-primary border-primary/30',
  secondary: 'bg-secondary/20 text-secondary border-secondary/30',
  accent: 'bg-accent/20 text-accent border-accent/30',
};

export default function Badge({
  label,
  icon,
  variant = 'primary',
  className = '',
}: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full
        border backdrop-blur-sm text-sm font-medium
        ${variantClasses[variant]} ${className}
      `}
    >
      {icon && <span className="text-xs">{icon}</span>}
      {label}
    </motion.div>
  );
}
