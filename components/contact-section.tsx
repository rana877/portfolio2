"use client"

import type React from "react"
import emailjs from "@emailjs/browser"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const DIRECT_CHANNELS = [
  { label: "EMAIL", value: "arshmanshahid88@gmail.com", href: "mailto:arshmanshahid88@gmail.com" },
  { label: "PHONE", value: "+92 320 620 5208", href: "tel:+923206205208" },
  { label: "WHATSAPP", value: "wa.me/923206205208", href: "https://wa.me/923206205208" },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/arshmanshahid",
    href: "https://www.linkedin.com/in/arshmanshahid/",
  },
  { label: "GITHUB", value: "github.com/rana877", href: "https://github.com/rana877" },
]

const PROJECT_TYPES = ["Full System Build", "Automation Retainer", "Rescue & Refactor", "Something else"]

const inputClasses =
  "bg-transparent border-0 border-b border-border rounded-none px-0 py-3 text-foreground focus-visible:border-primary focus-visible:ring-0 focus-visible:outline-none transition-colors"

const labelClasses = "font-mono text-xs uppercase tracking-widest text-mute-2"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  })
  const [sendState, setSendState] = useState<"idle" | "sending" | "success" | "error">("idle")
  const { toast } = useToast()
  const [feedback, setFeedback] = useState<null | { type: "success" | "error"; message: string }>(null)

  const EMAILJS_SERVICE_ID = "service_keqi8sh"
  const EMAILJS_TEMPLATE_ID = "template_35g39rb"
  const EMAILJS_PUBLIC_KEY = "1bLHajitmDz0hRJTV"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback(null)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setSendState("error")
      setFeedback({ type: "error", message: "Please enter a valid email address." })
      toast({ title: "Please enter a valid email address." })
      return
    }

    setSendState("sending")
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          project_type: formData.projectType,
          message: formData.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      )
      setFormData({ name: "", email: "", projectType: "", message: "" })
      setSendState("success")
      setFeedback({ type: "success", message: "Thanks! I'll get back to you soon." })
      toast({ title: "Thanks! I'll get back to you soon." })
      setTimeout(() => setSendState("idle"), 2000)
    } catch (err) {
      setSendState("error")
      setFeedback({ type: "error", message: "Failed to send. Please try again." })
      toast({ title: "Failed to send. Please try again." })
    }
  }

  const buttonLabel =
    sendState === "sending"
      ? "TRANSMITTING..."
      : sendState === "success"
        ? "RECEIVED ✓"
        : sendState === "error"
          ? "FAILED — RETRY"
          : "TRANSMIT →"

  return (
    <section id="contact" className="relative z-10 py-32 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <div className="mono-label">CONTACT · LAST NODE IN THE WORKFLOW</div>

        <h2
          className="mt-4 font-sans font-semibold text-foreground"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
        >
          Let&apos;s build something that runs{" "}
          <span className="accent-serif text-primary">without you.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          {/* Left column — direct channels */}
          <div>
            <div className={labelClasses}>DIRECT CHANNELS</div>
            <div className="mt-6">
              {DIRECT_CHANNELS.map((channel, i) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`flex items-center justify-between py-4 group ${
                    i < DIRECT_CHANNELS.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span className="font-mono text-xs text-mute-2">{channel.label}</span>
                  <span className="font-mono text-sm text-foreground group-hover:text-primary transition-colors duration-200">
                    {channel.value}
                  </span>
                </a>
              ))}
            </div>

            <p className="accent-serif text-muted-foreground mt-8">
              Fastest reply: WhatsApp or email. I read both first thing every morning.
            </p>
          </div>

          {/* Right column — form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="name" className={labelClasses}>
                Name
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                required
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                required
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="project-type" className={labelClasses}>
                Project type
              </label>
              <Select
                value={formData.projectType}
                onValueChange={(value) => setFormData({ ...formData, projectType: value })}
              >
                <SelectTrigger id="project-type" className={`${inputClasses} w-full`}>
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="message" className={labelClasses}>
                Message
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project..."
                rows={5}
                required
                className={`${inputClasses} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={sendState === "sending"}
              className="w-full mt-8 px-6 py-4 bg-primary text-primary-foreground rounded-md font-mono text-sm tracking-widest uppercase hover:glow-cyan-strong transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {buttonLabel}
            </button>

            {feedback && (
              <p
                role="status"
                aria-live="polite"
                className={`font-mono text-xs ${
                  feedback.type === "success" ? "text-success" : "text-destructive"
                }`}
              >
                {feedback.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
