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

export function GsapReveal({ children, className = "", as: Tag = "p", stagger = 0.035 }: Props) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const words = (el.textContent || "").split(/\s+/).filter(Boolean)
    if (words.length === 0) return

    el.innerHTML = words.map((w) => `<span class="gsap-word inline-block">${w}</span>`).join(" ")
    const targets = el.querySelectorAll<HTMLElement>(".gsap-word")

    gsap.set(targets, { opacity: 0, y: 24, filter: "blur(6px)" })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    })
    tl.to(targets, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.7,
      stagger,
      ease: "power3.out",
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
