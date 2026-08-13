import { motion } from "framer-motion"
import { Smartphone, Brain, Mic, Activity, Crosshair, HeartPulse } from "lucide-react"
import { BreathingIcon } from "./YogaLineArt"
import { GsapReveal } from "./GsapReveal"

const challenges = [
  { icon: Smartphone, title: "Excessive Screen Time and Digital Addiction" },
  { icon: Brain, title: "Weak Memory and Learning Retention" },
  { icon: Mic, title: "Low Self-Confidence and Communication Skills" },
  { icon: Activity, title: "Poor Posture and Reduced Physical Activity" },
  { icon: Crosshair, title: "Lack of Focus and Concentration while studying" },
  { icon: HeartPulse, title: "Stress, Anxiety, and Emotional Imbalance" },
]

export function BenefitsSection() {
  return (
    <section className="section-padding bg-cream relative overflow-hidden">
      <div className="absolute top-10 right-10 opacity-10 hidden lg:block">
        <BreathingIcon className="w-32 h-32 text-wine" />
      </div>

      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <span className="text-gold-deep font-semibold text-sm tracking-widest uppercase">The Challenge</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-wine mt-4 max-w-4xl mx-auto">
            Why Are So Many Children <span className="block">Struggling With Focus Today?</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {challenges.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm border border-rose/30 transition-all duration-300"
            >
              <div className="h-11 w-11 rounded-xl bg-rose flex items-center justify-center shrink-0">
                <c.icon className="h-5 w-5 text-wine" />
              </div>
              <p className="text-charcoal-light font-medium leading-relaxed">{c.title}</p>
            </motion.div>
          ))}
        </div>

        <GsapReveal className="text-center text-base sm:text-lg font-heading font-medium text-wine mt-10 max-w-4xl mx-auto leading-relaxed">
          <span className="block">Many of these challenges arise from poor posture, improper breathing patterns, and overstimulation of the mind.</span>
          <span className="block">With the right combination of yoga, mindfulness, and healthy daily practices,</span>
          <span className="block">children can naturally enhance concentration, memory, confidence, and emotional stability.</span>
        </GsapReveal>
      </div>
    </section>
  )
}
