import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X } from "lucide-react"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setTimeout(() => setVisible(true), 2000)
    }
  }, [])

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl bg-wine-deep text-white p-6 shadow-2xl border border-white/10">
            <div className="flex items-start gap-4">
              <Cookie className="h-8 w-8 text-gold shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">We Value Your Privacy</h3>
                <p className="text-sm text-white/70 mb-4">
                  We use cookies to enhance your browsing experience and analyze website traffic.
                  By clicking "Accept", you consent to our use of cookies. Read our{" "}
                  <a href="/privacy" className="text-gold hover:underline">Privacy Policy</a> for more details.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={accept}
                    className="rounded-full bg-gold px-6 py-2.5 text-sm font-heading font-semibold text-wine-deep hover:bg-gold-light transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={decline}
                    className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
              <button onClick={decline} className="text-white/50 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
