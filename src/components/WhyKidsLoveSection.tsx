import { motion } from "framer-motion"
import { Sparkles, HeartHandshake, Brain, Dumbbell, WifiOff, BookOpen } from "lucide-react"
import { WarriorPose } from "./YogaLineArt"
import { GsapReveal } from "./GsapReveal"

const reasons = [
  {
    icon: Sparkles,
    title: "Fun & Engaging Learning",
    desc: "Yoga becomes exciting through stories, games, creative movements, and interactive activities that make every session enjoyable.",
  },
  {
    icon: HeartHandshake,
    title: "Confidence & Self-Expression",
    desc: "Children discover their strengths, build self-confidence, and learn to express themselves with awareness and positivity.",
  },
  {
    icon: Brain,
    title: "Calm Mind & Better Focus",
    desc: "Breathing techniques, meditation, and mindfulness help children improve concentration, manage emotions, and develop inner calm.",
  },
  {
    icon: Dumbbell,
    title: "Healthy Body & Good Habits",
    desc: "Age-appropriate yoga practices improve flexibility, strength, posture, and encourage lifelong healthy habits.",
  },
  {
    icon: WifiOff,
    title: "A Screen-Free Space to Connect",
    desc: "Vetha Yogalaya provides a refreshing environment where children disconnect from screens and connect with themselves and others.",
  },
  {
    icon: BookOpen,
    title: "Values for Life",
    desc: "Through the wisdom of yoga and teachings inspired by Thathuvagani Vethathiri Maharishi, children learn kindness, discipline, responsibility, and harmony.",
  },
]

export function WhyKidsLoveSection() {
  return (
    <section className="section-padding bg-cream relative overflow-hidden">
      <div className="absolute -top-6 -right-6 opacity-10 hidden lg:block">
        <WarriorPose className="w-36 h-36 text-wine" />
      </div>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold-deep font-semibold text-sm tracking-widest uppercase">Why Kids Love Us</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-wine mt-4">Why Kids Love Vetha Yogalaya</h2>
          <p className="text-charcoal-light mt-4 max-w-4xl mx-auto">
            At Vetha Yogalaya, yoga is not just a practice — it is a joyful journey of self-discovery.{" "}
            <span className="block">Children love our sessions because they learn, play, and grow in a safe, positive, and encouraging environment.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-white p-6 shadow-sm border border-rose/30 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-rose flex items-center justify-center mb-4">
                <r.icon className="h-6 w-6 text-wine" />
              </div>
              <h3 className="text-base font-bold font-heading text-wine mb-2">{r.title}</h3>
              <p className="text-sm text-charcoal-light leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>

        <GsapReveal className="text-center text-sm italic font-accent text-charcoal-light mt-12 max-w-xl mx-auto">
          At Vetha Yogalaya, every child is encouraged to move, breathe, think, and grow — becoming a healthier, happier, and more focused individual.
        </GsapReveal>
      </div>
    </section>
  )
}
