'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
  cta?: { label: string; href?: string; onClick?: () => void };
  gradient?: 'primary' | 'accent' | 'none';
  size?: 'sm' | 'md' | 'lg';
  premium?: boolean;
}

const sizeClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function GlassCard({
  children,
  className = '',
  icon,
  title,
  description,
  cta,
  gradient = 'none',
  size = 'md',
  premium = false,
}: GlassCardProps) {
  const baseClass = premium ? 'glass-card-premium' : 'glass-card';
  const gradientClass =
    gradient === 'primary'
      ? 'gradient-bg-primary'
      : gradient === 'accent'
        ? 'gradient-bg-accent'
        : '';

  const content = (
    <div className={`${baseClass} ${sizeClasses[size]} rounded-xl space-y-4 ${gradientClass} ${className}`}>
      {icon && <div className="text-3xl">{icon}</div>}
      {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
      {description && <p className="text-sm text-foreground/70">{description}</p>}
      {children}
      {cta && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={cta.onClick}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-foreground text-sm font-medium hover:shadow-lg transition-shadow"
        >
          {cta.label}
        </motion.button>
      )}
    </div>
  );

  return premium ? (
    <motion.div whileHover={{ y: -8, boxShadow: '0 16px 48px rgba(99, 102, 241, 0.2)' }}>
      {content}
    </motion.div>
  ) : (
    <motion.div whileHover={{ y: -4 }}>{content}</motion.div>
  );
}
