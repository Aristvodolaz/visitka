'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/context/LanguageContext'

const bars = [
  { label: 'Q1', h: '22%', val: '1.0×' },
  { label: 'Q2', h: '38%', val: '1.4×' },
  { label: 'Q3', h: '54%', val: '1.9×' },
  { label: 'Q4', h: '68%', val: '2.4×' },
  { label: 'Q5', h: '80%', val: '2.9×' },
  { label: 'Q6', h: '92%', val: '3.2×' },
]

export default function Roi() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  const barsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const els = section.querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-right')
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => revealObs.observe(el))

    const barObs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      barsRef.current.forEach((bar, i) => {
        if (!bar) return
        setTimeout(() => bar.classList.add('animated'), i * 100)
      })
      barObs.disconnect()
    }, { threshold: 0.3 })

    const chartEl = section.querySelector('.chart-bars')
    if (chartEl) barObs.observe(chartEl)

    return () => { revealObs.disconnect(); barObs.disconnect() }
  }, [])

  return (
    <section id="roi" className="roi-section" ref={ref}>
      <div className="roi-bg-glow" />
      <div className="container">
        <div className="roi-header">
          <p className="section-label reveal">{t.roi.sectionLabel}</p>
          <h2 className="roi-h2 reveal" style={{ transitionDelay: '0.1s' }}>
            {t.roi.h2.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h2>
          <p className="roi-sub reveal" style={{ transitionDelay: '0.2s' }}>{t.roi.sub}</p>
        </div>

        <div className="roi-grid">
          <div className="roi-metrics reveal-left">
            {t.roi.metrics.map((m, i) => (
              <div className="roi-metric" key={i}>
                <div>
                  <p className="roi-metric-label">{m.label}</p>
                  <p className="roi-metric-desc">{m.desc}</p>
                </div>
                <div className="roi-metric-value">{m.value}</div>
              </div>
            ))}
          </div>

          <div className="roi-chart-wrap reveal-right">
            <p className="chart-eyebrow">{t.roi.chartEyebrow}</p>
            <p className="chart-title-text">{t.roi.chartTitle}</p>
            <div className="chart-bars">
              {bars.map((b, i) => (
                <div className="bar-wrap" key={b.label}>
                  <div
                    className="bar"
                    style={{ '--h': b.h } as React.CSSProperties}
                    ref={el => { barsRef.current[i] = el }}
                  >
                    <span className="bar-val">{b.val}</span>
                  </div>
                  <span className="bar-label">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="roi-examples">
          {t.roi.examples.map((ex, i) => (
            <div className="roi-example reveal" key={i} style={{ transitionDelay: `${i * 0.12}s` }}>
              <p className="roi-ex-label">{ex.label}</p>
              <p className="roi-ex-input">{ex.input}</p>
              <p className="roi-ex-arrow">{ex.arrow}</p>
              <p className="roi-ex-result">{ex.result}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
