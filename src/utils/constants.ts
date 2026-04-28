export const BREAKPOINTS = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

export const Z_INDEX = {
  background: 0,
  content: 10,
  floating: 20,
  modal: 100,
  tooltip: 110,
} as const;

export const ANIMATION_DURATIONS = {
  fast: 0.2,
  base: 0.3,
  slow: 0.6,
  verySlow: 1.0,
} as const;

export const BLUR_VALUES = {
  none: "0px",
  small: "4px",
  medium: "10px",
  large: "20px",
  xlarge: "30px",
} as const;

export const SHADOW_VALUES = {
  sm: "0 4px 6px rgba(0, 0, 0, 0.07)",
  base: "0 8px 16px rgba(0, 0, 0, 0.1)",
  md: "0 12px 24px rgba(0, 0, 0, 0.15)",
  lg: "0 16px 32px rgba(0, 0, 0, 0.2)",
  glow: "0 0 20px rgba(99, 102, 241, 0.3)",
} as const;

export const VIEWPORT = {
  once: true,
  margin: "0px 0px -100px 0px",
} as const;

// Three.js settings
export const THREE_CONFIG = {
  FOV: 75,
  NEAR: 0.1,
  FAR: 1000,
  CAMERA_Z: 5,
};

// Performance
export const PERFORMANCE = {
  enableBloom: true,
  enablePostProcessing: true,
  pixelRatio: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
  maxParticles: 1000,
} as const;
