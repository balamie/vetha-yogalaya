import { useState } from "react"
import { Heart, Send, MapPin, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { subscribeNewsletter } from "../lib/forms"

const footerLinks = {
  Programs: [
    { label: "Young Yogis (4–9)", href: "#programs" },
    { label: "Youth Yogis (10–15)", href: "#programs" },
    { label: "Life Yogis (25–60)", href: "#programs" },
    { label: "Golden Yogis (60+)", href: "#programs" },
    { label: "Motherhood Yogis", href: "#programs" },
  ],
  "Quick Links": [
    { label: "About Us", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
}

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

export function Footer() {
  const [email, setEmail] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot) return
    if (!email) return

    const saved = await subscribeNewsletter(email)
    if (!saved) {
      const subject = encodeURIComponent("Newsletter subscription – Vetha Yogalaya")
      const body = encodeURIComponent(`Hi Vetha Yogalaya,\n\nPlease add me to your newsletter.\nEmail: ${email}`)
      window.location.href = `mailto:vethayogalaya@gmail.com?subject=${subject}&body=${body}`
    }

    setSubscribed(true)
    setEmail("")
  }

  return (
    <footer className="bg-wine-deep text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand + Contact */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-flex items-center gap-3 mb-5">
              <img src="/vetha_Yogalaya_Logo.png" alt="Vetha Yogalaya" className="h-14 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" />
              <span className="text-lg font-bold font-heading text-white whitespace-nowrap">Vetha Yogalaya</span>
            </a>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm mb-6">
              Building focus, confidence, and lifelong wellness through yoga and meditation for all ages — helping children beat screen distraction in OMR, Chennai.
            </p>

            <div className="space-y-3 mb-6">
              <a href="https://maps.google.com/?q=Casagrand+Supremus+Thazhambur+Chennai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/50 hover:text-gold transition-colors">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Thazhambur, OMR, Chennai 600130</span>
              </a>
              <a href="https://wa.me/917550148784" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/50 hover:text-gold transition-colors">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+91 75501 48784</span>
              </a>
              <a href="mailto:vethayogalaya@gmail.com" className="flex items-center gap-3 text-sm text-white/50 hover:text-gold transition-colors">
                <Mail className="h-4 w-4 shrink-0" />
                <span>vethayogalaya@gmail.com</span>
              </a>
            </div>

            <div className="flex gap-3">
              <a href="https://www.instagram.com/vetha_yogalaya/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors">
                <InstagramIcon />
              </a>
              <a href="https://www.facebook.com/vetha_Yogalaya" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors">
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).slice(0, 2).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white/80 mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-white/50 hover:text-gold transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Legal + Newsletter stacked */}
          <div className="flex flex-col gap-8">
            {Object.entries(footerLinks).slice(2).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-sm font-semibold text-white/80 mb-5">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-sm text-white/50 hover:text-gold transition-colors">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-semibold text-white/80 mb-5">Newsletter</h4>
              <p className="text-sm text-white/50 mb-4">Get yoga tips, parenting advice, and studio updates.</p>
              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-gold"
                >
                  Thank you for subscribing!
                </motion.p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="newsletter-company">Company</label>
                    <input
                      id="newsletter-company"
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>
                  <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    className="flex-1 rounded-full bg-white/10 border border-white/20 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/30 min-w-0"
                  />
                  <button type="submit" aria-label="Subscribe to newsletter" className="h-11 w-11 rounded-full bg-gold flex items-center justify-center text-wine-deep hover:bg-gold-light active:scale-95 transition-all shrink-0">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Vetha Yogalaya. All rights reserved.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-gold" /> in Chennai
          </p>
        </div>
      </div>
    </footer>
  )
}
