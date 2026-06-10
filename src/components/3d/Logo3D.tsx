'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface Logo3DProps {
  scale?: number;
  compact?: boolean;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Logo3D({ scale = 3.0, compact = false }: Logo3DProps) {
  const entranceDuration = compact ? 0.9 : 1.6;
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const logoTexture = useTexture('/logo.png');
  const [processedTexture, setProcessedTexture] = useState<THREE.Texture | null>(null);
  const progressRef = useRef(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mql.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const image = logoTexture.image as HTMLImageElement | undefined;
    if (!image || !image.complete) return;

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
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
    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    texture.needsUpdate = true;
    setProcessedTexture(texture);
  }, [logoTexture]);

  const layerCount = 14;
  const totalDepth = 0.18;
  const layerSpacing = totalDepth / layerCount;

  const layerMaterial = useMemo(() => {
    const tex = processedTexture ?? logoTexture;
    return new THREE.MeshPhysicalMaterial({
      map: tex,
      transparent: true,
      alphaTest: 0.15,
      metalness: 0.4,
      roughness: 0.35,
      clearcoat: 0.6,
      clearcoatRoughness: 0.25,
      envMapIntensity: 0.8,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.35,
      emissiveMap: tex,
      side: THREE.DoubleSide,
    });
  }, [logoTexture, processedTexture]);

  const glowMaterial = useMemo(() => {
    const tex = processedTexture ?? logoTexture;
    return new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      alphaTest: 0.15,
      color: new THREE.Color(0x06b6d4),
      blending: THREE.AdditiveBlending,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, [logoTexture, processedTexture]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const reducedMotion = reducedMotionRef.current;
    const t = state.clock.elapsedTime;

    progressRef.current = Math.min(1, progressRef.current + delta / entranceDuration);
    const eased = reducedMotion ? 1 : easeOutCubic(progressRef.current);

    const entranceScale = 0.9 + 0.1 * eased;
    group.scale.setScalar(scale * entranceScale);

    if (reducedMotion) {
      group.rotation.x = 0;
      group.rotation.y = 0;
      group.position.y = 0;
    } else if (compact) {
      const swingY = Math.sin(t * 0.8) * 0.5;
      const tiltY = mouse.x * 0.15 * eased;
      const tiltX = -mouse.y * 0.08 * eased;
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, swingY + tiltY, 0.06);
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, tiltX, 0.06);
      group.position.y = 0;
    } else {
      const tiltY = mouse.x * 0.04 * eased;
      const tiltX = -mouse.y * 0.025 * eased;
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, tiltY, 0.04);
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, tiltX, 0.04);
      group.position.y = Math.sin(t * 0.5) * 0.05 * eased;
    }

    glowMaterial.opacity = (compact ? 0.18 : 0.22) * eased;
    layerMaterial.emissiveIntensity = 0.15 + (compact ? 0.35 : 0.25) * eased;
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: layerCount }).map((_, i) => {
        const z = (i - layerCount / 2) * layerSpacing;
        return (
          <mesh
            key={i}
            position={[0, 0, z]}
            material={layerMaterial}
          >
            <planeGeometry args={[4.4, 3.2]} />
          </mesh>
        );
      })}

      {/* Single soft glow behind the logo */}
      <mesh
        position={[0, 0, -totalDepth / 2 - 0.04]}
        scale={[1.04, 1.04, 1]}
        material={glowMaterial}
      >
        <planeGeometry args={[4.4, 3.2]} />
      </mesh>
    </group>
  );
}
