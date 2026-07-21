"use client"

import { useEffect, useRef, useState } from "react"

const LOG_LINES = [
  {
    time: "00:00:01",
    message: "Deployed 190-node enterprise n8n platform → multi-client, zero critical downtime.",
  },
  {
    time: "00:00:04",
    message: "Reduced client operational overhead by 90% through predictive workflow design.",
  },
  {
    time: "00:00:09",
    message: "Shipped 56 production scrapers processing thousands of leads daily for US clients.",
  },
  {
    time: "00:00:14",
    message: "Built AI viral content platform → scrapes 4 networks, generates 30-day calendars.",
  },
  {
    time: "00:00:19",
    message: "LinkedIn GTM: job posts + user posts + comment enrichment → Brevo 21-day drip.",
  },
  {
    time: "00:00:23",
    message: "ML-based DDoS detection for SDN: 99.20% classification accuracy (FYP).",
  },
]

function TerminalCard() {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let started = false
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true
            LOG_LINES.forEach((_, i) => {
              setTimeout(() => setVisibleCount((c) => Math.max(c, i + 1)), i * 350)
            })
          }
        })
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="bg-card border border-border rounded-xl p-6 mt-10 font-mono text-sm leading-loose"
    >
      {LOG_LINES.map((line, i) => (
        <div
          key={line.time}
          className="flex flex-col sm:grid sm:grid-cols-[5.5rem_3.5rem_1fr] gap-x-4 pb-3 sm:pb-0 transition-all duration-500"
          style={{
            opacity: i < visibleCount ? 1 : 0,
            transform: i < visibleCount ? "translateY(0)" : "translateY(6px)",
          }}
        >
          <div className="flex gap-4 sm:contents">
            <span className="text-mute-2">{line.time}</span>
            <span className="text-success">[INFO]</span>
          </div>
          <span className="text-foreground">{line.message}</span>
        </div>
      ))}
    </div>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-32 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <div className="mono-label">$ tail -f /var/log/arshman.log</div>

        <h2
          className="mt-4 font-sans font-semibold text-foreground"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.02em" }}
        >
          Two years of output.{" "}
          <span className="accent-serif text-muted-foreground">Specifically:</span>
        </h2>

        <TerminalCard />
      </div>
    </section>
  )
}
