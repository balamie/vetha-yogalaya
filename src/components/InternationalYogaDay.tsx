import { useState } from "react"
import { motion } from "framer-motion"
import { SunSymbol } from "./YogaLineArt"
import { GsapReveal } from "./GsapReveal"
import { ZoomOverlay, PhotoLightbox } from "./PhotoZoom"

const photos = [
  { src: "/International_Yoga_Day/Int_Yoga_Cert.jpeg", alt: "Certificate presented at our International Yoga Day celebration" },
  { src: "/International_Yoga_Day/Int_Yoga_08.jpeg", alt: "Young yogis in pose at International Yoga Day" },
  { src: "/International_Yoga_Day/Int_Yoga_06.jpeg", alt: "Group yoga practice during International Yoga Day" },
  { src: "/International_Yoga_Day/Int_Yoga_04.jpeg", alt: "International Yoga Day celebration group moment" },
  { src: "/International_Yoga_Day/Int_Yoga_10.jpeg", alt: "Participants in a yoga pose at the celebration" },
  { src: "/International_Yoga_Day/Int_Yoga_01.jpeg", alt: "International Yoga Day celebration group moment" },
]

export function InternationalYogaDay() {
  const [selected, setSelected] = useState<number | null>(null)
  const open = (index: number) => setSelected(index)
  const close = () => setSelected(null)
  const navigate = (index: number) => setSelected(index)
  return (
    <section id="international-yoga-day" className="section-padding bg-cream relative overflow-hidden">
      <div className="absolute -bottom-6 -right-6 opacity-10 hidden lg:block">
        <SunSymbol className="w-32 h-32 text-wine" />
      </div>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold-deep font-semibold text-sm tracking-widest uppercase">Celebration</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-wine mt-4">International Yoga Day</h2>
          <GsapReveal className="text-charcoal-light mt-4 max-w-2xl mx-auto">
            Relive the joy of our International Yoga Day celebrations &mdash; certificates, participants, and moments that bring the community together.
          </GsapReveal>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {photos.map((photo, i) => (
            <motion.button
              key={photo.src}
              type="button"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => open(i)}
              aria-label={`View photo: ${photo.alt}`}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/60 shadow-sm group cursor-pointer p-0 text-left"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <ZoomOverlay />
            </motion.button>
          ))}
        </div>

        <GsapReveal className="text-center text-sm italic font-accent text-charcoal-light mt-10 max-w-xl mx-auto">
          One world, one yoga &mdash; uniting minds and bodies in peace.
        </GsapReveal>
      </div>

      <PhotoLightbox photos={photos} selected={selected} onClose={close} onNavigate={navigate} />
    </section>
  )
}
