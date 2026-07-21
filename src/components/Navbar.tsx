import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu } from "lucide-react"
import { cn } from "../lib/utils"

const links = [
  { label: "Programs", href: "#programs" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-cream/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/vetha_Yogalaya_Logo.png" alt="Vēthā Yogalaya" className={cn("h-10 w-auto transition-all", scrolled ? "" : "brightness-0 invert")} />
            <div className="flex flex-col leading-tight">
              <span className={cn("text-base md:text-lg font-bold font-heading transition-colors", scrolled ? "text-brown-800" : "text-white")}>Vēthā</span>
              <span className={cn("text-[9px] md:text-xs font-semibold tracking-[3px] transition-colors", scrolled ? "text-brown-600" : "text-white/70")}>YOGALAYA</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} className={cn("text-sm font-medium transition-colors hover:text-sage", scrolled ? "text-brown-600" : "text-white/80")}>{l.label}</a>
            ))}
            <a href="#free-session" className="rounded-full bg-sage px-6 py-2.5 text-sm font-semibold text-white hover:bg-olive transition-colors">Free Session</a>
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            <Menu className={cn("h-6 w-6", scrolled ? "text-brown-800" : "text-white")} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-cream border-t border-brown-200"
          >
            <div className="px-6 py-6 space-y-4">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-brown-600 hover:text-sage">{l.label}</a>
              ))}
              <a href="#free-session" onClick={() => setOpen(false)} className="block text-center rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white">Free Session</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
