import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, ArrowRight, User } from "lucide-react"
import { Link } from "react-router"
import { GsapReveal } from "./GsapReveal"
import { ZoomOverlay, PhotoLightbox } from "./PhotoZoom"

const posts = [
  {
    title: "5 Ways Yoga Helps Kids Beat Screen Addiction",
    excerpt: "Discover how just 30 minutes of daily yoga can rewire your child's relationship with screens and build lasting focus.",
    date: "July 2026",
    author: "Vetha Yogalaya Team",
    image: "/blog/blog-1.webp",
    category: "Kids Yoga",
    slug: "/blog/kids-screen-addiction",
  },
  {
    title: "The Science Behind Breathing Exercises for Children",
    excerpt: "Research shows that pranayama techniques can improve concentration by up to 40% in school-age children. Here's how.",
    date: "June 2026",
    author: "Vetha Yogalaya Team",
    image: "/blog/blog-2.webp",
    category: "Mindfulness",
    slug: "/blog/breathing-science",
  },
  {
    title: "Yoga During Pregnancy: A Complete Guide for Expecting Mothers",
    excerpt: "Safe poses, breathing techniques, and the benefits of prenatal yoga for a calm pregnancy and smoother delivery.",
    date: "May 2026",
    author: "Vetha Yogalaya Team",
    image: "/blog/blog-3.webp",
    category: "Prenatal",
    slug: "/blog/prenatal-yoga-guide",
  },
]

export function BlogSection() {
  const [selected, setSelected] = useState<number | null>(null)
  const open = (index: number) => setSelected(index)
  const close = () => setSelected(null)
  const navigate = (index: number) => setSelected(index)
  const blogPhotos = posts.map((post) => ({ src: post.image, alt: post.title }))
  return (
    <section id="blog" className="section-padding bg-white">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="text-gold-deep font-semibold text-sm tracking-widest uppercase">Blog</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-wine mt-4">Latest from Our Studio</h2>
          <GsapReveal className="text-charcoal-light mt-4 max-w-xl mx-auto">Tips, insights, and stories about yoga, mindfulness, and family wellness.</GsapReveal>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -5 }}
              className="group rounded-2xl bg-cream overflow-hidden shadow-sm border border-rose/30 transition-all duration-300"
            >
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`View image: ${post.title}`}
                className="relative h-48 overflow-hidden block w-full group/photo cursor-pointer p-0 text-left"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 text-xs font-semibold text-white bg-wine/80 backdrop-blur-sm rounded-full px-3 py-1">{post.category}</span>
                <ZoomOverlay />
              </button>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-charcoal-light/60 mb-3">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{post.date}</span>
                  <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{post.author}</span>
                </div>
                <h3 className="text-lg font-bold font-heading text-wine mb-2 group-hover:text-wine-light transition-colors">{post.title}</h3>
                <p className="text-sm text-charcoal-light leading-relaxed mb-4">{post.excerpt}</p>
                <Link to={post.slug} className="inline-flex items-center gap-1.5 text-sm font-semibold text-wine hover:text-gold-deep transition-colors">
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <PhotoLightbox photos={blogPhotos} selected={selected} onClose={close} onNavigate={navigate} />
    </section>
  )
}
