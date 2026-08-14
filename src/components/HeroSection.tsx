import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import SplitType from "split-type"
import { Play, ChevronRight } from "lucide-react"
import { GsapReveal } from "./GsapReveal"

export function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (headlineRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const split = new SplitType(headlineRef.current, { types: "chars,words" })
      const chars = split.chars || []

      chars.forEach((char, i) => {
        char.style.opacity = "0"
        char.style.transform = "translateY(20px)"
        setTimeout(() => {
          char.style.transition = "opacity 0.4s ease, transform 0.4s ease"
          char.style.opacity = "1"
          char.style.transform = "translateY(0)"
        }, 300 + i * 18)
      })

      return () => split.revert()
    }
  }, [])

  return (
    <section className="relative flex flex-col min-h-dvh bg-cream pt-24 sm:pt-28 pb-8 sm:pb-10 lg:justify-start lg:pt-32 lg:pb-16 lg:overflow-hidden">
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-16 flex-1 flex flex-col gap-6 sm:gap-8 lg:flex-none">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl bg-gradient-to-r from-wine/70 via-wine/45 to-wine/15 rounded-3xl p-7 shadow-xl ring-1 ring-white/10 lg:max-w-lg"
        >
          <span className="inline-flex items-center gap-2 text-white font-semibold text-xs tracking-widest uppercase mb-2">
            <span className="h-2 w-2 rounded-full bg-gold" />
            Kids Focus Yoga &mdash; OMR, Chennai
          </span>

          <h1
            ref={headlineRef}
            className="text-[clamp(1.75rem,calc(3vw+0.9rem),3rem)] font-bold font-heading text-white leading-[1.15] mb-3 text-balance"
          >
            Healthy Body, Happy Mind, <span className="text-gold underline decoration-gold-deep decoration-2 underline-offset-8">Focused Life</span>
          </h1>

          <GsapReveal className="text-sm sm:text-base text-white mb-4 leading-relaxed">
            <span className="block">Building focus, confidence, and lifelong wellness through yoga and meditation for all ages.</span>
            <span className="block">Helping children beat screen distraction while serving adults and seniors seeking calm.</span>
          </GsapReveal>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a href="#free-session" className="inline-flex items-center rounded-full bg-wine px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-heading font-semibold text-white hover:bg-wine-light transition-colors shadow-lg shadow-wine/20">
              <Play className="mr-2 h-4 w-4" />
              Book a Free Trial Class
            </a>
            <a href="#programs" className="inline-flex items-center rounded-full border border-white/40 text-white px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-heading font-medium hover:bg-white/10 transition-colors">
              Explore Programs
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>

          {/* Trust Signals */}
          <div className="mt-4 w-full flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3 text-sm sm:text-base text-white">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <svg className="h-5 w-5 lg:h-6 lg:w-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span>5+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <svg className="h-5 w-5 lg:h-6 lg:w-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span>100+ Happy Families</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <svg className="h-5 w-5 lg:h-6 lg:w-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span>Trusted by Parents</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video — direct section child so it fills the hero on desktop; stacked below text on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative flex-1 min-h-[200px] sm:min-h-[260px] lg:absolute lg:inset-0 lg:min-h-0 lg:flex-none lg:z-0"
      >
          <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-2xl lg:rounded-none lg:shadow-none">
            <img
              src="/hero-poster.webp"
              alt=""
              aria-hidden
              className="hero-poster-zoom absolute inset-0 h-full w-full object-cover"
            />
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/hero-poster.webp"
              disablePictureInPicture
              className="relative w-full h-full object-cover"
            >
              <source src="/hero-video.webm" type="video/webm" />
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/10 via-black/5 to-transparent" />
            <a
              href="https://www.vecteezy.com/free-videos/yoga"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 text-[10px] text-white/50 hover:text-white/80 transition-colors bg-black/30 backdrop-blur-sm px-2 py-1 rounded"
            >
              Yoga Stock Videos by Vecteezy
            </a>
          </div>
          {/* Decorative accent */}
          <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-gold/20 rounded-2xl -z-10 lg:hidden" />
        </motion.div>
    </section>
  )
}
