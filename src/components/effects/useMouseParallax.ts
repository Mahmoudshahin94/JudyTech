'use client';

import { useEffect, useRef, useState } from 'react';

export interface MousePosition {
  x: number;
  y: number;
}

export function useMouseParallax(intensity: number = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const x = (e.clientX - rect.left - centerX) / intensity;
      const y = (e.clientY - rect.top - centerY) / intensity;

      setMousePosition({ x, y });

      // Apply transform
      element.style.transform = `perspective(1000px) rotateY(${x * 0.5}deg) rotateX(${-y * 0.5}deg)`;
    };

    const handleMouseLeave = () => {
      if (!ref.current) return;
      ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      setMousePosition({ x: 0, y: 0 });
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [intensity]);

  return { ref, mousePosition };
}
