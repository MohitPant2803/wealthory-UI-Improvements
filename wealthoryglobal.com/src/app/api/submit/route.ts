import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// For Vercel Serverless environments, /tmp is the only writable directory.
// Note: This is ephemeral. For a real production app, use Vercel KV or Postgres.
const DB_PATH = path.join("/tmp", "leads.json")

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    const newLead = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || "N/A",
      message: message || "N/A",
      date: new Date().toISOString(),
    }

    let leads = []
    if (fs.existsSync(DB_PATH)) {
      const fileData = fs.readFileSync(DB_PATH, "utf-8")
      leads = JSON.parse(fileData)
    }

    leads.push(newLead)
    fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2))

    return NextResponse.json({ success: true, lead: newLead })
  } catch (error) {
    console.error("Error saving lead:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
