'use client';

import { useEffect, useState } from 'react';

export type Quality = 'low' | 'high';

export function useQuality(): Quality {
  const [quality, setQuality] = useState<Quality>('high');

  useEffect(() => {
    const compute = () => {
      if (typeof window === 'undefined') return 'high' as Quality;
      const isSmall = window.innerWidth < 768;
      const reduced =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const lowMem =
        // @ts-expect-error: deviceMemory is non-standard but widely supported
        typeof navigator !== 'undefined' && navigator.deviceMemory
          ? // @ts-expect-error
            navigator.deviceMemory < 4
          : false;
      return isSmall || reduced || lowMem ? 'low' : 'high';
    };

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
