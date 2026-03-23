'use client'
import { useEffect, useRef } from 'react'

const steps = [
  {
    num: '01',
    tag: 'Диагностика',
    title: 'Погружение в бизнес',
    desc: 'Глубокий аудит без шаблонных вопросов. Цифры, процессы, рынок, конкуренты — находим точки роста и реальные блокеры.',
    deliverables: ['Финансовый и операционный аудит', 'Анализ рынка и конкурентной среды', 'Gap-анализ и приоритизация задач'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
  },
  {
    num: '02',
    tag: 'Стратегия',
    title: 'План с измеримыми KPI',
    desc: 'Детальный стратегический план с конкретными метриками, сроками и ответственными. Согласовываем каждый шаг до старта.',
    deliverables: ['Go-to-market стратегия', 'Финансовая модель и прогнозы', 'Roadmap с контрольными точками'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
  },
  {
    num: '03',
    tag: 'Реализация',
    title: 'Разработка и внедрение',
    desc: 'Реализуем технологическую и операционную часть. Контролируем каждый этап — еженедельный отчёт по ключевым метрикам.',
    deliverables: ['Agile-разработка, спринты по 2 недели', 'Интеграции CRM, ERP, API и автоматизация', 'Обучение команды и передача систем'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/><path d="M7 8l3 3-3 3M13 14h4"/>
      </svg>
    ),
  },
  {
    num: '04',
    tag: 'Рост',
    title: 'Запуск и масштабирование',
    desc: 'Запускаем, измеряем, итерируем. Остаёмся партнёром — мониторим результат и масштабируем то, что работает.',
    deliverables: ['Мониторинг KPI в реальном времени', 'A/B тесты и быстрые итерации', 'Стратегия дальнейшего масштабирования'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-3 3"/>
      </svg>
    ),
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const headerEls = headerRef.current?.querySelectorAll<HTMLElement>('.reveal')
    const headerObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); headerObs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    headerEls?.forEach(el => headerObs.observe(el))

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        setTimeout(() => card.classList.add('visible'), 200 + i * 130)
      })
      obs.unobserve(section)
    }, { threshold: 0.15 })

    obs.observe(section)
    return () => { obs.disconnect(); headerObs.disconnect() }
  }, [])

  return (
    <section id="process" className="process-section" ref={sectionRef}>
      <div className="container">
        <div ref={headerRef}>
          <p className="section-label reveal">Подход</p>
          <div className="process-header">
            <h2 className="process-h2 reveal" style={{ transitionDelay: '0.1s' }}>
              Четыре этапа к<br />кратному результату.
            </h2>
            <p className="process-header-sub reveal" style={{ transitionDelay: '0.2s' }}>
              Системный процесс, проверенный на 47 проектах.
              Каждый этап — с измеримым выходом и фиксированными KPI.
            </p>
          </div>
        </div>

        <div className="process-grid">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="step-card reveal"
              ref={el => { cardsRef.current[i] = el }}
            >
              <div className="step-bg-num">{step.num}</div>

              <div className="step-card-top">
                <div className="step-icon-wrap">{step.icon}</div>
                <span className="step-seq">{step.num} / {steps.length.toString().padStart(2, '0')}</span>
              </div>

              <p className="step-tag">{step.tag}</p>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>

              <div className="step-deliverables">
                {step.deliverables.map(d => (
                  <div className="step-deliverable" key={d}>
                    <span className="step-deliverable-arrow">→</span>
                    <span>{d}</span>
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
