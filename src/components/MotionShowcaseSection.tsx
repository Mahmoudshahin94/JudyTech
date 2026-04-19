"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const orbitIcons = [
  { label: "React", symbol: "⚛️", delay: 0 },
  { label: "AI", symbol: "🤖", delay: 1.5 },
  { label: "Cloud", symbol: "☁️", delay: 3 },
  { label: "Data", symbol: "📊", delay: 4.5 },
  { label: "Security", symbol: "🔒", delay: 6 },
  { label: "Mobile", symbol: "📱", delay: 7.5 },
];

function computeOrbitPositions() {
  return orbitIcons.map((icon, i) => {
    const radius = i % 2 === 0 ? 130 : 190;
    const angle = (360 / orbitIcons.length) * i;
    const rad = (angle * Math.PI) / 180;
    const rad180 = ((angle + 180) * Math.PI) / 180;
    return {
      ...icon,
      radius,
      x0: Math.cos(rad) * radius,
      y0: Math.sin(rad) * radius,
      x180: Math.cos(rad180) * radius,
      y180: Math.sin(rad180) * radius,
    };
  });
}

function FloatingCard({
  content,
  className,
  depth,
  index,
  parallaxY,
  smoothX,
}: {
  content: string;
  className: string;
  depth: number;
  index: number;
  parallaxY: MotionValue<number>;
  smoothX: MotionValue<number>;
}) {
  const cardX = useTransform(smoothX, [-0.5, 0.5], [-20 * depth, 20 * depth]);

  return (
    <motion.div
      className={`absolute hidden md:block ${className}`}
      style={{ y: parallaxY, x: cardX }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 * index, duration: 0.6 }}
    >
      <motion.div
        className="glass-strong rounded-xl px-5 py-3 text-xs md:text-sm font-mono text-accent-light/80"
        style={{ direction: "ltr" }}
        whileHover={{ scale: 1.05, y: -4 }}
        animate={{ y: [0, -6, 0] }}
        transition={{
          y: {
            duration: 3 + index,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <span className="text-primary/60">{">"}</span> {content}
      </motion.div>
    </motion.div>
  );
}

const floatingCardsData = [
  { content: "const app = createNextApp();", className: "top-[15%] left-[5%]", depth: 0.3 },
  { content: "async function fetchData() { ... }", className: "top-[25%] right-[8%]", depth: 0.6 },
  { content: "<motion.div animate={spring} />", className: "bottom-[20%] left-[10%]", depth: 0.4 },
  { content: "model.predict(input)", className: "bottom-[30%] right-[5%]", depth: 0.7 },
];

export default function MotionShowcaseSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 150 });
  useSpring(mouseY, { damping: 50, stiffness: 150 });

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -120]);
  const y4 = useTransform(scrollYProgress, [0, 1], [60, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const parallaxYs = [y1, y2, y3, y4];

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 overflow-hidden"
      onMouseMove={handleMouseMove}
      
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl gradient-text inline-block">
            {t("showcase_title")}
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            {t("showcase_subtitle")}
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center h-[500px] md:h-[600px]">
          {/* Central glowing orb */}
          <motion.div
            className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full z-20"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.6) 0%, rgba(139,92,246,0.3) 50%, transparent 70%)",
              boxShadow:
                "0 0 60px rgba(99,102,241,0.3), 0 0 120px rgba(139,92,246,0.15)",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg md:text-xl">
              JT
            </div>
          </motion.div>

          {/* Orbit rings */}
          <motion.div
            className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-white/5"
            style={{ rotate }}
          />
          <motion.div
            className="absolute w-96 h-96 md:w-[28rem] md:h-[28rem] rounded-full border border-white/[0.03]"
            style={{ rotate }}
          />

          {/* Orbiting icons (client-only to avoid hydration mismatch from trig floats) */}
          {mounted &&
            computeOrbitPositions().map((icon, i) => (
              <motion.div
                key={icon.label}
                className="absolute w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl glass-strong text-xl z-10"
                initial={{ x: icon.x0, y: icon.y0 }}
                animate={{
                  x: [icon.x0, icon.x180, icon.x0],
                  y: [icon.y0, icon.y180, icon.y0],
                }}
                transition={{
                  duration: 12 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: icon.delay,
                }}
              >
                {icon.symbol}
              </motion.div>
            ))}

          {/* Floating code cards */}
          {floatingCardsData.map((card, i) => (
            <FloatingCard
              key={i}
              content={card.content}
              className={card.className}
              depth={card.depth}
              index={i}
              parallaxY={parallaxYs[i]}
              smoothX={smoothX}
            />
          ))}
        </div>

        {/* Staggered reveal bars */}
        <motion.div
          className="flex justify-center gap-3 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {[20, 35, 50, 28, 60, 42, 55, 30, 48, 38, 52, 25].map((h, i) => (
            <motion.div
              key={i}
              className="rounded-full bg-gradient-to-t from-primary/40 to-accent/40"
              style={{ width: 4, height: h }}
              variants={{
                hidden: { scaleY: 0, opacity: 0 },
                visible: { scaleY: 1, opacity: 1 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
