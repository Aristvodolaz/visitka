'use client'
import { useEffect, useRef, useState } from 'react'

function Counter({ target, decimal, suffix = '' }: { target: number; decimal?: boolean; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState('0')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = performance.now()
      const duration = 1800
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        const v = target * eased
        setVal(decimal ? (v / 10).toFixed(1) : Math.round(v).toString())
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      obs.unobserve(el)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, decimal])

  return <span ref={ref}>{val}{suffix}</span>
}

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // scroll reveals
    const els = sectionRef.current?.querySelectorAll<HTMLElement>('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els?.forEach(el => obs.observe(el))

    // cursor glow
    const glow = glowRef.current
    if (!glow) return
    const handleMove = (e: MouseEvent) => {
      glow.style.left = e.clientX + 'px'
      glow.style.top = e.clientY + 'px'
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => { obs.disconnect(); window.removeEventListener('mousemove', handleMove) }
  }, [])

  return (
    <>
      <div className="cursor-glow" ref={glowRef} />
      <section id="hero" className="hero" ref={sectionRef}>
        <div className="hero-grid-bg" />
        <div className="hero-glow" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-tag reveal">
              <span className="tag">Масштабирование под ключ</span>
            </div>
            <h1 className="hero-h1 reveal" style={{ transitionDelay: '0.1s' }}>
              Мы строим<br />
              системы,<br />
              которые <em>зарабатывают.</em>
            </h1>
            <p className="hero-sub reveal" style={{ transitionDelay: '0.2s' }}>
              Стратегия. Разработка. Аналитика.<br />
              Один партнёр — полный цикл роста вашего бизнеса.
            </p>
            <div className="hero-actions reveal" style={{ transitionDelay: '0.3s' }}>
              <a href="#cta" className="btn btn-primary">
                Обсудить рост бизнеса
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 7h12M8 2l5 5-5 5" />
                </svg>
              </a>
              <a href="#cases" className="btn btn-ghost">Смотреть кейсы →</a>
            </div>
            <div className="hero-stats reveal" style={{ transitionDelay: '0.4s' }}>
              <div className="hero-stat">
                <span className="stat-num"><span className="accent"><Counter target={47} /></span></span>
                <div className="stat-label">проектов реализовано</div>
              </div>
              <div className="hero-stat">
                <span className="stat-num">×<span className="accent"><Counter target={32} decimal /></span></span>
                <div className="stat-label">средний рост выручки</div>
              </div>
              <div className="hero-stat">
                <span className="stat-num">$<span className="accent"><Counter target={28} suffix="M+" /></span></span>
                <div className="stat-label">привлечено клиентам</div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <div className="scroll-line" />
          <span>scroll</span>
        </div>
      </section>
      <hr className="divider" />
    </>
  )
}
