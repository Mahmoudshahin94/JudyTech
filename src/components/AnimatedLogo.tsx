"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";

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
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);

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

  useEffect(() => {
    if (!isMounted) return;
    const image = new Image();
    image.src = "/logo.png";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setProcessedSrc(canvas.toDataURL("image/png"));
    };
  }, [isMounted]);

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
          <img
            src={processedSrc ?? "/logo.png"}
            width={width}
            height={height}
            alt="JudyTech Logo"
            className="block"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
