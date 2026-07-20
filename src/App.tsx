import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Lenis from "lenis"
import { Navbar } from "./components/Navbar"
import { HeroSection } from "./components/HeroSection"
import { BenefitsSection } from "./components/BenefitsSection"
import { ProgramsSection } from "./components/ProgramsSection"
import { AboutInstructor } from "./components/AboutInstructor"
import { PricingSection } from "./components/PricingSection"
import { Testimonials } from "./components/Testimonials"
import { FreeSession } from "./components/FreeSession"
import { FAQSection } from "./components/FAQSection"
import { ContactSection } from "./components/ContactSection"
import { Footer } from "./components/Footer"

function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <ProgramsSection />
      <AboutInstructor />
      <PricingSection />
      <FreeSession />
      <Testimonials />
      <FAQSection />
      <ContactSection />
    </>
  )
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
