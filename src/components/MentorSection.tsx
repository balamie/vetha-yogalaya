import { motion } from "framer-motion"
import { HeartHandshake, Leaf, Quote, Users, Sparkles } from "lucide-react"
import { GsapReveal } from "./GsapReveal"

const specialties = [
  { icon: Users, label: "Kids & Youth Yoga" },
  { icon: HeartHandshake, label: "Senior Citizen Yoga" },
  { icon: Leaf, label: "Motherhood Yoga (Prenatal & Postnatal)" },
  { icon: Sparkles, label: "Adults & Stress Relief" },
]

const qualities = [
  "Blends traditional yoga wisdom with modern, age-appropriate techniques",
  "Patient, personal, and joyful teaching for students of every age",
  "Guided by the teachings of Thathuvagani Vethathiri Maharishi and Swamy Satyananda Saraswathi",
  "Believes every student is unique — and meets each one exactly where they are",
]

export function MentorSection() {
  return (
    <section id="mentor" className="section-padding bg-white relative overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left — Portrait placeholder + quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="relative max-w-sm mx-auto">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-rose via-transparent to-gold/30 -z-10" />
              <div className="relative rounded-[1.75rem] overflow-hidden shadow-2xl shadow-wine/20">
                <img
                  src="/mentor.webp"
                  alt="Kamalaveni — Founder and Lead Yoga Instructor at Vetha Yogalaya"
                  className="w-full aspect-[4/5] object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-wine-deep/90 via-wine-deep/40 to-transparent pt-12 pb-5 px-6 text-center">
                  <p className="text-white font-heading font-semibold text-xl drop-shadow-md">Kamalaveni</p>
                  <p className="text-white/90 text-sm mt-1 drop-shadow">Founder &amp; Lead Yoga Instructor</p>
                </div>
              </div>
              <div className="mt-6 rounded-xl bg-cream border border-rose/40 p-5 flex items-start gap-3">
                <Quote className="h-5 w-5 text-gold-deep shrink-0 mt-0.5" />
                <p className="text-sm text-charcoal-light italic">
                  "Yoga is not about bending the body &mdash; it's about calming the mind and opening the heart."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-3"
          >
            <span className="text-gold-deep font-semibold text-sm tracking-widest uppercase">Meet Your Mentor</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-wine mt-4">Kamalaveni</h2>
            <p className="text-base font-accent italic text-gold-deep mt-2">Founder &amp; Lead Yoga Instructor, Vetha Yogalaya</p>

            <div className="mt-6 space-y-4 text-charcoal-light leading-relaxed text-justify">
              <GsapReveal>
                Kamalaveni is the founder and lead yoga instructor at Vetha Yogalaya, a screen-free wellness sanctuary in OMR, Chennai. With a deep love for teaching and a heart for people of every age, she has guided children, teenagers, seniors, and expectant mothers on their journey to health, focus, and inner calm.
              </GsapReveal>
              <GsapReveal>
                Her teaching blends the timeless wisdom of Thathuvagani Vethathiri Maharishi and Swamy Satyananda Saraswathi with modern, age-appropriate techniques &mdash; so every session is joyful, practical, and deeply personal.
              </GsapReveal>
              <GsapReveal>
                Whether helping a child build focus, guiding a senior to move with ease, or supporting a mother through pregnancy and recovery, Kamalaveni believes yoga is for everyone.
              </GsapReveal>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {specialties.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-center gap-3 rounded-xl bg-rose/50 border border-rose/40 px-4 py-3"
                >
                  <s.icon className="h-5 w-5 text-wine shrink-0" />
                  <span className="text-sm font-medium text-charcoal">{s.label}</span>
                </motion.div>
              ))}
            </div>

            <ul className="mt-8 space-y-2.5">
              {qualities.map((q, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex items-start gap-2.5 text-sm text-charcoal-light"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0 mt-2" />
                  {q}
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#free-session" className="inline-flex items-center rounded-full bg-wine px-8 py-4 text-base font-heading font-semibold text-white hover:bg-wine-light transition-colors shadow-lg shadow-wine/20">
                Book a Free Trial Class
              </a>
              <a href="#contact" className="inline-flex items-center rounded-full border border-wine/30 text-wine px-8 py-4 text-base font-heading font-medium hover:bg-wine/5 transition-colors">
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
