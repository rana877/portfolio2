"use client"

import { Layers, Wrench, Zap, type LucideIcon } from "lucide-react"

interface Engagement {
  number: string
  icon: LucideIcon
  title: string
  description: string
  deliverable: string
}

const ENGAGEMENTS: Engagement[] = [
  {
    number: "01",
    icon: Layers,
    title: "Full System Build",
    description:
      "You bring the goal. I architect, build, deploy, and monitor a production agentic system end-to-end.",
    deliverable: "typical: 190 nodes · 4-6 weeks · single owner",
  },
  {
    number: "02",
    icon: Zap,
    title: "Automation Retainer",
    description:
      "Ongoing workflow ownership. New automations shipped monthly, existing ones maintained and evolved.",
    deliverable: "typical: 5-10 workflows/mo · weekly ship cadence",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Rescue & Refactor",
    description:
      "Broken n8n canvas? LLM pipeline that costs too much? I audit, fix, and harden.",
    deliverable: "typical: 1-2 weeks · fixed scope · handoff docs",
  },
]

function EngagementCard({ engagement }: { engagement: Engagement }) {
  const Icon = engagement.icon
  return (
    <div className="relative overflow-hidden bg-card border border-border rounded-xl p-8 hover:border-primary/40 transition-colors">
      <span className="absolute top-8 right-8 font-mono text-xs text-mute-2">{engagement.number}</span>
      <Icon className="w-8 h-8 text-primary" />
      <h3 className="mt-6 font-sans font-semibold text-xl text-foreground">{engagement.title}</h3>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{engagement.description}</p>
      <div className="h-px bg-border my-6" />
      <div className="font-mono text-xs text-mute-2 tracking-wide">{engagement.deliverable}</div>
    </div>
  )
}

export function ServicesSection() {
  return (
    <section id="services" className="relative z-10 py-32 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="mono-label">ENGAGEMENT · WHAT SHIPPING WITH ME LOOKS LIKE</div>

        <h2
          className="mt-4 font-sans font-semibold text-foreground"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.02em" }}
        >
          Three ways to bring me in. <span className="accent-serif text-primary">Pick your flavor.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {ENGAGEMENTS.map((engagement) => (
            <EngagementCard key={engagement.number} engagement={engagement} />
          ))}
        </div>
      </div>
    </section>
  )
}
