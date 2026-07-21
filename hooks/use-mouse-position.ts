"use client"

import { useEffect, useRef, useState } from "react"

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const rafId = useRef<number | null>(null)
  const pending = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const onMove = (e: MouseEvent) => {
      pending.current = { x: e.clientX, y: e.clientY }
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame(() => {
          if (pending.current) setPos(pending.current)
          rafId.current = null
        })
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (rafId.current != null) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return pos
}
