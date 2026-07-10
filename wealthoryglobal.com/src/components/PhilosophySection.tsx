export function PhilosophySection() {
  return (
    <section id="about" className="py-24 bg-surface-hover/30 border-y border-border">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 space-y-6">
          <div className="inline-flex items-center gap-2 text-accent-primary text-sm tracking-widest uppercase font-medium">
            <span className="w-8 h-px bg-accent-primary" />
            Our Philosophy
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-foreground leading-[1.2]">
            We don't predict the future.<br />
            <span className="text-accent-primary italic">We prepare for it.</span>
          </h2>
          <p className="text-text-muted text-lg font-light leading-relaxed">
            At Wealthory Global, we believe that true wealth is not built overnight, but through disciplined, strategic allocation over decades. We ignore the noise of the daily news cycle to focus on macroeconomic fundamentals and structural shifts.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border mt-8">
            <div>
              <div className="text-4xl font-serif text-foreground mb-2">10k+</div>
              <div className="text-sm text-text-muted uppercase tracking-widest">Hours Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-serif text-foreground mb-2">24/7</div>
              <div className="text-sm text-text-muted uppercase tracking-widest">Global Monitoring</div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 relative h-[500px] rounded-2xl overflow-hidden border border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 to-transparent mix-blend-overlay z-10" />
          <img 
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000" 
            alt="Trading and Markets" 
            className="w-full h-full object-cover filter grayscale opacity-80"
          />
        </div>
      </div>
    </section>
  )
}
