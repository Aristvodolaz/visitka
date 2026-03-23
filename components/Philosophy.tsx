'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/context/LanguageContext'

const icons = [
  <svg key="1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
  </svg>,
  <svg key="2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8l3 3-3 3M13 14h4"/>
  </svg>,
  <svg key="3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-3 3"/>
  </svg>,
]

export default function Philosophy() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    els?.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="philosophy" className="philosophy" ref={ref}>
      <div className="container">
        <div className="philosophy-header reveal">
          <p className="section-label">{t.philosophy.sectionLabel}</p>
          <h2 className="philosophy-h2">
            {t.philosophy.h2.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>
        </div>
        <div className="pillars">
          {t.philosophy.pillars.map((p, i) => (
            <div className="pillar reveal" key={i} style={{ transitionDelay: `${i * 0.12}s` }}>
              <p className="pillar-num">{p.num}</p>
              <div className="pillar-icon">{icons[i]}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <ul className="pillar-points">
                {p.points.map(point => <li key={point}>{point}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
