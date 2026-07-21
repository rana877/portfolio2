"use client"

import { useEffect, useState } from "react"

/**
 * Watches a list of DOM element IDs and returns whichever one currently
 * has the highest intersection ratio with the viewport. Falls back to the
 * first ID before any observer callback fires.
 */
export function useActiveSection(ids: string[], fallback = ids[0]) {
  const [active, setActive] = useState<string>(fallback)

  useEffect(() => {
    if (typeof window === "undefined") return

    const elements = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    // Track ratios per id, pick the max on each callback
    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          ratios.set(entry.target.id, entry.intersectionRatio)
        })
        let bestId = fallback
        let bestRatio = 0
        ratios.forEach((r, id) => {
          if (r > bestRatio) {
            bestRatio = r
            bestId = id
          }
        })
        if (bestRatio > 0) setActive(bestId)
      },
      {
        // Fire at multiple thresholds so we get smooth transitions
        threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1],
        rootMargin: "-20% 0px -20% 0px",
      }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, fallback])

  return active
}
