'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface HeroOrbiterProps {
  position?: [number, number, number];
}

export default function HeroOrbiter({ position = [1.8, 0.4, -1.2] }: HeroOrbiterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(t * 0.4) * 0.3;
      groupRef.current.position.z = position[2] + Math.cos(t * 0.4) * 0.3;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.3;
      torusRef.current.rotation.y = t * 0.45;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh castShadow>
          <icosahedronGeometry args={[0.7, 1]} />
          <MeshTransmissionMaterial
            samples={6}
            thickness={0.6}
            chromaticAberration={0.05}
            anisotropy={0.3}
            roughness={0.05}
            ior={1.4}
            backside
            transmission={1}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#a5b4fc"
          />
        </mesh>

        <mesh ref={torusRef}>
          <torusGeometry args={[1.1, 0.04, 24, 64]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#06b6d4"
            emissiveIntensity={1.2}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}
