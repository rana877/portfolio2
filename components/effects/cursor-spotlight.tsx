"use client"

import { useMousePosition } from "@/hooks/use-mouse-position"
import { tokens } from "@/lib/design-tokens"

export function CursorSpotlight() {
  const { x, y } = useMousePosition()

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: y - 200,
        left: x - 200,
        width: 400,
        height: 400,
        pointerEvents: "none",
        background: `radial-gradient(circle, ${tokens.color.cyan}0f 0%, transparent 60%)`,
        mixBlendMode: "screen",
        // Trailing feel — CSS transition on position
        transition: "top 0.18s ease-out, left 0.18s ease-out",
        zIndex: 5,
        // Hide on touch devices (no cursor)
        display: "var(--cursor-spotlight-display, block)",
      }}
      className="hidden lg:block"
    />
  )
}
