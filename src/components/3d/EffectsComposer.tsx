'use client';

import { Suspense } from 'react';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

interface EffectsComposerProps {
  enableBloom?: boolean;
  bloomIntensity?: number;
  quality?: 'low' | 'high';
}

export default function Effects({
  enableBloom = true,
  bloomIntensity = 1.2,
  quality = 'high',
}: EffectsComposerProps) {
  const isHigh = quality === 'high';
  const intensity = isHigh ? bloomIntensity : 0.55;

  return (
    <Suspense fallback={null}>
      <EffectComposer multisampling={isHigh ? 4 : 0}>
        <>
          {enableBloom ? (
            <Bloom
              intensity={intensity}
              blendFunction={BlendFunction.SCREEN}
              kernelSize={2}
              luminanceThreshold={0.12}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
          ) : (
            <></>
          )}
          {isHigh ? (
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={new Vector2(0.0008, 0.0012)}
              radialModulation={false}
              modulationOffset={0}
            />
          ) : (
            <></>
          )}
          {isHigh ? (
            <Vignette eskil={false} offset={0.3} darkness={0.55} />
          ) : (
            <></>
          )}
        </>
      </EffectComposer>
    </Suspense>
  );
}
