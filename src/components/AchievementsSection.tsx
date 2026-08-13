import { useState } from "react"
import { motion } from "framer-motion"
import { KidsTreePose } from "./YogaLineArt"
import { GsapReveal } from "./GsapReveal"
import { ZoomOverlay, PhotoLightbox } from "./PhotoZoom"

const photos = [
  { src: "/Students_Achievements/Stud_Achieve_03.webp", alt: "Student achievement certificate proudly held" },
  { src: "/Students_Achievements/Stud_Achieve_11.webp", alt: "Young yogi celebrating an achievement milestone" },
  { src: "/Students_Achievements/Stud_Achieve_04.webp", alt: "Student with their yoga achievement certificate" },
  { src: "/Students_Achievements/Stud_Achieve_05.webp", alt: "Proud moment captured after a student milestone" },
  { src: "/Students_Achievements/Stud_Achieve_10.webp", alt: "Yoga student achievement photo" },
  { src: "/Students_Achievements/Stud_Achieve_07.webp", alt: "Certification celebration at Vetha Yogalaya" },
]

export function AchievementsSection() {
  const [selected, setSelected] = useState<number | null>(null)
  const open = (index: number) => setSelected(index)
  const close = () => setSelected(null)
  const navigate = (index: number) => setSelected(index)
  return (
    <section id="achievements" className="section-padding bg-cream relative overflow-hidden">
      <div className="absolute -top-6 -left-6 opacity-10 hidden lg:block">
        <KidsTreePose className="w-32 h-32 text-wine" />
      </div>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="text-gold-deep font-semibold text-sm tracking-widest uppercase">Achievements</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-wine mt-4">Our Students' Achievements</h2>
          <GsapReveal className="text-charcoal-light mt-4 max-w-2xl mx-auto">
            Celebrating the certifications, milestones, and proud moments of our young yogis and their families.
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
              className="relative aspect-square rounded-2xl overflow-hidden bg-white/60 shadow-sm group cursor-pointer p-0 text-left"
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
          Every milestone, big or small, deserves to be celebrated.
        </GsapReveal>
      </div>

      <PhotoLightbox photos={photos} selected={selected} onClose={close} onNavigate={navigate} />
    </section>
  )
}
