"use client"

import * as React from "react"
import { Loader2, Send } from "lucide-react"

export function ContactSection() {
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    }

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      
      if (res.ok) {
        setSuccess(true)
        e.currentTarget.reset()
      } else {
        setError(result.error || "Something went wrong.")
      }
    } catch (err) {
      setError("Failed to connect to the server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/10 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-foreground">
              Begin the <span className="text-accent-primary italic">Conversation</span>
            </h2>
            <p className="text-text-muted text-lg font-light leading-relaxed">
              We partner exclusively with high-net-worth individuals, family offices, and institutions. Reach out to schedule a private consultation regarding your portfolio architecture.
            </p>
            <div className="pt-8 space-y-4">
              <p className="text-foreground font-medium">Headquarters</p>
              <p className="text-text-muted font-light">Global Financial District<br/>New York, NY 10004</p>
              <p className="text-text-muted font-light mt-4">inquiries@wealthoryglobal.com</p>
            </div>
          </div>

          <div className="bg-surface border border-border p-8 rounded-2xl shadow-2xl relative">
            {success ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface rounded-2xl z-10 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 rounded-full bg-accent-primary/20 flex items-center justify-center mb-6">
                  <Send className="w-8 h-8 text-accent-primary" />
                </div>
                <h3 className="text-2xl font-serif text-foreground mb-2">Message Sent</h3>
                <p className="text-text-muted font-light text-center px-8">
                  Our private wealth team will be in touch with you shortly.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-8 text-sm text-accent-primary hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name *</label>
                <input 
                  id="name" name="name" type="text" required 
                  className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-accent-primary transition-colors font-light"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address *</label>
                  <input 
                    id="email" name="email" type="email" required 
                    className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-accent-primary transition-colors font-light"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</label>
                  <input 
                    id="phone" name="phone" type="tel" 
                    className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-accent-primary transition-colors font-light"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <label htmlFor="message" className="text-sm font-medium text-foreground">How can we assist you?</label>
                <textarea 
                  id="message" name="message" rows={4} 
                  className="w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-accent-primary transition-colors font-light resize-none"
                  placeholder="Briefly describe your investment goals..."
                />
              </div>
              
              {error && <p className="text-red-500 text-sm">{error}</p>}
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 rounded-full bg-accent-primary text-black font-semibold hover:bg-accent-primary-hover transition-all flex items-center justify-center gap-2 mt-4"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
