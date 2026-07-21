import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { GrainOverlay } from "@/components/effects/grain-overlay"
import { CursorSpotlight } from "@/components/effects/cursor-spotlight"
import { RobotMascot } from "@/components/mascot/robot-mascot"
import { LenisProvider } from "@/components/effects/lenis-provider"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Arshman Shahid — AI Automation Architect",
    template: "%s · Arshman Shahid",
  },
  description:
    "Senior IC building production agentic systems — n8n, LangGraph, LLM pipelines. 190-node platforms, 56 scrapers shipped, 90% overhead reduced.",
  keywords: [
    "n8n",
    "AI automation",
    "agentic systems",
    "LangGraph",
    "LLM pipelines",
    "GTM automation",
    "workflow architecture",
  ],
  authors: [{ name: "Arshman Shahid", url: "https://arshmanshahid.dev" }],
  creator: "Arshman Shahid",
  metadataBase: new URL("https://arshmanshahid.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arshmanshahid.dev",
    siteName: "Arshman Shahid",
    title: "Arshman Shahid — AI Automation Architect",
    description:
      "Senior IC building production agentic systems. n8n, LangGraph, LLM pipelines — architected, deployed, mine end-to-end.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arshman Shahid — AI Automation Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arshman Shahid — AI Automation Architect",
    description: "Senior IC building production agentic systems. n8n, LangGraph, LLM pipelines.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}>
        <LenisProvider />
        <GrainOverlay />
        <CursorSpotlight />
        <RobotMascot />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
