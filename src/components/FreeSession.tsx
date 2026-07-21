import { motion } from "framer-motion"
import { Calendar, Gift, ArrowRight } from "lucide-react"

export function FreeSession() {
  return (
    <section id="free-session" className="section-padding bg-sage">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold font-semibold text-sm tracking-widest uppercase">Try Before You Commit</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white mt-4">
              Free Trial Session for Every Child
            </h2>
            <p className="text-white/80 mt-4 max-w-lg mx-auto">
              Let your child experience the magic of yoga with a complimentary session. See the difference in focus and calm firsthand.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left"
          >
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20">
              <Calendar className="h-8 w-8 text-gold mb-3" />
              <h3 className="text-white font-semibold mb-2">1. Book a Spot</h3>
              <p className="text-sm text-white/70">Pick a convenient time from our weekly schedule — morning or evening slots available.</p>
            </div>
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20">
              <Gift className="h-8 w-8 text-gold mb-3" />
              <h3 className="text-white font-semibold mb-2">2. Bring Your Child</h3>
              <p className="text-sm text-white/70">We provide everything. Just bring your child in comfortable clothes. Watch them enjoy.</p>
            </div>
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20">
              <ArrowRight className="h-8 w-8 text-gold mb-3" />
              <h3 className="text-white font-semibold mb-2">3. See the Difference</h3>
              <p className="text-sm text-white/70">No pressure. If they love it (and they will), choose a plan that fits your schedule.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10"
          >
            <a href="#contact" className="inline-flex items-center rounded-full bg-white text-sage px-10 py-4 text-base font-semibold hover:bg-white/90 transition-colors shadow-lg">
              Book Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
