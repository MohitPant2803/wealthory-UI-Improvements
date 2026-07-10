import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const DB_PATH = path.join("/tmp", "leads.json")
const ADMIN_PASSWORD = "wealthory2026"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const password = searchParams.get("password")

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let leads = []
    if (fs.existsSync(DB_PATH)) {
      const fileData = fs.readFileSync(DB_PATH, "utf-8")
      leads = JSON.parse(fileData)
    }

    // Sort by newest first
    leads.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json({ success: true, leads })
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
