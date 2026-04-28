'use client';

import { Suspense } from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

interface EffectsComposerProps {
  enableBloom?: boolean;
  bloomIntensity?: number;
}

export default function Effects({
  enableBloom = true,
  bloomIntensity = 1.5,
}: EffectsComposerProps) {
  return (
    <Suspense fallback={null}>
      <EffectComposer>
        <Bloom
          intensity={bloomIntensity}
          blendFunction={BlendFunction.SCREEN}
          kernelSize={2}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </Suspense>
  );
}
