'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/context/LanguageContext'

const barWidths = ['32%', '52%', '90%']

export default function Cases() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.08 })
    els?.forEach(el => obs.observe(el))

    const miniBars = ref.current?.querySelectorAll<HTMLElement>('.mini-bar-fill')
    const barObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animated'); barObs.unobserve(e.target) } })
    }, { threshold: 0.4 })
    miniBars?.forEach((b, i) => {
      (b as HTMLElement).style.transitionDelay = `${0.3 + i * 0.15}s`
      barObs.observe(b)
    })

    return () => { obs.disconnect(); barObs.disconnect() }
  }, [])

  const featured = t.cases.items[0]
  const rest = t.cases.items.slice(1)

  return (
    <section id="cases" className="cases-section" ref={ref}>
      <div className="container">
        <div className="cases-header">
          <div>
            <p className="section-label reveal">{t.cases.sectionLabel}</p>
            <h2 className="cases-h2 reveal" style={{ transitionDelay: '0.1s' }}>{t.cases.h2}</h2>
          </div>
        </div>

        <div className="cases-grid">
          {/* Featured */}
          <div className="case-card featured reveal">
            <div>
              <p className="case-tag">{featured.tag}</p>
              <h3 className="case-title">{featured.title}</h3>
              <p className="case-desc">{featured.desc}</p>
              <div className="case-flow">
                {featured.flow.map((item, i) => (
                  <span key={i} style={{ display: 'contents' }}>
                    <div className="case-flow-item">{item}</div>
                    {i < featured.flow.length - 1 && <span className="case-flow-arrow">→</span>}
                  </span>
                ))}
              </div>
              <div className="case-metrics">
                {featured.metrics.map(m => (
                  <div className="case-metric" key={m.val}>
                    <span className="case-metric-val">{m.val}</span>
                    <span className="case-metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {'bars' in featured && (
              <div className="case-featured-visual">
                <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', color: 'var(--text-3)', marginBottom: '20px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {t.cases.chartLabel}
                </p>
                {(featured.bars as {label:string;val:string}[]).map((r, i) => (
                  <div className="mini-bar-row" key={r.label} style={{ marginBottom: '14px' }}>
                    <span className="mini-bar-label">{r.label}</span>
                    <div className="mini-bar-track">
                      <div className="mini-bar-fill" style={{ '--w': barWidths[i] } as React.CSSProperties} />
                    </div>
                    <span className="mini-bar-val">{r.val}</span>
                  </div>
                ))}
                <div style={{ marginTop: '24px', padding: '20px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                  <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--text-3)', marginBottom: '8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {t.cases.quoteAuthor.replace('— ', '')}
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.6 }}>{t.cases.quote}</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-3)', marginTop: '10px' }}>{t.cases.quoteAuthor}</p>
                </div>
              </div>
            )}
          </div>

          {/* Rest */}
          {rest.map((c, i) => (
            <div className="case-card reveal" key={i} style={{ transitionDelay: `${(i % 2) * 0.1 + 0.1}s` }}>
              <p className="case-tag">{c.tag}</p>
              <h3 className="case-title">{c.title}</h3>
              <p className="case-desc">{c.desc}</p>
              <div className="case-flow">
                {c.flow.map((item, j) => (
                  <span key={j} style={{ display: 'contents' }}>
                    <div className="case-flow-item">{item}</div>
                    {j < c.flow.length - 1 && <span className="case-flow-arrow">→</span>}
                  </span>
                ))}
              </div>
              <div className="case-metrics">
                {c.metrics.map(m => (
                  <div className="case-metric" key={m.val}>
                    <span className="case-metric-val">{m.val}</span>
                    <span className="case-metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
