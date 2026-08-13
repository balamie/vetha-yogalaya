import { existsSync, writeFileSync, appendFileSync } from "node:fs"
import { resolve } from "node:path"

const branch = process.env.CF_PAGES_BRANCH
const dist = resolve("dist")

if (!branch) {
  console.log("[preview-noindex] CF_PAGES_BRANCH not set (local build) — skipping.")
  process.exit(0)
}

if (branch === "main") {
  console.log(`[preview-noindex] Production branch "${branch}" — no changes.`)
  process.exit(0)
}

if (!existsSync(dist)) {
  console.error("[preview-noindex] dist/ not found — run vite build first.")
  process.exit(1)
}

writeFileSync(resolve(dist, "robots.txt"), "User-agent: *\nDisallow: /\n", "utf8")
appendFileSync(resolve(dist, "_headers"), "/*\n  X-Robots-Tag: noindex\n", "utf8")

console.log(`[preview-noindex] Preview branch "${branch}" hardened: robots.txt blocked + X-Robots-Tag: noindex added.`)
