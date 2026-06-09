'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  animate,
} from 'framer-motion';
import Eyebrow from '@/components/ui/Eyebrow';
import { useLanguage } from '@/context/LanguageContext';

type TKey = Parameters<ReturnType<typeof useLanguage>['t']>[0];

const STATS: { valueKey: TKey; suffixKey: TKey; labelKey: TKey }[] = [
  { valueKey: 'stat_1_value', suffixKey: 'stat_1_suffix', labelKey: 'stat_1_label' },
  { valueKey: 'stat_2_value', suffixKey: 'stat_2_suffix', labelKey: 'stat_2_label' },
  { valueKey: 'stat_3_value', suffixKey: 'stat_3_suffix', labelKey: 'stat_3_label' },
  { valueKey: 'stat_4_value', suffixKey: 'stat_4_suffix', labelKey: 'stat_4_label' },
];

function parseNumeric(value: string) {
  const match = value.match(/^([<>~]?)(\d+(?:\.\d+)?)$/);
  if (!match) return null;
  return { prefix: match[1] ?? '', numeric: parseFloat(match[2]) };
}

function CountUp({
  value,
  suffix,
  inView,
}: {
  value: string;
  suffix: string;
  inView: boolean;
}) {
  const reduce = useReducedMotion();
  const parsed = parseNumeric(value);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) =>
    parsed && Number.isInteger(parsed.numeric) ? Math.round(v).toString() : v.toFixed(1)
  );
  const [display, setDisplay] = useState<string>(parsed ? '0' : '');

  useEffect(() => {
    if (!parsed || !inView) return;
    const unsubscribe = rounded.on('change', (latest) => setDisplay(latest));
    const controls = animate(motionValue, parsed.numeric, {
      duration: reduce ? 0 : 1.6,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [inView, motionValue, parsed, reduce, rounded]);

  if (!parsed) {
    return (
      <span>
        {value}
        {suffix}
      </span>
    );
  }

  return (
    <span>
      {parsed.prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const { t, dir } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="stats"
      className="relative overflow-hidden bg-background px-4 py-24 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/8 via-secondary/8 to-accent/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl" style={{ direction: dir }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <Eyebrow label={t('stats_eyebrow')} className="mb-5" />
          <h2 className="text-display-sm text-foreground">{t('stats_title')}</h2>
          <p className="mt-5 text-lg text-foreground/55">{t('stats_subtitle')}</p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-2 gap-y-12 gap-x-6 border-t border-white/10 pt-12 md:grid-cols-4 md:gap-x-8"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.labelKey}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center md:items-start md:text-start"
            >
              <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-5xl font-bold tracking-tight text-transparent tabular-nums sm:text-6xl md:text-7xl">
                <CountUp value={t(s.valueKey)} suffix={t(s.suffixKey)} inView={inView} />
              </span>
              <span className="mt-3 text-sm font-medium text-foreground/55">
                {t(s.labelKey)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
