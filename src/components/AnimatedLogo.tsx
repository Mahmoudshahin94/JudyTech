"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import LogoSVG from "./LogoSVG";

interface AnimatedLogoProps {
  variant: "hero" | "navbar" | "footer";
}

const sizeMap = {
  hero: { width: 320, height: 85 },
  navbar: { width: 160, height: 42 },
  footer: { width: 180, height: 48 },
};

export default function AnimatedLogo({ variant }: AnimatedLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 200 });
  const parallaxX = useTransform(smoothMouseX, [-500, 500], [-8, 8]);
  const parallaxY = useTransform(smoothMouseY, [-500, 500], [-8, 8]);

  const { scrollY } = useScroll();
  const navbarScale = useTransform(scrollY, [0, 300], [1, 0.85]);
  const navbarOpacity = useTransform(scrollY, [0, 200], [1, 0.95]);

  useEffect(() => {
    setIsMounted(true);
    if (variant !== "hero") return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [variant, mouseX, mouseY]);

  const { width, height } = sizeMap[variant];

  if (!isMounted) return null;

  return (
    <motion.div
      ref={containerRef}
      className="relative inline-flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        opacity: { duration: 0.8, ease: "easeOut" },
        scale: { type: "spring", stiffness: 200, damping: 20 },
        rotate: { type: "spring", stiffness: 200, damping: 20 },
      }}
      whileHover={{
        scale: variant === "navbar" ? 1.05 : 1.08,
        rotate: 2,
        filter: "drop-shadow(0 0 30px rgba(99,102,241,0.5))",
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      style={
        variant === "navbar"
          ? { scale: navbarScale, opacity: navbarOpacity }
          : variant === "hero"
          ? {
              x: parallaxX,
              y: parallaxY,
              filter: "drop-shadow(0 0 20px rgba(99,102,241,0.3))",
            }
          : {
              filter: "drop-shadow(0 0 12px rgba(99,102,241,0.2))",
            }
      }
    >
      {/* Gradient glow behind logo (hero only) */}
      {variant === "hero" && (
        <motion.div
          className="absolute -z-10 rounded-full blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.4) 0%, rgba(139,92,246,0.2) 40%, transparent 70%)",
            width: "200%",
            height: "300%",
            left: "-50%",
            top: "-100%",
          }}
          animate={{
            opacity: [0.5, 0.9, 0.5],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Float wrapper */}
      <motion.div
        animate={
          variant === "hero"
            ? { y: [0, -12, 0] }
            : variant === "footer"
            ? { y: [0, -4, 0] }
            : {}
        }
        transition={
          variant === "hero"
            ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
            : variant === "footer"
            ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
            : {}
        }
      >
        <div className="relative">
          <LogoSVG width={width} height={height} />
          {/* Light sweep overlay (hero only) */}
          {variant === "hero" && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["-100% 0%", "200% 0%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1,
              }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
