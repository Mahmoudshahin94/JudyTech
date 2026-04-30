'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: number;
  depth?: 'far' | 'mid';
  spread?: number;
  shader?: boolean;
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aSeed;

  void main() {
    vec3 pos = position;
    float wobble = sin(uTime * 0.5 + aSeed * 6.2831) * 0.15;
    pos.y += wobble;
    pos.x += cos(uTime * 0.3 + aSeed * 6.2831) * 0.1;
    pos.xy += uMouse * uMouseStrength * (0.5 + aSeed * 0.5);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * uPixelRatio * (1.0 / -mvPosition.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float d = length(c);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);
    alpha *= alpha;
    gl_FragColor = vec4(uColor, alpha * 0.85);
  }
`;

export default function ParticleField({
  count = 500,
  color = '#6366f1',
  size = 6,
  depth = 'far',
  spread = 12,
  shader = true,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse, gl } = useThree();

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      seeds[i] = Math.random();
    }
    return { positions, seeds };
  }, [count, spread]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseStrength: { value: depth === 'mid' ? 0.6 : 0.15 },
      uSize: { value: size * 30 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uColor: { value: new THREE.Color(color) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += delta * 0.01;
      pointsRef.current.rotation.y += delta * 0.03 * (depth === 'mid' ? 1.6 : 1);
    }
    if (matRef.current) {
      uniforms.uTime.value = state.clock.elapsedTime;
      uniforms.uMouse.value.x += (mouse.x - uniforms.uMouse.value.x) * 0.05;
      uniforms.uMouse.value.y += (mouse.y - uniforms.uMouse.value.y) * 0.05;
    }
  });

  if (!shader) {
    return (
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={size * 0.012}
          color={color}
          sizeAttenuation
          opacity={0.5}
          transparent
          depthWrite={false}
        />
      </points>
    );
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSeed"
          array={seeds}
          count={seeds.length}
          itemSize={1}
          args={[seeds, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
