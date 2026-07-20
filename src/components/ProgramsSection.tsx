import { motion } from "framer-motion"
import { Clock, Users, Sun } from "lucide-react"

const programs = [
  {
    title: "Hatha Yoga",
    desc: "Classical yoga postures held with awareness. Perfect for beginners and those seeking a gentle practice.",
    icon: Sun,
    tag: "All Levels",
    schedule: "Mon-Wed-Fri, 6:30 AM",
  },
  {
    title: "Vinyasa Flow",
    desc: "Dynamic sequences linking breath with movement. Build strength, flexibility, and endurance.",
    icon: Clock,
    tag: "Intermediate",
    schedule: "Tue-Thu-Sat, 7:00 AM",
  },
  {
    title: "Ashtanga Yoga",
    desc: "Traditional Mysore-style practice. A structured series for disciplined practitioners.",
    icon: Users,
    tag: "Advanced",
    schedule: "Mon-Sat, 5:30 AM",
  },
]

export function ProgramsSection() {
  return (
    <section id="programs" className="section-padding bg-cream">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sage font-semibold text-sm tracking-widest uppercase">Our Programs</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-brown-800 mt-4">Find Your Practice</h2>
          <p className="text-brown-600 mt-4 max-w-xl mx-auto">From gentle beginnings to advanced practice — a path for every stage of your journey.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="h-12 w-12 rounded-xl bg-sage/10 flex items-center justify-center group-hover:bg-sage/20 transition-colors">
                  <p.icon className="h-6 w-6 text-sage" />
                </div>
                <span className="text-xs font-semibold text-sage bg-sage/10 rounded-full px-3 py-1">{p.tag}</span>
              </div>
              <h3 className="text-xl font-bold font-heading text-brown-800 mb-3">{p.title}</h3>
              <p className="text-sm text-brown-600 leading-relaxed mb-6">{p.desc}</p>
              <div className="flex items-center text-xs text-brown-400">
                <Clock className="h-3.5 w-3.5 mr-1.5" />
                {p.schedule}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
