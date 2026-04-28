'use client';

import { createContext, useContext, useMemo, useState } from 'react';

interface CursorContextValue {
  isInteractiveHovered: boolean;
  isLogoHovered: boolean;
  setInteractiveHovered: (value: boolean) => void;
  setLogoHovered: (value: boolean) => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [isInteractiveHovered, setInteractiveHovered] = useState(false);
  const [isLogoHovered, setLogoHovered] = useState(false);

  const value = useMemo(
    () => ({
      isInteractiveHovered,
      isLogoHovered,
      setInteractiveHovered,
      setLogoHovered,
    }),
    [isInteractiveHovered, isLogoHovered]
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within CursorProvider');
  }
  return context;
}
