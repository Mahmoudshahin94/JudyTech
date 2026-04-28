export const colors = {
  background: "#050510",
  foreground: "#f1f5f9",
  surface: "rgba(255, 255, 255, 0.05)",
  surfaceBorder: "rgba(255, 255, 255, 0.1)",
  primary: "#6366f1",
  secondary: "#8b5cf6",
  accent: "#06b6d4",
  accentLight: "#22d3ee",
  
  // Glass tints
  glassLight: "rgba(255, 255, 255, 0.03)",
  glassMedium: "rgba(255, 255, 255, 0.08)",
  glassDark: "rgba(255, 255, 255, 0.12)",
  
  // Gradients
  gradientPrimary: "linear-gradient(135deg, #6366f1, #8b5cf6, #22d3ee)",
  gradientAccent: "linear-gradient(135deg, #06b6d4, #22d3ee)",
  
  // RGB versions for Three.js
  primaryRgb: [99, 102, 241],
  secondaryRgb: [139, 92, 246],
  accentRgb: [6, 182, 212],
};

export type ColorKey = keyof typeof colors;
