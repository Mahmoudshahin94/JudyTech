'use client';

import React, { ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  shimmer?: boolean;
  glass3d?: boolean;
}

const variantClasses = {
  primary:
    'bg-gradient-to-r from-primary via-secondary to-accent text-foreground shadow-lg hover:shadow-xl',
  secondary:
    'bg-gradient-to-r from-secondary to-primary text-foreground shadow-lg hover:shadow-xl',
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
  glass3d = false,
}: AnimatedButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sRx = useSpring(rx, { damping: 18, stiffness: 220 });
  const sRy = useSpring(ry, { damping: 18, stiffness: 220 });
  const rotateX = useTransform(sRx, (v) => `${v}deg`);
  const rotateY = useTransform(sRy, (v) => `${v}deg`);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!glass3d) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 16);
    rx.set(-py * 12);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const baseClass = `relative inline-flex items-center justify-center font-semibold rounded-xl transition-shadow duration-300 overflow-hidden ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;

  const surfaceClass = glass3d
    ? 'btn-glass3d text-foreground'
    : `${variantClasses[variant]} ${shimmer ? 'shimmer' : ''}`;

  const buttonContent = (
    <>
      {glass3d && <span aria-hidden className="btn-glass3d-sweep" />}
      {shimmer && !glass3d && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <div
        ref={wrapperRef}
        className="relative inline-block"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ perspective: 800 }}
      >
        {glass3d && <span aria-hidden className="btn-glass3d-floor" />}
        <motion.a
          href={href}
          whileHover={!disabled ? { scale: 1.04 } : {}}
          whileTap={!disabled ? { scale: 0.96 } : {}}
          className={`${baseClass} ${surfaceClass}`}
          style={glass3d ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
        >
          {buttonContent}
        </motion.a>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="relative inline-block"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: 800 }}
    >
      {glass3d && <span aria-hidden className="btn-glass3d-floor" />}
      <motion.button
        onClick={onClick}
        disabled={disabled}
        whileHover={!disabled ? { scale: 1.04 } : {}}
        whileTap={!disabled ? { scale: 0.96 } : {}}
        className={`${baseClass} ${surfaceClass}`}
        style={glass3d ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
      >
        {buttonContent}
      </motion.button>
    </div>
  );
}
