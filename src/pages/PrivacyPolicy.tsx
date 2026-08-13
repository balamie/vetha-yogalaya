import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Seo } from "../components/Seo"

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-cream">
      <Seo
        title="Privacy Policy | Vetha Yogalaya"
        description="Read the Vetha Yogalaya privacy policy — how we collect, use, and protect your personal information."
        path="/privacy"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-20">
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-sm text-wine hover:text-gold-deep transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-wine mb-8">Privacy Policy</h1>

          <div className="prose prose-sm max-w-none text-charcoal-light space-y-6">
            <p><strong>Last updated:</strong> July 2026</p>

            <h2 className="text-xl font-semibold text-wine mt-8">1. Information We Collect</h2>
            <p>
              When you visit our website or book a class, we may collect personal information such as your name,
              email address, phone number, and your child's name and age. This information is necessary to
              provide our yoga services and communicate with you about bookings.
            </p>

            <h2 className="text-xl font-semibold text-wine mt-8">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process class bookings and registrations</li>
              <li>Send class schedules and updates</li>
              <li>Provide progress reports for your child's yoga journey</li>
              <li>Respond to your inquiries and requests</li>
              <li>Send newsletters (with your consent)</li>
            </ul>

            <h2 className="text-xl font-semibold text-wine mt-8">3. Data Protection</h2>
            <p>
              We implement appropriate security measures to protect your personal information.
              Your data is stored securely and is only accessed by authorized personnel who need it
              to provide our services.
            </p>

            <h2 className="text-xl font-semibold text-wine mt-8">4. Third-Party Services</h2>
            <p>
              We may use third-party services such as Google Analytics to understand website usage.
              These services may collect information about your visits to our website. We do not sell
              your personal information to third parties.
            </p>

            <h2 className="text-xl font-semibold text-wine mt-8">5. Children's Privacy</h2>
            <p>
              We are committed to protecting children's privacy. We only collect information about
              children with parental consent. Parents can request access to, correction of, or
              deletion of their child's information at any time.
            </p>

            <h2 className="text-xl font-semibold text-wine mt-8">6. Cookies</h2>
            <p>
              Our website uses cookies to improve your browsing experience. You can control cookie
              settings through your browser preferences.
            </p>

            <h2 className="text-xl font-semibold text-wine mt-8">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2 className="text-xl font-semibold text-wine mt-8">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at
              <a href="mailto:vethayogalaya@gmail.com" className="text-wine hover:text-gold-deep"> vethayogalaya@gmail.com</a> or
              WhatsApp us at <a href="https://wa.me/917550148784" className="text-wine hover:text-gold-deep">+91 75501 48784</a>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
