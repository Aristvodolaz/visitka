'use client'
import { useEffect, useRef } from 'react'

const services = [
  {
    num: '01',
    title: 'Стратегия и партнёрства',
    desc: 'Разработка стратегии роста и выхода на новые рынки. Переговоры, партнёрства, развитие бизнеса на уровне первых лиц.',
    items: ['Стратегия роста и масштабирования', 'Go-to-market планирование', 'Переговоры и партнёрские сделки', 'Выход на новые рынки', 'Бизнес-девелопмент и нетворк'],
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="22" cy="22" r="18"/>
        <path d="M22 8v14l8 8"/><circle cx="22" cy="22" r="3" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Технологии и разработка',
    desc: 'Создаём цифровые продукты, которые автоматизируют процессы, снижают издержки и открывают новые каналы выручки.',
    items: ['Разработка сайтов и платформ', 'Автоматизация бизнес-процессов', 'Внедрение CRM и ERP систем', 'Телеграм-боты и интеграции', 'Аналитические дашборды'],
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="6" y="8" width="32" height="22" rx="3"/>
        <path d="M14 38h16M22 30v8"/><path d="M13 16l4 4-4 4M23 24h8"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Бизнес-аналитика',
    desc: 'Превращаем данные в управленческие решения. Финансовые модели, unit-экономика и системы KPI для кратного роста.',
    items: ['Финансовые модели и прогнозы', 'Анализ unit-экономики', 'Оптимизация операционных процессов', 'Управленческая отчётность', 'Инвестиционный анализ'],
    icon: (
      <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M6 38V28l8-8 8 6 8-14 8 10"/><path d="M6 38h32"/>
      </svg>
    ),
  },
]

export default function Services() {
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
    <section id="services" ref={ref}>
      <div className="container">
        <div className="services-header">
          <div>
            <p className="section-label reveal">Услуги</p>
            <h2 className="services-h2 reveal" style={{ transitionDelay: '0.1s' }}>
              Три направления.<br />Один результат.
            </h2>
          </div>
          <a href="#cta" className="btn btn-ghost reveal" style={{ transitionDelay: '0.2s', flexShrink: 0 }}>
            Обсудить задачу →
          </a>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card reveal" key={s.num} style={{ transitionDelay: `${i * 0.12}s` }}>
              <p className="service-number">{s.num}</p>
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <ul className="service-list">
                {s.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
