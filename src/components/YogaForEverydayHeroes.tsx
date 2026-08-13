import { useState } from "react"
import { motion } from "framer-motion"
import { HandHeart } from "lucide-react"
import { WarriorPose } from "./YogaLineArt"
import { GsapReveal } from "./GsapReveal"
import { ZoomOverlay, PhotoLightbox } from "./PhotoZoom"

const photos = [
  { src: "/Our_Heros/Hero_01.webp", alt: "Free yoga session for our everyday heroes" },
  { src: "/Our_Heros/Hero_02.webp", alt: "Community yoga practice outdoors" },
  { src: "/Our_Heros/Hero_03.webp", alt: "Volunteers leading a free yoga class" },
  { src: "/Our_Heros/Hero_04.webp", alt: "Participants enjoying a community yoga session" },
  { src: "/Our_Heros/Hero_05.webp", alt: "Group yoga pose at a community initiative" },
  { src: "/Our_Heros/Hero_06.webp", alt: "Yoga for all — free sessions for the community" },
]

export function YogaForEverydayHeroes() {
  const [selected, setSelected] = useState<number | null>(null)
  const open = (index: number) => setSelected(index)
  const close = () => setSelected(null)
  const navigate = (index: number) => setSelected(index)
  return (
    <section id="yoga-for-heroes" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute -top-6 -right-6 opacity-10 hidden lg:block">
        <WarriorPose className="w-32 h-32 text-wine" />
      </div>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="text-gold-deep font-semibold text-sm tracking-widest uppercase">Community Initiative</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-wine mt-4">Yoga for Everyday Heroes</h2>
          <GsapReveal className="text-charcoal-light mt-4 max-w-2xl mx-auto">
            As our way of reciprocating our duty to society, we conduct voluntary and free yoga sessions &mdash; making yoga accessible to everyone. Yoga for all.
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
              transition={{ duration: 0.35, delay: i * 0.04 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => open(i)}
              aria-label={`View photo: ${photo.alt}`}
              className="relative aspect-square rounded-2xl overflow-hidden bg-cream/60 shadow-sm group cursor-pointer p-0 text-left"
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

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-center text-sm italic font-accent text-charcoal-light mt-10 max-w-xl mx-auto flex items-center justify-center gap-2"
        >
          <HandHeart className="h-4 w-4 text-wine" /> Health, harmony & happiness &mdash; for every home.
        </motion.p>
      </div>

      <PhotoLightbox photos={photos} selected={selected} onClose={close} onNavigate={navigate} />
    </section>
  )
}
