'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface Logo3DProps {
  scale?: number;
  speed?: number;
}

export default function Logo3D({ scale = 3.8, speed = 0.8 }: Logo3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const logoTexture = useTexture('/logo.png');
  const [processedTexture, setProcessedTexture] = useState<THREE.Texture | null>(null);

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
    texture.needsUpdate = true;
    setProcessedTexture(texture);
  }, [logoTexture]);

  const layerCount = 22;
  const totalDepth = 0.24;
  const layerSpacing = totalDepth / layerCount;

  const layerMaterial = useMemo(() => {
    const tex = processedTexture ?? logoTexture;
    return new THREE.MeshPhysicalMaterial({
      map: tex,
      transparent: true,
      alphaTest: 0.1,
      metalness: 0.55,
      roughness: 0.32,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      envMapIntensity: 1.0,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.55,
      emissiveMap: tex,
      side: THREE.DoubleSide,
    });
  }, [logoTexture, processedTexture]);

  const haloMaterial = useMemo(() => {
    const tex = processedTexture ?? logoTexture;
    return new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      alphaTest: 0.1,
      color: new THREE.Color(0x06b6d4),
      blending: THREE.AdditiveBlending,
      opacity: 0.28,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, [logoTexture, processedTexture]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const targetY = groupRef.current.rotation.y + delta * 0.55 * speed;
    const cursorTiltY = mouse.x * 0.18;
    const cursorTiltX = -mouse.y * 0.12;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY + cursorTiltY,
      0.08
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      cursorTiltX,
      0.08
    );

    groupRef.current.position.y = 0.2 + Math.sin(state.clock.elapsedTime * 0.6) * 0.18;
  });

  return (
    <group ref={groupRef} scale={scale}>
      {Array.from({ length: layerCount }).map((_, i) => {
        const z = (i - layerCount / 2) * layerSpacing;
        return (
          <mesh
            key={i}
            position={[0, 0, z]}
            castShadow={i === layerCount - 1}
            receiveShadow={i === 0}
            material={layerMaterial}
          >
            <planeGeometry args={[4.4, 3.2]} />
          </mesh>
        );
      })}

      {/* Neon rim halo (front + back) */}
      <mesh
        position={[0, 0, totalDepth / 2 + 0.02]}
        scale={[1.015, 1.015, 1]}
        material={haloMaterial}
      >
        <planeGeometry args={[4.4, 3.2]} />
      </mesh>
      <mesh
        position={[0, 0, -totalDepth / 2 - 0.02]}
        scale={[1.015, 1.015, 1]}
        material={haloMaterial}
      >
        <planeGeometry args={[4.4, 3.2]} />
      </mesh>
    </group>
  );
}
