'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  shimmer?: boolean;
}

const variantClasses = {
  primary: 'bg-gradient-to-r from-primary via-secondary to-accent text-foreground shadow-lg hover:shadow-xl',
  secondary: 'bg-gradient-to-r from-secondary to-primary text-foreground shadow-lg hover:shadow-xl',
  outline: 'border-2 border-primary text-primary hover:bg-primary/10',
  glass: 'glass-card text-foreground hover:border-primary/50',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function AnimatedButton({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  shimmer = false,
}: AnimatedButtonProps) {
  const buttonClass = `
    relative inline-flex items-center justify-center font-semibold
    rounded-lg transition-all duration-300 overflow-hidden
    ${variantClasses[variant]} ${sizeClasses[size]} ${className}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${shimmer ? 'shimmer' : ''}
  `;

  const buttonContent = (
    <>
      {shimmer && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
      <span className="relative">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        className={buttonClass}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={buttonClass}
    >
      {buttonContent}
    </motion.button>
  );
}
