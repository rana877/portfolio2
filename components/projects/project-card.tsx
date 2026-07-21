"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/projects-data"
import { WorkflowDiagram } from "@/components/projects/workflow-diagram"
import { StatusPill } from "@/components/projects/status-pill"

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export function ProjectCard({ project, featured }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative block rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(34,211,238,0.25)] ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          {project.status && <StatusPill status={project.status} />}
          {project.year && <span className="font-mono text-xs text-mute-2">{project.year}</span>}
          {featured && (
            <span className="text-xs font-mono text-primary tracking-widest uppercase">● FEATURED</span>
          )}
        </div>
        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
      </div>

      <h3
        className="text-2xl md:text-3xl font-semibold text-foreground leading-tight mb-3"
        style={{ letterSpacing: "-0.02em" }}
      >
        {project.title}
      </h3>

      <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
        {project.shortDescription}
      </p>

      {project.workflowNodes && project.workflowLinks && (
        <WorkflowDiagram nodes={project.workflowNodes} links={project.workflowLinks} size="card" featured={!!featured} />
      )}

      {project.stack && project.stack.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border">
          {project.stack.map((tool) => (
            <span key={tool} className="text-xs font-mono px-2 py-1 rounded border border-border text-muted-foreground">
              {tool}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center gap-2 text-xs font-mono text-mute-2 uppercase tracking-widest">
        <span>IMPACT →</span>
        <span className="text-foreground normal-case tracking-normal">{project.impact}</span>
      </div>
    </Link>
  )
}
