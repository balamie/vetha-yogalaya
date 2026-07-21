import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  { q: "What age groups do you teach?", a: "We have programs for children aged 3-7, 8-12, and 13-17. Each age group has age-appropriate poses, games, and mindfulness exercises." },
  { q: "My child is very active and can't sit still — will yoga help?", a: "Absolutely! Our classes channel that energy into focused movement. Many of our most energetic kids become the most focused practitioners within weeks." },
  { q: "What should my child bring to class?", a: "Just comfortable clothes. We provide all mats, props, and materials. Water bottles are available at the studio." },
  { q: "How long is each class?", a: "Kids classes run 45 minutes — the perfect duration to maintain engagement. Teen classes are 60 minutes." },
  { q: "Do you offer online classes?", a: "Currently all classes are in-person at our OMR studio. We believe the group energy and personal attention make a real difference for children." },
  { q: "How can I track my child's progress?", a: "Regular plan includes monthly progress reports and parent consultations. You'll see improvements in focus, calmness, and confidence." },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="section-padding bg-warm">
      <div className="container-wide max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sage font-semibold text-sm tracking-widest uppercase">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-brown-800 mt-4">Common Questions</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl bg-white overflow-hidden border border-brown-200/50"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-medium text-brown-800 pr-4">{f.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-sage transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-brown-600 leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
