'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: number;
}

export default function ParticleField({
  count = 500,
  color = '#6366f1',
  size = 0.02,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    return positions;
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.x += 0.0001;
    pointsRef.current.rotation.y += 0.0003;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        sizeAttenuation
        opacity={0.4}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
