"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const { isInteractiveHovered, isLogoHovered, setInteractiveHovered } = useCursor();

  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });

  const hoverSelector = useMemo(() => 'a, button, [data-cursor="hover"]', []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const isHovering = Boolean(target?.closest(hoverSelector));
      setInteractiveHovered(isHovering);
    };

    const handleHoverOut = (event: MouseEvent) => {
      const relatedTarget = event.relatedTarget as HTMLElement | null;
      if (!relatedTarget?.closest(hoverSelector)) {
        setInteractiveHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleHover);
    document.addEventListener("mouseout", handleHoverOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleHover);
      document.removeEventListener("mouseout", handleHoverOut);
    };
  }, [cursorX, cursorY, hoverSelector, isVisible, setInteractiveHovered]);

  const size = isLogoHovered ? 18 : isInteractiveHovered ? 14 : 10;
  const glowOpacity = isLogoHovered ? 0.55 : isInteractiveHovered ? 0.35 : 0.2;
  const scale = isLogoHovered ? 1.4 : isInteractiveHovered ? 1.2 : 1;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50"
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: size,
          height: size,
          scale,
          background: "rgba(99,102,241,0.9)",
          boxShadow: `0 0 ${size * 1.6}px rgba(99,102,241,${glowOpacity})`,
        }}
      />
    </motion.div>
  );
}
