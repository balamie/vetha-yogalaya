import { motion } from "framer-motion"
import { Clock, Users, Heart } from "lucide-react"

const programs = [
  {
    title: "Kids Focus Yoga (3-7 yrs)",
    desc: "Fun animal poses, storytelling yoga, and breathing games that build concentration and body awareness in young children.",
    icon: Heart,
    tag: "Ages 3-7",
    schedule: "Mon-Wed-Fri, 4:00 PM",
  },
  {
    title: "Kids Focus Yoga (8-12 yrs)",
    desc: "Dynamic poses, partner yoga, and mindfulness exercises designed to improve focus, reduce anxiety, and build confidence.",
    icon: Users,
    tag: "Ages 8-12",
    schedule: "Tue-Thu-Sat, 4:00 PM",
  },
  {
    title: "Teen Yoga & Mindfulness",
    desc: "Stress management, breathing techniques, and yoga for teens navigating academic pressure and digital distractions.",
    icon: Clock,
    tag: "Ages 13-17",
    schedule: "Sat-Sun, 10:00 AM",
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-brown-800 mt-4">Programs for Every Age</h2>
          <p className="text-brown-600 mt-4 max-w-xl mx-auto">Age-appropriate yoga classes designed to support your child's development at every stage.</p>
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
