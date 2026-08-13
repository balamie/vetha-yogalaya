import { motion } from "framer-motion"
import { ArrowLeft, Calendar, User, Clock } from "lucide-react"
import { Link } from "react-router"
import { useEffect, useState } from "react"
import { ZoomOverlay, PhotoLightbox } from "./PhotoZoom"

interface BlogPostProps {
  title: string
  date: string
  author: string
  readTime: string
  image: string
  children: React.ReactNode
}

export function BlogPost({ title, date, author, readTime, image, children }: BlogPostProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const open = () => setSelected(0)
  const close = () => setSelected(null)
  const navigate = (index: number) => setSelected(index)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-20">
        <Link to="/#blog" className="inline-flex items-center gap-2 rounded-full bg-wine px-5 py-2.5 text-sm font-heading font-semibold text-white hover:bg-wine-light transition-colors mb-8 w-fit">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-2xl overflow-hidden mb-8 shadow-sm group">
            <button type="button" onClick={open} aria-label={`View image: ${title}`} className="relative block w-full h-full group/photo cursor-pointer p-0 text-left">
              <img src={image} alt={title} className="w-full h-64 sm:h-80 md:h-96 object-cover" />
              <ZoomOverlay />
            </button>
          </div>

          <div className="flex items-center gap-4 text-sm text-charcoal-light/60 mb-4">
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{date}</span>
            <span className="flex items-center gap-1"><User className="h-4 w-4" />{author}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-wine mb-8">{title}</h1>

          <div className="prose prose-sm sm:prose max-w-none text-charcoal-light leading-relaxed space-y-4">
            {children}
          </div>
        </motion.article>
      </div>

      <PhotoLightbox photos={[{ src: image, alt: title }]} selected={selected} onClose={close} onNavigate={navigate} />
    </div>
  )
}
