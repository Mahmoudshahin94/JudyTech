'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

type TKey = Parameters<ReturnType<typeof useLanguage>['t']>[0];

const PROBLEMS: { titleKey: TKey; descKey: TKey }[] = [
  { titleKey: 'problem_1_title', descKey: 'problem_1_desc' },
  { titleKey: 'problem_2_title', descKey: 'problem_2_desc' },
  { titleKey: 'problem_3_title', descKey: 'problem_3_desc' },
];

const SOLUTION_CHIPS: TKey[] = ['solution_chip_1', 'solution_chip_2', 'solution_chip_3'];

function CrossIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function SolutionGlyph() {
  return (
    <div className="relative h-32 w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/15 via-transparent to-accent/15">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-3">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-gradient-to-br from-primary to-accent"
              animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProblemSolutionSection() {
  const { t, dir } = useLanguage();

  return (
    <section
      id="problem"
      className="relative overflow-hidden bg-background px-4 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-0 h-72 w-72 rounded-full bg-rose-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div
        className="relative z-10 mx-auto grid max-w-6xl items-stretch gap-12 lg:grid-cols-2 lg:gap-20"
        style={{ direction: dir }}
      >
        {/* Problems */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <h2 className="text-display-sm text-foreground">{t('problem_title')}</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-foreground/55">
            {t('problem_subtitle')}
          </p>

          <ul className="mt-10 space-y-6">
            {PROBLEMS.map((p, i) => (
              <motion.li
                key={p.titleKey}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-4"
              >
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-rose-500/25 bg-rose-500/8 text-rose-300/90">
                  <CrossIcon />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {t(p.titleKey)}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/55">
                    {t(p.descKey)}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="relative h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 md:p-10">
            <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/30">
              <CheckIcon />
            </div>
            <h3 className="text-2xl font-bold text-foreground md:text-3xl">
              {t('solution_title')}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-foreground/65 md:text-lg">
              {t('solution_text')}
            </p>

            <div className="mt-8">
              <SolutionGlyph />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {SOLUTION_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground/75"
                >
                  {t(chip)}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
