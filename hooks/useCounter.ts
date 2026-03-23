'use client'
import { useEffect, useRef, useState } from 'react'

export function useCounter(target: number, duration = 1800, decimal = false) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(target * eased)
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          obs.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration, decimal])

  return { ref, value: decimal ? (value / 10).toFixed(1) : Math.round(value).toString() }
}
