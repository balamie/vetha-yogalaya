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
                src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80"
                alt="Kids yoga class"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 rounded-2xl bg-white p-6 shadow-lg">
              <p className="text-2xl font-bold text-sage">100+</p>
              <p className="text-xs text-brown-600">Happy Kids</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sage font-semibold text-sm tracking-widest uppercase">About</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-brown-800 mt-4">About Vēthā Yogalaya</h2>

            <div className="mt-8 space-y-4 text-brown-600 leading-relaxed">
              <p>
                At Vēthā Yogalaya, we believe every child deserves tools to navigate a distracted world. 
                Our kids-focused yoga programs are designed to help children build focus, calm their minds, 
                and develop confidence — naturally and joyfully.
              </p>
              <p>
                Located in OMR, Chennai, our studio is a screen-free sanctuary where children ages 3-17 
                learn yoga, breathing techniques, and mindfulness through engaging, age-appropriate sessions.
              </p>
              <p>
                Our certified instructors understand child psychology and make every class a blend of 
                fun movement, focused breathing, and quiet moments — exactly what growing minds need.
              </p>
            </div>

            <div className="mt-8 p-6 rounded-xl bg-white/60 border border-brown-200">
              <Quote className="h-6 w-6 text-sage mb-3" />
              <p className="text-base italic text-brown-600">
                "Yoga gives children the superpower of focus. In a world full of distractions, 
                the ability to sit still, breathe, and concentrate is the greatest gift we can give them."
              </p>
              <p className="text-sm font-semibold text-brown-800 mt-4">— Vēthā Yogalaya Team</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
