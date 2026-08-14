import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "../lib/utils"

const links = [
  { label: "Programs", href: "#programs" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Blog", href: "#blog" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
]

const InstagramIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const FacebookIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    for (const l of links) {
      const id = l.href.replace("#", "")
      const el = document.getElementById(id)
      if (!el) continue
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    }
    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-cream/95 backdrop-blur-md shadow-sm" : "bg-cream"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 md:h-28 items-center justify-between">
          {/* Logo — larger, panijoga.pl style */}
          <a href="/" className="flex items-center gap-3">
            <img src="/vetha_Yogalaya_Logo.png" alt="Vetha Yogalaya" className="h-16 md:h-20 w-auto" />
            <span className="text-xl md:text-2xl font-bold font-heading text-wine whitespace-nowrap">Vetha Yogalaya</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                aria-current={active === l.href.replace("#", "") ? "true" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors",
                  active === l.href.replace("#", "")
                    ? "text-wine font-semibold"
                    : "text-charcoal hover:text-wine"
                )}
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center gap-3 ml-2">
              <a href="https://www.instagram.com/vetha_yogalaya/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-10 w-10 rounded-full bg-wine/5 flex items-center justify-center text-wine hover:bg-wine/10 transition-colors">
                <InstagramIcon />
              </a>
              <a href="https://www.facebook.com/vetha_Yogalaya" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-10 w-10 rounded-full bg-wine/5 flex items-center justify-center text-wine hover:bg-wine/10 transition-colors">
                <FacebookIcon />
              </a>
            </div>
            <a href="#free-session" className="group relative overflow-hidden rounded-full bg-gradient-to-b from-wine-light via-wine to-wine-deep px-6 py-3 text-sm font-heading font-semibold text-white hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-wine/30">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-white/25 rounded-t-full pointer-events-none" />
              <span className="absolute -inset-x-8 -top-10 h-16 rotate-12 bg-white/10 blur-md group-hover:translate-x-24 transition-transform duration-700 pointer-events-none" />
              Book a Free Trial Class
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-3 -mr-2" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X className="h-6 w-6 text-wine" /> : <Menu className="h-6 w-6 text-wine" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-cream border-t border-rose-dark/30 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-sm font-medium text-charcoal hover:text-wine">{l.label}</a>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-rose-dark/20">
                <a href="https://www.instagram.com/vetha_yogalaya/" target="_blank" rel="noopener noreferrer" className="h-11 w-11 rounded-full bg-wine/5 flex items-center justify-center text-wine">
                  <InstagramIcon />
                </a>
                <a href="https://www.facebook.com/vetha_Yogalaya" target="_blank" rel="noopener noreferrer" className="h-11 w-11 rounded-full bg-wine/5 flex items-center justify-center text-wine">
                  <FacebookIcon />
                </a>
              </div>
              <a href="#free-session" onClick={() => setOpen(false)} className="group relative overflow-hidden rounded-full bg-gradient-to-b from-wine-light via-wine to-wine-deep px-6 py-3 text-sm font-heading font-semibold text-white">
                <span className="absolute inset-x-0 top-0 h-1/2 bg-white/25 rounded-t-full pointer-events-none" />
                Book a Free Trial Class
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
