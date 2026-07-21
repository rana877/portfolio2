import type { Project } from "@/lib/projects-data"
import { tokens } from "@/lib/design-tokens"

export const STATUS_CONFIG: Record<NonNullable<Project["status"]>, { label: string; color: string }> = {
  shipped: { label: "Shipped", color: tokens.color.success },
  "in-production": { label: "In production", color: tokens.color.success },
  research: { label: "Research", color: tokens.color.amber },
  archived: { label: "Archived", color: tokens.color.mute2 },
}

export function StatusPill({ status }: { status: NonNullable<Project["status"]> }) {
  const config = STATUS_CONFIG[status]
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-mono border"
      style={{
        color: config.color,
        borderColor: `${config.color}40`,
        backgroundColor: `${config.color}0d`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: config.color, boxShadow: `0 0 8px ${config.color}` }}
      />
      {config.label}
    </span>
  )
}
