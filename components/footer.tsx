export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border py-10 px-6 lg:px-20 mt-32">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-xs text-mute-2">
        <span>A.SHAHID_ · LAHORE · 2026</span>
        <span>BUILT AT 2AM · SHIPPED AT SUNRISE</span>
      </div>
      <div className="mt-4 font-mono text-xs text-mute-2">
        Next.js · TypeScript · Framer Motion · Deployed on Vercel. This site is itself a workflow —
        every animation, every node, every state transition. Fitting.
      </div>
    </footer>
  )
}
