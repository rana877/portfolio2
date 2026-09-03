import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react"
import { getProjectBySlug, projects } from "@/lib/projects-data"
import { Navbar } from "@/components/navbar"
import { StatusPill } from "@/components/projects/status-pill"
import { WorkflowDiagram } from "@/components/projects/workflow-diagram"

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return { title: "Project not found" }

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} · Arshman Shahid`,
      description: project.shortDescription,
      images: project.image ? [project.image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.shortDescription,
      images: project.image ? [project.image] : undefined,
    },
  }
}

function firstSentence(text: string) {
  return text.match(/^[^.!?]*[.!?]/)?.[0] ?? text
}

function looksLikeAsciiTree(s: string): boolean {
  return /[├└─│]/.test(s) || /\n {2,}/.test(s)
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const metaItems = [
    { label: "ROLE", value: project.role },
    { label: "PLATFORM", value: project.platform },
    ...(project.year ? [{ label: "YEAR", value: project.year }] : []),
    { label: "IMPACT", value: project.impact },
  ]

  return (
    <main className="relative z-10 min-h-screen bg-background">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 lg:px-20 pt-32 pb-32">
        {/* Breadcrumb */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-mute-2 hover:text-primary transition-colors mb-16"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          ALL WORK / {project.slug}
        </Link>

        {/* Hero block */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {project.status && <StatusPill status={project.status} />}
          {project.year && <span className="font-mono text-xs text-mute-2">{project.year}</span>}
          {project.featured && (
            <span className="text-xs font-mono text-primary tracking-widest uppercase">● FEATURED</span>
          )}
        </div>

        <h1
          className="font-sans font-semibold text-foreground"
          style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 1.02, letterSpacing: "-0.03em" }}
        >
          {project.title}
        </h1>

        {project.overview && (
          <p className="accent-serif text-muted-foreground mt-6 max-w-3xl text-xl">
            {firstSentence(project.overview)}
          </p>
        )}

        {project.stack && project.stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8">
            {project.stack.map((tool) => (
              <span key={tool} className="text-xs font-mono px-2 py-1 rounded border border-border text-muted-foreground">
                {tool}
              </span>
            ))}
          </div>
        )}

        {/* Top Hero Image */}
        {project.image && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto max-h-[600px] object-cover object-top"
            />
          </div>
        )}

        {/* Meta strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 mt-12 border-y border-border max-w-4xl">
          {metaItems.map((item) => (
            <div key={item.label}>
              <div className="font-mono text-xs uppercase tracking-widest text-mute-2">{item.label}</div>
              <div className="mt-1 text-sm text-foreground">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Problem / Approach */}
        {(project.problem || project.approach) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            {project.problem && (
              <div className="bg-card border border-border rounded-xl p-8">
                <div className="mono-label">THE PROBLEM</div>
                <p className="mt-4 text-foreground leading-relaxed">{project.problem}</p>
              </div>
            )}
            {project.approach && (
              <div className="bg-card border border-border rounded-xl p-8">
                <div className="mono-label">THE APPROACH</div>
                <p className="mt-4 text-foreground leading-relaxed">{project.approach}</p>
              </div>
            )}
          </div>
        )}

        {/* Workflow canvas */}
        {project.workflowNodes && project.workflowLinks && (
          <section className="mt-16">
            <div className="mono-label">WORKFLOW · {project.workflowNodes.length} NODES</div>
            <div className="bg-card border border-border rounded-xl p-8 mt-4">
              <WorkflowDiagram nodes={project.workflowNodes} links={project.workflowLinks} size="full" />
            </div>
          </section>
        )}

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-8 mt-16 overflow-hidden">
            <div className="mono-label">KEY METRICS</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="min-w-0">
                  <div
                    className={`font-sans font-semibold text-foreground break-words ${
                      metric.value.length > 20
                        ? "text-lg md:text-xl leading-snug"
                        : metric.value.length > 12
                        ? "text-xl md:text-2xl leading-tight"
                        : "text-3xl md:text-4xl lg:text-5xl"
                    }`}
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {metric.value}
                  </div>
                  <div className="mt-1 font-mono text-xs uppercase tracking-widest text-mute-2 break-words">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Architecture */}
        {project.architecture && (
          <div className="bg-card border border-border rounded-xl p-8 mt-16">
            <div className="mono-label">ARCHITECTURE</div>
            <h3 className="mt-4 mb-4 font-sans font-semibold text-2xl md:text-3xl text-foreground">
              {project.architecture.title}
            </h3>
            {looksLikeAsciiTree(project.architecture.content) ? (
              <pre className="bg-ink-hi border border-border rounded-lg p-4 font-mono text-xs overflow-x-auto text-muted-foreground">
                <code>{project.architecture.content}</code>
              </pre>
            ) : (
              <p className="text-muted-foreground leading-relaxed">{project.architecture.content}</p>
            )}
          </div>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-16">
            <div className="mono-label">SCREENSHOTS · {project.gallery.length} IMAGES</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {project.gallery.map((img, index) => (
                <div key={img} className="bg-card border border-border rounded-xl overflow-hidden">
                  <img
                    src={img}
                    alt={`${project.title} — screenshot ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Phases */}
        {project.phases && project.phases.length > 0 && (
          <section className="mt-16">
            <h2 className="font-sans font-semibold text-2xl md:text-3xl text-foreground" style={{ letterSpacing: "-0.02em" }}>
              Workflow breakdown
            </h2>
            <div className="space-y-6 mt-8">
              {project.phases.map((phase, idx) => (
                <div key={idx} className="bg-card border border-border rounded-xl p-6">
                  <div className="font-mono text-xs text-mute-2 mb-3">PHASE {String(idx + 1).padStart(2, "0")}</div>
                  <h3 className="font-sans font-semibold text-xl md:text-2xl text-foreground">{phase.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{phase.description}</p>
                  <ul className="mt-5 space-y-2.5">
                    {phase.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  {phase.nodeCount && (
                    <div className="mt-5 text-right font-mono text-xs text-mute-2">~ {phase.nodeCount}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical highlights */}
        {project.technicalHighlights && project.technicalHighlights.length > 0 && (
          <section className="mt-16">
            <h2 className="font-sans font-semibold text-2xl md:text-3xl text-foreground" style={{ letterSpacing: "-0.02em" }}>
              Technical highlights
            </h2>
            <div className="space-y-8 mt-8">
              {project.technicalHighlights.map((highlight, idx) => {
                const codeOnRight = idx % 2 === 0
                const textBlock = (
                  <div>
                    <h3 className="font-sans font-semibold text-lg text-foreground">{highlight.title}</h3>
                    {highlight.points && (
                      <ul className="mt-4 space-y-2.5">
                        {highlight.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span className="text-sm text-muted-foreground leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
                const codeBlock = highlight.code && (
                  <pre className="bg-ink-hi border border-border rounded-lg p-4 font-mono text-xs overflow-x-auto text-muted-foreground">
                    {highlight.code}
                  </pre>
                )

                if (!highlight.code) {
                  return (
                    <div key={idx} className="bg-card border border-border rounded-xl p-6">
                      {textBlock}
                    </div>
                  )
                }

                return (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {codeOnRight ? (
                      <>
                        {textBlock}
                        {codeBlock}
                      </>
                    ) : (
                      <>
                        <div className="md:order-2">{textBlock}</div>
                        <div className="md:order-1">{codeBlock}</div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Why it matters */}
        {project.whyItMatters && project.whyItMatters.length > 0 && (
          <section className="mt-16">
            <h2 className="font-sans font-semibold text-2xl md:text-3xl text-foreground" style={{ letterSpacing: "-0.02em" }}>
              Why this matters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {project.whyItMatters.map((reason, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6">
                  <div className="font-mono text-xs text-mute-2">{String(i + 1).padStart(2, "0")}</div>
                  <p className="mt-3 text-sm text-foreground leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Use cases */}
        {project.useCases && project.useCases.length > 0 && (
          <div className="mt-16">
            <div className="mono-label">WHO THIS IS FOR</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {project.useCases.map((useCase, i) => (
                <div key={i} className="flex gap-3 items-start p-4 border border-border rounded-lg">
                  <span className="font-mono text-xs text-primary shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-foreground text-base">{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* External links */}
        {project.externalLinks && project.externalLinks.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-16">
            {project.externalLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-32 text-center">
          <div className="mono-label justify-center flex">NEXT NODE IN THE WORKFLOW</div>
          <Link href="/#contact" className="inline-block mt-4">
            <span className="accent-serif text-primary text-2xl hover:opacity-80 transition-opacity">
              Let&apos;s talk. →
            </span>
          </Link>
        </div>
      </div>
    </main>
  )
}
