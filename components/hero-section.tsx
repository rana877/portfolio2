"use client"

import { useEffect, useState } from "react"

const META = [
  { label: "AVAILABLE", value: "Senior / Lead IC" },
  { label: "BASED", value: "Lahore → Remote" },
  { label: "STACK", value: "n8n · TS · LangGraph" },
  { label: "CURRENTLY", value: "Aificient Labs" },
]

const MAX_WORKFLOWS = 47

export function HeroSection() {
  const [workflowCount, setWorkflowCount] = useState(12)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        setWorkflowCount((count) => Math.min(MAX_WORKFLOWS, count + 1))
      }
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-20">
      <div className="flex items-center gap-2 font-mono text-xs text-success mb-8">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        {workflowCount} workflows executing right now
      </div>

      <h1
        className="font-sans font-bold text-foreground"
        style={{
          fontSize: "clamp(3rem, 7vw, 6rem)",
          lineHeight: 0.95,
          letterSpacing: "-0.03em",
        }}
      >
        Ship the workflow
        <br />
        <span className="text-muted-foreground">that ships</span>{" "}
        <span className="accent-serif text-primary">itself.</span>
      </h1>

      <p className="mt-8 max-w-[640px] text-xl font-normal text-muted-foreground leading-relaxed">
        Senior IC building production agentic systems for founders who can&apos;t wait.
        <br />
        n8n, LangGraph, LLM pipelines — architected, deployed, mine end-to-end.
      </p>

      <div className="mt-16 flex flex-wrap gap-x-10 gap-y-6 items-center">
        {META.map((item, i) => (
          <div key={item.label} className="flex items-center gap-10">
            <div>
              <div className="font-mono text-xs uppercase text-mute-2">{item.label}</div>
              <div className="mt-1 font-sans text-sm text-foreground">{item.value}</div>
            </div>
            {i < META.length - 1 && <div className="hidden sm:block w-px h-10 bg-border" />}
          </div>
        ))}
      </div>

      <div className="absolute bottom-12 left-6 lg:left-20 font-mono text-xs tracking-widest text-mute-2">
        SCROLL <span className="inline-block animate-bounce">↓</span> TO SEE THE WORK
      </div>
    </section>
  )
}
