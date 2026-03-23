'use client'
import { useEffect, useRef } from 'react'

const pillars = [
  {
    num: '01 / СТРАТЕГИЯ',
    title: 'Стратегия и партнёрства',
    desc: 'Видим рынок на два хода вперёд. Строим стратегии, которые работают вне зависимости от конъюнктуры.',
    points: ['Разработка стратегии роста и выхода на рынки', 'Построение партнёрств и коммерческих альянсов', 'Переговоры на уровне C-suite', 'Развитие деловых связей и нетворк'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    num: '02 / ТЕХНОЛОГИИ',
    title: 'IT-разработка',
    desc: 'Не сайты ради сайтов — системы, которые решают бизнес-задачи и генерируют выручку.',
    points: ['Разработка сайтов и платформ под ключ', 'Автоматизация процессов и рабочих потоков', 'Внедрение CRM, ERP, цифровых решений', 'Интеграции и API-разработка'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8l3 3-3 3M13 14h4"/>
      </svg>
    ),
  },
  {
    num: '03 / АНАЛИТИКА',
    title: 'Бизнес-аналитика',
    desc: 'Управленческие решения на основе данных, а не интуиции. Цифры, которые показывают куда расти.',
    points: ['Анализ unit-экономики и финансовых потоков', 'Построение финансовых моделей и прогнозов', 'Оптимизация операционных процессов', 'KPI-системы и управленческий учёт'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-3 3"/>
      </svg>
    ),
  },
]

export default function Philosophy() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-right')
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
          <p className="section-label">Философия</p>
          <h2 className="philosophy-h2">
            Большинство агентств берут деньги<br />за <strong>процесс</strong>. Мы берём за <strong>результат</strong>.
          </h2>
        </div>
        <div className="pillars">
          {pillars.map((p, i) => (
            <div className="pillar reveal" key={p.num} style={{ transitionDelay: `${i * 0.12}s` }}>
              <p className="pillar-num">{p.num}</p>
              <div className="pillar-icon">{p.icon}</div>
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
