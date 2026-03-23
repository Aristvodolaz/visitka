'use client'
import { useEffect, useRef } from 'react'

const metrics = [
  { label: 'Среднее увеличение выручки', desc: 'За первые 12 месяцев после внедрения стратегии', value: '+187%' },
  { label: 'Снижение операционных издержек', desc: 'За счёт автоматизации и оптимизации процессов', value: '−34%' },
  { label: 'Возврат инвестиций (ROI)', desc: 'Средний показатель по реализованным проектам', value: '×4.2' },
  { label: 'Срок окупаемости', desc: 'От старта работы до положительного денежного потока', value: '3–6 мес' },
]

const bars = [
  { label: 'Q1', h: '22%', val: '1.0×' },
  { label: 'Q2', h: '38%', val: '1.4×' },
  { label: 'Q3', h: '54%', val: '1.9×' },
  { label: 'Q4', h: '68%', val: '2.4×' },
  { label: 'Q5', h: '80%', val: '2.9×' },
  { label: 'Q6', h: '92%', val: '3.2×' },
]

const examples = [
  { label: 'Кейс: автоматизация', input: 'Инвестиция в разработку: 800 000 ₽', arrow: '↓ экономия на 3 штатных единицах', result: '+3.6M ₽/год' },
  { label: 'Кейс: стратегия выхода', input: '6 недель аналитики и планирования', arrow: '↓ выход на 2 новых рынка', result: '+$420K выручка' },
  { label: 'Кейс: финансовая модель', input: 'Убыточная операционная модель', arrow: '↓ реструктуризация юнит-экономики', result: 'EBITDA +34%' },
]

export default function Roi() {
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
          <p className="section-label reveal">Экономика</p>
          <h2 className="roi-h2 reveal" style={{ transitionDelay: '0.1s' }}>
            Как мы зарабатываем<br />вам деньги
          </h2>
          <p className="roi-sub reveal" style={{ transitionDelay: '0.2s' }}>
            Каждое решение обосновано цифрами. Вот как выглядит типичный ROI от работы с нами.
          </p>
        </div>

        <div className="roi-grid">
          <div className="roi-metrics reveal-left">
            {metrics.map(m => (
              <div className="roi-metric" key={m.label}>
                <div>
                  <p className="roi-metric-label">{m.label}</p>
                  <p className="roi-metric-desc">{m.desc}</p>
                </div>
                <div className="roi-metric-value">{m.value}</div>
              </div>
            ))}
          </div>

          <div className="roi-chart-wrap reveal-right">
            <p className="chart-eyebrow">Динамика роста выручки</p>
            <p className="chart-title-text">Среднее по портфелю клиентов</p>
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
          {examples.map((ex, i) => (
            <div className="roi-example reveal" key={ex.label} style={{ transitionDelay: `${i * 0.12}s` }}>
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
