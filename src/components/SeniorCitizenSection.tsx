import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Users, Heart, Sparkles, Pause, Play } from "lucide-react"
import { GsapReveal } from "./GsapReveal"
import { MeditationFigure } from "./YogaLineArt"
import { ZoomOverlay, PhotoLightbox } from "./PhotoZoom"

const photos = [
  { src: "/Senior%20Citizen/Senior%20Citizen%200.jpeg", alt: "Senior citizens enjoying a gentle yoga session at Vetha Yogalaya" },
  { src: "/Senior%20Citizen/Senior%20Citizen%201.jpeg", alt: "Senior yoga class with seated and balance postures" },
  { src: "/Senior%20Citizen/Senior%20Citizen%202.jpeg", alt: "Elderly students practicing stretching exercises together" },
  { src: "/Senior%20Citizen/Senior%20Citizen%203.jpeg", alt: "Seniors in relaxation and breathing practice" },
  { src: "/Senior%20Citizen/Senior%20Citizen%204.jpeg", alt: "Group yoga practice for senior citizens" },
  { src: "/Senior%20Citizen/Senior%20Citizen%205.jpeg", alt: "Happy seniors after a yoga session at the studio" },
]

const highlights = [
  { icon: Users, title: "Ages 60+", desc: "Gentle, adaptive classes designed for seniors." },
  { icon: Heart, title: "Move with Ease", desc: "Flexibility, balance & fall prevention." },
  { icon: Sparkles, title: "Calm & Confident", desc: "Relaxation and meditation for mental peace." },
]

export function SeniorCitizenSection() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)

  const next = () => setIndex((i) => (i + 1) % photos.length)
  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length)
  const open = (i: number) => setSelected(i)
  const close = () => setSelected(null)
  const navigate = (i: number) => setSelected(i)

  useEffect(() => {
    if (paused || selected !== null) return
    const t = setInterval(() => setIndex((i) => (i + 1) % photos.length), 4000)
    return () => clearInterval(t)
  }, [paused, selected])

  useEffect(() => {
    const lenis = (window as unknown as Window & { lenis?: { stop: () => void; start: () => void } }).lenis
    const locked = selected !== null
    if (locked) {
      lenis?.stop()
      document.documentElement.style.overflow = "hidden"
    } else {
      lenis?.start()
      document.documentElement.style.overflow = ""
    }
    return () => {
      if (locked) {
        lenis?.start()
        document.documentElement.style.overflow = ""
      }
    }
  }, [selected])

  return (
    <section id="senior-citizens" className="section-padding bg-cream relative overflow-hidden">
      <div className="absolute -bottom-6 -right-6 opacity-10 hidden lg:block">
        <MeditationFigure className="w-40 h-40 text-wine" />
      </div>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="text-gold-deep font-semibold text-sm tracking-widest uppercase">Golden Yogis</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-wine mt-4">Yoga for Senior Citizens</h2>
          <GsapReveal className="text-charcoal-light mt-4 max-w-2xl mx-auto">
            Move with ease, live with confidence, and age with grace. Gentle, joyful yoga designed for seniors of every level.
          </GsapReveal>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-xl p-5 shadow-sm border border-rose/30 flex items-start gap-4"
            >
              <div className="h-11 w-11 rounded-full bg-rose flex items-center justify-center shrink-0">
                <h.icon className="h-5 w-5 text-wine" />
              </div>
              <div>
                <h3 className="font-semibold text-wine">{h.title}</h3>
                <p className="text-sm text-charcoal-light mt-0.5">{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden bg-wine-deep shadow-xl aspect-[4/3] md:aspect-[16/9]"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.button
              key={index}
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => open(index)}
              aria-label={`View photo full size: ${photos[index].alt}`}
              className="absolute inset-0 w-full h-full cursor-pointer p-0 text-left"
            >
              <img
                src={photos[index].src}
                alt={photos[index].alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <ZoomOverlay />
            </motion.button>
          </AnimatePresence>

          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-wine transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-wine transition-colors flex items-center justify-center"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); setPaused((p) => !p) }}
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              className="h-9 w-9 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-wine transition-colors flex items-center justify-center"
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
            <span className="rounded-full bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-2 font-medium">
              {index + 1} / {photos.length}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIndex(i) }}
                aria-label={`Go to photo ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-gold" : "w-2 bg-white/60 hover:bg-white"}`}
              />
            ))}
          </div>
        </motion.div>

        <div className="hidden md:flex justify-center gap-3 mt-6">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View thumbnail ${i + 1}`}
              className={`relative w-24 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${i === index ? "border-gold shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
            >
              <img src={photo.src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <GsapReveal className="text-sm italic font-accent text-charcoal-light max-w-xl mx-auto mb-8">
            It's never too late to begin. Every practice is gentle, safe, and personal.
          </GsapReveal>
          <a href="#contact" className="inline-flex items-center rounded-full bg-wine px-8 py-4 text-base font-heading font-semibold text-white hover:bg-wine-light transition-colors shadow-lg shadow-wine/20">
            Enquire for Senior Programs
          </a>
        </div>
      </div>

      <PhotoLightbox photos={photos} selected={selected} onClose={close} onNavigate={navigate} />
    </section>
  )
}
