"use client"

import { getSortedProjects } from "@/lib/projects-data"
import { ProjectCard } from "@/components/projects/project-card"

export function ProjectsSection() {
  const projects = getSortedProjects()

  return (
    <section id="projects" className="relative z-10 py-32 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mono-label">WORK · SELECTED PROJECTS</div>

        <h2
          className="mt-4 font-sans font-semibold text-foreground"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.02em" }}
        >
          Systems shipped. Not slideware.{" "}
          <span className="accent-serif text-primary">Every one deployed.</span>
        </h2>

        <p className="mt-4 max-w-2xl text-muted-foreground text-sm leading-relaxed">
          Each project below is a real production system — the metrics, node counts, and stacks are
          what actually shipped, not marketing copy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} featured={project.featured} />
          ))}
        </div>
      </div>
    </section>
  )
}
