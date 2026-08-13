import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Seo } from "../components/Seo"

export function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-cream">
      <Seo
        title="Terms of Service | Vetha Yogalaya"
        description="Read the Vetha Yogalaya terms of service — the conditions that apply to your use of our website and classes."
        path="/terms"
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
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-wine mb-8">Terms & Conditions</h1>

          <div className="prose prose-sm max-w-none text-charcoal-light space-y-6">
            <p><strong>Last updated:</strong> July 2026</p>

            <h2 className="text-xl font-semibold text-wine mt-8">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Vetha Yogalaya website and services, you accept and agree
              to be bound by these Terms & Conditions. If you do not agree to these terms, please
              do not use our services.
            </p>

            <h2 className="text-xl font-semibold text-wine mt-8">2. Class Registration & Bookings</h2>
            <p>
              To participate in our yoga classes, you must complete the registration form and provide
              accurate information. Bookings are subject to availability. We reserve the right to
              cancel or reschedule classes with reasonable notice.
            </p>

            <h2 className="text-xl font-semibold text-wine mt-8">3. Payment Terms</h2>
            <p>
              All fees must be paid in advance. We accept payments via Razorpay, UPI, and other
              approved payment methods. Prices are subject to change with 30 days' notice.
              Refunds are processed as per our refund policy.
            </p>

            <h2 className="text-xl font-semibold text-wine mt-8">4. Health & Safety</h2>
            <p>
              Participants should be in good health to engage in physical activities. Please inform
              us of any medical conditions, allergies, or physical limitations before classes begin.
              Vetha Yogalaya is not liable for any injuries sustained during classes.
            </p>

            <h2 className="text-xl font-semibold text-wine mt-8">5. Cancellation & Refund Policy</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Free trial sessions can be cancelled up to 24 hours before the scheduled time</li>
              <li>Monthly subscriptions can be cancelled with 7 days' notice</li>
              <li>Refunds for unused sessions are processed within 7-10 business days</li>
              <li>No refunds for partially used subscription periods</li>
            </ul>

            <h2 className="text-xl font-semibold text-wine mt-8">6. Intellectual Property</h2>
            <p>
              All content on this website, including text, images, logos, and graphics, is the
              property of Vetha Yogalaya and is protected by copyright laws. You may not
              reproduce or distribute our content without written permission.
            </p>

            <h2 className="text-xl font-semibold text-wine mt-8">7. Limitation of Liability</h2>
            <p>
              Vetha Yogalaya shall not be liable for any indirect, incidental, or consequential
              damages arising from the use of our services. Our liability is limited to the amount
              paid for the specific service in question.
            </p>

            <h2 className="text-xl font-semibold text-wine mt-8">8. Changes to Terms</h2>
            <p>
              We reserve the right to update these terms at any time. Changes will be effective
              immediately upon posting on this page. Continued use of our services constitutes
              acceptance of the updated terms.
            </p>

            <h2 className="text-xl font-semibold text-wine mt-8">9. Contact</h2>
            <p>
              For questions about these Terms & Conditions, contact us at
              <a href="mailto:vethayogalaya@gmail.com" className="text-wine hover:text-gold-deep"> vethayogalaya@gmail.com</a> or
              WhatsApp <a href="https://wa.me/917550148784" className="text-wine hover:text-gold-deep">+91 75501 48784</a>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
