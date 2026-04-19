"use client";

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
  const iconOnly = !showText;
  const viewBox = iconOnly ? "0 0 100 120" : "0 0 340 90";
  const computedHeight = iconOnly ? (width * 120) / 100 : (width * 90) / 340;

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
      <defs>
        {/* Main J gradient: cyan top → blue middle → purple bottom */}
        <linearGradient id="jGrad" x1="0.5" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="35%" stopColor="#3b82f6" />
          <stop offset="70%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>

        {/* Circuit line gradient */}
        <linearGradient id="circGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>

        {/* Bottom curve accent glow */}
        <linearGradient id="glowGrad" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#d946ef" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>

        {/* Text gradient: blue → deep purple */}
        <linearGradient id="textGrad" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="45%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>

        {/* Glow filter for nodes */}
        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {iconOnly ? (
        /* Icon-only mode (for smaller sizes) */
        <g transform="translate(10, 5)">
          <JIcon />
        </g>
      ) : (
        /* Full logo: icon + text */
        <g>
          <g transform="translate(5, 5) scale(0.75)">
            <JIcon />
          </g>

          {/* "JudyTech" as single text with gradient */}
          <text
            x="92"
            y="58"
            fontFamily="'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif"
            fontSize="38"
            fontWeight="700"
            fontStyle="italic"
            letterSpacing="-1"
          >
            <tspan fill="url(#textGrad)">Judy</tspan>
            <tspan fill="#a78bfa">Tech</tspan>
          </text>
        </g>
      )}
    </svg>
  );
}

function JIcon() {
  return (
    <g>
      {/* Main J body: vertical stroke + bottom curve */}
      <path
        d="
          M 42 8
          L 42 65
          C 42 82, 30 95, 15 95
          C 5 95, -2 88, 2 78
          C 5 72, 12 70, 18 73
          C 22 75, 24 80, 22 84
        "
        stroke="url(#jGrad)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* J top crossbar/serif */}
      <path
        d="M 25 8 L 60 8"
        stroke="url(#jGrad)"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Accent glow on bottom curve */}
      <path
        d="
          M 15 95
          C 5 95, -2 88, 2 78
        "
        stroke="url(#glowGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />

      {/* Circuit line: top-right diagonal going up-right */}
      <line
        x1="50" y1="12"
        x2="72" y2="-8"
        stroke="url(#circGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Circuit line: mid-left diagonal */}
      <line
        x1="38" y1="38"
        x2="15" y2="48"
        stroke="url(#circGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Circuit line: bottom-left going further out */}
      <line
        x1="15" y1="48"
        x2="-2" y2="58"
        stroke="url(#circGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Circuit line: small branch from top */}
      <line
        x1="55" y1="5"
        x2="68" y2="18"
        stroke="url(#circGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Node: top-right (cyan, large) */}
      <circle
        cx="72" cy="-8"
        r="5"
        fill="#22d3ee"
        filter="url(#nodeGlow)"
      />
      <circle cx="72" cy="-8" r="2.5" fill="white" opacity="0.8" />

      {/* Node: mid-left (blue-purple) */}
      <circle
        cx="15" cy="48"
        r="4.5"
        fill="#818cf8"
        filter="url(#nodeGlow)"
      />
      <circle cx="15" cy="48" r="2" fill="white" opacity="0.7" />

      {/* Node: far bottom-left (purple) */}
      <circle
        cx="-2" cy="58"
        r="3.5"
        fill="#a855f7"
        filter="url(#softGlow)"
      />
      <circle cx="-2" cy="58" r="1.5" fill="white" opacity="0.6" />

      {/* Node: top branch end */}
      <circle
        cx="68" cy="18"
        r="3"
        fill="#38bdf8"
        filter="url(#softGlow)"
      />
      <circle cx="68" cy="18" r="1.5" fill="white" opacity="0.7" />

      {/* Small bottom-right tail node */}
      <circle
        cx="22" cy="100"
        r="3.5"
        fill="#6d28d9"
        filter="url(#softGlow)"
      />
      <line
        x1="18" y1="88"
        x2="22" y2="100"
        stroke="#7c3aed"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </g>
  );
}
