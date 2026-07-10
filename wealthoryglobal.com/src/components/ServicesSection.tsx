import { Briefcase, LineChart, ShieldCheck } from "lucide-react"

const services = [
  {
    title: "Portfolio Architecture",
    description: "Bespoke investment strategies engineered to preserve capital and maximize risk-adjusted returns across market cycles.",
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    title: "Global Market Intelligence",
    description: "Proprietary research and macro-economic analysis giving you an asymmetric edge in global equities and digital assets.",
    icon: <LineChart className="w-6 h-6" />,
  },
  {
    title: "Wealth Preservation",
    description: "Institutional-grade risk management protocols designed to safeguard your legacy from inflation and volatility.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-foreground">
            Our <span className="text-accent-primary italic">Expertise</span>
          </h2>
          <p className="text-text-muted text-lg font-light">
            We provide a comprehensive suite of financial solutions tailored for the elite investor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-surface border border-border hover:border-accent-primary transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-accent-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-medium text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-text-muted font-light leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
