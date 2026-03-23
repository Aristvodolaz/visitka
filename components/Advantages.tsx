'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/context/LanguageContext'

export default function Advantages() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.08 })
    els?.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="advantages" className="advantages-section" ref={ref}>
      <div className="container">
        <p className="section-label reveal">{t.advantages.sectionLabel}</p>
        <h2 className="advantages-h2 reveal" style={{ transitionDelay: '0.1s' }}>
          {t.advantages.h2.split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </h2>
        <div className="adv-grid">
          {t.advantages.items.map((item, i) => (
            <div className="adv-item reveal" key={i} style={{ transitionDelay: `${(i % 3) * 0.1}s` }}>
              <p className="adv-num">{item.num}</p>
              <h3 className="adv-title">{item.title}</h3>
              <p className="adv-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
