import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Priya R.",
    role: "Member since 2023",
    text: "Vēthā Yogalaya transformed my relationship with my body. After just three months, my chronic back pain is gone, and I feel stronger than ever. The instructors are incredibly attentive.",
    rating: 5,
  },
  {
    name: "Arun K.",
    role: "Member since 2022",
    text: "I was skeptical about yoga at first, but the free session won me over. The mix of traditional practice with modern understanding of anatomy makes this studio special. Highly recommend.",
    rating: 5,
  },
  {
    name: "Meera S.",
    role: "Member since 2024",
    text: "The morning Ashtanga sessions at 5:30 AM have completely changed my energy levels. The discipline and community here are unmatched. Best decision I've made for my health.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-cream">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sage font-semibold text-sm tracking-widest uppercase">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-brown-800 mt-4">What Our Students Say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-white p-8 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm text-brown-600 leading-relaxed mb-6 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-sage/20 flex items-center justify-center text-sage font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-brown-800">{t.name}</p>
                  <p className="text-xs text-brown-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
