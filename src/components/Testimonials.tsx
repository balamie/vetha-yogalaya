import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { KidsTreePose } from "./YogaLineArt"
import { GsapReveal } from "./GsapReveal"

const testimonials = [
  {
    name: "Priya S.",
    role: "Parent of Aryan (age 7)",
    text: "My son used to be glued to the iPad after school. After just two weeks at Vetha, he's calmer, sleeps better, and actually looks forward to his yoga sessions. Amazing transformation.",
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
  {
    name: "Anitha R.",
    role: "Prenatal Yoga Student",
    text: "The prenatal yoga classes helped me stay calm and flexible throughout my pregnancy. The instructor understood exactly what I needed at each stage. Highly recommend for expecting mothers.",
    rating: 5,
  },
  {
    name: "Karthik V.",
    role: "Adult Yoga Student",
    text: "I joined for stress relief from work. The adult sessions are well-structured — not too intense, not too easy. My posture has improved and I sleep much better now.",
    rating: 5,
  },
  {
    name: "Meena P.",
    role: "Parent of Twins (age 9)",
    text: "Both my twins attend the Young Yogis program. They've become more focused in school and even teach me breathing exercises at home! Best investment in their wellbeing.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-white relative overflow-hidden">
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
          <span className="text-gold-deep font-semibold text-sm tracking-widest uppercase">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-wine mt-4">What Families Say</h2>
          <GsapReveal className="text-charcoal-light mt-4 max-w-xl mx-auto">Real stories from parents and students who've experienced the Vetha difference.</GsapReveal>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              whileHover={{ y: -4, boxShadow: "0 15px 30px rgba(107, 29, 58, 0.08)" }}
              className="rounded-2xl bg-cream p-6 shadow-sm border border-rose/30 transition-all duration-300"
            >
              <Quote className="h-6 w-6 text-gold/40 mb-3" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm text-charcoal-light leading-relaxed mb-5 italic font-accent">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-rose/30">
                <div className="h-9 w-9 rounded-full bg-wine/10 flex items-center justify-center text-wine font-bold text-xs shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-wine">{t.name}</p>
                  <p className="text-xs text-charcoal-light/60">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
