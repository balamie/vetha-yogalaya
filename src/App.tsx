import { useEffect, lazy, Suspense } from "react"
import { Routes, Route } from "react-router"
import { MotionConfig } from "framer-motion"
import Lenis from "lenis"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { Navbar } from "./components/Navbar"
import { HeroSection } from "./components/HeroSection"
import { BenefitsSection } from "./components/BenefitsSection"
import { ProgramsSection } from "./components/ProgramsSection"
import { AboutInstructor } from "./components/AboutInstructor"
import { MentorSection } from "./components/MentorSection"
import { AchievementsSection } from "./components/AchievementsSection"
import { YogaForEverydayHeroes } from "./components/YogaForEverydayHeroes"
import { Testimonials } from "./components/Testimonials"
import { InternationalYogaDay } from "./components/InternationalYogaDay"
import { SeniorCitizenSection } from "./components/SeniorCitizenSection"
import { FreeSession } from "./components/FreeSession"
import { FAQSection } from "./components/FAQSection"
import { ContactSection } from "./components/ContactSection"
import { GallerySection } from "./components/GallerySection"
import { WhyKidsLoveSection } from "./components/WhyKidsLoveSection"
import { BlogSection } from "./components/BlogSection"
import { Footer } from "./components/Footer"
import { WhatsAppButton } from "./components/WhatsAppButton"
import { BackToTop } from "./components/BackToTop"
import { CookieConsent } from "./components/CookieConsent"
import { Seo } from "./components/Seo"

const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy })))
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions").then((m) => ({ default: m.TermsAndConditions })))
const BlogKidsScreenAddiction = lazy(() => import("./pages/BlogKidsScreenAddiction").then((m) => ({ default: m.BlogKidsScreenAddiction })))
const BlogBreathingScience = lazy(() => import("./pages/BlogBreathingScience").then((m) => ({ default: m.BlogBreathingScience })))
const BlogPrenatalYoga = lazy(() => import("./pages/BlogPrenatalYoga").then((m) => ({ default: m.BlogPrenatalYoga })))
const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })))

function PageSkeleton() {
  return (
    <div className="min-h-[60vh] bg-cream px-4 py-16 animate-pulse">
      <div className="mx-auto max-w-3xl">
        <div className="h-4 w-24 bg-rose-dark/60 rounded-full mb-8" />
        <div className="h-10 w-3/4 bg-rose-dark/60 rounded-2xl mb-6" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-rose/80 rounded-xl" />
          <div className="h-4 w-5/6 bg-rose/80 rounded-xl" />
          <div className="h-4 w-2/3 bg-rose/80 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <>
      <Seo
        title="Vetha Yogalaya | Kids Yoga Studio in OMR, Chennai"
        description="Helping children beat screen addiction & distraction through yoga. Build focus, calm mind & confidence naturally."
        path="/"
      />
      <HeroSection />
      <BenefitsSection />
      <ProgramsSection />
      <WhyKidsLoveSection />
      <AboutInstructor />
      <MentorSection />
      <FreeSession />
      <AchievementsSection />
      <YogaForEverydayHeroes />
      <Testimonials />
      <InternationalYogaDay />
      <SeniorCitizenSection />
      <GallerySection />
      <BlogSection />
      <FAQSection />
      <ContactSection />
    </>
  )
}

export default function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    ;(window as unknown as Window & { lenis?: Lenis }).lenis = lenis
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-wine focus:px-6 focus:py-3 focus:text-sm focus:font-heading focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main">
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/blog/kids-screen-addiction" element={<BlogKidsScreenAddiction />} />
              <Route path="/blog/breathing-science" element={<BlogBreathingScience />} />
              <Route path="/blog/prenatal-yoga-guide" element={<BlogPrenatalYoga />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
        <CookieConsent />
      </MotionConfig>
    </ErrorBoundary>
  )
}
