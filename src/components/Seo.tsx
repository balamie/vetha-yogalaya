import { useEffect } from "react"

const SITE_URL = "https://vethayogalaya.in"

interface SeoProps {
  title: string
  description: string
  path: string
}

export function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    document.title = title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute("content", description)
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute("href", `${SITE_URL}${path}`)
  }, [title, description, path])

  return null
}
