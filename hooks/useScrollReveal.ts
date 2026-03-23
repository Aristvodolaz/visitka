'use client'
import { useEffect, useRef } from 'react'

export function useScrollReveal(options?: { threshold?: number; rootMargin?: string }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const els = el.querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-right')

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: options?.threshold ?? 0.1, rootMargin: options?.rootMargin ?? '0px 0px -40px 0px' }
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [options?.threshold, options?.rootMargin])

  return ref
}
