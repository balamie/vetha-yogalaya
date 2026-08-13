import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

export type Photo = { src: string; alt: string }

export function ZoomOverlay() {
  return (
    <div className="absolute inset-0 bg-wine-deep/0 group-hover:bg-wine-deep/30 transition-colors duration-300 flex items-center justify-center">
      <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <ZoomIn className="h-5 w-5 text-white" />
      </div>
    </div>
  )
}

export function PhotoLightbox({
  photos,
  selected,
  onClose,
  onNavigate,
}: {
  photos: Photo[]
  selected: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}) {
  useEffect(() => {
    if (selected === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNavigate((selected + 1) % photos.length)
      if (e.key === "ArrowLeft") onNavigate((selected - 1 + photos.length) % photos.length)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selected, photos.length, onClose, onNavigate])

  return (
    <AnimatePresence>
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button onClick={onClose} aria-label="Close photo viewer" className="absolute top-4 right-4 text-white/70 hover:text-white z-10">
            <X className="h-8 w-8" />
          </button>
          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate((selected - 1 + photos.length) % photos.length) }}
                aria-label="Previous photo"
                className="absolute left-4 text-white/70 hover:text-white z-10"
              >
                <ChevronLeft className="h-10 w-10" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate((selected + 1) % photos.length) }}
                aria-label="Next photo"
                className="absolute right-4 text-white/70 hover:text-white z-10"
              >
                <ChevronRight className="h-10 w-10" />
              </button>
            </>
          )}
          <motion.img
            key={selected}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            src={photos[selected].src}
            alt={photos[selected].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
