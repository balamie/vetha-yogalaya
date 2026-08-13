import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, MapPin, Clock, Send, Mail, CheckCircle2, Loader2 } from "lucide-react"
import { submitEnquiry, isFormspreeConfigured } from "../lib/forms"
import { GsapReveal } from "./GsapReveal"

const WHATSAPP_NUMBER = "917550148784"

const WhatsAppIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const contactInfo = [
  { icon: MapPin, label: "Visit Us", value: "Casagrand Supremus, Block-5, B 105\nThazhambur, OMR, Chennai 600130", href: "https://maps.google.com/?q=Casagrand+Supremus+Thazhambur+Chennai" },
  { icon: Clock, label: "Studio Hours", value: "Mon-Sun: 8:30 AM – 5:00 PM" },
  { icon: Phone, label: "WhatsApp", value: "+91 75501 48784", href: "https://wa.me/917550148784?text=Hi%2C%20I%27m%20interested%20in%20yoga%20classes%20at%20Vetha%20Yogalaya." },
  { icon: Mail, label: "Email", value: "vethayogalaya@gmail.com", href: "mailto:vethayogalaya@gmail.com" },
  { icon: InstagramIcon, label: "Instagram", value: "@vetha_yogalaya", href: "https://www.instagram.com/vetha_yogalaya/" },
]

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", program: "", message: "", honeypot: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle")

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.honeypot) {
      setStatus("success")
      return
    }
    setStatus("sending")

    const saved = await submitEnquiry({
      name: form.name,
      email: form.email,
      phone: form.phone,
      program: form.program,
      message: form.message,
    })

    if (!saved) {
      const message = [
        "Hello Vetha Yogalaya!",
        `I'm ${form.name} (${form.email}, ${form.phone}).`,
        `I'm interested in: ${form.program}.`,
        form.message,
      ]
        .filter(Boolean)
        .join(" ")
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer")
    }

    setStatus("success")
  }

  return (
    <section id="contact" className="section-padding bg-white relative overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="text-gold-deep font-semibold text-sm tracking-widest uppercase">Contact</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-wine mt-4">Get in Touch</h2>
          <GsapReveal className="text-charcoal-light mt-4 max-w-xl mx-auto">
            Ready to start your yoga journey? Reach out and we'll help you find the perfect program.
          </GsapReveal>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
          >
            <div className="space-y-5 mb-8">
              {contactInfo.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="flex items-start gap-4"
                >
                  <div className="h-10 w-10 rounded-full bg-rose flex items-center justify-center shrink-0 mt-0.5">
                    <c.icon className="h-5 w-5 text-wine" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-wine">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-sm text-charcoal-light hover:text-gold-deep transition-colors whitespace-pre-line">{c.value}</a>
                    ) : (
                      <p className="text-sm text-charcoal-light whitespace-pre-line">{c.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/917550148784?text=Hi%2C%20I%27m%20interested%20in%20yoga%20classes%20at%20Vetha%20Yogalaya."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-base font-semibold text-white hover:bg-[#20BD5A] transition-colors shadow-lg shadow-[#25D366]/20 mb-8"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>

            {/* Google Map */}
            <div className="rounded-xl overflow-hidden border border-rose-dark/30 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.1234!2d80.2152473!3d12.8445677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525bff140dde9b%3A0x436c52db29f2bd90!2sVetha%20Yogalaya!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vetha Yogalaya location"
              />
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="rounded-2xl bg-cream p-8 shadow-sm border border-rose/30"
          >
            <h3 className="text-lg font-bold font-heading text-wine mb-2">Enquire Now</h3>
            <p className="text-sm text-charcoal-light mb-6">Fill in your details and we'll get back to you within 24 hours.</p>
            {status === "success" ? (
              <div className="text-center py-10">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h4 className="text-lg font-bold font-heading text-wine mb-2">Thank you, {form.name || "friend"}!</h4>
                <p className="text-sm text-charcoal-light max-w-sm mx-auto">
                  {isFormspreeConfigured
                    ? "Your enquiry has been sent. We'll reach out within 24 hours."
                    : "Your enquiry has been opened in WhatsApp. Hit send there and we'll reach out within 24 hours."}
                </p>
              </div>
            ) : (
            <div className="space-y-4">
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="enquiry-company">Company</label>
                <input
                  id="enquiry-company"
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.honeypot}
                  onChange={update("honeypot")}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="enquiry-name" className="sr-only">Your Name</label>
                  <input
                    id="enquiry-name"
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    required
                    maxLength={80}
                    autoComplete="name"
                    value={form.name}
                    onChange={update("name")}
                    className="w-full rounded-xl border border-rose-dark/30 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal-light/40 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="enquiry-email" className="sr-only">Email Address</label>
                  <input
                    id="enquiry-email"
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    required
                    maxLength={254}
                    autoComplete="email"
                    value={form.email}
                    onChange={update("email")}
                    className="w-full rounded-xl border border-rose-dark/30 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal-light/40 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="enquiry-phone" className="sr-only">Phone Number</label>
                <input
                  id="enquiry-phone"
                  type="tel"
                  name="phone"
                    placeholder="Phone Number *"
                    required
                    maxLength={20}
                    autoComplete="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  className="w-full rounded-xl border border-rose-dark/30 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal-light/40 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                />
              </div>
              <div>
                <label htmlFor="enquiry-program" className="sr-only">Program Interest</label>
                <select
                  id="enquiry-program"
                  name="program"
                  required
                  value={form.program}
                  onChange={update("program")}
                  className="w-full rounded-xl border border-rose-dark/30 bg-white px-4 py-3 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                >
                <option value="">Select Program Interest</option>
                <option value="young-yogis">Young Yogis (4–9 yrs)</option>
                <option value="youth-yogis">Youth Yogis (10–15 yrs)</option>
                <option value="life-yogis">Life Yogis (25–60 yrs)</option>
                <option value="golden-yogis">Golden Yogis (60+ yrs)</option>
                <option value="motherhood-yogis">Motherhood Yogis (Prenatal & Postnatal)</option>
                <option value="trial">Free Trial Class</option>
              </select>
              </div>
              <div>
                <label htmlFor="enquiry-message" className="sr-only">Your message</label>
                <textarea
                  id="enquiry-message"
                  rows={3}
                  name="message"
                  placeholder="Your message (optional)"
                  maxLength={2000}
                  value={form.message}
                  onChange={update("message")}
                  className="w-full rounded-xl border border-rose-dark/30 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal-light/40 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-none transition-all"
                />
              </div>
              <button type="submit" disabled={status === "sending"} className="w-full rounded-full bg-wine px-8 py-3.5 text-sm font-heading font-semibold text-white hover:bg-wine-light active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-wine/20 disabled:opacity-70">
                {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {status === "sending" ? "Sending…" : "Send Enquiry"}
              </button>
            </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
