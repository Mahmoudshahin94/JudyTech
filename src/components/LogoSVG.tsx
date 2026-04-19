"use client";

import { useId } from "react";

interface LogoSVGProps {
  width?: number;
  height?: number;
  showText?: boolean;
  className?: string;
}

export default function LogoSVG({
  width = 300,
  height = 80,
  showText = true,
  className = "",
}: LogoSVGProps) {
  const rawId = useId().replace(/:/g, "");
  const markGrad = `lg-mark-${rawId}`;
  const circGrad = `lg-circ-${rawId}`;
  const glowGrad = `lg-glow-${rawId}`;
  const textGrad = `lg-text-${rawId}`;
  const nodeGlow = `ft-node-${rawId}`;
  const softGlow = `ft-soft-${rawId}`;

  const iconOnly = !showText;
  const viewBox = iconOnly ? "0 0 100 100" : "0 0 340 90";
  const computedHeight = iconOnly ? (width * 100) / 100 : (width * 90) / 340;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={height || computedHeight}
      fill="none"
      className={className}
      aria-label="JudyTech Logo"
      style={{ direction: "ltr" }}
    >
      <desc>
        Letter J for Judy, styled as a circuit trace with connection pads — JudyTech
        bridges people and technology.
      </desc>
      <defs>
        <linearGradient id={markGrad} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6d28d9" />
          <stop offset="40%" stopColor="#6366f1" />
          <stop offset="70%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        <linearGradient id={circGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>

        <linearGradient id={glowGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d946ef" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>

        <linearGradient id={textGrad} x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="45%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>

        <filter id={nodeGlow} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id={softGlow} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {iconOnly ? (
        <g transform="translate(4, 4) scale(0.92)">
          <JudyCircuitMark
            markGrad={markGrad}
            circGrad={circGrad}
            glowGrad={glowGrad}
            nodeGlow={nodeGlow}
            softGlow={softGlow}
          />
        </g>
      ) : (
        <g>
          <g transform="translate(6, 6) scale(0.82)">
            <JudyCircuitMark
              markGrad={markGrad}
              circGrad={circGrad}
              glowGrad={glowGrad}
              nodeGlow={nodeGlow}
              softGlow={softGlow}
            />
          </g>

          <text
            x="96"
            y="58"
            fontFamily="'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif"
            fontSize="38"
            fontWeight="700"
            fontStyle="italic"
            letterSpacing="-1"
          >
            <tspan fill={`url(#${textGrad})`}>Judy</tspan>
            <tspan fill="#a78bfa">Tech</tspan>
          </text>
        </g>
      )}
    </svg>
  );
}

/**
 * Judy + tech: a clear “J” for Judy, drawn like a PCB trace with pads and branches —
 * the human initial carried by engineering metaphors (circuits, vias, signal paths).
 */
function JudyCircuitMark({
  markGrad,
  circGrad,
  glowGrad,
  nodeGlow,
  softGlow,
}: {
  markGrad: string;
  circGrad: string;
  glowGrad: string;
  nodeGlow: string;
  softGlow: string;
}) {
  return (
    <g>
      {/* Main letterform — continuous trace */}
      <path
        d="
          M 18 11
          L 45 11
          L 45 63
          C 45 79 31 89 14 81
          C 7 77 5 68 14 61
        "
        stroke={`url(#${markGrad})`}
        strokeWidth="8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Inner hook glow */}
      <path
        d="M 14 81 C 7 77 5 68 14 61"
        stroke={`url(#${glowGrad})`}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />

      {/* Branch traces — data / bus lines from the stem */}
      <path
        d="M 45 28 L 62 18 L 74 22"
        stroke={`url(#${circGrad})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M 45 42 L 58 48 L 72 44"
        stroke={`url(#${circGrad})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.75"
      />
      <path
        d="M 18 11 L 10 22 L 8 34"
        stroke={`url(#${circGrad})`}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.65"
      />

      {/* Hex pad — silicon / package pin style at trace end */}
      <polygon
        points="74,17 79,20 79,26 74,29 69,26 69,20"
        fill={`url(#${markGrad})`}
        opacity="0.95"
        stroke="#22d3ee"
        strokeWidth="0.75"
      />

      {/* Solder pads / vias on the J */}
      <circle cx="18" cy="11" r="5" fill="#22d3ee" filter={`url(#${nodeGlow})`} />
      <circle cx="18" cy="11" r="2.2" fill="white" opacity="0.9" />

      <circle cx="45" cy="11" r="5" fill="#38bdf8" filter={`url(#${softGlow})`} />
      <circle cx="45" cy="11" r="2" fill="white" opacity="0.88" />

      <circle cx="45" cy="63" r="4.5" fill="#6366f1" filter={`url(#${softGlow})`} />
      <circle cx="45" cy="63" r="1.8" fill="white" opacity="0.82" />

      <circle cx="14" cy="61" r="5" fill="#a855f7" filter={`url(#${nodeGlow})`} />
      <circle cx="14" cy="61" r="2.2" fill="white" opacity="0.85" />

      {/* Branch endpoints */}
      <circle cx="72" cy="44" r="3.5" fill="#818cf8" filter={`url(#${softGlow})`} />
      <circle cx="72" cy="44" r="1.4" fill="white" opacity="0.8" />

      <circle cx="8" cy="34" r="3.2" fill="#6d28d9" filter={`url(#${softGlow})`} />
      <circle cx="8" cy="34" r="1.3" fill="white" opacity="0.7" />
    </g>
  );
}
