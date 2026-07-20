import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Beginner",
    monthly: 1499,
    annual: 14999,
    features: ["4 classes per month", "Basic pose instruction", "Online access", "Community group"],
    popular: false,
  },
  {
    name: "Regular",
    monthly: 2999,
    annual: 29999,
    features: ["12 classes per month", "All level access", "Priority booking", "Free workshop access", "1-on-1 session/month"],
    popular: true,
  },
  {
    name: "Unlimited",
    monthly: 4999,
    annual: 49999,
    features: ["Unlimited classes", "All programs included", "Personalized plan", "Retreat discounts", "Guest passes (2/month)", "Priority support"],
    popular: false,
  },
]

export function PricingSection() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="section-padding bg-cream">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sage font-semibold text-sm tracking-widest uppercase">Pricing</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-brown-800 mt-4">Invest in Your Wellbeing</h2>
        </motion.div>

        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-sm font-medium ${!annual ? "text-brown-800" : "text-brown-400"}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative h-7 w-12 rounded-full transition-colors ${annual ? "bg-sage" : "bg-brown-200"}`}
          >
            <span className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${annual ? "translate-x-5" : ""}`} />
          </button>
          <span className={`text-sm font-medium ${annual ? "text-brown-800" : "text-brown-400"}`}>
            Annual <span className="text-sage text-xs">Save 15%</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                p.popular
                  ? "bg-sage text-white shadow-xl shadow-sage/20"
                  : "bg-white shadow-sm hover:shadow-md"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold text-white">
                  Most Popular
                </span>
              )}
              <h3 className={`text-lg font-bold font-heading ${p.popular ? "text-white" : "text-brown-800"}`}>{p.name}</h3>
              <div className="mt-4 mb-6">
                <span className={`text-4xl font-bold font-heading ${p.popular ? "text-white" : "text-brown-800"}`}>
                  ₹{annual ? (p.annual / 12).toLocaleString("en-IN") : p.monthly.toLocaleString("en-IN")}
                </span>
                <span className={`text-sm ml-1 ${p.popular ? "text-white/70" : "text-brown-400"}`}>/mo</span>
              </div>
              <ul className="space-y-3">
                {p.features.map((f) => (
                  <li key={f} className={`flex items-center gap-3 text-sm ${p.popular ? "text-white/80" : "text-brown-600"}`}>
                    <Check className={`h-4 w-4 shrink-0 ${p.popular ? "text-gold" : "text-sage"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-semibold transition-colors ${
                  p.popular
                    ? "bg-white text-sage hover:bg-white/90"
                    : "bg-sage/10 text-sage hover:bg-sage/20"
                }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
