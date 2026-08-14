import { useLayoutEffect, useRef } from "react"
import type { ElementType, ReactNode, Ref } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Props = {
  children: ReactNode
  className?: string
  as?: ElementType
  stagger?: number
}

export function GsapReveal({ children, className = "", as: Tag = "p", stagger = 0.008 }: Props) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const words = (el.textContent || "").split(/\s+/).filter(Boolean)
    if (words.length === 0) return

    el.innerHTML = words.map((w) => `<span class="gsap-word inline-block">${w}</span>`).join(" ")
    const targets = el.querySelectorAll<HTMLElement>(".gsap-word")

    gsap.set(targets, { opacity: 0, y: 12 })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    })
    tl.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      stagger,
      ease: "power2.out",
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [children, stagger])

  return (
    <Tag ref={ref as Ref<HTMLElement>} className={className}>
      {children}
    </Tag>
  )
}
