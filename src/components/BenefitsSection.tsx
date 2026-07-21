import { motion } from "framer-motion"
import { Heart, Wind, Users, Sparkles } from "lucide-react"

const benefits = [
  { icon: Heart, title: "Beat Screen Addiction", desc: "Replace passive screen time with active, mindful movement that engages both body and mind." },
  { icon: Wind, title: "Build Focus & Calm", desc: "Yoga and breathing exercises that improve concentration, memory, and emotional regulation in children." },
  { icon: Users, title: "Fun Group Sessions", desc: "Kids learn better together. Our small group classes make yoga a joyful social experience." },
  { icon: Sparkles, title: "Screen-Free Fun", desc: "Engaging, hands-on activities that prove movement is more entertaining than any device." },
]

export function BenefitsSection() {
  return (
    <section className="section-padding bg-warm">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sage font-semibold text-sm tracking-widest uppercase">Why Vēthā</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-brown-800 mt-4">Why Kids Love Vēthā</h2>
          <p className="text-brown-600 mt-4 max-w-xl mx-auto">Screen-free fun that builds focus, calm, and confidence — naturally.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-xl bg-sage/10 flex items-center justify-center mb-5 group-hover:bg-sage/20 transition-colors">
                <b.icon className="h-6 w-6 text-sage" />
              </div>
              <h3 className="text-lg font-semibold text-brown-800 mb-3">{b.title}</h3>
              <p className="text-sm text-brown-600 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
