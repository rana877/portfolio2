"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect } from "react"
import { useActiveSection } from "@/hooks/use-active-section"
import { useIsMobile } from "@/hooks/use-mobile"
import { tokens } from "@/lib/design-tokens"

// Section IDs the mascot cares about. Order = expected page flow.
const SECTIONS = ["hero", "portrait", "about", "skills", "projects", "services", "contact"] as const
type Section = typeof SECTIONS[number]

// Position (fixed) + tilt per section
const POSITIONS: Record<Section, { top: string; right: string; rotate: number; scale: number }> = {
  hero:     { top: "18%", right: "6%",  rotate: -4, scale: 1.00 },
  portrait: { top: "40%", right: "4%",  rotate:  3, scale: 0.88 },
  about:    { top: "30%", right: "8%",  rotate:  2, scale: 0.95 },
  skills:   { top: "22%", right: "10%", rotate: -1, scale: 1.00 },
  projects: { top: "15%", right: "6%",  rotate:  0, scale: 1.05 },
  services: { top: "32%", right: "8%",  rotate:  3, scale: 0.92 },
  contact:  { top: "25%", right: "8%",  rotate: -2, scale: 1.00 },
}

// Mobile positions — robot pinned to bottom-right corner across all sections,
// only pose (arm + mouth) changes. Avoids covering content on narrow screens.
const POSITIONS_MOBILE: Record<Section, { top: string; right: string; rotate: number; scale: number }> = {
  hero:     { top: "auto", right: "4%", rotate: -4, scale: 0.55 },
  portrait: { top: "auto", right: "4%", rotate:  3, scale: 0.50 },
  about:    { top: "auto", right: "4%", rotate:  2, scale: 0.55 },
  skills:   { top: "auto", right: "4%", rotate: -1, scale: 0.55 },
  projects: { top: "auto", right: "4%", rotate:  0, scale: 0.58 },
  services: { top: "auto", right: "4%", rotate:  3, scale: 0.55 },
  contact:  { top: "auto", right: "4%", rotate: -2, scale: 0.55 },
}

// Right-arm rotation (deg) — animates the "gesture"
const ARM_ROTATION: Record<Section, number> = {
  hero: -40, portrait: -20, about: -5, skills: -15, projects: -60, services: -20, contact: -50,
}

// Mouth path per section
const MOUTHS: Record<Section, string> = {
  hero:     "M 55 68 Q 60 73 65 68",
  portrait: "M 55 68 Q 60 72 65 68",
  about:    "M 55 70 L 65 70",
  skills:   "M 56 70 Q 60 72 64 70",
  projects: "M 54 68 Q 60 74 66 68",
  services: "M 55 69 Q 60 71 65 69",
  contact:  "M 54 67 Q 60 75 66 67",
}

export function RobotMascot() {
  const active = useActiveSection([...SECTIONS]) as Section
  const isMobile = useIsMobile() ?? false
  const positionMap = isMobile ? POSITIONS_MOBILE : POSITIONS
  const pos = positionMap[active] ?? positionMap.hero
  const armAngle = ARM_ROTATION[active] ?? ARM_ROTATION.hero
  const mouthPath = MOUTHS[active] ?? MOUTHS.hero

  // Eye tracking — spring-smoothed motion values
  const eyeX = useSpring(useMotionValue(0), { stiffness: 120, damping: 15 })
  const eyeY = useSpring(useMotionValue(0), { stiffness: 120, damping: 15 })

  useEffect(() => {
    if (typeof window === "undefined") return
    if (isMobile) {
      // Center the pupils on mobile — no cursor to track
      eyeX.set(0)
      eyeY.set(0)
      return
    }
    const onMove = (e: MouseEvent) => {
      // Robot lives right-side; approximate anchor at 90% viewport width
      const anchorX = window.innerWidth * 0.9
      const anchorY = window.innerHeight * 0.35
      const dx = Math.max(-3, Math.min(3, (e.clientX - anchorX) / 100))
      const dy = Math.max(-2, Math.min(2, (e.clientY - anchorY) / 100))
      eyeX.set(dx)
      eyeY.set(dy)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [eyeX, eyeY, isMobile])

  return (
    <motion.div
      aria-hidden
      animate={{
        top: pos.top,
        right: pos.right,
        bottom: isMobile ? "3%" : "auto",
        rotate: pos.rotate,
        scale: pos.scale,
      }}
      transition={{ type: "spring", stiffness: 55, damping: 18 }}
      style={{
        position: "fixed",
        width: 140,
        height: 180,
        zIndex: 30,
        pointerEvents: "none",
      }}
    >
      {/* Idle float animation on inner wrapper — respects prefers-reduced-motion */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: "100%", height: "100%" }}
      >
        <svg
          viewBox="0 0 120 160"
          style={{
            width: "100%",
            height: "100%",
            filter: `drop-shadow(0 8px 20px ${tokens.color.cyan}40)`,
          }}
        >
          <defs>
            <linearGradient id="bot-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#1a2340" />
              <stop offset="100%" stopColor={tokens.color.ink} />
            </linearGradient>
            <radialGradient id="bot-base-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"  stopColor={tokens.color.cyan} stopOpacity="0.6" />
              <stop offset="100%" stopColor={tokens.color.cyan} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="bot-eye" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#67E8F9" />
              <stop offset="100%" stopColor="#0891B2" />
            </linearGradient>
          </defs>

          {/* Hover base */}
          <ellipse cx={60} cy={148} rx={35} ry={6} fill="url(#bot-base-glow)" />

          {/* Antenna */}
          <line x1={60} y1={20} x2={60} y2={10}
                stroke={tokens.color.line} strokeWidth={1.5} />
          <circle cx={60} cy={8} r={3} fill={tokens.color.cyan}>
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="r" values="2.5;3.8;2.5" dur="1.5s" repeatCount="indefinite" />
          </circle>

          {/* Head */}
          <rect x={20} y={20} width={80} height={60} rx={24}
                fill="url(#bot-body)"
                stroke={tokens.color.cyan} strokeWidth={1.2} strokeOpacity={0.5} />

          {/* Eye whites (fixed positions) */}
          <circle cx={42} cy={50} r={10} fill="#F8FAFC" />
          <circle cx={78} cy={50} r={10} fill="#F8FAFC" />

          {/* Pupils — group transformed by motion values */}
          <motion.g style={{ x: eyeX, y: eyeY }}>
            <circle cx={42} cy={50} r={5.5} fill="url(#bot-eye)" />
            <circle cx={78} cy={50} r={5.5} fill="url(#bot-eye)" />
            <circle cx={40} cy={48} r={1.5} fill="white" />
            <circle cx={76} cy={48} r={1.5} fill="white" />
          </motion.g>

          {/* Mouth — animates path on section change via framer motion */}
          <motion.path
            stroke={tokens.color.cyan}
            strokeWidth={1.8}
            fill="none"
            strokeLinecap="round"
            initial={false}
            animate={{ d: mouthPath }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          {/* Cheeks */}
          <circle cx={30} cy={60} r={3} fill={tokens.color.magenta} opacity={0.35} />
          <circle cx={90} cy={60} r={3} fill={tokens.color.magenta} opacity={0.35} />

          {/* Body */}
          <rect x={32} y={82} width={56} height={42} rx={12}
                fill="url(#bot-body)"
                stroke={tokens.color.cyan} strokeWidth={1} strokeOpacity={0.4} />

          {/* Chest LED */}
          <rect x={42} y={98} width={36} height={4} rx={2} fill={tokens.color.line} />
          <rect x={42} y={98} height={4} rx={2} fill={tokens.color.cyan}>
            <animate attributeName="width" values="8;30;8" dur="2s" repeatCount="indefinite" />
          </rect>

          {/* Left arm (static) */}
          <line x1={32} y1={92} x2={20} y2={108}
                stroke={tokens.color.line} strokeWidth={4} strokeLinecap="round" />
          <circle cx={20} cy={108} r={4} fill={tokens.color.ink}
                  stroke={tokens.color.cyan} strokeWidth={1} strokeOpacity={0.5} />

          {/* Right arm — animates per section */}
          <motion.g
            style={{ originX: "88px", originY: "92px" }}
            animate={{ rotate: armAngle }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            <line x1={88} y1={92} x2={100} y2={108}
                  stroke={tokens.color.line} strokeWidth={4} strokeLinecap="round" />
            <circle cx={100} cy={108} r={4} fill={tokens.color.ink}
                    stroke={tokens.color.cyan} strokeWidth={1} strokeOpacity={0.7} />
          </motion.g>

          {/* Legs */}
          <line x1={48} y1={124} x2={48} y2={140}
                stroke={tokens.color.line} strokeWidth={3} strokeLinecap="round" />
          <line x1={72} y1={124} x2={72} y2={140}
                stroke={tokens.color.line} strokeWidth={3} strokeLinecap="round" />
        </svg>
      </motion.div>
    </motion.div>
  )
}
