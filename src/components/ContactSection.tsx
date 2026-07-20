import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-warm">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sage font-semibold text-sm tracking-widest uppercase">Get in Touch</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-brown-800 mt-4">Start Your Journey</h2>
            <p className="text-brown-600 mt-4 max-w-md">
              Ready to step onto the mat? Reach out and we'll help you find the perfect practice.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-sage" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brown-800">Location</p>
                  <p className="text-sm text-brown-600">Coimbatore, Tamil Nadu</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-sage" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brown-800">WhatsApp</p>
                  <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="text-sm text-sage hover:underline">+91 99999 99999</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-sage" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brown-800">Email</p>
                  <a href="mailto:hello@vethayogalaya.com" className="text-sm text-sage hover:underline">hello@vethayogalaya.com</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            onSubmit={(e) => e.preventDefault()}
            className="rounded-2xl bg-white p-8 shadow-sm"
          >
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" required className="w-full rounded-xl border border-brown-200 bg-warm px-4 py-3 text-sm text-brown-800 placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-sage/30" />
                <input type="email" placeholder="Your Email" required className="w-full rounded-xl border border-brown-200 bg-warm px-4 py-3 text-sm text-brown-800 placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-sage/30" />
              </div>
              <input type="tel" placeholder="Phone Number" className="w-full rounded-xl border border-brown-200 bg-warm px-4 py-3 text-sm text-brown-800 placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-sage/30" />
              <textarea rows={4} placeholder="Your Message (optional)" className="w-full rounded-xl border border-brown-200 bg-warm px-4 py-3 text-sm text-brown-800 placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-sage/30 resize-none" />
              <button type="submit" className="w-full rounded-full bg-sage px-8 py-3.5 text-sm font-semibold text-white hover:bg-olive transition-colors inline-flex items-center justify-center gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
