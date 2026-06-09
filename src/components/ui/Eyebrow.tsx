'use client';

import { motion } from 'framer-motion';

interface EyebrowProps {
  label: string;
  align?: 'center' | 'start';
  className?: string;
}

export default function Eyebrow({ label, align = 'center', className = '' }: EyebrowProps) {
  const alignClass = align === 'center' ? 'justify-center' : 'justify-start';

  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4 }}
      className={`text-eyebrow ${alignClass} ${className}`}
    >
      {label}
    </motion.span>
  );
}
