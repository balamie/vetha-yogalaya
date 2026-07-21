import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Priya S.",
    role: "Parent of Aryan (age 7)",
    text: "My son used to be glued to the iPad after school. After just two weeks at Vēthā, he's calmer, sleeps better, and actually looks forward to his yoga sessions. Amazing transformation.",
    rating: 5,
  },
  {
    name: "Ramesh K.",
    role: "Parent of Nandhini (age 10)",
    text: "Nandhini's teachers noticed the difference before we did — better concentration in class, less fidgeting, more confidence. The focus exercises they teach are incredible.",
    rating: 5,
  },
  {
    name: "Lakshmi M.",
    role: "Parent of Vihaan (age 5)",
    text: "The storytelling yoga for younger kids is brilliant. My 5-year-old learns poses through animal stories and asks to go every day. A screen-free joy we desperately needed.",
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-brown-800 mt-4">What Parents Say</h2>
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
