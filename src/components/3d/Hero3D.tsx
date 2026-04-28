'use client';

import { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Logo3D from './Logo3D';
import ParticleField from './ParticleField';
import Effects from './EffectsComposer';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Badge from '@/components/ui/Badge';
import { useLanguage } from '@/context/LanguageContext';

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

interface Hero3DProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  ctaLabel?: string;
  onCTAClick?: () => void;
}

function CanvasFallback() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-primary/20 to-background animate-pulse" />
  );
}

function SceneContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />

      {/* Lighting */}
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[4, 6, 6]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      <pointLight position={[-5, 3, 4]} intensity={0.45} color="#8b5cf6" />
      <pointLight position={[5, -2, 5]} intensity={0.4} color="#06b6d4" />
      <pointLight position={[0, 2, -6]} intensity={0.35} color="#7c3aed" />

      {/* 3D Logo */}
      <Logo3D scale={1.5} speed={0.8} />

      {/* Shadow catcher */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.18} />
      </mesh>

      {/* Particles */}
      <ParticleField count={300} color="#06b6d4" size={0.08} />

      {/* Post Processing */}
      <Effects enableBloom bloomIntensity={1.2} />

      {/* Camera controls with minimal interaction */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI * 0.6}
        minPolarAngle={Math.PI * 0.4}
      />
    </>
  );
}

export default function Hero3D({
  title = "Premium 3D Experience",
  subtitle = "Craft exceptional digital experiences with cutting-edge technology",
  badge = "✨ Next Generation",
  ctaLabel = "Explore More",
  onCTAClick,
}: Hero3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const handleScrollToExplore = () => {
    const nextSection = document.getElementById('features');
    if (nextSection) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: nextSection,
        ease: 'power2.inOut',
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  } as const;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          shadows
          gl={{
            antialias: true,
            alpha: true,
          }}
          dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
        >
          <Suspense fallback={null}>
            <SceneContent />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-5 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />

      {/* Content Overlay */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-center mb-6 tracking-tight"
        >
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {title}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-foreground/70 text-center max-w-2xl mb-8"
        >
          {subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
          className="flex gap-4"
          onMouseEnter={() => setIsHovered(true)}
        >
          <AnimatedButton
            onClick={onCTAClick}
            variant="primary"
            size="lg"
            shimmer
            className="px-8"
          >
            {ctaLabel}
          </AnimatedButton>
        </motion.div>

        {/* Scroll Indicator - Clickable */}
        <motion.div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={handleScrollToExplore}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-foreground/50 group-hover:text-foreground/70 transition-colors">
              {t('scroll_explore')}
            </p>
            <svg
              className="w-6 h-6 text-primary/50 group-hover:text-primary transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
