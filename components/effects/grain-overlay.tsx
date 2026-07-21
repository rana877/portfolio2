"use client"

/** Filmic grain overlay. Fixed, non-interactive, sits above everything visual. */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="grain"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 40,
      }}
    />
  )
}
