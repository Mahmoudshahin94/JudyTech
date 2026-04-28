import { Variants } from "framer-motion";

export const animationPresets = {
  // Container animations
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as Variants,

  // Item animations
  itemVariants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  } as Variants,

  // Fade in up
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  } as Variants,

  // Scale in
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  } as Variants,

  // Slide in from left
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  } as Variants,

  // Slide in from right
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  } as Variants,

  // Rotate in
  rotateIn: {
    hidden: { opacity: 0, rotate: -5, scale: 0.95 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  } as Variants,

  // Hover animations
  hoverScale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },

  // Button animations
  buttonHover: {
    whileHover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)",
    },
    whileTap: { scale: 0.95 },
  },

  // Card hover
  cardHover: {
    whileHover: {
      y: -8,
      boxShadow: "0 16px 48px rgba(99, 102, 241, 0.2)",
    },
  },
};

// Easing functions
export const easings = {
  easeInOutCubic: [0.645, 0.045, 0.355, 1],
  easeOutCubic: [0.215, 0.61, 0.355, 1],
  easeInCubic: [0.55, 0.055, 0.675, 0.19],
  easeOutQuad: [0.25, 0.46, 0.45, 0.94],
  easeOutQuint: [0.23, 1, 0.320, 1],
  easeOutCirc: [0, 0.55, 0.45, 1],
};

// Transition presets
export const transitions = {
  default: { duration: 0.3, ease: "easeInOut" },
  fast: { duration: 0.2, ease: "easeInOut" },
  slow: { duration: 0.6, ease: "easeInOut" },
  spring: { type: "spring", stiffness: 100, damping: 10 },
  bounce: { type: "spring", stiffness: 300, damping: 10 },
};
