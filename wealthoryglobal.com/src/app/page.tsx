import { Navbar } from "@/components/Navbar"
import { PhilosophySection } from "@/components/PhilosophySection"
import { ServicesSection } from "@/components/ServicesSection"
import { ContactSection } from "@/components/ContactSection"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex-1 flex flex-col items-center justify-center text-center px-4">
        {/* Ambient background orbs */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent-primary/20 blur-[100px] -z-10 mix-blend-screen opacity-50" />
        <div className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] rounded-full bg-surface-hover/50 blur-[120px] -z-10 opacity-30" />

        <div className="container max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border bg-surface/50 backdrop-blur-sm text-sm tracking-widest uppercase text-accent-primary font-medium">
            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
            Global Market Insights
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-medium leading-[1.1] text-foreground">
            Navigate Markets <br className="hidden md:block" />
            <span className="italic text-text-muted font-light">with Clarity &</span>{" "}
            <span className="text-accent-primary">Purpose.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto font-light leading-relaxed">
            Institutional-grade financial services and actionable portfolio strategies for investors who demand absolute excellence.
          </p>
          
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent-primary text-black font-semibold hover:bg-accent-primary-hover transition-all hover:-translate-y-1 shadow-[0_0_0_0_rgba(201,168,76,0.7)] animate-[dopaminePulse_2s_infinite] text-lg hover:animate-none"
            >
              Start a Conversation
            </Link>
            <a
              href="https://wealthory.substack.com/"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-border bg-surface/50 text-foreground font-medium hover:bg-surface-hover hover:border-accent-primary transition-all text-lg flex items-center justify-center gap-2"
            >
              Read Insights
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className="pt-6 flex items-center justify-center gap-2 text-text-muted text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
            Engineered for serious investors
          </div>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="w-full bg-accent-primary py-4 overflow-hidden border-y border-border/10">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center mx-8 text-black font-serif text-xl font-medium">
              <span>STRATEGIC WEALTH</span>
              <span className="mx-8 text-sm opacity-50">✦</span>
              <span>GLOBAL MARKETS</span>
              <span className="mx-8 text-sm opacity-50">✦</span>
              <span>PORTFOLIO DESIGN</span>
              <span className="mx-8 text-sm opacity-50">✦</span>
            </div>
          ))}
        </div>
      </div>

      <PhilosophySection />
      <ServicesSection />
      <ContactSection />
      
      {/* Simple Footer */}
      <footer className="py-12 border-t border-border bg-surface text-center">
        <p className="text-text-muted text-sm font-light">
          © {new Date().getFullYear()} Wealthory Global. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
