'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  PerspectiveCamera,
  Environment,
  ContactShadows,
} from '@react-three/drei';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import * as THREE from 'three';
import Logo3D from './Logo3D';
import ParticleField from './ParticleField';
import HeroOrbiter from './HeroOrbiter';
import Effects from './EffectsComposer';
import { useQuality } from './useQuality';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollToPlugin);

interface Hero3DProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  ctaLabel?: string;
  onCTAClick?: () => void;
}

function MouseParallaxRig() {
  const { camera, mouse } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 8));

  useFrame(() => {
    target.current.x = mouse.x * 0.6;
    target.current.y = mouse.y * 0.4;
    camera.position.x += (target.current.x - camera.position.x) * 0.05;
    camera.position.y += (target.current.y - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function SceneContent({ quality }: { quality: 'low' | 'high' }) {
  const isHigh = quality === 'high';

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />

      <fog attach="fog" args={['#050510', 8, 20]} />

      {/* Lighting */}
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[4, 6, 6]}
        intensity={1.1}
        castShadow={isHigh}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      <pointLight position={[-5, 3, 4]} intensity={0.55} color="#8b5cf6" />
      <pointLight position={[5, -2, 5]} intensity={0.45} color="#06b6d4" />
      <pointLight position={[0, 2, -6]} intensity={0.4} color="#7c3aed" />

      {/* HDRI for reflections (no background) */}
      <Environment preset="city" background={false} />

      {/* 3D Logo (focal point) */}
      <Logo3D scale={1.5} speed={0.8} />

      {/* Glass orbiter — high quality only */}
      {isHigh && <HeroOrbiter position={[2.2, 0.6, -1.4]} />}

      {/* Soft contact shadow */}
      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.55}
        blur={2.6}
        far={4}
        scale={12}
        resolution={isHigh ? 512 : 256}
      />

      {/* Layered particle field */}
      <ParticleField
        count={isHigh ? 500 : 220}
        color="#6366f1"
        size={5}
        depth="far"
        spread={14}
      />
      {isHigh && (
        <ParticleField
          count={180}
          color="#22d3ee"
          size={9}
          depth="mid"
          spread={9}
        />
      )}

      {/* Mouse parallax */}
      <MouseParallaxRig />

      {/* Post Processing */}
      <Effects enableBloom bloomIntensity={1.2} quality={quality} />
    </>
  );
}

export default function Hero3D({
  title = 'Premium 3D Experience',
  subtitle = 'Craft exceptional digital experiences with cutting-edge technology',
  badge = '✨ Next Generation',
  ctaLabel = 'Explore More',
  onCTAClick,
}: Hero3DProps) {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const quality = useQuality();

  // CSS-layer parallax for depth backgrounds
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 80 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 80 });

  const farX = useTransform(smoothX, (v) => v * 0.005);
  const farY = useTransform(smoothY, (v) => v * 0.005);
  const midX = useTransform(smoothX, (v) => v * 0.012);
  const midY = useTransform(smoothY, (v) => v * 0.012);
  const nearX = useTransform(smoothX, (v) => v * 0.022);
  const nearY = useTransform(smoothY, (v) => v * 0.022);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

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
      transition: { staggerChildren: 0.18, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: 'easeOut' },
    },
  } as const;

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* Layered CSS depth backgrounds */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ x: farX, y: farY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.10) 30%, transparent 65%)',
          }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.07]"
        style={{
          x: midX,
          y: midY,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-[2]">
        <Canvas
          shadows={quality === 'high'}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, quality === 'high' ? 2 : 1.5]}
        >
          <Suspense fallback={null}>
            <SceneContent quality={quality} />
          </Suspense>
        </Canvas>
      </div>

      {/* Volumetric fog vignette */}
      <motion.div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{ x: nearX, y: nearY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,16,0.55) 90%)',
          }}
        />
        {/* Top + bottom DOF blur edges */}
        <div
          className="absolute top-0 left-0 right-0 h-24"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            maskImage: 'linear-gradient(to bottom, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            maskImage: 'linear-gradient(to top, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
          }}
        />
      </motion.div>

      {/* Foreground gradient blend into next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 z-[4] bg-gradient-to-b from-transparent to-background pointer-events-none" />

      {/* Content — title pinned to top, subtitle+CTA pinned to bottom so the 3D logo is clearly visible in between */}
      <motion.div
        className="relative z-[10] h-full flex flex-col items-center px-4 pt-24 md:pt-28 pb-28 md:pb-32 pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-center tracking-tight gradient-text text-3d-extrude text-shimmer-hover pointer-events-auto"
        >
          {title}
        </motion.h1>

        <div className="flex-1" />

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-foreground/70 text-center max-w-2xl mb-8 pointer-events-auto"
        >
          {subtitle}
        </motion.p>

        <motion.div variants={itemVariants} className="flex gap-4 pointer-events-auto">
          <AnimatedButton
            onClick={onCTAClick}
            variant="primary"
            size="lg"
            shimmer
            glass3d
            className="px-8"
          >
            {ctaLabel}
          </AnimatedButton>
        </motion.div>

        <motion.div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer group"
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
