import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export function AboutInstructor() {
  return (
    <section id="about" className="section-padding bg-warm">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-sand">
              <img
                src="https://images.pexels.com/photos/3820378/pexels-photo-3820378.jpeg?w=800&q=80"
                alt="Yoga instructor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 rounded-2xl bg-white p-6 shadow-lg">
              <p className="text-2xl font-bold text-sage">8+</p>
              <p className="text-xs text-brown-600">Years Teaching</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sage font-semibold text-sm tracking-widest uppercase">About</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-brown-800 mt-4">Your Guide on the Mat</h2>

            <div className="mt-8 space-y-4 text-brown-600 leading-relaxed">
              <p>
                At Vēthā Yogalaya, we believe yoga is for everyone. Our certified instructors bring 
                decades of combined experience across Hatha, Vinyasa, Ashtanga, and therapeutic yoga.
              </p>
              <p>
                Located in the heart of Coimbatore, our studio is a sanctuary away from the chaos 
                of daily life — a space where you can breathe, stretch, and grow at your own pace.
              </p>
              <p>
                Whether you're taking your first step onto the mat or deepening an established practice, 
                we're here to guide you with patience, expertise, and warmth.
              </p>
            </div>

            <div className="mt-8 p-6 rounded-xl bg-white/60 border border-brown-200">
              <Quote className="h-6 w-6 text-sage mb-3" />
              <p className="text-base italic text-brown-600">
                "Yoga is not about touching your toes — it's about what you learn on the way down. 
                Every breath is a step closer to your true self."
              </p>
              <p className="text-sm font-semibold text-brown-800 mt-4">— Our Teachers</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
