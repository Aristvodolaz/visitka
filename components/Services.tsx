'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/context/LanguageContext'

const icons = [
  <svg key="1" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="22" cy="22" r="18"/>
    <path d="M22 8v14l8 8"/><circle cx="22" cy="22" r="3" fill="currentColor" stroke="none"/>
  </svg>,
  <svg key="2" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="6" y="8" width="32" height="22" rx="3"/>
    <path d="M14 38h16M22 30v8"/><path d="M13 16l4 4-4 4M23 24h8"/>
  </svg>,
  <svg key="3" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M6 38V28l8-8 8 6 8-14 8 10"/><path d="M6 38h32"/>
  </svg>,
]

export default function Services() {
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
    <section id="services" ref={ref}>
      <div className="container">
        <div className="services-header">
          <div>
            <p className="section-label reveal">{t.services.sectionLabel}</p>
            <h2 className="services-h2 reveal" style={{ transitionDelay: '0.1s' }}>
              {t.services.h2.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
          </div>
          <a href="#cta" className="btn btn-ghost reveal" style={{ transitionDelay: '0.2s', flexShrink: 0 }}>
            {t.services.cta}
          </a>
        </div>
        <div className="services-grid">
          {t.services.items.map((s, i) => (
            <div className="service-card reveal" key={i} style={{ transitionDelay: `${i * 0.12}s` }}>
              <p className="service-number">{s.num}</p>
              <div className="service-icon">{icons[i]}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <ul className="service-list">
                {s.list.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
