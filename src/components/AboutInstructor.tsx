import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Award, Users, Calendar, Star, Heart, Target } from "lucide-react"
import { CobraPose } from "./YogaLineArt"
import { GsapReveal } from "./GsapReveal"

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      let start = 0
      const duration = 2000
      const increment = target / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [inView, target])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

const stats = [
  { icon: Users, value: 100, suffix: "+", label: "Happy Families" },
  { icon: Calendar, value: 5, suffix: "+", label: "Years in Chennai" },
  { icon: Award, value: 5, suffix: "", label: "Programs" },
  { icon: Target, value: 10, suffix: "", label: "Workshops Conducted" },
  { icon: Heart, value: 5, suffix: "", label: "Summer Camps" },
  { icon: Star, value: 50, suffix: "+", label: "5-Star Reviews" },
]

const vethaMethod = [
  { letter: "V", title: "Values", desc: "Building strong character and positive life principles." },
  { letter: "E", title: "Emotional Balance", desc: "Developing self-awareness, resilience, and emotional harmony." },
  { letter: "T", title: "Technology with Awareness", desc: "Encouraging mindful and balanced use of technology." },
  { letter: "H", title: "Healthy Habits", desc: "Cultivating habits that support physical and mental well-being." },
  { letter: "A", title: "Active Body & Mind", desc: "Strengthening physical vitality and mental focus." },
]

export function AboutInstructor() {
  return (
    <section id="about" className="section-padding bg-cream relative overflow-hidden">
      <div className="absolute -bottom-6 -right-6 opacity-10 hidden lg:block">
        <CobraPose className="w-36 h-36 text-wine" />
      </div>
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Left column — Image + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="flex-1 rounded-2xl overflow-hidden bg-rose min-h-[320px] relative">
              <video
                src="/about/About_Video02.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="bg-white rounded-xl p-5 shadow-sm border border-rose/30 text-center"
                >
                  <s.icon className="h-5 w-5 text-gold mx-auto mb-2" />
                  <p className="text-2xl font-bold text-wine font-heading">
                    <Counter target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-charcoal-light mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column — Content + Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <span className="text-gold-deep font-semibold text-sm tracking-widest uppercase">About Us</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-wine mt-4">5 Years of Building Focused Lives</h2>

            <div className="mt-8 space-y-4 text-charcoal-light leading-relaxed text-justify">
              <GsapReveal>
                Founded in 2021, Vetha Yogalaya began with a simple vision: to empower children with the tools to navigate today's distracted world with focus, confidence, and inner balance. What started as a small yoga studio in OMR, Chennai, has grown into a trusted wellness space supporting over 100 families.
              </GsapReveal>
              <GsapReveal>
                With the blessings of Thathuvagani Vethathiri Maharishi and Swamy Satyananda Saraswathi, we continue our journey of nurturing individuals through the timeless wisdom of Yoga, meditation, introspection, and value-based living. Inspired by their vision of holistic well-being and harmonious living, we strive to create positive transformation in children, families, and society.
              </GsapReveal>
              <GsapReveal>
                The name "Vetha" represents the essence of knowledge and wisdom. At Vetha Yogalaya, we blend traditional yoga philosophy with modern child psychology to create programs that are meaningful, practical, and impactful.
              </GsapReveal>
            </div>

            {/* The VETHA Method */}
            <div className="mt-8">
              <h3 className="text-lg font-bold font-heading text-wine mb-4">The VETHA Method</h3>
              <div className="space-y-3">
                {vethaMethod.map((m, i) => (
                  <motion.div
                    key={m.letter}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span className="h-8 w-8 rounded-full bg-wine text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                      {m.letter}
                    </span>
                    <div>
                      <span className="font-semibold text-wine">{m.title}:</span>
                      <span className="text-charcoal-light ml-1">{m.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-4 text-charcoal-light leading-relaxed text-justify">
              <p>
                Located at Casagrand Supremus, Thazhambur, Vetha Yogalaya is a screen-free sanctuary where children (ages 3–17), expectant mothers, and adults experience yoga, breathing practices, and mindfulness through engaging, age-appropriate sessions.
              </p>
              <p>
                Our certified instructors recognize that every individual is unique. Each session is thoughtfully designed with joyful movement, focused breathing, mindfulness, and moments of inner calm — nurturing the qualities needed to thrive in today's world.
              </p>
              <GsapReveal className="font-bold text-wine text-base italic font-accent">
                Vetha Yogalaya — nurturing healthy bodies, focused minds, and harmonious lives through the wisdom and blessings of Thathuvagani Vethathiri Maharishi and Swamy Sathyananda Saraswathi.
              </GsapReveal>
            </div>

            {/* Vision & Mission */}
            <div className="mt-auto pt-8 space-y-4">
              <div className="p-6 rounded-xl bg-white border border-rose/30 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="h-5 w-5 text-wine" />
                  <h3 className="font-semibold text-wine">Our Vision</h3>
                </div>
                <p className="text-charcoal-light leading-relaxed mb-3">
                  To transform children into healthy, happy, and responsible individuals, while empowering humanity to live with Health, Harmony, and Happiness through holistic yoga, creating harmonious families and a peaceful world.
                </p>
                <p className="text-xs text-charcoal-light/60 italic font-accent">
                  Healthy Children. Harmonious Families. Peaceful World.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-rose/30 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="h-5 w-5 text-wine" />
                  <h3 className="font-semibold text-wine">Our Mission</h3>
                </div>
                <p className="text-charcoal-light leading-relaxed">
                  To guide children and families through holistic yoga, meditation, and life values that promote physical health, mental well-being, emotional balance, and responsible living, creating a healthier and more harmonious society.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
