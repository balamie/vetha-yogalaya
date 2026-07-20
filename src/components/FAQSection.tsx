import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  { q: "I'm a complete beginner — where do I start?", a: "Our Beginner plan and Hatha Yoga classes are designed exactly for you. Join any free session to experience our teaching style without commitment." },
  { q: "What should I bring to class?", a: "Comfortable clothing and a water bottle. We provide all equipment — mats, blocks, straps, and bolsters." },
  { q: "How long are the classes?", a: "Regular classes run 60 minutes. Free sessions are 45 minutes. Workshops and special programs vary." },
  { q: "Do you offer online classes?", a: "Yes! All our Regular and Unlimited plans include access to live-streamed classes. Recordings are available for 48 hours." },
  { q: "What if I have an injury or medical condition?", a: "Please inform us before your first class. Our instructors will modify poses to suit your needs. We recommend a 1-on-1 session to start." },
  { q: "Can I pause or cancel my membership?", a: "Yes — you can pause for up to 30 days. Annual plans can be cancelled with 15 days notice. No lock-in contracts." },
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
