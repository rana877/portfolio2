export const tokens = {
  color: {
    base:    "#050818",
    ink:     "#0B1226",
    inkHi:   "#111a35",
    line:    "#1A2340",
    lineHi:  "#2a3760",
    cyan:    "#22D3EE",
    magenta: "#E879F9",
    success: "#34D399",
    amber:   "#FBBF24",
    text:    "#F8FAFC",
    muted:   "#94A3B8",
    mute2:   "#64748B",
  },
  font: {
    sans:  "var(--font-sans)",
    serif: "var(--font-serif)",
    mono:  "var(--font-mono)",
  },
  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
  },
} as const;

export type Tokens = typeof tokens;
