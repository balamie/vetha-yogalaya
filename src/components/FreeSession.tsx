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
              Your First Session Is Free
            </h2>
            <p className="text-white/80 mt-4 max-w-lg mx-auto">
              Experience the Vēthā difference with a complimentary 45-minute session. No strings attached — just bring yourself.
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
              <h3 className="text-white font-semibold mb-2">1. Book Your Spot</h3>
              <p className="text-sm text-white/70">Pick a date and time that works for you from our weekly schedule.</p>
            </div>
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20">
              <Gift className="h-8 w-8 text-gold mb-3" />
              <h3 className="text-white font-semibold mb-2">2. Attend & Enjoy</h3>
              <p className="text-sm text-white/70">Show up, breathe, stretch, and experience authentic yoga guidance.</p>
            </div>
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20">
              <ArrowRight className="h-8 w-8 text-gold mb-3" />
              <h3 className="text-white font-semibold mb-2">3. Decide Later</h3>
              <p className="text-sm text-white/70">No pressure — choose a plan that fits your lifestyle when you're ready.</p>
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
              Book Free Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
