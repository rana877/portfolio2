"use client"

import { Bot, Database, Rocket, Workflow, type LucideIcon } from "lucide-react"

interface Pillar {
  number: string
  icon: LucideIcon
  title: string
  description: string
  chips: string[]
}

const PILLARS: Pillar[] = [
  {
    number: "01",
    icon: Workflow,
    title: "Automation Architecture",
    description:
      "190-node production systems. Multi-client orchestration. Custom TypeScript nodes when the platform hits its limits.",
    chips: ["n8n", "Make", "Zapier", "TypeScript nodes", "Docker", "VPS"],
  },
  {
    number: "02",
    icon: Bot,
    title: "Agentic AI Systems",
    description:
      "LLM pipelines that actually route, decide, and act. Not chatbots — production decision layers.",
    chips: ["GPT-4", "Claude", "Gemini", "LangGraph", "LangChain", "Vector search"],
  },
  {
    number: "03",
    icon: Database,
    title: "Data Extraction & Enrichment",
    description:
      "56+ scrapers deployed. Structured pipelines with retries, dedup, and clean storage.",
    chips: ["Apify", "Selenium", "Scrapy", "BeautifulSoup", "Postgres", "Supabase"],
  },
  {
    number: "04",
    icon: Rocket,
    title: "GTM & CRM Integration",
    description:
      "End-to-end lead ops: scrape → enrich → sequence → track. Zero manual handoff.",
    chips: ["GoHighLevel", "Brevo", "HubSpot", "Salesforce", "ClickUp", "Airtable"],
  },
]

function PillarCard({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon
  return (
    <div className="relative overflow-hidden bg-card border border-border rounded-xl p-8 hover:border-primary/40 transition-colors">
      <span className="absolute top-8 right-8 font-mono text-xs text-mute-2">{pillar.number}</span>
      <Icon className="w-8 h-8 text-primary" />
      <h3 className="mt-6 font-sans font-semibold text-xl text-foreground">{pillar.title}</h3>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
      <div className="h-px bg-border my-6" />
      <div className="flex flex-wrap gap-2">
        {pillar.chips.map((chip) => (
          <span
            key={chip}
            className="font-mono text-xs px-2 py-1 rounded border border-border text-muted-foreground"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative z-10 py-32 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="mono-label">APPROACH · WHAT I ACTUALLY DO</div>

        <h2
          className="mt-4 font-sans font-semibold text-foreground"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.02em" }}
        >
          I don&apos;t sell skills.{" "}
          <span className="accent-serif text-primary">I ship systems.</span>
        </h2>

        <p className="mt-6 max-w-2xl text-muted-foreground text-sm leading-relaxed">
          Every tool below is production-verified across paid client work — not tutorial-familiar,
          not &ldquo;have used once.&rdquo;
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.number} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  )
}
