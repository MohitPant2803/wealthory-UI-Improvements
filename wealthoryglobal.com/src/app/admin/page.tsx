"use client"

import * as React from "react"
import { Lock, LogOut, Download, Mail, Phone, Calendar } from "lucide-react"

export default function AdminDashboard() {
  const [password, setPassword] = React.useState("")
  const [authenticated, setAuthenticated] = React.useState(false)
  const [leads, setLeads] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  async function fetchLeads(pass: string) {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/leads?password=${pass}`)
      const data = await res.json()
      
      if (res.ok) {
        setLeads(data.leads)
        setAuthenticated(true)
        localStorage.setItem("wealthory_admin", pass)
      } else {
        setError(data.error || "Invalid password")
        setAuthenticated(false)
      }
    } catch (err) {
      setError("Failed to fetch leads")
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    const saved = localStorage.getItem("wealthory_admin")
    if (saved) {
      fetchLeads(saved)
    }
  }, [])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    fetchLeads(password)
  }

  function handleLogout() {
    localStorage.removeItem("wealthory_admin")
    setAuthenticated(false)
    setLeads([])
    setPassword("")
  }

  function downloadCSV() {
    if (leads.length === 0) return
    const headers = ["Date", "Name", "Email", "Phone", "Message"]
    const rows = leads.map(l => [
      new Date(l.date).toLocaleString(),
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.phone}"`,
      `"${l.message.replace(/"/g, '""')}"`
    ])
    
    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n")
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", `wealthory_leads_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <div className="w-full max-w-md p-8 bg-surface border border-border rounded-2xl shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary mb-6 mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-serif font-medium text-foreground text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-border px-4 py-3 rounded-lg text-foreground focus:outline-none focus:border-accent-primary transition-colors"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 rounded-lg bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
            >
              {loading ? "Authenticating..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-surface p-6 rounded-2xl border border-border">
          <div>
            <h1 className="text-3xl font-serif font-medium">Leads Dashboard</h1>
            <p className="text-text-muted mt-1">Total inquiries: {leads.length}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-primary/10 text-accent-primary hover:bg-accent-primary/20 transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-surface-hover transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {leads.length === 0 ? (
          <div className="text-center py-24 bg-surface border border-border rounded-2xl">
            <p className="text-text-muted">No leads found yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-surface border border-border p-6 rounded-2xl space-y-4 hover:border-accent-primary/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg truncate pr-4">{lead.name}</h3>
                  <span className="text-xs text-text-muted whitespace-nowrap flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(lead.date).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-text-muted">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent-primary" />
                    <a href={`mailto:${lead.email}`} className="hover:text-foreground transition-colors truncate">
                      {lead.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-accent-primary" />
                    <a href={`tel:${lead.phone}`} className="hover:text-foreground transition-colors">
                      {lead.phone}
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-border mt-4">
                  <p className="text-sm font-light text-foreground line-clamp-4">
                    "{lead.message}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
