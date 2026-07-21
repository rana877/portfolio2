"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"
import { tokens } from "@/lib/design-tokens"

interface Node {
  id: string
  x: number
  y: number
  label: string
  color: string
}

const NODES: Node[] = [
  { id: "trg", x: 140, y: 120, label: "Trigger",  color: tokens.color.amber   },
  { id: "rt",  x: 380, y: 210, label: "Router",   color: tokens.color.cyan    },
  { id: "llm", x: 640, y: 150, label: "GPT-4",    color: tokens.color.cyan    },
  { id: "apf", x: 640, y: 370, label: "Apify",    color: tokens.color.cyan    },
  { id: "enr", x: 900, y: 260, label: "Enrich",   color: tokens.color.magenta },
  { id: "db",  x: 1160, y: 200, label: "Supabase", color: tokens.color.cyan    },
  { id: "crm", x: 1160, y: 420, label: "GHL",      color: tokens.color.cyan    },
  { id: "nf",  x: 900, y: 540, label: "Brevo",    color: tokens.color.success },
]

const LINKS: Array<[string, string]> = [
  ["trg", "rt"], ["rt", "llm"], ["rt", "apf"],
  ["llm", "enr"], ["apf", "enr"],
  ["enr", "db"], ["enr", "crm"], ["enr", "nf"],
]

// Mobile layout — portrait viewBox (400×800), nodes arranged vertically,
// fewer horizontal spread. Same 8 nodes and same link topology, just repositioned.
const NODES_MOBILE: Node[] = [
  { id: "trg", x: 60,  y: 100, label: "Trigger",  color: tokens.color.amber   },
  { id: "rt",  x: 200, y: 190, label: "Router",   color: tokens.color.cyan    },
  { id: "llm", x: 340, y: 130, label: "GPT-4",    color: tokens.color.cyan    },
  { id: "apf", x: 340, y: 260, label: "Apify",    color: tokens.color.cyan    },
  { id: "enr", x: 200, y: 380, label: "Enrich",   color: tokens.color.magenta },
  { id: "db",  x: 60,  y: 490, label: "Supabase", color: tokens.color.cyan    },
  { id: "crm", x: 200, y: 550, label: "GHL",      color: tokens.color.cyan    },
  { id: "nf",  x: 340, y: 490, label: "Brevo",    color: tokens.color.success },
]

const MOBILE_VIEWBOX = "0 0 400 700"
const DESKTOP_VIEWBOX = "0 0 1440 720"

export function WorkflowCanvas() {
  const { scrollY } = useScroll()
  // Parallax — background moves slower than page content
  const y = useTransform(scrollY, [0, 3000], [0, -300])
  const isMobile = useIsMobile() ?? false

  const nodes = isMobile ? NODES_MOBILE : NODES
  const viewBox = isMobile ? MOBILE_VIEWBOX : DESKTOP_VIEWBOX
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]))

  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        opacity: isMobile ? 0.35 : 0.5,
        zIndex: 0,
        y,
      }}
    >
      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <radialGradient id="wf-node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor={tokens.color.cyan} stopOpacity="0.4" />
            <stop offset="100%" stopColor={tokens.color.cyan} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connection lines + data particles */}
        {LINKS.map(([from, to], i) => {
          const a = byId[from]
          const b = byId[to]
          const mx = (a.x + b.x) / 2
          const d = `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`
          return (
            <g key={`${from}-${to}`}>
              <path d={d} stroke={tokens.color.line} strokeWidth={1} fill="none" />
              <circle r={3} fill={tokens.color.cyan}>
                <animateMotion
                  dur={`${3 + (i % 3)}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.4}s`}
                  path={d}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur={`${3 + (i % 3)}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.4}s`}
                />
              </circle>
            </g>
          )
        })}

        {/* Nodes */}
        {nodes.map((n, i) => {
          const fontSize = 10
          const boxW = Math.max(60, Math.round(24 + n.label.length * 6.2))
          const rectLeft = n.x - boxW / 2
          return (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r={32} fill="url(#wf-node-glow)">
                <animate
                  attributeName="r"
                  values="28;38;28"
                  dur="3s"
                  begin={`${i * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <rect
                x={rectLeft} y={n.y - 15} width={boxW} height={30} rx={6}
                fill={tokens.color.ink}
                stroke={n.color} strokeWidth={1} strokeOpacity={0.6}
              />
              <circle cx={rectLeft + 10} cy={n.y} r={2.5} fill={n.color}>
                <animate
                  attributeName="opacity"
                  values="0.3;1;0.3"
                  dur="2s"
                  begin={`${i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <text
                x={rectLeft + 18} y={n.y + 4}
                fill={tokens.color.muted}
                fontSize={fontSize}
                fontFamily="var(--font-mono), monospace"
              >
                {n.label}
              </text>
            </g>
          )
        })}
      </svg>
    </motion.div>
  )
}
