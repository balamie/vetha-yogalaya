import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

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
            <span className="text-sage font-semibold text-sm tracking-widest uppercase">Contact</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-brown-800 mt-4">Get in Touch</h2>
            <p className="text-brown-600 mt-4 max-w-md">
              Ready to give your child the gift of focus and calm? Reach out and we'll help you find the perfect program.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-sage" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brown-800">Address</p>
                  <p className="text-sm text-brown-600">Casagrand Supremus, Block-5, B 105<br />Thazhambur, OMR, Chennai 600130</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-sage" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brown-800">Hours</p>
                  <p className="text-sm text-brown-600">Mon-Sun: 8:30 AM – 5:00 PM</p>
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
                  <p className="text-sm font-semibold text-brown-800">Instagram</p>
                  <a href="https://www.instagram.com/vetha_yogalaya/" target="_blank" rel="noopener noreferrer" className="text-sm text-sage hover:underline">@vetha_yogalaya</a>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl overflow-hidden border border-brown-200 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.1234!2d80.2152473!3d12.8445677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525bff140dde9b%3A0x436c52db29f2bd90!2sVetha%20Yogalaya!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="220"
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
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            onSubmit={(e) => e.preventDefault()}
            className="rounded-2xl bg-white p-8 shadow-sm"
          >
            <h3 className="text-lg font-bold font-heading text-brown-800 mb-2">Book a Free Trial</h3>
            <p className="text-sm text-brown-600 mb-6">Fill in your details and we'll call you to schedule a session.</p>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Parent's Name" required className="w-full rounded-xl border border-brown-200 bg-warm px-4 py-3 text-sm text-brown-800 placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-sage/30" />
                <input type="email" placeholder="Your Email" required className="w-full rounded-xl border border-brown-200 bg-warm px-4 py-3 text-sm text-brown-800 placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-sage/30" />
              </div>
              <input type="tel" placeholder="Phone Number" required className="w-full rounded-xl border border-brown-200 bg-warm px-4 py-3 text-sm text-brown-800 placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-sage/30" />
              <input type="text" placeholder="Child's Name & Age" required className="w-full rounded-xl border border-brown-200 bg-warm px-4 py-3 text-sm text-brown-800 placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-sage/30" />
              <textarea rows={3} placeholder="Any specific concerns? (optional)" className="w-full rounded-xl border border-brown-200 bg-warm px-4 py-3 text-sm text-brown-800 placeholder:text-brown-400 focus:outline-none focus:ring-2 focus:ring-sage/30 resize-none" />
              <button type="submit" className="w-full rounded-full bg-sage px-8 py-3.5 text-sm font-semibold text-white hover:bg-olive transition-colors inline-flex items-center justify-center gap-2">
                <Send className="h-4 w-4" />
                Book Free Trial
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
