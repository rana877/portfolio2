"use client"

import type React from "react"
import Image from "next/image"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { tokens } from "@/lib/design-tokens"

const PHOTO_SRC = "/me.png"
const PHOTO_W = 512
const PHOTO_H = 512

export function PortraitSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll progress specific to this section — 0 when section enters viewport, 1 when it leaves
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Scroll-linked spotlight — a radial gradient overlay whose center position
  // moves across the face as the user scrolls the section into and out of view.
  // Position moves from top-left (20%,20%) → bottom-right (80%,80%) across the scroll range.
  const spotlightX = useTransform(scrollYProgress, [0, 1], ["20%", "80%"])
  const spotlightY = useTransform(scrollYProgress, [0, 1], ["25%", "75%"])
  const spotlightOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.6, 0.6, 0])
  const spotlightBackground = useTransform([spotlightX, spotlightY] as const, ([x, y]) =>
    `radial-gradient(circle at ${x} ${y}, ${tokens.color.cyan}20 0%, transparent 40%)`,
  )

  // Subtle photo brightness lift as it moves into center of viewport
  const brightness = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.9])
  const brightnessFilter = useTransform(brightness, (b) => `brightness(${b})`)

  return (
    <section id="portrait" ref={containerRef} className="relative z-10 py-32 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="mono-label mb-4">THE OPERATOR · BEHIND THE WORKFLOWS</div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-12 lg:gap-16 items-center mt-8">
          {/* LEFT: Photo with surveillance-monitor treatment */}
          <div className="relative w-full max-w-[440px] mx-auto lg:mx-0">
            {/* HUD labels around the frame — outside the photo */}
            <div className="absolute -top-6 left-0 right-0 flex justify-between items-center text-[10px] font-mono text-mute-2 tracking-widest">
              <span className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  style={{
                    boxShadow: `0 0 6px ${tokens.color.cyan}`,
                    animation: "pulse 1.8s ease-in-out infinite",
                  }}
                />
                REC · LIVE
              </span>
              <span>SUBJ_01 · LHR-PK · 31.5204°N</span>
            </div>

            {/* Photo container */}
            <motion.div
              className="relative aspect-square overflow-hidden rounded-sm border border-border"
              style={{
                boxShadow: `0 30px 80px -20px ${tokens.color.cyan}30, inset 0 0 0 1px ${tokens.color.cyan}20`,
              }}
            >
              {/* The photo itself */}
              <motion.div style={{ filter: brightnessFilter }} className="w-full h-full">
                <Image
                  src={PHOTO_SRC}
                  alt="Arshman Shahid — portrait"
                  width={PHOTO_W}
                  height={PHOTO_H}
                  className="w-full h-full object-cover"
                  priority
                />
              </motion.div>

              {/* Scroll-linked spotlight overlay */}
              <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: spotlightBackground,
                  mixBlendMode: "screen",
                  opacity: spotlightOpacity,
                }}
              />

              {/* Subtle scan-line overlay — decorative, very low opacity */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 3px)",
                  mixBlendMode: "overlay",
                }}
              />

              {/* Vignette — subtle darkening around edges */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, transparent 55%, rgba(5,8,24,0.6) 100%)",
                }}
              />

              {/* Corner brackets — camera viewfinder style */}
              <CornerBrackets />
            </motion.div>

            {/* HUD labels below the frame */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-between items-center text-[10px] font-mono text-mute-2 tracking-widest">
              <span>FRAME_2604 · ISO_400</span>
              <span>◉ TRACKING</span>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div>
            <h2
              className="font-semibold text-foreground leading-[0.95] mb-6"
              style={{
                fontSize: "clamp(3rem, 6vw, 5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              <span className="accent-serif text-primary">Arshman.</span>
              <br />
              <span className="text-muted-foreground">The operator</span>
              <br />
              behind the nodes.
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-8">
              Two years in, one obsession — building systems that keep running after I stop
              watching. Based in Lahore, shipping remote. If it can be automated, I&apos;ll
              architect it. If it can&apos;t, I&apos;ll build the tool that lets it.
            </p>

            {/* Meta grid — 3 columns of specific facts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-border">
              <div>
                <div className="mono-label mb-1">LOCATION</div>
                <div className="text-foreground text-sm">Lahore, PK · UTC+5</div>
              </div>
              <div>
                <div className="mono-label mb-1">RESPONSE</div>
                <div className="text-foreground text-sm">Under 4h · weekdays</div>
              </div>
              <div>
                <div className="mono-label mb-1">CURRENT ROLE</div>
                <div className="text-foreground text-sm">Lead @ Aificient Labs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CornerBrackets() {
  const bracketStyle: React.CSSProperties = {
    position: "absolute",
    width: 24,
    height: 24,
    borderColor: tokens.color.cyan,
    pointerEvents: "none",
  }
  return (
    <>
      <div style={{ ...bracketStyle, top: 8, left: 8, borderTop: `2px solid ${tokens.color.cyan}`, borderLeft: `2px solid ${tokens.color.cyan}` }} />
      <div style={{ ...bracketStyle, top: 8, right: 8, borderTop: `2px solid ${tokens.color.cyan}`, borderRight: `2px solid ${tokens.color.cyan}` }} />
      <div style={{ ...bracketStyle, bottom: 8, left: 8, borderBottom: `2px solid ${tokens.color.cyan}`, borderLeft: `2px solid ${tokens.color.cyan}` }} />
      <div style={{ ...bracketStyle, bottom: 8, right: 8, borderBottom: `2px solid ${tokens.color.cyan}`, borderRight: `2px solid ${tokens.color.cyan}` }} />
    </>
  )
}
