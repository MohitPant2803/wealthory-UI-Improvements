"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { ThemeToggle } from "./ThemeToggle"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "py-4 bg-background/80 backdrop-blur-md border-b border-border" : "py-6 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {mounted && theme === "light" ? (
            <img src="/logo-light.png" alt="Wealthory Logo" className="h-16 w-auto" />
          ) : (
            <img src="/logo-dark.png" alt="Wealthory Logo" className="h-16 w-auto" />
          )}
          <div className="flex flex-col">
            <span className="font-serif font-semibold tracking-widest text-foreground leading-tight text-3xl">
              WEALTHORY
            </span>
            <span className="text-sm tracking-[0.2em] text-accent-primary font-medium uppercase leading-none mt-1">
              Global
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-sm font-medium text-text-muted hover:text-foreground transition-colors uppercase tracking-widest">
            About
          </Link>
          <Link href="#services" className="text-sm font-medium text-text-muted hover:text-foreground transition-colors uppercase tracking-widest">
            Services
          </Link>
          <a href="https://wealthory.substack.com/" target="_blank" rel="noreferrer" className="text-sm font-medium text-text-muted hover:text-foreground transition-colors uppercase tracking-widest">
            Insights ↗
          </a>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="#contact"
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-accent-primary text-black font-medium hover:bg-accent-primary-hover transition-all hover:-translate-y-0.5 shadow-[0_0_0_0_rgba(255,179,0,0.7)] animate-[dopaminePulse_2s_infinite]"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </nav>
  )
}
