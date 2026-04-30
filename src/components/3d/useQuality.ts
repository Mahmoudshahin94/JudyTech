'use client';

import { useEffect, useState } from 'react';

export type Quality = 'low' | 'high';

function compute(): Quality {
  if (typeof window === 'undefined') return 'high';
  const isSmall = window.innerWidth < 768;
  const reduced =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (ua.includes('Mac') && 'ontouchend' in document);
  // @ts-expect-error: deviceMemory is non-standard but widely supported
  const lowMem = typeof navigator !== 'undefined' && navigator.deviceMemory
    ? // @ts-expect-error
      navigator.deviceMemory < 4
    : false;
  return isSmall || reduced || lowMem || isIOS ? 'low' : 'high';
}

export function useQuality(): Quality {
  // Compute synchronously on first render so the Canvas never mounts at "high"
  // on mobile/iOS only to downgrade — avoids context loss on memory-constrained Safari iOS.
  const [quality, setQuality] = useState<Quality>(compute);

  useEffect(() => {
    setQuality(compute());

    const onResize = () => setQuality(compute());
    window.addEventListener('resize', onResize);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener?.('change', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      mq.removeEventListener?.('change', onResize);
    };
  }, []);

  return quality;
}
