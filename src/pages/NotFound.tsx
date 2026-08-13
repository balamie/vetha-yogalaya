import { Link } from "react-router"
import { MotionConfig, motion } from "framer-motion"
import { Seo } from "../components/Seo"

export function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 pt-24 pb-16">
      <Seo
        title="Page Not Found | Vetha Yogalaya"
        description="The page you're looking for doesn't exist or may have been moved."
        path="/"
      />
      <MotionConfig reducedMotion="user">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md text-center"
        >
          <p className="text-6xl font-bold font-heading text-gold-deep mb-4">404</p>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-wine mb-3">Page Not Found</h1>
          <p className="text-sm text-charcoal-light mb-8">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/" className="inline-flex items-center rounded-full bg-wine px-6 py-3 text-sm font-heading font-semibold text-white hover:bg-wine-light transition-colors">
              Back to Home
            </Link>
            <a href="#contact" className="inline-flex items-center rounded-full border border-wine/30 px-6 py-3 text-sm font-heading font-medium text-wine hover:bg-wine/5 transition-colors">
              Contact Us
            </a>
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  )
}
