'use client'
import { useEffect, useRef } from 'react'

export default function Cases() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-right')
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

  return (
    <section id="cases" className="cases-section" ref={ref}>
      <div className="container">
        <div className="cases-header">
          <div>
            <p className="section-label reveal">Кейсы</p>
            <h2 className="cases-h2 reveal" style={{ transitionDelay: '0.1s' }}>Было → Сделали → Стало</h2>
          </div>
        </div>

        <div className="cases-grid">
          {/* Featured */}
          <div className="case-card featured reveal">
            <div>
              <p className="case-tag">E-commerce / Ритейл</p>
              <h3 className="case-title">Рост выручки интернет-магазина в 2.8× за 6 месяцев</h3>
              <p className="case-desc">
                Производитель одежды с оборотом 18M ₽/год. Хаотичная логистика, нет аналитики, конверсия 0.8%.
                Перестроили операционную модель и запустили новый сайт с аналитикой.
              </p>
              <div className="case-flow">
                <div className="case-flow-item">Оборот 18M ₽/год</div>
                <span className="case-flow-arrow">→</span>
                <div className="case-flow-item">Новый сайт + CRM + аналитика</div>
                <span className="case-flow-arrow">→</span>
                <div className="case-flow-item">Оборот 50M ₽/год</div>
              </div>
              <div className="case-metrics">
                <div className="case-metric">
                  <span className="case-metric-val">×2.8</span>
                  <span className="case-metric-label">рост выручки</span>
                </div>
                <div className="case-metric">
                  <span className="case-metric-val">3.1%</span>
                  <span className="case-metric-label">конверсия (было 0.8%)</span>
                </div>
                <div className="case-metric">
                  <span className="case-metric-val">6 мес</span>
                  <span className="case-metric-label">срок реализации</span>
                </div>
              </div>
            </div>
            <div className="case-featured-visual">
              <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '10px', color: 'var(--text-3)', marginBottom: '20px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Динамика оборота (M ₽)
              </p>
              {[{ label: 'До', w: '32%', val: '18M' }, { label: 'M+3', w: '52%', val: '29M' }, { label: 'M+6', w: '90%', val: '50M' }].map(r => (
                <div className="mini-bar-row" key={r.label} style={{ marginBottom: '14px' }}>
                  <span className="mini-bar-label">{r.label}</span>
                  <div className="mini-bar-track">
                    <div className="mini-bar-fill" style={{ '--w': r.w } as React.CSSProperties} />
                  </div>
                  <span className="mini-bar-val">{r.val}</span>
                </div>
              ))}
              <div style={{ marginTop: '24px', padding: '20px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '6px' }}>
                <p style={{ fontFamily: 'var(--ff-mono)', fontSize: '9px', color: 'var(--text-3)', marginBottom: '8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Команда клиента
                </p>
                <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.6 }}>
                  "Мы думали, что проблема в рекламе. Оказалось — в операционке. Нашли это за первую неделю."
                </p>
                <p style={{ fontSize: '11px', color: 'var(--text-3)', marginTop: '10px' }}>— Директор по маркетингу</p>
              </div>
            </div>
          </div>

          {/* Case 2 */}
          <div className="case-card reveal" style={{ transitionDelay: '0.1s' }}>
            <p className="case-tag">B2B SaaS / Автоматизация</p>
            <h3 className="case-title">Автоматизация операций → −40% издержки, +$180K ARR</h3>
            <p className="case-desc">SaaS-компания с ручными процессами onboarding и биллинга. Разработали интеграции с CRM и автоматизировали 80% рутинных операций.</p>
            <div className="case-flow">
              <div className="case-flow-item">8 ручных процессов</div>
              <span className="case-flow-arrow">→</span>
              <div className="case-flow-item">Автоматизация + интеграции</div>
              <span className="case-flow-arrow">→</span>
              <div className="case-flow-item">2 FTE высвобождено</div>
            </div>
            <div className="case-metrics">
              <div className="case-metric">
                <span className="case-metric-val">−40%</span>
                <span className="case-metric-label">операционные затраты</span>
              </div>
              <div className="case-metric">
                <span className="case-metric-val">+$180K</span>
                <span className="case-metric-label">ARR прирост</span>
              </div>
            </div>
          </div>

          {/* Case 3 */}
          <div className="case-card reveal" style={{ transitionDelay: '0.2s' }}>
            <p className="case-tag">Производство / Финансы</p>
            <h3 className="case-title">Финансовая модель + ERP → EBITDA +34%</h3>
            <p className="case-desc">Производственная компания без управленческого учёта. Внедрили финансовую модель, настроили ERP, выявили убыточные продуктовые линейки.</p>
            <div className="case-flow">
              <div className="case-flow-item">EBITDA 8%</div>
              <span className="case-flow-arrow">→</span>
              <div className="case-flow-item">Финмодель + ERP</div>
              <span className="case-flow-arrow">→</span>
              <div className="case-flow-item">EBITDA 21%</div>
            </div>
            <div className="case-metrics">
              <div className="case-metric">
                <span className="case-metric-val">+34%</span>
                <span className="case-metric-label">рост EBITDA</span>
              </div>
              <div className="case-metric">
                <span className="case-metric-val">4 мес</span>
                <span className="case-metric-label">срок внедрения</span>
              </div>
            </div>
          </div>

          {/* Case 4 */}
          <div className="case-card reveal" style={{ transitionDelay: '0.1s' }}>
            <p className="case-tag">Ритейл / Стратегия</p>
            <h3 className="case-title">Стратегия масштабирования → 3 новых рынка за год</h3>
            <p className="case-desc">Региональный ритейлер с планами экспансии, но без чёткой стратегии выхода. Разработали go-to-market план, провели переговоры с партнёрами в 3 регионах.</p>
            <div className="case-flow">
              <div className="case-flow-item">1 регион</div>
              <span className="case-flow-arrow">→</span>
              <div className="case-flow-item">GTM + переговоры</div>
              <span className="case-flow-arrow">→</span>
              <div className="case-flow-item">4 региона</div>
            </div>
            <div className="case-metrics">
              <div className="case-metric">
                <span className="case-metric-val">×2.2</span>
                <span className="case-metric-label">рост выручки</span>
              </div>
              <div className="case-metric">
                <span className="case-metric-val">3 рынка</span>
                <span className="case-metric-label">за 12 мес</span>
              </div>
            </div>
          </div>

          {/* Case 5 */}
          <div className="case-card reveal" style={{ transitionDelay: '0.2s' }}>
            <p className="case-tag">Логистика / Оптимизация</p>
            <h3 className="case-title">Оптимизация логистики → −22% операционных расходов</h3>
            <p className="case-desc">Логистическая компания с раздутым штатом и неэффективными маршрутами. Провели аудит, перестроили маршрутную сетку и внедрили систему мониторинга.</p>
            <div className="case-flow">
              <div className="case-flow-item">Расходы X</div>
              <span className="case-flow-arrow">→</span>
              <div className="case-flow-item">Аудит + оптимизация</div>
              <span className="case-flow-arrow">→</span>
              <div className="case-flow-item">Расходы 0.78X</div>
            </div>
            <div className="case-metrics">
              <div className="case-metric">
                <span className="case-metric-val">−22%</span>
                <span className="case-metric-label">операционные расходы</span>
              </div>
              <div className="case-metric">
                <span className="case-metric-val">6 нед</span>
                <span className="case-metric-label">срок проекта</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
