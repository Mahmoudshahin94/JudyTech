'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const TECH_STACK = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind',
  'Vercel',
  'Three.js',
] as const;

export default function SocialProofSection() {
  const { t, dir } = useLanguage();

  return (
    <section
      id="proof"
      className="relative overflow-hidden border-y border-white/5 bg-background py-14 md:py-16"
    >
      <div className="mx-auto max-w-6xl px-4" style={{ direction: dir }}>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 text-center text-xs font-medium uppercase tracking-[0.3em] text-foreground/45"
        >
          {t('proof_title')}
        </motion.p>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 items-center gap-x-6 gap-y-6 md:grid-cols-6"
        >
          {TECH_STACK.map((name, i) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center justify-center"
            >
              <span
                className="select-none text-base font-semibold tracking-tight text-foreground/40 transition-all duration-300 hover:text-foreground/85 sm:text-lg"
              >
                {name}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
