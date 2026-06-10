'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import Logo3D from './Logo3D';

interface LogoMark3DProps {
  onClick?: () => void;
  ariaLabel?: string;
}

export default function LogoMark3D({
  onClick,
  ariaLabel = 'JudyTech',
}: LogoMark3DProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex h-16 w-[160px] cursor-pointer items-center justify-center md:h-[72px] md:w-[180px]"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full blur-xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(6,182,212,0.35) 0%, rgba(99,102,241,0.18) 45%, transparent 75%)',
        }}
        animate={{ opacity: hovered ? 0.9 : 0.4, scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      <div className="relative h-full w-full">
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'low-power',
            preserveDrawingBuffer: false,
          }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={42} />
            <ambientLight intensity={0.55} />
            <directionalLight
              position={[2, 3, 5]}
              intensity={1.4}
              color="#ffffff"
            />
            <pointLight
              position={[-2, -1, 3]}
              intensity={0.6}
              color="#22d3ee"
              distance={8}
              decay={2}
            />
            <pointLight
              position={[2, 1, 3]}
              intensity={0.45}
              color="#6366f1"
              distance={8}
              decay={2}
            />
            <Logo3D scale={1.6} compact />
          </Suspense>
        </Canvas>
      </div>
    </motion.button>
  );
}
