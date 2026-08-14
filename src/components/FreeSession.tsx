import { motion } from "framer-motion"
import { Calendar, Gift, ArrowRight } from "lucide-react"
import { TreePose, ChildsPose } from "./YogaLineArt"
import { GsapReveal } from "./GsapReveal"

const steps = [
  { icon: Calendar, title: "1. Book a Spot", desc: "Pick a convenient time from our weekly schedule — morning or evening slots available." },
  { icon: Gift, title: "2. Bring Your Child", desc: "Just bring your child in comfortable clothes. Watch them enjoy." },
  { icon: ArrowRight, title: "3. See the Difference", desc: "No pressure. If they love it (and they will), choose a plan that fits your schedule." },
]

export function FreeSession() {
  return (
    <section id="free-session" className="px-4 sm:px-6 lg:px-8 pt-8 sm:pt-24 pb-14 sm:pb-24 bg-wine relative overflow-hidden">
      <div className="absolute top-10 right-10 opacity-10 hidden lg:block">
        <TreePose className="w-32 h-32 text-gold" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-10 hidden lg:block">
        <ChildsPose className="w-40 h-20 text-gold" />
      </div>

      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-gold font-semibold text-sm tracking-widest uppercase">Try Before You Commit</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-heading text-white mt-3">
              Free Trial Session for Every Child
            </h2>
            <GsapReveal className="text-white/70 mt-3 max-w-lg mx-auto">
              Let your child experience the magic of yoga with a complimentary session. See the difference in focus and calm firsthand.
            </GsapReveal>
          </motion.div>

          <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className="rounded-xl bg-white/10 backdrop-blur-sm p-5 sm:p-6 border border-white/20"
              >
                <step.icon className="h-8 w-8 text-gold mb-3" />
                <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-white/60">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-6 sm:mt-10"
          >
            <a href="#contact" className="inline-flex items-center rounded-full bg-gold text-wine-deep px-10 py-4 text-base font-heading font-semibold hover:bg-gold-light transition-colors shadow-lg shadow-gold/30">
              Book a Free Trial Class
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
