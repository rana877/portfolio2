"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/projects-data"
import { StatusPill } from "@/components/projects/status-pill"

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export function ProjectCard({ project, featured }: ProjectCardProps) {
  const displayTags = project.tags || project.stack || []

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative flex flex-col rounded-2xl border border-border/80 bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.2)] ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      {/* Card Top Image */}
      {project.image && (
        <div className="relative w-full h-52 md:h-56 overflow-hidden bg-muted/20">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          {/* Fading dark gradient at bottom of image */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-card/40 to-card" />
        </div>
      )}

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-6">
        {/* Status / Year Badges & External Link Icon */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {project.status && <StatusPill status={project.status} />}
            {project.year && <span className="font-mono text-xs text-mute-2">{project.year}</span>}
            {featured && (
              <span className="text-xs font-mono text-primary tracking-widest uppercase">● FEATURED</span>
            )}
          </div>
          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0" />
        </div>

        {/* Title */}
        <h3
          className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors"
          style={{ letterSpacing: "-0.02em" }}
        >
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4 line-clamp-3">
          {project.shortDescription}
        </p>

        {/* Impact Highlight */}
        {project.impact && (
          <div className="mt-auto pt-2 text-xs font-mono font-medium text-cyan-400">
            {project.impact}
          </div>
        )}

        {/* Tag / Stack Pills */}
        {displayTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
            {displayTags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

