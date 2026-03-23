'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/context/LanguageContext'

export default function ForWhom() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els?.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="forwhom" ref={ref}>
      <div className="container">
        <p className="section-label reveal">{t.forWhom.sectionLabel}</p>
        <h2 className="forwhom-h2 reveal" style={{ transitionDelay: '0.1s' }}>
          {t.forWhom.h2.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </h2>
        <p className="forwhom-sub reveal" style={{ transitionDelay: '0.2s' }}>{t.forWhom.sub}</p>
        <div className="whom-grid">
          {t.forWhom.items.map((w, i) => (
            <div className="whom-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="whom-icon">{w.icon}</span>
              <h3 className="whom-title">{w.title}</h3>
              <p className="whom-desc">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
