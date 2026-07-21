import { motion } from "framer-motion"
import { Play, ChevronRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.pexels.com/photos/3820378/pexels-photo-3820378.jpeg?w=1920&q=80"
          className="absolute inset-0 w-full h-full object-cover"
          preload="none"
        >
          <source src="https://cdn.coverr.co/videos/coverr-woman-doing-yoga-exercise-at-the-beach-5761/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-brown-900/70 via-brown-900/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm text-white/80 border border-white/20 mb-6">
              <span className="h-2 w-2 rounded-full bg-sage mr-2" />
              Kids Focus Yoga &mdash; OMR, Chennai
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-white leading-[1.1] mb-6"
          >
            Helping Kids Beat{" "}
            <span className="text-sage">Screen Addiction</span>
            <br />
            &amp; Build Focus Naturally
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/70 max-w-xl mb-8 leading-relaxed"
          >
            Specialised children's yoga programs that improve concentration, reduce anxiety, and build confidence — all through fun, engaging sessions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#free-session" className="inline-flex items-center rounded-full bg-sage px-8 py-4 text-base font-semibold text-white hover:bg-olive transition-colors shadow-lg shadow-sage/30">
              <Play className="mr-2 h-5 w-5" />
              Book a Free Trial
            </a>
            <a href="#programs" className="inline-flex items-center rounded-full border border-white/30 text-white px-8 py-4 text-base font-medium hover:bg-white/10 transition-colors">
              Learn More
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
