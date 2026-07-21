"use client"

import type { Project } from "@/lib/projects-data"
import { tokens } from "@/lib/design-tokens"

type WorkflowNode = NonNullable<Project["workflowNodes"]>[number]
type WorkflowLink = NonNullable<Project["workflowLinks"]>[number]

interface WorkflowDiagramProps {
  nodes: WorkflowNode[]
  links: WorkflowLink[]
  size?: "card" | "full"
  featured?: boolean
}

const KIND_META: Record<WorkflowNode["kind"], { color: string; label: string }> = {
  trigger: { color: tokens.color.amber, label: "Trigger" },
  logic: { color: tokens.color.cyan, label: "Logic" },
  llm: { color: tokens.color.magenta, label: "LLM" },
  scrape: { color: tokens.color.cyan, label: "Scrape" },
  db: { color: tokens.color.cyan, label: "Database" },
  crm: { color: tokens.color.cyan, label: "CRM" },
  notify: { color: tokens.color.success, label: "Notify" },
  output: { color: tokens.color.success, label: "Output" },
}

export function WorkflowDiagram({ nodes, links, size = "card", featured = false }: WorkflowDiagramProps) {
  const isFull = size === "full"
  const W = isFull ? 1000 : featured ? 700 : 340
  const H = isFull ? 160 : 90
  const step = W / (nodes.length + 1)
  const boxH = isFull ? 30 : 22
  const fontSize = isFull ? 10 : 8
  const minBoxW = isFull ? 64 : 44
  const charWidth = fontSize * 0.62
  const boxPadding = isFull ? 20 : 14

  const positions = new Map(
    nodes.map((n, i) => {
      const boxW = Math.max(minBoxW, Math.round(n.label.length * charWidth + boxPadding))
      return [n.id, { x: (i + 1) * step, y: H / 2, boxW }]
    }),
  )

  const usedKinds = Array.from(new Set(nodes.map((n) => n.kind)))

  return (
    <div className={isFull ? "" : "rounded-lg border border-border bg-background/40 p-3 mt-4"}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {links.map(([from, to], i) => {
          const a = positions.get(from)
          const b = positions.get(to)
          if (!a || !b) return null
          const path = `M ${a.x + a.boxW / 2} ${a.y} L ${b.x - b.boxW / 2} ${b.y}`
          return (
            <g key={i}>
              <line x1={a.x + a.boxW / 2} y1={a.y} x2={b.x - b.boxW / 2} y2={b.y} stroke={tokens.color.line} strokeWidth={1} />
              <circle r={isFull ? 3 : 2} fill={tokens.color.cyan}>
                <animateMotion dur="1.8s" repeatCount="indefinite" begin={`${i * 0.15}s`} path={path} />
                <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
              </circle>
            </g>
          )
        })}
        {nodes.map((n, i) => {
          const p = positions.get(n.id)
          if (!p) return null
          const color = KIND_META[n.kind]?.color ?? tokens.color.cyan
          return (
            <g key={n.id}>
              <rect
                x={p.x - p.boxW / 2}
                y={p.y - boxH / 2}
                width={p.boxW}
                height={boxH}
                rx={5}
                fill={tokens.color.ink}
                stroke={color}
                strokeWidth={1}
                strokeOpacity={0.6}
              />
              <text
                x={p.x}
                y={p.y + fontSize / 2.5}
                fill={tokens.color.muted}
                fontSize={fontSize}
                fontFamily="var(--font-mono), monospace"
                textAnchor="middle"
              >
                {n.label}
              </text>
              <circle cx={p.x} cy={p.y - boxH / 2 - 3} r={isFull ? 2 : 1.5} fill={color}>
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            </g>
          )
        })}
      </svg>

      {isFull && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
          {usedKinds.map((kind) => (
            <div key={kind} className="flex items-center gap-2 font-mono text-xs text-mute-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: KIND_META[kind].color, boxShadow: `0 0 6px ${KIND_META[kind].color}` }}
              />
              {KIND_META[kind].label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
