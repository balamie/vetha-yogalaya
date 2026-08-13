import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { GsapReveal } from "./GsapReveal"

const galleryItems = [
  { src: "/Gallery/gallery-1.webp", alt: "Kids practicing yoga at Vetha Yogalaya" },
  { src: "/Gallery/gallery-2.webp", alt: "Yoga session at Vetha Yogalaya studio" },
  { src: "/Gallery/gallery-3.webp", alt: "Children in yoga class" },
  { src: "/Gallery/gallery-4.webp", alt: "Group yoga activity" },
  { src: "/Gallery/gallery-5.webp", alt: "Yoga practice session" },
  { src: "/Gallery/gallery-6.webp", alt: "Studio life at Vetha Yogalaya" },
]

export function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelected(index)
  const closeLightbox = () => setSelected(null)
  const next = () => setSelected((prev) => (prev !== null ? (prev + 1) % galleryItems.length : null))
  const prev = () => setSelected((prev) => (prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null))

  useEffect(() => {
    if (selected === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selected])

  return (
    <section id="gallery" className="section-padding bg-cream">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="text-gold-deep font-semibold text-sm tracking-widest uppercase">Gallery</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-wine mt-4">Life at Vetha Yogalaya</h2>
          <GsapReveal className="text-charcoal-light mt-4 max-w-xl mx-auto">Cultivating Healthy Bodies, Peaceful Minds, and Compassionate Hearts</GsapReveal>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.button
              key={i}
              type="button"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => openLightbox(i)}
              aria-label={`View photo: ${item.alt}`}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-sm p-0 text-left"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-wine-deep/0 group-hover:bg-wine-deep/30 transition-colors duration-300 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Photo gallery viewer"
          >
            <button onClick={closeLightbox} aria-label="Close gallery" className="absolute top-4 right-4 text-white/70 hover:text-white z-10">
              <X className="h-8 w-8" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous photo" className="absolute left-4 text-white/70 hover:text-white z-10">
              <ChevronLeft className="h-10 w-10" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next photo" className="absolute right-4 text-white/70 hover:text-white z-10">
              <ChevronRight className="h-10 w-10" />
            </button>
            <motion.img
              key={selected}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={galleryItems[selected].src}
              alt={galleryItems[selected].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
