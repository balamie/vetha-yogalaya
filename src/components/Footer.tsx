import { Heart } from "lucide-react"

const footerLinks = {
  Programs: ["Kids Yoga (3-7)", "Kids Yoga (8-12)", "Teen Yoga", "Free Trial"],
  Connect: ["About Us", "Contact", "Instagram", "Google Maps"],
  Info: ["Privacy Policy", "Terms of Service", "FAQ"],
}

export function Footer() {
  return (
    <footer className="bg-brown-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="inline-flex items-center gap-3 mb-4">
              <img src="/vetha_Yogalaya_Logo.png" alt="Vēthā Yogalaya" className="h-10 w-auto brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold font-heading text-white">Vēthā</span>
                <span className="text-[9px] font-semibold tracking-[3px] text-white/50">YOGALAYA</span>
              </div>
            </a>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Kids Focus Yoga in OMR, Chennai. Helping children beat screen addiction & distraction. Building focus, calm mind & confidence naturally.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="https://www.instagram.com/vetha_yogalaya/" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-sage transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.instagram.com/vetha_yogalaya/" target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-sage transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white/80 mb-6">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/50 hover:text-sage transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Vēthā Yogalaya. All rights reserved.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-terracotta" /> in Chennai
          </p>
        </div>
      </div>
    </footer>
  )
}
